import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { legalDocuments, type LegalDocumentKey } from "@/content/legal-documents";
import styles from "./LegalDocumentPage.module.css";

export function LegalDocumentPage({ kind }: { kind: LegalDocumentKey }) {
  const document = legalDocuments[kind];

  return (
    <>
      <SiteHeader solid />
      <main id="main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="legal-title">
          <div className={`wrap ${styles.heroInner}`}>
            <span className={`eyebrow ${styles.eyebrow}`}>{document.eyebrow}</span>
            <h1 id="legal-title">{document.title}</h1>
            <p className={styles.intro}>{document.introduction}</p>
          </div>
        </section>

        <div className={styles.body}>
          <div className={styles.sections}>
            {document.sections.map((section, index) => (
              <section className={styles.section} key={section.title} aria-labelledby={`${kind}-section-${index + 1}`}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.sectionContent}>
                  <h2 id={`${kind}-section-${index + 1}`}>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {"contact" in section && section.contact && (
                    <address className={styles.address}>
                      <span>Noura</span>
                      <span>Porvorim, North Goa, Goa - 403501</span>
                      <span>Email: hello@nourawellbing.com</span>
                      <span>Phone: +91 80088 85464</span>
                    </address>
                  )}
                  {"relatedLink" in section && section.relatedLink && (
                    <Link className={styles.relatedLink} href={section.relatedLink.href}>{section.relatedLink.label} <span aria-hidden="true">↗</span></Link>
                  )}
                </div>
              </section>
            ))}
          </div>
          <p className={styles.date}>{document.dateLabel}: {document.date}</p>
        </div>

        <aside className={styles.contact} aria-label="Contact Noura">
          <div className={`wrap ${styles.contactInner}`}>
            <h2>{document.question}</h2>
            <p>We&apos;re here to help. Please get in touch.</p>
            <Link href="/#enquire">Contact Noura <span aria-hidden="true">↗</span></Link>
          </div>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
