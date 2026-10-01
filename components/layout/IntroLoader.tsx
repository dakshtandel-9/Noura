"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { media } from "@/content/site";
import styles from "./IntroLoader.module.css";

/** Hold for at least two heartbeats so the beat reads, but never longer than three. */
const MIN_MS = 2000;
const MAX_MS = 3300;
/** Past this the CSS fallback has already faded the cover away, so don't replay it. */
const LATE_MS = 5500;
const FLIGHT_MS = 1000;

type Phase = "beat" | "open" | "done";

/**
 * Homepage intro: the supplied wordmark beats softly at the centre of an ivory cover, then the
 * cover parts like two doors while the same wordmark glides into its place in the header.
 * The page beneath is fully rendered throughout; any key, click, touch or scroll opens it early,
 * reduced motion skips it, and without JavaScript a CSS fallback clears it on its own.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("beat");
  const beatRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);

  // Beat until the page has loaded (between MIN_MS and MAX_MS), then open on a resting beat.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const beat = beatRef.current;
    if (reduce || !beat || performance.now() > LATE_MS) {
      setPhase("done");
      return;
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
    };
    const onIteration = () => {
      const t = performance.now();
      if ((loaded && t >= MIN_MS) || t >= MAX_MS) open();
    };
    // Backstop for when animation events don't fire (e.g. a background tab).
    const safety = window.setTimeout(open, Math.max(0, MAX_MS + 1200 - performance.now()));

    const skipEvents = ["keydown", "pointerdown", "wheel", "touchstart"] as const;
    window.addEventListener("load", onLoad, { once: true });
    beat.addEventListener("animationiteration", onIteration);
    for (const type of skipEvents) window.addEventListener(type, open, { passive: true });

    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("load", onLoad);
      beat.removeEventListener("animationiteration", onIteration);
      for (const type of skipEvents) window.removeEventListener(type, open);
    };
  }, []);

  // Fly the centred wordmark onto the header's wordmark while the doors part.
  useEffect(() => {
    if (phase !== "open") return;
    const root = document.documentElement;
    const flyer = flyerRef.current;
    const target = document.querySelector<HTMLElement>("[data-brand-mark]");
    const finish = () => setPhase("done");
    if (!flyer) return finish();

    const from = flyer.getBoundingClientRect();
    const to = target?.getBoundingClientRect();
    const keyframes: Keyframe[] =
      to && to.width > 0
        ? [
            { transform: "translate(0, 0) scale(1)" },
            {
              transform: `translate(${to.left + to.width / 2 - (from.left + from.width / 2)}px, ${
                to.top + to.height / 2 - (from.top + from.height / 2)
              }px) scale(${to.width / from.width})`,
            },
          ]
        : [{ opacity: 1 }, { opacity: 0 }];

    root.dataset.introFlight = "";
    // Cues the hero copy to rise in behind the parting doors; left set so it never replays.
    root.dataset.introReveal = "";
    const flight = flyer.animate(keyframes, {
      duration: FLIGHT_MS,
      easing: "cubic-bezier(.65, 0, .35, 1)",
      fill: "forwards",
    });
    flight.finished.then(finish, () => {});

    return () => {
      flight.cancel();
      delete root.dataset.introFlight;
    };
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
        <div ref={flyerRef} className={styles.flyer}>
          <span className={styles.halo} />
          <div ref={beatRef} className={styles.beat}>
            <Image
              className={styles.mark}
              src={media.wordmarkTransparent.src}
              width={media.wordmarkTransparent.width}
              height={media.wordmarkTransparent.height}
              alt=""
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 767px) 64vw, 360px"
            />
          </div>
        </div>
      </div>
      <noscript>
        <style>{"[data-intro-loader]{display:none}"}</style>
      </noscript>
    </>
  );
}
