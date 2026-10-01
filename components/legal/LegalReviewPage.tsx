import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { legalReviews, type LegalReviewKey } from "@/content/legal";
import { media } from "@/content/site";
import styles from "./LegalReviewPage.module.css";

export function LegalReviewPage({ kind }: { kind: LegalReviewKey }) {
  // Draft outlines must never be mistaken for operative notices in a production build.
  if (process.env.NODE_ENV === "production") notFound();

  const document = legalReviews[kind];

  return (
    <>
      <header className={styles.header}>
        <div className={`wrap ${styles.headerInner}`}>
          <Link href="/" aria-label="NOURA home">
            <Image src={media.wordmark.src} width={media.wordmark.width} height={media.wordmark.height} alt="NOURA" className={styles.logo} />
          </Link>
          <Link href="/#footer" className={styles.back}>Back to the website <span aria-hidden="true">↗</span></Link>
        </div>
      </header>
      <main id="main" className={styles.main} tabIndex={-1}>
        <div className="wrap">
          <span className="eyebrow">For owner review</span>
          <h1>{document.title}</h1>
          <p className={styles.intro}>{document.introduction}</p>
          <div className={styles.notice} role="note">
            Final text needs the owner’s approved business, service and data-handling details. This review page is available only in development.
          </div>
          <div className={styles.sections}>
            {document.sections.map((section, index) => (
              <section key={section.title} className={styles.section}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.detail}</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
