import Image from "next/image";
import { stages as copy } from "@/content/home";
import styles from "./Stages.module.css";

/**
 * 01a3 — Three stages: a centred heading over three numbered cards, each a picture above a
 * short title and two lines. A grey block stands in until a card's image is supplied.
 */
export function Stages() {
  return (
    <section className={styles.section} id="stages" aria-labelledby="stages-title">
      <div className="wrap">
        <h2 id="stages-title" className={styles.heading} data-reveal>
          {copy.heading}
        </h2>

        <ol className={styles.cards} role="list">
          {copy.items.map((item, i) => (
            <li key={item.id} className={styles.card} data-reveal>
              <div className={styles.media} aria-hidden="true">
                {item.image && (
                  <Image
                    className={styles.image}
                    src={item.image.src}
                    width={item.image.width}
                    height={item.image.height}
                    alt=""
                    sizes="(max-width: 767px) 100vw, 33vw"
                  />
                )}
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>
                  <span className={styles.number}>{String(i + 1).padStart(2, "0")}.</span> {item.title}
                </h3>
                <p className={styles.lead}>
                  {item.lead.map((line) => (
                    <span key={line} className={styles.line}>
                      {line}
                    </span>
                  ))}
                </p>
                <p className={styles.themes}>{item.themes}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
