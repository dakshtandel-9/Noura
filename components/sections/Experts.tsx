import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { experts as copy } from "@/content/home";
import styles from "./Experts.module.css";

/**
 * 08b — Experts: three equal editorial portraits, each with name, role and any verified
 * credential set on the ivory ground beneath it. "View profile" is a native disclosure, so the
 * introduction opens in place with the keyboard or without scripts and is always in the DOM.
 */
export function Experts() {
  if (copy.profiles.length === 0) return null;

  return (
    <section className={styles.section} id="experts" aria-labelledby="experts-title">
      <div className="wrap">
        <div className={styles.header} data-reveal>
          <span className={`eyebrow ${styles.eyebrow}`}>{copy.eyebrow}</span>
          <h2 id="experts-title" className={styles.title}>
            {copy.title}
          </h2>
        </div>

        <ul className={styles.grid} role="list">
          {copy.profiles.map((profile) => (
            <li key={profile.id} className={styles.item} data-reveal>
              <article className={styles.card} aria-labelledby={`${profile.id}-name`}>
                <div className={styles.frame}>
                  <Image
                    className={styles.image}
                    src={profile.portrait.src}
                    width={profile.portrait.width}
                    height={profile.portrait.height}
                    alt={profile.portrait.alt}
                    sizes="(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 400px"
                    quality={80}
                    style={profile.portrait.position ? { objectPosition: profile.portrait.position } : undefined}
                  />
                </div>

                <h3 id={`${profile.id}-name`} className={styles.name}>
                  {profile.name}
                </h3>
                <p className={styles.role}>{profile.role}</p>
                {profile.credential && <p className={styles.credential}>{profile.credential}</p>}

                <details className={styles.profile}>
                  <summary className={styles.toggle}>
                    <span>{copy.viewProfile}</span>
                    <span className="visually-hidden"> — {profile.name}</span>
                    <Icon name="arrow-right" size={16} />
                  </summary>
                  <p className={styles.bio}>{profile.bio}</p>
                </details>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
