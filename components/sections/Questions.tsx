import { Icon } from "@/components/ui/Icon";
import { questions as copy } from "@/content/home";
import styles from "./Questions.module.css";

/**
 * 14 — Questions: intro and a native disclosure list (keyboard and screen-reader friendly
 * without script). The closing invitation follows as its own section.
 */
export function Questions() {
  return (
    <section className={styles.section} id="questions" aria-labelledby="questions-title">
      <div className={styles.intro} data-reveal>
        <span className={`eyebrow ${styles.eyebrow}`}>{copy.eyebrow}</span>
        <h2 id="questions-title" className={styles.title}>
          {copy.title}
        </h2>
        <p className={styles.text}>{copy.intro}</p>
      </div>

      <div className={styles.faq}>
        {copy.items.map((item) => (
          <details key={item.id} className={styles.item} name="questions">
            <summary className={styles.question}>
              <span>{item.question}</span>
              <Icon name="chevron-down" size={20} className={styles.chevron} />
            </summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        ))}
      </div>

    </section>
  );
}
