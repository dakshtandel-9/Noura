import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { footer as copy, media, site } from "@/content/site";
import styles from "./SiteFooter.module.css";

/** Draft policy links stay in review builds until the owner approves final wording. */
const legalLinks = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms & conditions", href: "/terms" },
] as const;

const showReviewPages = process.env.NODE_ENV !== "production";

function isExternal(href: string) {
  return href.startsWith("https://") || href.startsWith("mailto:");
}

/**
 * Footer strip under the closing banner: the full gold logo, place and month, a short link row and a
 * back-to-top control (2026-10-03 reference). Navigation anchors resolve from the home page;
 * the top control returns to the current page's main content.
 */
export function SiteFooter() {
  const links = [...copy.nav, ...copy.social, ...(showReviewPages ? legalLinks : [])];

  return (
    <footer className={styles.footer} id="footer">
      <div className={`wrap ${styles.inner}`}>
        <Link className={styles.brand} href="/#arrive" aria-label={`${site.name} home`}>
          <Image
            className={styles.logo}
            src={media.logoTransparentGlow.src}
            width={media.logoTransparentGlow.width}
            height={media.logoTransparentGlow.height}
            alt={site.name}
            sizes="(max-width: 599px) 140px, (max-width: 1023px) 140px, 170px"
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

        <a className={styles.top} href="#main" aria-label={copy.backToTop}>
          <Icon name="arrow-down" size={18} className={styles.topIcon} />
        </a>
      </div>
    </footer>
  );
}
