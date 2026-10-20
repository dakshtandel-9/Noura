import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/seo";

/** sitemap.xml: the public pages listed in content/seo.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries();
}
