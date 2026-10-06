"use client";

import { useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./HeroFilm.module.css";

interface HeroFilmProps {
  src: string;
  poster: string;
  labels: { open: string; close: string; label: string };
}

/**
 * "Play film" control for the hero. The film is never loaded or played until the visitor
 * asks: the video has preload="none" and starts from the click. A native <dialog> gives the
 * focus trap, Escape to close and focus return to the button.
 */
export function HeroFilm({ src, poster, labels }: HeroFilmProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  function open() {
    dialog.current?.showModal();
    // Autoplay can be rejected; the native controls stay available either way.
    video.current?.play().catch(() => {});
  }

  function onClose() {
    const el = video.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }

  return (
    <>
      <button type="button" className={styles.trigger} onClick={open}>
        <span className={styles.ring} aria-hidden="true">
          <Icon name="play" size={16} />
        </span>
        <span>{labels.open}</span>
      </button>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={labels.label}
        onClose={onClose}
        onClick={(e) => {
          // A click on the backdrop targets the dialog element itself.
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className={styles.frame}>
          <button type="button" className={styles.close} aria-label={labels.close} onClick={() => dialog.current?.close()}>
            <Icon name="close" size={20} />
          </button>
          <video
            ref={video}
            className={styles.video}
            src={src}
            poster={poster}
            controls
            playsInline
            preload="none"
          />
        </div>
      </dialog>
    </>
  );
}
