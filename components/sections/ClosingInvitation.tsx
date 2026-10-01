import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { questions } from "@/content/home";
import { JourneyLandscape } from "./JourneyLandscape";
import styles from "./ClosingInvitation.module.css";

/**
 * Close — the page's emotional ending, full width on the dark ground: one invitation button
 * and one quieter appointment link over a faint drawn landscape. The last section before the footer.
 */
export function ClosingInvitation() {
  const copy = questions.closing;

  return (
    <section className={styles.section} id="closing" aria-labelledby="closing-title">
      <JourneyLandscape className={styles.landscape} idPrefix="closing" />

      <div className={`wrap ${styles.inner}`} data-reveal>
        <span className={`eyebrow ${styles.eyebrow}`}>{copy.eyebrow}</span>
        <h2 id="closing-title" className={styles.title}>
          <Lines lines={copy.titleLines} />
        </h2>
        <div className={styles.actions}>
          <a className={styles.primary} href="#invitation">
            <span>{copy.primary}</span>
            <Icon name="arrow-right" size={18} />
          </a>
          <a className={styles.secondary} href="#private-session">
            <span>{copy.secondary}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
