import "server-only";
import type { Auth } from "firebase-admin/auth";
import { FieldPath, FieldValue, type Firestore } from "firebase-admin/firestore";
import { RequestError } from "../requests.ts";
import { accountCodePattern, generateAccountCode, parseNewUserAccount, parseUserAccountId, parseUserAccountUpdate, parseUserCredentials, type UserAccountPage, type UserAccountRecord } from "../user-accounts.ts";
import { authorizeSession } from "./auth.ts";
import { firebase } from "./firebase.ts";

export const userSessionCookie = "noura_user";
export const userSessionSeconds = 8 * 60 * 60;
type Services = { auth: Pick<Auth, "createUser" | "updateUser" | "deleteUser" | "verifySessionCookie" | "verifyIdToken" | "createSessionCookie">; db: Firestore };
const codeOf = (error: unknown) => (error && typeof error === "object" && "code" in error ? String(error.code) : "");
const accountCollection = "user_accounts";
// One document per issued account code; a code is never reissued, even after its account is deleted.
const codeCollection = "user_account_codes";
const codeAttempts = 10;
const accountLimit = 50;

function providerError(error: unknown, fallback: string): RequestError {
  const code = codeOf(error);
  if (code === "auth/email-already-exists") return new RequestError("An account already exists for this email address.", 409);
  if (["auth/invalid-password", "auth/password-does-not-meet-requirements"].includes(code)) return new RequestError("Choose a password that meets the Firebase project's password policy.", 422);
  if (["auth/configuration-not-found", "auth/operation-not-allowed", "auth/project-not-found"].includes(code)) return new RequestError("Firebase Authentication is not enabled for this project. Enable Email/Password sign-in in the Firebase console.", 503);
  return new RequestError(fallback, 503);
}

function recordOf(id: string, data: FirebaseFirestore.DocumentData): UserAccountRecord {
  return {
    id, account_code: String(data.account_code ?? ""), full_name: String(data.full_name ?? ""), email: String(data.email ?? ""),
    phone: String(data.phone ?? ""), created_at: String(data.created_at ?? ""),
    updated_at: String(data.updated_at ?? data.created_at ?? ""), version: Number(data.version) || 1,
  };
}

async function claimAccountCode(db: Firestore, uid: string): Promise<string> {
  for (let attempt = 0; attempt < codeAttempts; attempt++) {
    const code = generateAccountCode();
    try {
      await db.collection(codeCollection).doc(code).create({ uid, created_at: new Date().toISOString() });
      return code;
    } catch (error) {
      if (!["6", "already-exists"].includes(codeOf(error))) throw error;
    }
  }
  throw new RequestError("Unable to issue an account code. Please try again.", 503);
}

// Accounts created before codes existed receive one the first time an admin lists them.
async function ensureAccountCode(db: Firestore, doc: FirebaseFirestore.QueryDocumentSnapshot): Promise<string> {
  const existing = doc.data().account_code;
  if (typeof existing === "string" && accountCodePattern.test(existing)) return existing;
  const claimed = await claimAccountCode(db, doc.id);
  const final = await db.runTransaction(async (tx) => {
    const current = (await tx.get(doc.ref)).data()?.account_code;
    if (typeof current === "string" && accountCodePattern.test(current)) return current;
    tx.update(doc.ref, { account_code: claimed });
    return claimed;
  });
  if (final !== claimed) await db.collection(codeCollection).doc(claimed).delete().catch(() => undefined);
  return final;
}

// These are login accounts only. They do not approve an invitation, grant admin access,
// or create/alter a membership record or member code.
export async function createUserAccount(adminSession: string | undefined, input: unknown, services?: Services) {
  authorizeSession(adminSession);
  const account = parseNewUserAccount(input);
  const { auth, db } = services ?? firebase();
  let uid: string | undefined;
  let code: string | undefined;
  try {
    // Fail closed while the server-only provisioning record is being saved.
    const user = await auth.createUser({ email: account.email, displayName: account.full_name, password: account.password, disabled: true });
    uid = user.uid;
    code = await claimAccountCode(db, uid);
    const now = new Date().toISOString();
    await db.collection(accountCollection).doc(uid).create({
      account_code: code, full_name: account.full_name, email: account.email, phone: account.phone,
      created_at: now, updated_at: now, version: 1, provisioned_by: "admin",
    });
    await auth.updateUser(uid, { disabled: false });
    return { id: uid, account_code: code };
  } catch (error) {
    if (uid) {
      // Only compensate the account created by this operation. If cleanup fails,
      // keep it disabled; no password or profile is included in diagnostics.
      try { await auth.updateUser(uid, { disabled: true }); } catch { /* already disabled or deleted */ }
      if (code) { try { await db.collection(codeCollection).doc(code).delete(); } catch { /* an unused code may stay retired */ } }
      try { await db.collection(accountCollection).doc(uid).delete(); } catch { /* deny unless auth is enabled too */ }
      try { await auth.deleteUser(uid); } catch { /* owner can remove the disabled partial account */ }
    }
    throw providerError(error, "Unable to create the account. Please try again; if the email is already in use, contact the site owner.");
  }
}

export async function listUserAccounts(adminSession: string | undefined, cursor?: string | null, services?: Services): Promise<UserAccountPage> {
  authorizeSession(adminSession);
  if (cursor) parseUserAccountId(cursor);
  const { db } = services ?? firebase();
  let query = db.collection(accountCollection).orderBy(FieldPath.documentId()).limit(accountLimit + 1);
  if (cursor) query = query.startAfter(cursor);
  const snapshot = await query.get();
  const docs = snapshot.docs.slice(0, accountLimit);
  const codes = await Promise.all(docs.map((doc) => ensureAccountCode(db, doc)));
  return { records: docs.map((doc, index) => recordOf(doc.id, { ...doc.data(), account_code: codes[index] })), next: snapshot.docs.length > accountLimit ? docs.at(-1)?.id ?? null : null };
}

export async function updateUserAccount(adminSession: string | undefined, id: string, input: unknown, services?: Services): Promise<UserAccountRecord> {
  authorizeSession(adminSession);
  const uid = parseUserAccountId(id);
  const update = parseUserAccountUpdate(input);
  const { auth, db } = services ?? firebase();
  const ref = db.collection(accountCollection).doc(uid);
  const operation = `edit:${crypto.randomUUID()}`;
  const before = await db.runTransaction(async (tx) => {
    const snapshot = await tx.get(ref);
    if (!snapshot.exists || snapshot.data()?.provisioned_by !== "admin") throw new RequestError("Account not found.", 404);
    const data = snapshot.data()!;
    if ((Number(data.version) || 1) !== update.version || data.pending_operation) throw new RequestError("This account changed. Refresh the users page and try again.", 409);
    tx.update(ref, { pending_operation: operation });
    return recordOf(uid, data);
  });
  let providerUpdated = false;
  try {
    await auth.updateUser(uid, { email: update.email, displayName: update.full_name });
    providerUpdated = true;
    const now = new Date().toISOString();
    await db.runTransaction(async (tx) => {
      const snapshot = await tx.get(ref);
      if (snapshot.data()?.pending_operation !== operation) throw new RequestError("This account changed. Refresh the users page and try again.", 409);
      tx.update(ref, { full_name: update.full_name, email: update.email, phone: update.phone, updated_at: now, version: before.version + 1, pending_operation: FieldValue.delete() });
    });
    return { ...before, ...update, updated_at: now, version: before.version + 1 };
  } catch (error) {
    let restored = !providerUpdated;
    if (providerUpdated) {
      try { await auth.updateUser(uid, { email: before.email, displayName: before.full_name }); restored = true; } catch { /* keep the profile locked for owner reconciliation */ }
    }
    if (restored) {
      try { await db.runTransaction(async (tx) => { const snapshot = await tx.get(ref); if (snapshot.data()?.pending_operation === operation) tx.update(ref, { pending_operation: FieldValue.delete() }); }); } catch { /* retain the lock rather than silently diverge */ }
    }
    if (error instanceof RequestError) throw error;
    throw providerError(error, "Unable to save the account. Please retry.");
  }
}

export async function deleteUserAccount(adminSession: string | undefined, id: string, input: unknown, services?: Services): Promise<void> {
  authorizeSession(adminSession);
  const uid = parseUserAccountId(id);
  const value = input && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : {};
  if (Object.keys(value).some((key) => key !== "version") || !Number.isSafeInteger(value.version) || (value.version as number) < 1) throw new RequestError("Refresh the users page and try again.", 409);
  const { auth, db } = services ?? firebase();
  const ref = db.collection(accountCollection).doc(uid);
  const operation = `delete:${crypto.randomUUID()}`;
  await db.runTransaction(async (tx) => {
    const snapshot = await tx.get(ref);
    if (!snapshot.exists || snapshot.data()?.provisioned_by !== "admin") throw new RequestError("Account not found.", 404);
    const data = snapshot.data()!;
    if ((Number(data.version) || 1) !== value.version || (data.pending_operation && !String(data.pending_operation).startsWith("delete:"))) throw new RequestError("This account changed. Refresh the users page and try again.", 409);
    tx.update(ref, { pending_operation: operation });
  });
  try {
    await auth.deleteUser(uid);
  } catch (error) {
    if (codeOf(error) !== "auth/user-not-found") {
      await db.runTransaction(async (tx) => { const snapshot = await tx.get(ref); if (snapshot.data()?.pending_operation === operation) tx.update(ref, { pending_operation: FieldValue.delete() }); });
      throw providerError(error, "Unable to delete the account. Please retry.");
    }
  }
  // The Auth identity is gone before the profile is removed, so a partial failure cannot retain access.
  await db.runTransaction(async (tx) => { const snapshot = await tx.get(ref); if (snapshot.data()?.pending_operation === operation) tx.delete(ref); });
}

async function requireProvisionedUser(db: Firestore, uid: string) {
  const account = await db.collection(accountCollection).doc(uid).get();
  if (!account.exists || account.data()?.provisioned_by !== "admin" || account.data()?.pending_operation?.startsWith("delete:")) throw new RequestError("Please sign in with an account created by the NOURA team.", 401);
}

export async function authorizeUser(session: string | undefined, services?: Services) {
  if (!session || session.length > 8192) throw new RequestError("Please sign in to continue.", 401);
  const { auth, db } = services ?? firebase();
  try {
    const token = await auth.verifySessionCookie(session, true);
    await requireProvisionedUser(db, token.uid);
    return { id: token.uid };
  } catch (error) {
    if (error instanceof RequestError) throw error;
    if (/^auth\/(session-cookie|id-token|argument-error|invalid-argument|user-disabled|user-not-found)/.test(codeOf(error))) throw new RequestError("Please sign in to continue.", 401);
    throw new RequestError("Sign-in is temporarily unavailable. Please try again.", 503);
  }
}

export async function signInUser(input: unknown, services?: Services, fetcher: typeof fetch = fetch) {
  const account = parseUserCredentials(input);
  const { auth, db } = services ?? firebase();
  const key = process.env.FIREBASE_WEB_API_KEY;
  if (!key) throw new RequestError("User sign-in is not configured yet.", 503);
  const host = process.env.FIREBASE_AUTH_EMULATOR_HOST;
  // Match the server SDK's demo-only emulator guard before sending credentials anywhere.
  if (host && (!process.env.FIREBASE_PROJECT_ID?.startsWith("demo-") || process.env.NOURA_FIREBASE_EMULATORS !== "true")) throw new RequestError("Invalid emulator configuration.", 503);
  const base = host ? `http://${host}/identitytoolkit.googleapis.com` : "https://identitytoolkit.googleapis.com";
  const response = await fetcher(`${base}/v1/accounts:signInWithPassword?key=${encodeURIComponent(key)}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store",
    body: JSON.stringify({ ...account, returnSecureToken: true }), signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    if (response.status === 429) throw new RequestError("Too many attempts. Please try again later.", 429);
    if (response.status >= 500) throw new RequestError("Sign-in is temporarily unavailable. Please try again.", 503);
    throw new RequestError("Unable to sign in with that email and password.", 401);
  }
  const result: unknown = await response.json();
  const idToken = result && typeof result === "object" && "idToken" in result ? result.idToken : null;
  if (typeof idToken !== "string") throw new RequestError("Sign-in is temporarily unavailable. Please try again.", 503);
  const token = await auth.verifyIdToken(idToken, true);
  await requireProvisionedUser(db, token.uid);
  // Provider tokens/passwords stay on the server; the browser receives only an HttpOnly cookie.
  return auth.createSessionCookie(idToken, { expiresIn: userSessionSeconds * 1000 });
}
