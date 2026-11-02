import { test } from "node:test";
import assert from "node:assert/strict";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";
import { RequestError } from "../../lib/requests.ts";
import { accountCodePattern, generateAccountCode, parseNewUserAccount, parseUserAccountId, parseUserAccountUpdate, parseUserCredentials } from "../../lib/user-accounts.ts";
import { createSession } from "../../lib/server/auth.ts";
import { authorizeUser, createUserAccount, deleteUserAccount, listUserAccounts, updateUserAccount } from "../../lib/server/user-accounts.ts";

process.env.ADMIN_PASSWORD = "dummy-admin-password";
process.env.ADMIN_SESSION_SECRET = "dummy-secret-for-tests-only-at-least-32-characters";
const valid = { full_name: "Example User", email: "user@example.com", password: "example-password-123" };
const rejected = (status: number) => (error: unknown) => error instanceof RequestError && error.status === status;

test("account validation normalizes email/name, preserves password, and accepts optional phone", () => {
  assert.deepEqual(parseNewUserAccount({ ...valid, full_name: "  Example User  ", email: " User@Example.com " }), { ...valid, phone: "" });
  assert.equal(parseNewUserAccount({ ...valid, phone: "+91 (90000) 00000" }).phone, "+91 (90000) 00000");
  assert.equal(parseNewUserAccount({ ...valid, password: "  example-password  " }).password, "  example-password  ");
});

test("invalid types, oversize fields and privilege injection fail at the server validator", () => {
  for (const input of [null, [], { ...valid, full_name: "a" }, { ...valid, full_name: "a".repeat(101) }, { ...valid, email: "invalid" }, { ...valid, password: "short" }, { ...valid, password: "x".repeat(129) }, { ...valid, phone: 123 }, { ...valid, phone: "text" }, { ...valid, phone: "1".repeat(31) }, { ...valid, role: "admin" }, { ...valid, provisioned_by: "admin" }]) {
    assert.throws(() => parseNewUserAccount(input), rejected(422));
  }
  assert.throws(() => parseUserCredentials({ email: valid.email, password: valid.password, idToken: "forged" }), rejected(422));
  assert.equal(parseUserCredentials({ email: "User@Example.com", password: "existing" }).email, valid.email);
});

test("account updates preserve a stable UID and reject privilege and stale-version input", () => {
  assert.deepEqual(parseUserAccountUpdate({ full_name: " Example User ", email: "User@Example.com", phone: "", version: 2 }), { full_name: "Example User", email: valid.email, phone: "", version: 2 });
  for (const input of [
    { full_name: valid.full_name, email: valid.email, phone: "", version: 0 },
    { full_name: valid.full_name, email: valid.email, phone: "", version: 1, role: "admin" },
    { full_name: valid.full_name, email: valid.email, phone: "", version: 1, password: "new-password" },
    { full_name: "x", email: valid.email, phone: "", version: 1 },
  ]) assert.throws(() => parseUserAccountUpdate(input), (error: unknown) => error instanceof RequestError && [409, 422].includes(error.status));
  assert.equal(parseUserAccountId("stable-Uid_123"), "stable-Uid_123");
  assert.throws(() => parseUserAccountId("../other"), rejected(404));
});

test("direct provisioning rejects missing, forged, expired and user cookies before touching Firebase", async () => {
  const expired = createSession(Date.now() - 9 * 60 * 60_000);
  for (const session of [undefined, "forged", expired, "firebase-user-session-cookie"]) {
    await assert.rejects(() => createUserAccount(session, valid), rejected(401));
    await assert.rejects(() => listUserAccounts(session), rejected(401));
    await assert.rejects(() => updateUserAccount(session, "test-uid", { full_name: valid.full_name, email: valid.email, phone: "", version: 1 }), rejected(401));
    await assert.rejects(() => deleteUserAccount(session, "test-uid", { version: 1 }), rejected(401));
  }
});

test("uninitialized Firebase Authentication gives an actionable creation error", async () => {
  const auth = { createUser: async () => { throw Object.assign(new Error("provider unavailable"), { code: "auth/configuration-not-found" }); } } as unknown as Auth;
  await assert.rejects(() => createUserAccount(createSession(), valid, { auth, db: {} as Firestore }),
    (error: unknown) => error instanceof RequestError && error.status === 503 && /Enable Email\/Password/.test(error.message));
});

test("missing and oversized user sessions fail before provider access", async () => {
  await assert.rejects(() => authorizeUser(undefined), rejected(401));
  await assert.rejects(() => authorizeUser("a".repeat(8193)), rejected(401));
});

test("user checks request live revocation verification and reject expired, disabled or deleted identities", async () => {
  for (const code of ["auth/session-cookie-expired", "auth/session-cookie-revoked", "auth/user-disabled", "auth/user-not-found"]) {
    const auth = { verifySessionCookie: async (_session: string, checkRevoked: boolean) => {
      assert.equal(checkRevoked, true);
      throw Object.assign(new Error("provider refusal"), { code });
    } } as unknown as Auth;
    await assert.rejects(() => authorizeUser("dummy-session", { auth, db: {} as Firestore }), rejected(401));
  }
});

test("provider rate-limit responses remain a generic sign-in failure", async () => {
  const oldApiKey = process.env.FIREBASE_WEB_API_KEY;
  process.env.FIREBASE_WEB_API_KEY = "dummy-key";
  const auth = {} as Auth;
  const response = new Response(JSON.stringify({ error: { message: "TOO_MANY_ATTEMPTS_TRY_LATER" } }), { status: 429 });
  const fetcher = async () => response;
  try {
    await assert.rejects(
      () => import("../../lib/server/user-accounts.ts").then(({ signInUser }) => signInUser({ email: valid.email, password: valid.password }, { auth, db: {} as Firestore }, fetcher)),
      (error) => error instanceof RequestError && error.status === 429 && error.message === "Too many attempts. Please try again later.",
    );
  } finally {
    if (oldApiKey === undefined) delete process.env.FIREBASE_WEB_API_KEY;
    else process.env.FIREBASE_WEB_API_KEY = oldApiKey;
  }
});

test("failed provisioning stays disabled and compensates only its own partial account", async () => {
  const events: string[] = [];
  const auth = {
    createUser: async (data: { disabled: boolean }) => { assert.equal(data.disabled, true); events.push("create-disabled"); return { uid: "dummy-created-uid" }; },
    updateUser: async (uid: string, data: { disabled: boolean }) => { assert.equal(uid, "dummy-created-uid"); events.push(`disabled:${data.disabled}`); },
    deleteUser: async (uid: string) => { assert.equal(uid, "dummy-created-uid"); events.push("delete-auth"); },
  } as unknown as Auth;
  const db = { collection: (name: string) => {
    if (name === "user_account_codes") return { doc: (code: string) => {
      assert.match(code, accountCodePattern);
      return { create: async () => { events.push("claim-code"); }, delete: async () => { events.push("delete-code"); } };
    } };
    assert.equal(name, "user_accounts");
    return { doc: (uid: string) => {
      assert.equal(uid, "dummy-created-uid");
      return { create: async () => { events.push("save-profile"); throw new Error("unavailable"); }, delete: async () => { events.push("delete-profile"); } };
    } };
  } } as unknown as Firestore;
  await assert.rejects(() => createUserAccount(createSession(), valid, { auth, db }), rejected(503));
  assert.deepEqual(events, ["create-disabled", "claim-code", "save-profile", "disabled:true", "delete-code", "delete-profile", "delete-auth"]);
});

test("account codes are NOURA-, two letters, three digits, and retried on collision", async () => {
  for (let i = 0; i < 200; i++) assert.match(generateAccountCode(), accountCodePattern);
  assert.equal(generateAccountCode(() => 0), "NOURA-AA000");
  assert.equal(generateAccountCode((max) => max - 1), "NOURA-ZZ999");

  const claims: string[] = [];
  let saved: Record<string, unknown> | undefined;
  const auth = {
    createUser: async () => ({ uid: "dummy-created-uid" }),
    updateUser: async () => undefined,
  } as unknown as Auth;
  const db = { collection: (name: string) => {
    if (name === "user_account_codes") return { doc: (code: string) => ({ create: async () => {
      claims.push(code);
      if (claims.length === 1) throw Object.assign(new Error("exists"), { code: 6 });
    } }) };
    return { doc: () => ({ create: async (data: Record<string, unknown>) => { saved = data; } }) };
  } } as unknown as Firestore;
  const result = await createUserAccount(createSession(), valid, { auth, db });
  assert.equal(claims.length, 2);
  assert.equal(result.account_code, claims[1]);
  assert.equal(saved?.account_code, claims[1]);
});
