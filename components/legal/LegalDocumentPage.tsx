import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { legalDocuments, type LegalDocumentKey } from "@/content/legal-documents";
import styles from "./LegalDocumentPage.module.css";

/** The supplied document is still a draft with unresolved identity, contact and date fields. */
export function LegalDocumentPage({ kind }: { kind: LegalDocumentKey }) {
  if (process.env.NODE_ENV === "production") notFound();

  const document = legalDocuments[kind];
  const isPrivacy = kind === "privacy";

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
          <div className={styles.reviewNote} role="note">
            Website-ready draft for review. The business details, dates and final legal wording are still to be confirmed.
          </div>
          <div className={styles.sections}>
            {document.sections.map((section, index) => (
              <section className={styles.section} key={section.title} aria-labelledby={`${kind}-section-${index + 1}`}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.sectionContent}>
                  <h2 id={`${kind}-section-${index + 1}`}>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {"contact" in section && section.contact && (
                    <address className={styles.address}>
                      <span>[Noura Legal Entity Name]</span>
                      <span>[Goa, India – Full Address]</span>
                      <span>Email: [{isPrivacy ? "privacy@noura-domain.com" : "hello@noura-domain.com"}]</span>
                      <span>Phone: [Phone Number]</span>
                    </address>
                  )}
                  {"relatedLink" in section && section.relatedLink && (
                    <Link className={styles.relatedLink} href={section.relatedLink.href}>{section.relatedLink.label} <span aria-hidden="true">↗</span></Link>
                  )}
                </div>
              </section>
            ))}
          </div>
          <p className={styles.date}>{document.dateLabel}: {document.datePlaceholder}</p>
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
