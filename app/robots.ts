import type { MetadataRoute } from "next";
import { indexable, robotsConfig } from "@/lib/seo";

/** robots.txt: blocks everything until NEXT_PUBLIC_SITE_INDEXABLE is "true" at launch. */
export default function robots(): MetadataRoute.Robots {
  return robotsConfig(indexable);
}
