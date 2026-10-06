import { test } from "node:test";
import assert from "node:assert/strict";
import { authorizeSession, createSession, sessionSeconds, signIn } from "../../lib/server/auth.ts";

process.env.ADMIN_PASSWORD = "correct horse";
process.env.ADMIN_SESSION_SECRET = "x".repeat(64);
const status = (fn: () => unknown) => { try { fn(); return 200; } catch (error) { return (error as { status: number }).status; } };

test("the right password returns a session that authorizes", () => {
  const session = signIn({ password: "correct horse" });
  assert.equal(status(() => authorizeSession(session)), 200);
});

test("wrong, missing or oversized passwords are rejected", () => {
  assert.equal(status(() => signIn({ password: "123456789" })), 401);
  assert.equal(status(() => signIn({})), 400);
  assert.equal(status(() => signIn({ password: "a".repeat(129) })), 400);
  assert.equal(status(() => signIn(null)), 400);
});

test("missing, forged, truncated and expired sessions are refused", () => {
  const now = Date.now();
  const session = createSession(now);
  const [expires, signature = ""] = session.split(".");
  for (const bad of [undefined, "", "garbage", `${expires}.`, `${expires}.${signature.slice(1)}`, `${Number(expires) + 1}.${signature}`, `${session}.extra`]) {
    assert.equal(status(() => authorizeSession(bad, now)), 401, String(bad));
  }
  assert.equal(status(() => authorizeSession(session, now + sessionSeconds * 1000)), 401);
});

test("changing the password signs existing sessions out", () => {
  const session = createSession();
  process.env.ADMIN_PASSWORD = "a new passphrase";
  assert.equal(status(() => authorizeSession(session)), 401);
  process.env.ADMIN_PASSWORD = "correct horse";
});

test("an unconfigured server refuses instead of allowing access", () => {
  delete process.env.ADMIN_SESSION_SECRET;
  assert.equal(status(() => authorizeSession("anything")), 503);
  assert.equal(status(() => signIn({ password: "correct horse" })), 503);
  process.env.ADMIN_SESSION_SECRET = "x".repeat(64);
});
