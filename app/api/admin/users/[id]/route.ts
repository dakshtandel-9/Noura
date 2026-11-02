import { cookies } from "next/headers";
import { sessionCookie } from "@/lib/server/auth";
import { failure, json, readJson } from "@/lib/server/http";
import { deleteUserAccount, updateUserAccount } from "@/lib/server/user-accounts";

export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  try {
    const input = await readJson(request, 2048);
    const { id } = await context.params;
    const record = await updateUserAccount((await cookies()).get(sessionCookie)?.value, id, input);
    return json({ record });
  } catch (error) { return failure(error); }
}

export async function DELETE(request: Request, context: Context) {
  try {
    const input = await readJson(request, 1024);
    const { id } = await context.params;
    await deleteUserAccount((await cookies()).get(sessionCookie)?.value, id, input);
    return json({ ok: true });
  } catch (error) { return failure(error); }
}
