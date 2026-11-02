import { test } from "node:test";
import assert from "node:assert/strict";
import { firebase } from "../../lib/server/firebase.ts";

const origin = process.env.NOURA_TEST_APP_ORIGIN;
if (!origin || !/^http:\/\/localhost:\d+$/.test(origin) || !process.env.FIREBASE_PROJECT_ID?.startsWith("demo-") || process.env.NOURA_FIREBASE_EMULATORS !== "true" || !process.env.FIREBASE_AUTH_EMULATOR_HOST || !process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error("HTTP tests require a local server configured for the demo Firebase emulators, plus NOURA_TEST_APP_ORIGIN.");
}
const base = origin;

test("HTTP account boundaries, cookies, redirects, login and logout", async () => {
  const post = (path: string, body: unknown, cookie = "", headers: Record<string, string> = {}) => fetch(base + path, {
    method: "POST", headers: { "Content-Type": "application/json", Origin: base, Cookie: cookie, ...headers },
    body: JSON.stringify(body), redirect: "manual",
  });
  const dummy = { full_name: "Example HTTP User", email: `http-${crypto.randomUUID()}@example.com`, phone: "", password: "example-password-123" };
  let createdId: string | undefined;
  try {
    let response = await post("/api/admin/users", dummy);
    assert.equal(response.status, 401);
    response = await fetch(base + "/api/admin/users");
    assert.equal(response.status, 401);
    response = await fetch(base + "/members", { redirect: "manual" });
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "/login");
    response = await post("/api/admin/session", { password: "dummy-admin-password" });
    assert.equal(response.status, 200);
    const adminCookie = response.headers.get("set-cookie")!.split(";")[0]!;
    response = await post("/api/admin/users", dummy, adminCookie, { Origin: "http://untrusted.example" });
    assert.equal(response.status, 403);
    response = await post("/api/admin/users", dummy, adminCookie, { "Content-Type": "text/plain" });
    assert.equal(response.status, 415);
    response = await post("/api/admin/users", { ...dummy, role: "admin" }, adminCookie);
    assert.equal(response.status, 422);
    response = await post("/api/admin/users", { ...dummy, full_name: "x".repeat(5000) }, adminCookie);
    assert.equal(response.status, 413);
    response = await post("/api/admin/users", dummy, adminCookie);
    assert.equal(response.status, 201);
    assert.match(response.headers.get("cache-control")!, /no-store/);
    const result = await response.json() as { id: string };
    createdId = result.id;
    assert.deepEqual(Object.keys(result), ["id"]);
    response = await fetch(base + "/api/admin/users", { headers: { Cookie: adminCookie } });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("cache-control")!, /no-store/);
    assert.ok(((await response.json()) as { records: { id: string }[] }).records.some((row) => row.id === createdId));
    response = await post("/api/admin/users", dummy, adminCookie);
    assert.equal(response.status, 409);
    response = await post("/api/user/session", { email: dummy.email, password: "incorrect-password" });
    assert.equal(response.status, 401);
    response = await post("/api/user/session", { email: dummy.email, password: dummy.password });
    assert.equal(response.status, 200);
    const setCookie = response.headers.get("set-cookie")!;
    assert.match(setCookie, /HttpOnly/);
    assert.match(setCookie, /SameSite=strict/i);
    // The smoke server is a production build, so its session must also be Secure.
    assert.match(setCookie, /Secure/);
    const userCookie = setCookie.split(";")[0]!;
    response = await fetch(base + "/api/user/session", { headers: { Cookie: userCookie } });
    assert.deepEqual(await response.json(), { authenticated: true });
    response = await fetch(base + "/members", { headers: { Cookie: userCookie }, redirect: "manual" });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("cache-control")!, /no-store/);
    const cardMarkup = await response.text();
    const accountCode = (await (await firebase()).db.collection("user_accounts").doc(createdId).get()).data()?.account_code;
    assert.match(cardMarkup, /NOURA Privé/);
    assert.ok(cardMarkup.includes(dummy.full_name));
    assert.ok(typeof accountCode === "string" && cardMarkup.includes(accountCode));
    assert.doesNotMatch(cardMarkup, /NRA-DEMO-001|Sample member/);
    response = await fetch(base + "/api/admin/requests", { headers: { Cookie: userCookie } });
    assert.equal(response.status, 401);
    response = await post("/api/admin/users", dummy, userCookie);
    assert.equal(response.status, 401);
    response = await fetch(base + "/api/admin/users", { headers: { Cookie: userCookie } });
    assert.equal(response.status, 401);
    response = await fetch(base + `/api/admin/users/${createdId}`, { method: "PATCH", headers: { Cookie: userCookie, Origin: base, "Content-Type": "application/json" }, body: JSON.stringify({ full_name: "Changed", email: dummy.email, phone: "", version: 1 }) });
    assert.equal(response.status, 401);
    response = await fetch(base + "/api/user/session", { method: "DELETE", headers: { Cookie: userCookie, Origin: "http://untrusted.example" } });
    assert.equal(response.status, 403);
    response = await fetch(base + "/api/user/session", { method: "DELETE", headers: { Cookie: userCookie, Origin: base } });
    assert.equal(response.status, 200);
    const deletedCookie = response.headers.get("set-cookie")!;
    assert.match(deletedCookie, /^noura_user=;/);
    assert.match(deletedCookie, /Secure/);
    assert.match(deletedCookie, /HttpOnly/);
    assert.match(deletedCookie, /SameSite=strict/i);
    assert.ok(/Max-Age=0/.test(deletedCookie) || /Expires=Thu, 01 Jan 1970/.test(deletedCookie));
    response = await fetch(base + "/api/user/session");
    assert.deepEqual(await response.json(), { authenticated: false });
    const change = { full_name: "Edited HTTP User", email: dummy.email, phone: "+91 90000 00000", version: 1 };
    response = await fetch(base + `/api/admin/users/${createdId}`, { method: "PATCH", headers: { Cookie: adminCookie, Origin: "http://untrusted.example", "Content-Type": "application/json" }, body: JSON.stringify(change) });
    assert.equal(response.status, 403);
    response = await fetch(base + `/api/admin/users/${createdId}`, { method: "PATCH", headers: { Cookie: adminCookie, Origin: base, "Content-Type": "application/json" }, body: JSON.stringify(change) });
    assert.equal(response.status, 200);
    assert.equal(((await response.json()) as { record: { id: string; version: number } }).record.id, createdId);
    response = await fetch(base + `/api/admin/users/${createdId}`, { method: "DELETE", headers: { Cookie: adminCookie, Origin: base, "Content-Type": "application/json" }, body: JSON.stringify({ version: 1 }) });
    assert.equal(response.status, 409);
    response = await fetch(base + `/api/admin/users/${createdId}`, { method: "DELETE", headers: { Cookie: adminCookie, Origin: base, "Content-Type": "application/json" }, body: JSON.stringify({ version: 2 }) });
    assert.equal(response.status, 200);
    createdId = undefined;
  } finally {
    if (createdId) {
      const { auth, db } = await firebase();
      await db.collection("user_accounts").doc(createdId).delete();
      await auth.deleteUser(createdId);
    }
  }
});
