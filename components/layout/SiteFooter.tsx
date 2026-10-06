import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { footer as copy, media, site } from "@/content/site";
import styles from "./SiteFooter.module.css";

/** Public policy links stay hidden until the owner approves the actual wording. */
const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
] as const;

const showReviewPages = process.env.NODE_ENV !== "production";

function isExternal(href: string) {
  return href.startsWith("https://") || href.startsWith("mailto:");
}

/**
 * Footer strip under the closing banner: wordmark, place and month, a short link row and a
 * back-to-top control (2026-10-03 reference). Page anchors resolve from the home page so the
 * strip also works on the legal review pages.
 */
export function SiteFooter() {
  const links = [...copy.nav, ...copy.social, ...(showReviewPages ? legalLinks : [])];

  return (
    <footer className={styles.footer} id="footer">
      <div className={`wrap ${styles.inner}`}>
        <Link className={styles.brand} href="/#arrive" aria-label={`${site.name} home`}>
          <Image
            className={styles.logo}
            src={media.wordmarkTransparent.src}
            width={media.wordmarkTransparent.width}
            height={media.wordmarkTransparent.height}
            alt={site.name}
            sizes="140px"
          />
        </Link>

        <p className={styles.place}>{copy.place}</p>

        <nav className={styles.links} aria-label="Footer">
          <ul className={styles.list}>
            {links.map((item) => (
              <li key={item.href}>
                {isExternal(item.href) ? (
                  <a
                    className={styles.link}
                    href={item.href}
                    {...(item.href.startsWith("https://") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  >
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

        <Link className={styles.top} href="/#arrive" aria-label={copy.backToTop}>
          <Icon name="arrow-down" size={18} className={styles.topIcon} />
        </Link>
      </div>
    </footer>
  );
}
