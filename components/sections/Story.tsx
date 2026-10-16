import { story as copy } from "@/content/home";
import { StoryFilm } from "./StoryFilm";
import styles from "./Story.module.css";

/**
 * Editorial question above the story film and a reflection alongside it.
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
              <StoryFilm
                src={copy.film.src}
                poster={copy.film.poster}
                image={copy.image}
                labels={{ play: copy.film.play, label: copy.film.label }}
              />
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
