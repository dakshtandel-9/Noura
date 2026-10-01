import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { sharedExperience as copy } from "@/content/home";
import styles from "./SharedExperience.module.css";

/**
 * 08 — Connect / Private Group Sessions: group image on the left; heading, a short paragraph
 * and three quiet principles on the right. Invitation-led, with no capacity or availability claims.
 */
export function SharedExperience() {
  return (
    <section className={styles.section} id="connection" aria-labelledby="connection-title">
      <div className={styles.media}>
        {copy.image && (
          <Image
            className={styles.image}
            src={copy.image.src}
            width={copy.image.width}
            height={copy.image.height}
            alt="Conceptual scene of four people sharing a conversation at sunset beside the coast"
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        )}
      </div>

      <div className={styles.panel}>
        <div className={styles.inner} data-reveal>
          <span className={`eyebrow ${styles.eyebrow}`}>{copy.eyebrow}</span>
          <h2 id="connection-title" className={styles.title}>
            <Lines lines={copy.titleLines} />
          </h2>
          <p className={styles.intro}>{copy.intro}</p>

          <ul className={styles.features} role="list">
            {copy.features.map((feature) => (
              <li key={feature.id} className={styles.feature}>
                <Icon name={feature.icon} size={36} className={styles.icon} />
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
