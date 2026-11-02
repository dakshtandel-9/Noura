import Image from "next/image";
import { Lines } from "@/components/ui/Lines";
import { memberIdentity as copy } from "@/content/home";
import { media } from "@/content/site";
import styles from "./MemberIdentity.module.css";

/**
 * 12 — Member identity: illustrative invitation details on a dark botanical ground. The sample
 * shows the demonstration code only — no real member, working QR or download (docs/design.md §8).
 */
export function MemberIdentity() {
  const { card } = copy;

  return (
    <section className={styles.section} id="member" aria-labelledby="member-title">
      <div className={styles.media} aria-hidden="true">
        {copy.image && (
          <>
            <Image
              className={styles.image}
              src={copy.image.src}
              width={copy.image.width}
              height={copy.image.height}
              alt=""
              sizes="100vw"
            />
            <span className={styles.scrim} />
          </>
        )}
      </div>

      <div className={styles.inner}>
        <div className={styles.intro} data-reveal>
          <span className={`eyebrow ${styles.eyebrow}`}>{copy.eyebrow}</span>
          <h2 id="member-title" className={styles.title}>
            <Lines lines={copy.titleLines} />
          </h2>
          <p className={styles.text}>{copy.intro}</p>
        </div>

        {/* An illustration, not a real record: the sample is announced, then read as plain text. */}
        <figure className={styles.cardFigure} data-reveal>
          <div className={styles.card}>
            <Image
              className={styles.wordmark}
              src={media.wordmarkTransparent.src}
              width={media.wordmarkTransparent.width}
              height={media.wordmarkTransparent.height}
              alt="NOURA"
              sizes="220px"
            />
            <p className={styles.cardLabel}>{card.label}</p>

            <div className={styles.cardBody}>
              <span className={styles.cardRule} aria-hidden="true" />
              <p className={styles.cardName}>
                <span className="visually-hidden">{card.nameLabel}: </span>
                {card.name}
              </p>
              <p className={styles.cardNumberLabel} aria-hidden="true">
                {card.numberLabel}
              </p>
              <p className={styles.cardNumber}>
                <span className="visually-hidden">{card.numberLabel}: </span>
                {card.number}
              </p>
            </div>

            <p className={styles.cardFootnote}>{card.footnote}</p>
          </div>
          <figcaption className="visually-hidden">Sample invitation identity. Not a real member record.</figcaption>
        </figure>
      </div>
    </section>
  );
}
