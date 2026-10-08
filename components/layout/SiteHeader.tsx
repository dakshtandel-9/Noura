"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { headerCta, media, menu, nav } from "@/content/site";
import styles from "./SiteHeader.module.css";

/**
 * The one header for every page. On the home page it is transparent over the hero; `solid` keeps
 * it ivory from the start on pages whose top is too light for white text (/about, /FAQ, /invitation).
 * Inline links show from 1200px. Below that, the menu button opens the full-story menu
 * (every section link plus the invitation CTA); on wide screens it is hidden.
 */
export function SiteHeader({ solid: alwaysSolid = false }: { solid?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    // The menu button is hidden on wide screens; don't leave a menu open that can't be closed.
    const wide = window.matchMedia("(min-width: 1200px)");
    const onWide = () => wide.matches && setOpen(false);
    wide.addEventListener("change", onWide);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);
  const solid = alwaysSolid || open;

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${solid ? styles.solid : styles.overlay}`}
      id="header"
    >
      <Link href="/#arrive" className={styles.brand} aria-label="NOURA home" onClick={close}>
        <Image
          className={styles.wordmark}
          data-brand-mark=""
          src={media.wordmarkTransparent.src}
          width={media.wordmarkTransparent.width}
          height={media.wordmarkTransparent.height}
          alt=""
          priority
          sizes="176px"
        />
      </Link>

      <div className={styles.bar}>
        <nav className={styles.nav} aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href={headerCta.href} variant="secondary" icon={null} className={styles.cta}>
          {headerCta.label}
        </ButtonLink>

        <button
          ref={menuButton}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={26} />
        </button>
      </div>

      <nav id="site-menu" className={styles.menu} aria-label="Site menu" hidden={!open}>
        <ul className={styles.menuList}>
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.menuLink} onClick={close}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink
          href={headerCta.href}
          variant="secondary"
          icon={null}
          className={styles.menuCta}
          onClick={close}
        >
          {headerCta.label}
        </ButtonLink>
      </nav>
    </header>
  );
}
