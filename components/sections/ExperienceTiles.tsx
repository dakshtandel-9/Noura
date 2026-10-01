import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { experienceTiles, experienceTilesCopy } from "@/content/home";
import styles from "./ExperienceTiles.module.css";

/** Full-bleed row of image tiles, one anchor each. Grey placeholder until an image is set. */
export function ExperienceTiles() {
  return (
    <section className={styles.section} id="experiences" aria-labelledby="experiences-title">
      <h2 id="experiences-title" className="visually-hidden">
        {experienceTilesCopy.heading}
      </h2>
      <ul className={styles.grid} role="list">
        {experienceTiles.map((tile) => (
          <li key={tile.id} className={styles.item} data-reveal>
            <a className={styles.tile} href={tile.href}>
              {tile.image && (
                <Image
                  className={styles.image}
                  src={tile.image.src}
                  width={tile.image.width}
                  height={tile.image.height}
                  alt=""
                  sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 17vw"
                  quality={80}
                />
              )}
              <span className={styles.scrim} aria-hidden="true" />
              <span className={styles.copy}>
                <span className={styles.title}>{tile.title}</span>
                <span className={styles.lines}>
                  {tile.lines[0]}
                  {tile.lines[1] && (
                    <>
                      <br className={styles.lineBreak} />
                      <span className={styles.lineTwo}>{tile.lines[1]}</span>
                    </>
                  )}
                </span>
                <span className={styles.cta}>
                  {experienceTilesCopy.cta}
                  <Icon name="arrow-right" size={18} />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
