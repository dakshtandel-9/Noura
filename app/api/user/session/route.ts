import { cookies } from "next/headers";
import { authorizeUser, signInUser, userSessionCookie, userSessionSeconds } from "@/lib/server/user-accounts";
import { checkOrigin, failure, json, readJson } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rate-limit";
import { RequestError } from "@/lib/requests";

export const runtime = "nodejs";
export async function GET() {
  try {
    await authorizeUser((await cookies()).get(userSessionCookie)?.value);
    return json({ authenticated: true });
  } catch (error) {
    if (error instanceof RequestError && error.status === 401) return json({ authenticated: false });
    return failure(error);
  }
}
export async function POST(request: Request) {
  try {
    const input = await readJson(request, 2048);
    await rateLimit("user-login", request, 10);
    const session = await signInUser(input);
    (await cookies()).set(userSessionCookie, session, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: userSessionSeconds });
    return json({ ok: true });
  } catch (error) { return failure(error); }
}
export async function DELETE(request: Request) {
  try {
    checkOrigin(request);
    // Match the original cookie attributes, including Secure, when expiring it.
    (await cookies()).set(userSessionCookie, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
    return json({ ok: true });
  } catch (error) { return failure(error); }
}
