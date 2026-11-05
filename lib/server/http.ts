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
function configuredOrigin(value: string): string {
  const address = value.trim();
  try {
    // Accept an origin with optional trailing slashes, never a path, credentials,
    // wildcard, query or fragment. Normalize case/default ports using URL.
    if (!/^https?:\/\/[^/?#\\\s]+\/*$/i.test(address)) throw new Error();
    const url = new URL(address);
    if (url.username || url.password || url.hostname.includes("*")) throw new Error();
    return url.origin;
  } catch {
    throw new RequestError("The website address is not configured correctly. Please contact the site owner.", 503);
  }
}
export function checkOrigin(request: Request) {
  const configured = process.env.NOURA_APP_ORIGIN?.trim();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  // Trust deployment configuration, not Host/X-Forwarded-Host from the request.
  // An explicit allowlist takes precedence over the canonical metadata URL.
  const origins = configured ? configured.split(",").map(configuredOrigin)
    : siteUrl ? [configuredOrigin(siteUrl)]
    : process.env.NODE_ENV !== "production" ? [new URL(request.url).origin]
    : [];
  if (!origins.length) throw new RequestError("The website address is not configured yet. Please contact the site owner.", 503);
  const origin = request.headers.get("origin");
  if (!origin || !origins.includes(origin)) throw new RequestError("Request not allowed.", 403);
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
