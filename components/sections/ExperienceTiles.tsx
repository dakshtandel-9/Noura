import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { experienceTiles, experienceTilesCopy, type ExperienceTile } from "@/content/home";
import styles from "./ExperienceTiles.module.css";

/** A link when the card has a destination; otherwise plain text. */
function TileBody({ tile }: { tile: ExperienceTile }) {
  const body = (
    <>
      <span className={styles.media}>
        {tile.image && (
          <Image
            className={styles.image}
            src={tile.image.src}
            width={tile.image.width}
            height={tile.image.height}
            alt=""
            sizes="(max-width: 767px) 46vw, (max-width: 1279px) 23vw, 200px"
            quality={80}
          />
        )}
      </span>
      <span className={styles.title}>{tile.title}</span>
      <span className={styles.lines}>
        {tile.lines[0]}
        {tile.lines[1] && (
          <>
            <br />
            {tile.lines[1]}
          </>
        )}
      </span>
    </>
  );
  return tile.href ? (
    <a className={styles.card} href={tile.href}>
      {body}
    </a>
  ) : (
    <div className={styles.card}>{body}</div>
  );
}

/**
 * Centred capitals heading over a row of portrait picture cards, each with its title and a
 * two-line italic tagline underneath, and one outlined action below (2026-10-03 reference).
 * Grey placeholder until an image is set.
 */
export function ExperienceTiles() {
  return (
    <section className={styles.section} id="experiences" aria-labelledby="experiences-title">
      <div className="wrap wrap--wide">
        <h2 id="experiences-title" className={styles.heading} data-reveal>
          {experienceTilesCopy.heading}
        </h2>

        <ul className={styles.grid} role="list">
          {experienceTiles.map((tile) => (
            <li key={tile.id} className={styles.item} data-reveal>
              <TileBody tile={tile} />
            </li>
          ))}
        </ul>

        <div className={styles.actions} data-reveal>
          <ButtonLink href={experienceTilesCopy.ctaHref} variant="secondary" icon={null} className={styles.cta}>
            {experienceTilesCopy.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
