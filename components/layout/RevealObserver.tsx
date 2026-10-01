"use client";

import { useEffect } from "react";

/**
 * Optional section reveal (docs/design.md §9): opacity plus ≤12px rise, once, 600ms.
 * Content is only hidden after this runs, never under reduced motion, and elements
 * already on screen are shown immediately — so nothing depends on the animation to be read.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const viewport = window.innerHeight;
    for (const el of elements) {
      if (el.getBoundingClientRect().top < viewport) el.dataset.revealed = "";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    for (const el of elements) if (!("revealed" in el.dataset)) observer.observe(el);
    document.documentElement.dataset.revealReady = "";

    return () => observer.disconnect();
  }, []);

  return null;
}
