import Image from "next/image";
import type { MediaImage } from "@/content/home";
import shared from "./subpage.module.css";

/** A decorative picture filling its positioned parent; the copy beside it carries the meaning. */
export function SubpagePhoto({
  image,
  sizes,
  priority,
  position,
}: {
  image: MediaImage;
  sizes: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    <Image
      className={shared.fill}
      src={image.src}
      width={image.width}
      height={image.height}
      alt=""
      sizes={sizes}
      priority={priority}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
