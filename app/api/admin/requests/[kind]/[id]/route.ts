import { cookies } from "next/headers";
import { sessionCookie } from "@/lib/server/auth";
import { failure, json, readJson } from "@/lib/server/http";
import { deleteRequest, updateRequest } from "@/lib/server/requests";
import { RequestError, type RequestKind } from "@/lib/requests";

export const runtime = "nodejs";

type Context = { params: Promise<{ kind: string; id: string }> };

async function target(context: Context) {
  const { kind, id } = await context.params;
  if (kind !== "invitation" && kind !== "session") throw new RequestError("Not found.", 404);
  return { kind: kind as RequestKind, id };
}

/** Staff edit: status, private note and corrected contact details. Same-origin JSON only. */
export async function PATCH(request: Request, context: Context) {
  try {
    const input = await readJson(request, 8192);
    const { kind, id } = await target(context);
    const record = await updateRequest((await cookies()).get(sessionCookie)?.value, kind, id, input);
    return json({ record, message: "Changes saved." });
  } catch (error) { return failure(error); }
}

/** Staff deletion of one request, with the version the reviewer last saw. */
export async function DELETE(request: Request, context: Context) {
  try {
    const input = await readJson(request, 1024);
    const { kind, id } = await target(context);
    await deleteRequest((await cookies()).get(sessionCookie)?.value, kind, id, input);
    return json({ ok: true, message: "Request deleted." });
  } catch (error) { return failure(error); }
}
