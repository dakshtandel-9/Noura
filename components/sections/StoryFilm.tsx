"use client";

import Image from "next/image";
import { useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./Story.module.css";

interface StoryFilmProps {
  src: string;
  poster: string;
  /** Picture shown in the frame; the film's own poster is only used inside the pop-up. */
  image: { src: string; width: number; height: number };
  labels: { play: string; label: string };
}

/**
 * The story film in the editorial frame. The poster is always visible; clicking the play
 * circle opens a modal dialog that plays the film with sound and native controls. Nothing
 * downloads until the visitor clicks Play.
 */
export function StoryFilm({ src, poster, image, labels }: StoryFilmProps) {
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
      <Image
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        sizes="(max-width: 899px) 100vw, 60vw"
        className={styles.image}
      />
      <button type="button" className={styles.playMark} aria-label={labels.play} onClick={open} />

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
        <div className={styles.dialogFrame}>
          <button type="button" className={styles.dialogClose} aria-label="Close film" onClick={() => dialog.current?.close()}>
            <Icon name="close" size={20} />
          </button>
          <video
            ref={video}
            className={styles.dialogVideo}
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
