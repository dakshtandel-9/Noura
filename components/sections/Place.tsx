import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { place as copy } from "@/content/home";
import styles from "./Place.module.css";

/**
 * 02b — The place: a text block with an outlined pill action on the left and a mosaic of four
 * labelled destination pictures on the right (Goa large, Bali tall, Coorg over Udaipur).
 * Grey blocks stand in until images are supplied.
 */
export function Place() {
  return (
    <section className={styles.section} id="place" aria-labelledby="place-title">
      <div className={styles.inner}>
        <div className={styles.text} data-reveal>
          <h2 id="place-title" className={styles.heading}>
            {copy.heading}
          </h2>
          <p className={styles.lead}>
            <span className={styles.line}>{copy.lead[0]}</span>
            <span className={styles.line}>{copy.lead[1]}</span>
          </p>
          <p className={styles.lines}>
            {copy.lines.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </p>
          <p className={styles.note}>
            <span className={styles.line}>{copy.note[0]}</span>
            <span className={styles.line}>{copy.note[1]}</span>
          </p>
          <ButtonLink href={copy.ctaHref} variant="secondary" icon={null} className={styles.cta}>
            <span className={styles.ctaLabel}>
              {copy.cta}
              <Icon name="arrow-right" size={20} />
            </span>
          </ButtonLink>
        </div>

        <ul className={styles.mosaic} role="list">
          {copy.tiles.map((tile) => (
            <li key={tile.id} className={`${styles.tile} ${styles[tile.id]}`} data-reveal>
              {tile.image && (
                <Image
                  className={styles.image}
                  src={tile.image.src}
                  width={tile.image.width}
                  height={tile.image.height}
                  alt=""
                  sizes="(max-width: 767px) 100vw, 40vw"
                />
              )}
              <span className={styles.label}>{tile.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
