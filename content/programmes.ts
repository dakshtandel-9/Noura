import type { IconName } from "@/components/ui/Icon";

export interface Programme {
  /** Anchor of the programme's chapter on the landing page. */
  id: "yoga" | "meditation" | "sound" | "connection";
  verb: string;
  name: string;
  /** Two short lines for the overview strip under the hero. */
  strapline: [string, string];
  /** Decorative line icon for the overview strip. */
  icon: IconName;
}

// Copy from docs/content.md — proposed, pending client approval.
export const programmes: Programme[] = [
  { id: "yoga", verb: "Move", name: "Yoga", strapline: ["Wake", "the body."], icon: "leaf" },
  { id: "meditation", verb: "Be still", name: "Meditation", strapline: ["Make space", "for silence."], icon: "lotus" },
  { id: "sound", verb: "Listen", name: "Music & Sound", strapline: ["Change", "the rhythm."], icon: "waves" },
  {
    id: "connection",
    verb: "Connect",
    name: "Private Group Sessions",
    strapline: ["The conversations", "you remember."],
    icon: "people",
  },
];
