import { collectionConfig } from "@/lib/server/firebase";
import { json } from "@/lib/server/http";

export const dynamic = "force-dynamic";
export function GET() {
  try {
    const { timezone } = collectionConfig();
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
    const part = (type: string) => parts.find((p) => p.type === type)?.value;
    return json({ enabled: true, today: `${part("year")}-${part("month")}-${part("day")}` });
  } catch { return json({ enabled: false }); }
}
