import "server-only";
import { createHmac } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import { firebase } from "./firebase.ts";
import { RequestError } from "../requests.ts";

// Shared, atomic limits across server instances. Raw addresses are never stored.
export async function rateLimit(scope: string, request: Request, max: number) {
  const secret = process.env.NOURA_RATE_LIMIT_SECRET;
  if (!secret || secret.length < 32) throw new RequestError("The service is not configured yet.", 503);
  // Only configure a header overwritten by the trusted ingress. Otherwise use one global bucket.
  const header = process.env.NOURA_TRUSTED_IP_HEADER;
  const identity = (header ? request.headers.get(header) : null)?.slice(0, 256) || "shared";
  const id = createHmac("sha256", secret).update(`${scope}:${identity}`).digest("hex");
  const { db } = firebase();
  const ref = db.collection("rate_limits").doc(id);
  const now = Date.now();
  await db.runTransaction(async (tx) => {
    const old = (await tx.get(ref)).data();
    const active = old && old.expires_at.toMillis() > now;
    if (active && old.count >= max) throw new RequestError("Too many attempts. Please try again in 15 minutes.", 429);
    tx.set(ref, { count: active ? old.count + 1 : 1, expires_at: active ? old.expires_at : Timestamp.fromMillis(now + 15 * 60_000) });
  });
}
