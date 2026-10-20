import type { Metadata, MetadataRoute } from "next";
import { getInTouch } from "../content/home.ts";
import { organizationAddress, seoPages, shareImage, type SeoPage } from "../content/seo.ts";
import { media, site } from "../content/site.ts";

/** Public origin for canonical, Open Graph, sitemap and robots URLs, without a trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

// Staging and review builds stay out of search results until launch is approved (NFR-11).
export const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

/** Paths crawlers never need: the private admin and the request API. */
const privatePaths = ["/admin", "/api/"];

/** Open Graph fields every page shares; pages add their own title, description and URL. */
const openGraphBase = { type: "website" as const, siteName: site.name, locale: "en_IN", images: [shareImage] };

/** Site-wide defaults for the root layout. No canonical here, so a page without one never points at "/". */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: site.name,
  title: seoPages.home.title,
  description: seoPages.home.description,
  robots: indexable
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
      }
    : { index: false, follow: false },
  openGraph: { ...openGraphBase, title: seoPages.home.title, description: seoPages.home.description },
  twitter: { card: "summary_large_image", title: seoPages.home.title, description: seoPages.home.description, images: [shareImage.url] },
};

/**
 * Title, description, canonical URL and link-preview tags for one public page. Robots stay
 * inherited from the root layout, so the whole site follows NEXT_PUBLIC_SITE_INDEXABLE.
 * Next.js replaces (does not merge) `openGraph` per page, so the shared fields are repeated here.
 */
export function pageMetadata({ path, title, description }: SeoPage): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphBase, url: path, title, description },
    twitter: { card: "summary_large_image", title, description, images: [shareImage.url] },
  };
}

export function robotsConfig(allowIndexing: boolean): MetadataRoute.Robots {
  if (!allowIndexing) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: privatePaths },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  return Object.values(seoPages).map(({ path }) => ({ url: path === "/" ? siteUrl : `${siteUrl}${path}` }));
}

type JsonLd = Record<string, unknown>;

/** `<` is escaped so no copy can close the script tag early (Next.js JSON-LD guide). */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Organization and website for the home page, using the contact details shown on /contact. */
export function organizationJsonLd(): JsonLd {
  const detail = (id: string) => getInTouch.details.find((item) => item.id === id)?.value;
  const organizationId = `${siteUrl}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: `${siteUrl}/`,
        logo: `${siteUrl}${media.logo.src}`,
        slogan: site.tagline,
        description: site.description,
        email: detail("email"),
        telephone: detail("phone"),
        address: { "@type": "PostalAddress", ...organizationAddress },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

type FaqGroup = { readonly items: readonly { readonly q: string; readonly a: readonly string[] }[] };

/** FAQPage markup built from the same question groups the FAQ page renders. */
export function faqJsonLd(groups: readonly FaqGroup[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((group) => group.items).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
    })),
  };
}
