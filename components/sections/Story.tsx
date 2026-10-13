import Image from "next/image";
import { story as copy } from "@/content/home";
import styles from "./Story.module.css";

/**
 * Editorial question above a landscape and a reflection alongside it.
 */
export function Story() {
  return (
    <section className={styles.section} id="story" aria-labelledby="story-title">
      <div className="wrap">
        <div className={styles.introduction}>
          <div className={styles.heading} data-reveal>
            <span className={`eyebrow ${styles.eyebrow}`}>{copy.eyebrow}</span>
            <h2 id="story-title" className={styles.title}>
              {copy.titleLines.map((line) => (
                <span key={line} className={styles.titleLine}>
                  {line}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div className={styles.storyRow}>
          <div className={styles.media}>
            <div className={styles.frame}>
              <Image
                className={styles.image}
                src={copy.image.src}
                width={copy.image.width}
                height={copy.image.height}
                alt={copy.imageAlt}
                sizes="(max-width: 899px) calc(100vw - 48px), (max-width: 1384px) 58vw, 760px"
              />
              <span className={styles.playMark} aria-hidden="true" />
            </div>
          </div>
          <div className={styles.reflection} data-reveal>
            <p className={styles.body}>
              {copy.lines.map((line) => (
                <span key={line} className={styles.line}>
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
