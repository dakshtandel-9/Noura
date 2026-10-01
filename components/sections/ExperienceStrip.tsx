import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { ways } from "@/content/home";
import { programmes } from "@/content/programmes";
import { JourneyLandscape } from "./JourneyLandscape";
import styles from "./ExperienceStrip.module.css";

/**
 * 01b — A quiet overview band directly under the arrival: heading, a short line and a link
 * on the left, the four experiences as icon-led anchors to their chapters on the right,
 * over a misty landscape. Anchors only, no new pages.
 */
export function ExperienceStrip() {
  return (
    <section className={styles.strip} id="ways" aria-labelledby="ways-title">
      <JourneyLandscape className={styles.landscape} />

      <div className={`wrap ${styles.inner}`} data-reveal>
        <div className={styles.intro}>
          <span className="eyebrow">{ways.eyebrow}</span>
          <h2 id="ways-title" className={styles.title}>
            <Lines lines={ways.titleLines} />
          </h2>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.text}>{ways.intro}</p>
          <a className={styles.link} href="#experiences">
            <span>{ways.link}</span>
            <Icon name="arrow-right" size={16} />
          </a>
        </div>

        <ul className={styles.list} role="list">
          {programmes.map((p) => (
            <li key={p.id} className={styles.item}>
              <a className={styles.way} href={`#${p.id}`}>
                <Icon name={p.icon} size={40} className={styles.wayIcon} />
                <span className={styles.verb}>{p.verb}</span>
                <span className={styles.strapline}>
                  {p.strapline[0]}
                  <br />
                  {p.strapline[1]}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
