import { cookies } from "next/headers";
import { authorizeSession, sessionCookie } from "@/lib/server/auth";
import { createUserAccount, listUserAccounts } from "@/lib/server/user-accounts";
import { failure, json, readJson } from "@/lib/server/http";

export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    const session = (await cookies()).get(sessionCookie)?.value;
    const cursor = new URL(request.url).searchParams.get("cursor");
    return json(await listUserAccounts(session, cursor));
  } catch (error) { return failure(error); }
}
export async function POST(request: Request) {
  try {
    const session = (await cookies()).get(sessionCookie)?.value;
    authorizeSession(session);
    const input = await readJson(request, 4096);
    return json(await createUserAccount(session, input), 201);
  } catch (error) { return failure(error); }
}
