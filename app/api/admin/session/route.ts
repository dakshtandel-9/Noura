import { cookies } from "next/headers";
import { sessionCookie, sessionSeconds, signIn } from "@/lib/server/auth";
import { checkOrigin, failure, json, readJson } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const input = await readJson(request, 2048);
    await rateLimit("login", request, 10);
    const session = signIn(input);
    (await cookies()).set(sessionCookie, session, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: sessionSeconds });
    return json({ ok: true });
  } catch (error) { return failure(error); }
}
export async function DELETE(request: Request) {
  try {
    checkOrigin(request);
    (await cookies()).delete(sessionCookie);
    return json({ ok: true });
  } catch (error) { return failure(error); }
}
