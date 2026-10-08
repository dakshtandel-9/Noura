"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { media } from "@/content/site";
import styles from "./IntroLoader.module.css";

/** Keep the brand visible briefly, without holding the visitor on the cover. */
const MIN_MS = 2000;
const MAX_MS = 3300;
/** Past this the CSS fallback has already faded the cover away, so don't replay it. */
const LATE_MS = 5500;
const OPEN_MS = 1000;

type Phase = "hold" | "open" | "done";

/**
 * Homepage intro: the transparent full-logo derivative rests at the centre of a white cover, then the
 * cover parts like two doors to reveal the separate wordmark already in the header.
 * The page beneath is fully rendered throughout; any key, click, touch or scroll opens it early,
 * reduced motion skips it, and without JavaScript a CSS fallback clears it on its own.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("hold");

  // Open after load and the minimum display time, or at the maximum regardless of load.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || performance.now() > LATE_MS) {
      const clear = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(clear);
    }

    let loaded = document.readyState === "complete";
    let opened = false;
    const open = () => {
      if (opened) return;
      opened = true;
      setPhase("open");
    };
    const onLoad = () => {
      loaded = true;
      if (performance.now() >= MIN_MS) open();
    };
    const minimum = window.setTimeout(() => {
      if (loaded) open();
    }, Math.max(0, MIN_MS - performance.now()));
    const maximum = window.setTimeout(open, Math.max(0, MAX_MS - performance.now()));

    const skipEvents = ["keydown", "pointerdown", "wheel", "touchstart"] as const;
    window.addEventListener("load", onLoad, { once: true });
    for (const type of skipEvents) window.addEventListener(type, open, { passive: true });

    return () => {
      window.clearTimeout(minimum);
      window.clearTimeout(maximum);
      window.removeEventListener("load", onLoad);
      for (const type of skipEvents) window.removeEventListener(type, open);
    };
  }, []);

  // The logo stays still; the doors alone make the transition.
  useEffect(() => {
    if (phase !== "open") return;
    // Cues the hero copy to rise in behind the parting doors; left set so it never replays.
    document.documentElement.dataset.introReveal = "";
    const finish = window.setTimeout(() => setPhase("done"), OPEN_MS);
    return () => window.clearTimeout(finish);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <>
      <div
        className={`${styles.loader} ${phase === "open" ? styles.open : ""}`}
        data-intro-loader=""
        aria-hidden="true"
      >
        <div className={`${styles.door} ${styles.doorStart}`} />
        <div className={`${styles.door} ${styles.doorEnd}`} />
        <div className={styles.logoFrame}>
          <Image
            className={styles.mark}
            src={media.logoTransparentGlow.src}
            width={media.logoTransparentGlow.width}
            height={media.logoTransparentGlow.height}
            alt=""
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 767px) 280px, 360px"
            unoptimized
          />
        </div>
      </div>
      <noscript>
        <style>{"[data-intro-loader]{display:none}"}</style>
      </noscript>
    </>
  );
}
