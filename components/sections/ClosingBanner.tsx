import Image from "next/image";
import { closingBanner as copy } from "@/content/home";
import styles from "./ClosingBanner.module.css";

/**
 * Closing banner: a wide picture with the closing line, the place and month, and the invitation
 * action over its right side. Grey block until an image is set in content/home.ts; a scrim keeps
 * the white text readable over any picture.
 */
export function ClosingBanner() {
  return (
    <section className={styles.section} id="closing" aria-labelledby="closing-title">
      <div className={styles.banner}>
        {copy.image && (
          <Image
            className={styles.image}
            src={copy.image.src}
            width={copy.image.width}
            height={copy.image.height}
            alt=""
            sizes="100vw"
            quality={80}
          />
        )}
        <span className={styles.scrim} aria-hidden="true" />

        <div className={styles.copy} data-reveal>
          <h2 id="closing-title" className={styles.title}>
            {copy.title}
          </h2>
          <p className={styles.meta}>
            {copy.meta.map((line) => (
              <span key={line} className={styles.metaLine}>
                {line}
              </span>
            ))}
          </p>
          <a className={styles.cta} href={copy.ctaHref}>
            {copy.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
