import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { getInTouch as copy } from "@/content/home";
import styles from "./GetInTouch.module.css";

/**
 * 02f — Get in touch: its own band after the enquiry form. The eyebrow, heading and intro sit on
 * the left and the four contact cards (email, phone, base, response time) on the right; email
 * and phone are links.
 */
export function GetInTouch() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <div className={styles.inner}>
        <div className={styles.text} data-reveal>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h2 id="contact-title" className={styles.title}>
            <Lines lines={copy.titleLines} />
          </h2>
          <p className={styles.intro}>{copy.intro}</p>
        </div>

        <ul className={styles.details} role="list" data-reveal>
          {copy.details.map((d) => {
            const body = (
              <>
                <Icon name={d.icon} size={20} className={styles.icon} />
                <span>
                  <span className={styles.label}>{d.label}</span>
                  <span className={styles.value}>{d.value}</span>
                </span>
              </>
            );
            return (
              <li key={d.id}>
                {d.href ? (
                  <a className={`${styles.card} ${styles.cardLink}`} href={d.href}>
                    {body}
                  </a>
                ) : (
                  <div className={styles.card}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
