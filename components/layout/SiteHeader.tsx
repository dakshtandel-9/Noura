"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { media, menu, nav } from "@/content/site";
import styles from "./SiteHeader.module.css";

/**
 * Transparent over the hero; frosted warm ivory once the page moves or the menu is open.
 * Inline links show from 1200px. Below that, the menu button opens the full-story menu
 * (every section anchor plus the invitation CTA); on wide screens it is hidden.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  const solid = scrolled || open;

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${solid ? styles.solid : styles.overlay}`}
      id="header"
    >
      <a href="#arrive" className={styles.brand} aria-label="NOURA home" onClick={close}>
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
      </a>

      <div className={styles.bar}>
        <nav className={styles.nav} aria-label="Main navigation">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <ButtonLink
          href="#invitation"
          variant={solid ? "primary" : "light"}
          icon={null}
          className={styles.cta}
        >
          Request an invitation
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
              <a href={item.href} className={styles.menuLink} onClick={close}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <ButtonLink href="#invitation" icon={null} className={styles.menuCta} onClick={close}>
          Request an invitation
        </ButtonLink>
      </nav>
    </header>
  );
}
