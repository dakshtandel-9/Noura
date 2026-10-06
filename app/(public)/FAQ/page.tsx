import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SubpagePhoto as Photo } from "@/components/subpages/SubpagePhoto";
import shared from "@/components/subpages/subpage.module.css";
import { ButtonLink } from "@/components/ui/Button";
import { faqPage as copy } from "@/content/subpages";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "Frequently asked questions — NOURA",
  robots: { index: false, follow: false },
};

type Item = { readonly q: string; readonly a: readonly string[] };

/** Native <details> keeps the accordion working without scripts and fully keyboard accessible. */
function Questions({ items, start }: { items: readonly Item[]; start: number }) {
  return (
    <ol className={styles.list}>
      {items.map((item, i) => (
        <li key={item.q}>
          <details className={styles.item}>
            <summary className={styles.summary}>
              <span className={styles.num}>{String(start + i).padStart(2, "0")}</span>
              <span className={styles.question}>{item.q}</span>
              <span className={styles.plus} aria-hidden="true" />
            </summary>
            <div className={styles.answer}>
              {item.a.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}

export default function FaqPage() {
  const [before, experience, invitation] = copy.groups;

  return (
    <div className={shared.page}>
      <SiteHeader solid />
      <main id="main" tabIndex={-1}>
        <section className={`${shared.hero} ${shared.heroLight}`} aria-labelledby="faq-title">
          <Photo image={copy.images.hero} sizes="100vw" priority position="70% 50%" />
          <div className={shared.heroCopy}>
            <p className={shared.eyebrow}>{copy.eyebrow}</p>
            <h1 id="faq-title" className={shared.heroTitle}>
              {copy.title}
            </h1>
            <p className={shared.heroLeadSerif}>{copy.lead}</p>
            <p className={shared.heroLead}>{copy.intro}</p>
            <div className={shared.heroActions}>
              <ButtonLink href="/about" icon={null} className={shared.darkButton}>
                Explore the journey
              </ButtonLink>
              <ButtonLink href="/#enquire" variant="secondary" icon={null}>
                Enquire
              </ButtonLink>
            </div>
          </div>
        </section>

        <section className={`${styles.block} ${styles.blockWithSide}`} aria-label="Questions 1 to 4">
          <p className={styles.side}>
            {copy.side.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <Questions items={before.items} start={1} />
        </section>

        <div className={`${shared.photo} ${styles.band}`}>
          <Photo image={copy.images.band} sizes="100vw" position="50% 60%" />
          <p className={styles.quote}>
            {copy.quote.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>

        <section className={`${styles.block} ${styles.blockImageLeft}`} aria-label="Questions 5 to 8">
          <div className={`${shared.photo} ${styles.sidePhoto}`}>
            <Photo image={copy.images.food} sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
          <Questions items={experience.items} start={5} />
        </section>

        <section className={`${styles.block} ${styles.blockImageRight}`} aria-label="Questions 9 and 10">
          <Questions items={invitation.items} start={9} />
          <div className={`${shared.photo} ${styles.sidePhoto}`}>
            <Photo image={copy.images.terrace} sizes="(max-width: 900px) 100vw, 40vw" position="60% 50%" />
          </div>
        </section>

        <section className={`${shared.closing} ${shared.closingLight}`} aria-labelledby="faq-closing">
          <Photo image={copy.images.closing} sizes="100vw" position="50% 70%" />
          <div>
            <h2 id="faq-closing" className={shared.closingTitle}>
              {copy.closing.title}
            </h2>
            <p className={shared.closingText}>{copy.closing.lines.join(" ")}</p>
            <ButtonLink href="/#enquire" icon="arrow-right" className={shared.darkButton}>
              {copy.closing.cta}
            </ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
