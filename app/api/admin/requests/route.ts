import { cookies } from "next/headers";
import { sessionCookie } from "@/lib/server/auth";
import { failure, json } from "@/lib/server/http";
import { listRequests } from "@/lib/server/requests";
import { RequestError } from "@/lib/requests";

export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const kind = params.get("kind") ?? "invitation";
    if (kind !== "invitation" && kind !== "session") throw new RequestError("Invalid request type.");
    return json(await listRequests((await cookies()).get(sessionCookie)?.value, kind, params.get("cursor") ?? undefined));
  } catch (error) { return failure(error); }
}
