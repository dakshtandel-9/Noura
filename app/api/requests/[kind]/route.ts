import { collectionConfig } from "@/lib/server/firebase";
import { failure, json, readJson } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rate-limit";
import { saveRequest } from "@/lib/server/requests";
import { receivedMessage, RequestError } from "@/lib/requests";

export const runtime = "nodejs";
export async function POST(request: Request, context: { params: Promise<{ kind: string }> }) {
  try {
    const { kind } = await context.params;
    if (kind !== "invitation" && kind !== "session") throw new RequestError("Not found.", 404);
    const input = await readJson(request);
    collectionConfig();
    await rateLimit("requests", request, 10);
    const created = await saveRequest(kind, input);
    return json({ message: receivedMessage }, created ? 201 : 200);
  } catch (error) { return failure(error); }
}
