import type { Metadata } from "next";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { GetInTouch } from "@/components/sections/GetInTouch";
import { seoPages } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(seoPages.contact);

/** The contact details band on its own page; the enquiry form lives on the home page. */
export default function ContactPage() {
  return (
    <>
      <SiteHeader solid />
      <main id="main" tabIndex={-1}>
        <GetInTouch headingLevel="h1" />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
