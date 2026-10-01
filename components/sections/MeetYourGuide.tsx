import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { guide } from "@/content/home";
import styles from "./MeetYourGuide.module.css";

/** One real, approved practitioner profile between the shared experience and invitation. */
export function MeetYourGuide() {
  const profile = guide.profile;
  if (!profile) return null;

  return (
    <section className={styles.section} id="guide" aria-labelledby="guide-title">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.portrait}>
          <Image
            className={styles.image}
            src={profile.portrait.src}
            width={profile.portrait.width}
            height={profile.portrait.height}
            alt={profile.portrait.alt}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 45vw, 42vw"
          />
        </div>

        <div className={styles.copy} data-reveal>
          <span className={`eyebrow ${styles.eyebrow}`}>{guide.eyebrow}</span>
          <h2 className={styles.title} id="guide-title">
            <Lines lines={guide.titleLines} />
          </h2>

          <div className={styles.rule} aria-hidden="true" />
          <h3 className={styles.name}>{profile.name}</h3>
          <p className={styles.role}>{profile.role}</p>
          <p className={styles.bio}>{profile.bio}</p>

          {profile.practices && profile.practices.length > 0 && (
            <p className={styles.practices}>{profile.practices.join(" · ")}</p>
          )}

          {profile.link && (
            <a className={styles.link} href={profile.link.href}>
              <span>{profile.link.label}</span>
              <Icon name="arrow-right" size={18} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
