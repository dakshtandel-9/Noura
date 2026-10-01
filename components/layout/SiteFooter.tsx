import Image from "next/image";
import Link from "next/link";
import { footer as copy, media, site } from "@/content/site";
import styles from "./SiteFooter.module.css";

const legalLinks = [
  { label: "Terms & conditions", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
] as const;

/** Public policy links stay hidden until the owner approves the actual wording. */
const showReviewPages = process.env.NODE_ENV !== "production";

export function SiteFooter() {
  const connect = [...copy.contact, ...copy.social];

  return (
    <footer className={styles.footer} id="footer">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.lead}>
            <Link className={styles.brand} href="/#arrive" aria-label={`${site.name} home`}>
              <Image
                className={styles.logo}
                src={media.wordmark.src}
                width={media.wordmark.width}
                height={media.wordmark.height}
                alt={site.name}
                sizes="160px"
              />
            </Link>
            <p className={styles.closing}>{copy.closing}</p>
          </div>

          <div className={styles.directory}>
            <FooterColumn heading={copy.exploreHeading} items={copy.nav} wide />
            {connect.length > 0 && <FooterColumn heading={copy.connectHeading} items={connect} />}
            {showReviewPages && <FooterColumn heading={copy.legalHeading} items={legalLinks} />}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <Link href="/#arrive">Back to the beginning <span aria-hidden="true">↑</span></Link>
        </div>
      </div>
    </footer>
  );
}

interface ColumnProps {
  heading: string;
  items: ReadonlyArray<{ label: string; href: string }>;
  wide?: boolean;
}

function FooterColumn({ heading, items, wide = false }: ColumnProps) {
  return (
    <nav className={`${styles.column} ${wide ? styles.columnWide : ""}`} aria-label={heading}>
      <h2 className={styles.columnHeading}>{heading}</h2>
      <ul className={styles.columnList}>
        {items.map((item) => (
          <li key={item.href}>
            {item.href.startsWith("https://") || item.href.startsWith("mailto:") ? (
              <a className={styles.link} href={item.href} {...(item.href.startsWith("https://") ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
                {item.label}
              </a>
            ) : (
              <Link className={styles.link} href={item.href.startsWith("#") ? `/${item.href}` : item.href}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
