import "server-only";
import { RequestError } from "../requests.ts";

export function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow", ...(status === 429 ? { "Retry-After": "900" } : {}) } });
}
export function failure(error: unknown) {
  return error instanceof RequestError
    ? json({ message: error.message, fields: error.fields }, error.status)
    : json({ message: "The service is temporarily unavailable. Please try again." }, 503);
}
export function checkOrigin(request: Request) {
  const configured = process.env.NOURA_APP_ORIGIN;
  const origin = configured || (process.env.NODE_ENV !== "production" ? new URL(request.url).origin : "");
  if (!origin || request.headers.get("origin") !== origin) throw new RequestError("Request not allowed.", 403);
}
export async function readJson(request: Request, max = 16_384): Promise<unknown> {
  checkOrigin(request);
  if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") throw new RequestError("JSON is required.", 415);
  if (Number(request.headers.get("content-length")) > max) throw new RequestError("The request is too large.", 413);
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError("A request body is required.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > max) { await reader.cancel(); throw new RequestError("The request is too large.", 413); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new RequestError("Invalid JSON."); }
}
