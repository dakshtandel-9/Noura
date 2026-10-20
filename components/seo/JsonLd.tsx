import { serializeJsonLd } from "@/lib/seo";

/** Structured data for search engines. A plain script tag, so it renders nothing on the page. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
