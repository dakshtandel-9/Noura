import Image from "next/image";
import { story as copy } from "@/content/home";
import styles from "./Story.module.css";

/**
 * Editorial question and reflection above a panoramic landscape.
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

        <div className={styles.media}>
          <div className={styles.frame}>
            <Image
              className={styles.image}
              src={copy.image.src}
              width={copy.image.width}
              height={copy.image.height}
              alt={copy.imageAlt}
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1384px) 90vw, 1240px"
            />
            <div className={styles.caption}>
              <button className={styles.playButton} aria-label="Play our story" />
              <span className={styles.captionText}>{copy.caption}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
