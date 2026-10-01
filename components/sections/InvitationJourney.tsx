import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { invitationJourney as copy } from "@/content/home";
import styles from "./InvitationJourney.module.css";

/**
 * 11 — Invitation journey: the four steps from interest to invitation, with a decorative image
 * fading in from the right. A request is reviewed by the team; nothing here is automatic.
 */
export function InvitationJourney() {
  return (
    <section className={styles.section} id="journey" aria-labelledby="journey-title">
      <div className={styles.media} aria-hidden="true">
        {copy.image && (
          <Image
            className={styles.image}
            src={copy.image.src}
            width={copy.image.width}
            height={copy.image.height}
            alt=""
            sizes="(max-width: 1023px) 100vw, 40vw"
          />
        )}
      </div>

      <div className={styles.inner} data-reveal>
        <span className={`eyebrow ${styles.eyebrow}`}>{copy.eyebrow}</span>
        <h2 id="journey-title" className={styles.title}>
          <Lines lines={copy.titleLines} />
        </h2>

        <ol className={styles.steps}>
          {copy.steps.map((step, i) => (
            <li key={step.id} className={styles.step}>
              <span className={styles.head} aria-hidden="true">
                <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.rule} />
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>

        <a className={styles.link} href="#invitation">
          <span>{copy.link}</span>
          <Icon name="arrow-right" size={18} />
        </a>
      </div>
    </section>
  );
}
