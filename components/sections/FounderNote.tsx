import Image from "next/image";
import { founderNote as copy } from "@/content/home";
import styles from "./FounderNote.module.css";

/**
 * 01a2 — Founder note: a short letter on an picture (left) beside an ivory panel (right).
 * Stacks text-first on small screens.
 */
export function FounderNote() {
  return (
    <section className={styles.section} id="founder" aria-labelledby="founder-title">
      <div className={styles.panel}>
        <div className={styles.inner} data-reveal>
          <h2 id="founder-title" className={`eyebrow ${styles.eyebrow}`}>
            {copy.eyebrow}
          </h2>
          {copy.paragraphs.map((lines) => (
            <p key={lines[0]} className={styles.text}>
              {lines.map((line) => (
                <span key={line} className={styles.line}>
                  {line}
                </span>
              ))}
            </p>
          ))}
          <p className={`${styles.text} ${styles.question}`}>{copy.question}</p>
          <p className={styles.text}>{copy.closing}</p>
          <p className={styles.signature}>{copy.signature}</p>
        </div>
      </div>

      <div className={styles.media}>
        <Image
          className={styles.image}
          src={copy.image.src}
          width={copy.image.width}
          height={copy.image.height}
          alt={copy.imageAlt}
          sizes="(max-width: 1023px) 100vw, 40vw"
        />
      </div>
    </section>
  );
}
