import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SubpagePhoto as Photo } from "@/components/subpages/SubpagePhoto";
import shared from "@/components/subpages/subpage.module.css";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { aboutPage as copy } from "@/content/subpages";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Noura",
  robots: { index: false, follow: false },
};

export default function AboutPage() {
  const { founder, board, philosophy, home, closing, images } = copy;

  return (
    <div className={shared.page}>
      <SiteHeader solid />
      <main id="main" tabIndex={-1}>
        <section className={`${shared.hero} ${shared.heroLight}`} aria-labelledby="inv-title">
          <Photo image={images.hero} sizes="100vw" priority position="70% 50%" />
          <div className={shared.heroCopy}>
            <p className={shared.eyebrow}>{copy.eyebrow}</p>
            <h1 id="inv-title" className={shared.heroTitle}>
              {copy.title}
            </h1>
            <p className={shared.heroLead}>{copy.lead}</p>
            <div className={shared.heroActions}>
              <ButtonLink href="/#experiences" className={shared.darkButton}>
                {copy.cta}
              </ButtonLink>
            </div>
          </div>
        </section>

        <section className={styles.founder} aria-labelledby="inv-founder">
          <div className={styles.founderPortrait}>
            <div className={`${shared.photo} ${styles.portrait}`} role="img" aria-label="Portrait placeholder" />
            <p className={styles.caption}>{founder.portraitCaption}</p>
          </div>
          <div className={styles.founderCopy}>
            <p className={shared.label}>{founder.label}</p>
            <h2 id="inv-founder" className={shared.heading}>
              {founder.heading}
            </h2>
            <p className={styles.name}>{founder.name}</p>
            <p className={styles.role}>{founder.role}</p>
            {founder.paragraphs.map((p) => (
              <p key={p} className={shared.body}>
                {p}
              </p>
            ))}
            <blockquote className={styles.quote}>{founder.quote}</blockquote>
          </div>
          <div className={`${shared.photo} ${styles.founderSide}`}>
            <Photo image={images.stillLife} sizes="(max-width: 1023px) 100vw, 22vw" position="50% 60%" />
          </div>
        </section>

        <section className={styles.board} aria-labelledby="inv-board">
          <p className={shared.label}>{board.label}</p>
          <h2 id="inv-board" className={shared.heading}>
            {board.heading}
          </h2>
          <p className={`${shared.body} ${styles.boardIntro}`}>{board.intro}</p>
          <ul className={styles.members}>
            {board.members.map((m) => (
              <li key={m.n} className={styles.member}>
                <div className={`${shared.photo} ${styles.memberPhoto}`} role="img" aria-label="Portrait placeholder" />
                <p className={styles.memberMeta}>Board member {m.n}</p>
                <p className={styles.memberField}>{m.field}</p>
                <p className={styles.memberBio}>{board.bio}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${shared.photo} ${styles.philosophy}`} aria-label="Our philosophy">
          <Photo image={images.philosophy} sizes="100vw" position="0% 50%" />
          <div className={styles.philosophyInner}>
            <p className={`${shared.label} ${styles.philosophyLabel}`}>{philosophy.label}</p>
            <ul className={styles.pillars}>
              {philosophy.items.map((item) => (
                <li key={item.title} className={styles.pillar}>
                  <h3 className={styles.pillarTitle}>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.home} aria-labelledby="inv-home">
          <div className={`${shared.photo} ${styles.homePhoto}`}>
            <Photo image={images.home} sizes="(max-width: 767px) 100vw, 50vw" />
          </div>
          <div className={styles.homeCopy}>
            <p className={shared.label}>{home.label}</p>
            <h2 id="inv-home" className={shared.heading}>
              {home.heading}
            </h2>
            <p className={shared.body}>{home.text}</p>
            <p className={`${shared.label} ${styles.connect}`}>{home.connectLabel}</p>
            <ul className={styles.details}>
              {home.details.map((d) => (
                <li key={d.id}>
                  <Icon
                    name={d.id === "address" ? "map-pin" : d.id === "phone" ? "phone" : d.id === "email" ? "mail" : "people"}
                    size={18}
                  />
                  <span>{d.id === "address" ? `${d.label} — ${d.value}` : d.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${shared.closing} ${shared.closingLight}`} aria-labelledby="inv-closing">
          <Photo image={images.closing} sizes="100vw" position="50% 55%" />
          <div>
            <h2 id="inv-closing" className={shared.closingTitle}>
              {closing.title.map((line) => (
                <span key={line} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </h2>
            <ButtonLink href="/#enquire" className={shared.darkButton}>
              {closing.cta}
            </ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
