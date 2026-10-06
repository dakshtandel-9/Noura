import { getImageProps } from "next/image";
import { hero } from "@/content/home";
import { media } from "@/content/site";
import { HeroFilm } from "./HeroFilm";
import styles from "./Hero.module.css";

/** Keep in sync with the portrait layout query in Hero.module.css. */
const PORTRAIT_QUERY = "(max-aspect-ratio: 4/5)";

/**
 * Art-directed poster: the portrait recomposition on portrait screens (phones, upright
 * tablets), the landscape still everywhere else. Critical image, never lazy-loaded (T5).
 */
function HeroPoster() {
  const common = { alt: "", sizes: "100vw", quality: 80 } as const;
  const {
    props: { srcSet: portrait },
  } = getImageProps({ ...common, ...media.hero.posterMobile });
  const { props: landscape } = getImageProps({
    ...common,
    ...media.hero.poster,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <picture>
      <source media={PORTRAIT_QUERY} srcSet={portrait} sizes="100vw" />
      <img {...landscape} alt="" className={styles.poster} />
    </picture>
  );
}

export function Hero() {
  const [first, second] = hero.titleLines;

  return (
    <section className={styles.hero} id="arrive" aria-labelledby="hero-title">
      <div className={styles.media} aria-hidden="true">
        <HeroPoster />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`wrap ${styles.copy}`}>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.titleLine}>{first}</span> <span className={styles.titleLine}>{second}</span>
        </h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>
        <p className={styles.meta}>
          {hero.meta.map((item, i) => (
            <span key={item} className={styles.metaItem}>
              {i > 0 && <span className={styles.metaDot} aria-hidden="true" />}
              {item}
            </span>
          ))}
        </p>
      </div>

      <HeroFilm src={media.hero.film.src} poster={media.hero.film.poster} labels={hero.film} />
    </section>
  );
}
