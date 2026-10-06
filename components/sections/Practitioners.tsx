"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { practitioners as copy } from "@/content/home";
import styles from "./Practitioners.module.css";

/** Portrait disclosures share one open profile beneath the row. */
export function Practitioners() {
  const [openId, setOpenId] = useState<string | null>(null);

  if (copy.profiles.length === 0) return null;

  return (
    <section className={styles.section} id="experts" aria-labelledby="experts-title">
      <div className="wrap">
        <header className={styles.header} data-reveal>
          <span className="eyebrow">{copy.eyebrow}</span>
          <h2 id="experts-title" className={styles.title}>
            {copy.title}
          </h2>
        </header>

        <ul className={styles.grid} role="list">
          {copy.profiles.map((profile) => {
            const isOpen = openId === profile.id;
            return (
              <li key={profile.id} className={styles.item} data-reveal>
                <button
                  id={`practitioner-${profile.id}-toggle`}
                  type="button"
                  className={styles.toggle}
                  aria-expanded={isOpen}
                  aria-controls={`practitioner-${profile.id}-panel`}
                  onClick={() => setOpenId(isOpen ? null : profile.id)}
                >
                  <span className={styles.name}>{profile.name}</span>
                  <span className={styles.frame}>
                    {profile.image && (
                      <Image
                        className={styles.image}
                        src={profile.image.src}
                        width={profile.image.width}
                        height={profile.image.height}
                        alt=""
                        sizes="(max-width: 767px) 70vw, (max-width: 1199px) 30vw, 240px"
                      />
                    )}
                  </span>
                  <span className={styles.mark}>
                    <Icon name="chevron-down" size={22} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {copy.profiles.map((profile) => (
          <div
            key={profile.id}
            id={`practitioner-${profile.id}-panel`}
            role="region"
            aria-labelledby={`practitioner-${profile.id}-toggle`}
            className={styles.detail}
            hidden={openId !== profile.id}
          >
            <div className={styles.portrait}>
              {profile.image && (
                <Image
                  className={styles.image}
                  src={profile.image.src}
                  width={profile.image.width}
                  height={profile.image.height}
                  alt={`${profile.name} — illustrative portrait`}
                  sizes="(max-width: 767px) calc(100vw - 96px), 400px"
                />
              )}
            </div>
            <div className={styles.body}>
              <span className={`eyebrow ${styles.area}`}>{profile.area}</span>
              <h3 className={styles.detailName}>{profile.name}</h3>
              <p className={styles.role}>{profile.role}</p>
              <p className={styles.bio}>{profile.bio}</p>
              <p className={styles.leads}>
                {copy.leadsLabel} <span aria-hidden="true">&middot;</span> {profile.leads}
              </p>
            </div>
          </div>
        ))}

        <p className={styles.disclaimer}>{copy.disclaimer}</p>
      </div>
    </section>
  );
}
