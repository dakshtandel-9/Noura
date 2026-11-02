import { test } from "node:test";
import assert from "node:assert/strict";
import { RequestError } from "../../lib/requests.ts";
import { createSession, authorizeSession } from "../../lib/server/auth.ts";
import { firebase } from "../../lib/server/firebase.ts";
import { authorizeUser, createUserAccount, deleteUserAccount, listUserAccounts, signInUser, updateUserAccount } from "../../lib/server/user-accounts.ts";

const project = process.env.FIREBASE_PROJECT_ID;
if (!project?.startsWith("demo-") || process.env.NOURA_FIREBASE_EMULATORS !== "true" || !process.env.FIREBASE_AUTH_EMULATOR_HOST || !process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error("Integration tests require explicitly enabled local Firebase emulators and a demo- project.");
}
process.env.ADMIN_PASSWORD = "dummy-admin-password";
process.env.ADMIN_SESSION_SECRET = "dummy-secret-for-tests-only-at-least-32-characters";
const rejected = (status: number) => (error: unknown) => error instanceof RequestError && error.status === status;

test("real emulator provisioning, login, account restrictions, session revocation and database rules", async () => {
  const { auth, db } = await firebase();
  const suffix = crypto.randomUUID();
  const account = { full_name: "Example User", email: `user-${suffix}@example.com`, phone: "+91 90000 00000", password: "example-password-123" };
  const created: string[] = [];
  try {
    const result = await createUserAccount(createSession(), account);
    created.push(result.id);
    const saved = (await db.collection("user_accounts").doc(result.id).get()).data();
    assert.equal(saved?.phone, account.phone);
    assert.equal(saved?.provisioned_by, "admin");
    assert.equal(saved?.password, undefined);
    assert.equal((await auth.getUser(result.id)).disabled, false);
    await assert.rejects(() => createUserAccount(createSession(), { ...account, password: "different-password-123" }), rejected(409));
    const session = await signInUser({ email: account.email, password: account.password });
    assert.deepEqual(await authorizeUser(session), { id: result.id, full_name: account.full_name, account_code: result.account_code });
    assert.throws(() => authorizeSession(session), rejected(401));
    await assert.rejects(() => createUserAccount(session, account), rejected(401));
    await assert.rejects(() => signInUser({ email: account.email, password: "incorrect-password" }), rejected(401));
    await assert.rejects(() => authorizeUser("forged-session"), rejected(401));

    // Raw provider-created identities still cannot acquire NOURA access.
    const outsider = await auth.createUser({ email: `outsider-${suffix}@example.com`, password: account.password });
    created.push(outsider.uid);
    await assert.rejects(() => signInUser({ email: outsider.email, password: account.password }), rejected(401));

    const withoutPhone = await createUserAccount(createSession(), { ...account, email: `no-phone-${suffix}@example.com`, phone: "" });
    created.push(withoutPhone.id);
    assert.equal((await db.collection("user_accounts").doc(withoutPhone.id).get()).data()?.phone, "");

    const passwordResponse = await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=demo-key`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: account.email, password: account.password, returnSecureToken: true }),
    });
    const { idToken } = await passwordResponse.json() as { idToken: string };
    const documentUrl = `http://${process.env.FIRESTORE_EMULATOR_HOST}/v1/projects/${project}/databases/(default)/documents/user_accounts/${result.id}`;
    const requestHeaders: Record<string, string>[] = [{}, { Authorization: `Bearer ${idToken}` }];
    for (const headers of requestHeaders) {
      const deniedRead = await fetch(documentUrl, { headers });
      assert.equal(deniedRead.status, 403);
      const deniedWrite = await fetch(documentUrl, { method: "PATCH", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ fields: { provisioned_by: { stringValue: "admin" } } }) });
      assert.equal(deniedWrite.status, 403);
    }

    await auth.updateUser(result.id, { disabled: true });
    await assert.rejects(() => authorizeUser(session), rejected(401));
    await auth.updateUser(result.id, { disabled: false });
    // Auth timestamps have second resolution, so revocation must be in a later second.
    await new Promise((resolve) => setTimeout(resolve, 1100));
    await auth.revokeRefreshTokens(result.id);
    await assert.rejects(() => authorizeUser(session), rejected(401));
    const renewed = await signInUser({ email: account.email, password: account.password });
    await db.collection("user_accounts").doc(result.id).delete();
    await assert.rejects(() => authorizeUser(renewed), rejected(401));
  } finally {
    for (const uid of created) {
      await db.collection("user_accounts").doc(uid).delete();
      await auth.deleteUser(uid);
    }
  }
});

test("admin user directory lists, edits and deletes accounts without changing their unique IDs", async () => {
  const { auth, db } = await firebase();
  const uidSuffix = crypto.randomUUID();
  const account = { full_name: "Directory Example", email: `directory-${uidSuffix}@example.com`, phone: "", password: "example-password-123" };
  const session = createSession();
  let uid: string | undefined;
  try {
    const created = await createUserAccount(session, account);
    uid = created.id;
    const id = created.id;
    const page = await listUserAccounts(session);
    assert.ok(page.records.some((row) => row.id === id && row.version === 1));
    const changed = await updateUserAccount(session, id, { full_name: "Edited Example", email: `edited-${uidSuffix}@example.com`, phone: "+91 90000 00000", version: 1 });
    assert.equal(changed.id, id);
    assert.equal(changed.version, 2);
    assert.equal((await auth.getUser(id)).email, changed.email);
    assert.equal((await db.collection("user_accounts").doc(id).get()).data()?.phone, changed.phone);
    await assert.rejects(() => updateUserAccount(session, id, { full_name: changed.full_name, email: changed.email, phone: changed.phone, version: 1 }), rejected(409));
    await assert.rejects(() => deleteUserAccount(session, id, { version: 1 }), rejected(409));
    const userSession = await signInUser({ email: changed.email, password: account.password });
    await deleteUserAccount(session, id, { version: 2 });
    assert.equal((await db.collection("user_accounts").doc(id).get()).exists, false);
    await assert.rejects(() => auth.getUser(id), (error: unknown) => (error as { code?: string }).code === "auth/user-not-found");
    await assert.rejects(() => authorizeUser(userSession), rejected(401));
    uid = undefined;
  } finally {
    if (uid) {
      await db.collection("user_accounts").doc(uid).delete();
      await auth.deleteUser(uid);
    }
  }
});
