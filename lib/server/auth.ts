import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { RequestError } from "../requests.ts";

export const sessionCookie = "noura_admin";
export const sessionSeconds = 8 * 60 * 60;

// One shared admin password (ADMIN_PASSWORD) and a signed, expiring session cookie. The signing
// key includes the password, so changing either env value signs every existing session out.
function credentials() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret || secret.length < 32) throw new RequestError("Admin sign-in is not configured yet.", 503);
  return { password, key: `${secret}:${digest(password).toString("hex")}` };
}
const digest = (value: string) => createHash("sha256").update(value).digest();
const signature = (key: string, expires: number) => createHmac("sha256", key).update(`admin:${expires}`).digest();

export function createSession(now = Date.now()) {
  const expires = now + sessionSeconds * 1000;
  return `${expires}.${signature(credentials().key, expires).toString("base64url")}`;
}

export function authorizeSession(session: string | undefined, now = Date.now()) {
  const { key } = credentials();
  const [expires, signed, ...rest] = session?.split(".") ?? [];
  const expiry = Number(expires);
  const given = Buffer.from(signed ?? "", "base64url");
  const valid = !rest.length && /^\d{13}$/.test(expires ?? "") && expiry > now && given.length === 32 && timingSafeEqual(given, signature(key, expiry));
  if (!valid) throw new RequestError("Please sign in to continue.", 401);
}

export function signIn(input: unknown) {
  const password = input && typeof input === "object" ? (input as Record<string, unknown>).password : undefined;
  if (typeof password !== "string" || !password || password.length > 128) throw new RequestError("Enter the admin password.");
  // Compare fixed-length digests so the check takes the same time whatever was typed.
  if (!timingSafeEqual(digest(password), digest(credentials().password))) throw new RequestError("That password is not correct.", 401);
  return createSession();
}
