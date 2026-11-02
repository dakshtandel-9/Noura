import Image from "next/image";
import { Lines } from "@/components/ui/Lines";
import { memberIdentity as copy } from "@/content/home";
import { media } from "@/content/site";
import type { MemberCardAccount } from "@/lib/user-accounts";
import styles from "./MemberIdentity.module.css";

/**
 * 12 — Member identity: an account-specific card preview on a dark botanical ground.
 * The account code is unique, but the card does not convey membership approval.
 */
export function MemberIdentity({ account }: { account: MemberCardAccount }) {
  const { card } = copy;
  const longName = Array.from(account.full_name).length > 36;

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

        <figure className={styles.cardFigure} data-reveal>
          <div className={styles.cardStage}>
            <div className={`${styles.card} ${longName ? styles.cardLongName : ""}`}>
              <div className={styles.cardTop}>
                <Image
                  className={styles.wordmark}
                  src={media.wordmarkTransparent.src}
                  width={media.wordmarkTransparent.width}
                  height={media.wordmarkTransparent.height}
                  alt="NOURA"
                  sizes="200px"
                />
              </div>
              <p className={styles.cardBand}>{card.name}</p>
              <div className={styles.cardBottom}>
                <p className={styles.personLabel}>{card.personLabel}</p>
                <p className={`${styles.cardName} ${longName ? styles.cardNameLong : ""}`}>{account.full_name}</p>
                <div className={styles.cardMeta}>
                  <div>
                    <p className={styles.cardNumberLabel}>{card.numberLabel}</p>
                    <p className={styles.cardNumber}>{account.account_code}</p>
                  </div>
                  <p className={styles.cardFootnote}>{card.footnote}</p>
                </div>
              </div>
            </div>
          </div>
          <figcaption className="visually-hidden">Your account card preview. This does not confirm membership approval.</figcaption>
        </figure>
      </div>
    </section>
  );
}
