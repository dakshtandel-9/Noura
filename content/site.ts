/**
 * Site-wide settings, navigation and media. Client decisions still pending are listed in
 * docs/client-inputs.md — do not replace them with invented details.
 */

export const site = {
  name: "NOURA",
  tagline: "Illuminate your wellbeing",
  description:
    "A private space for yoga, meditation, sound and meaningful connection. Thoughtful experiences, shared at an unhurried pace.",
} as const;

export const nav = [
  { label: "Our philosophy", href: "#philosophy" },
  { label: "The experiences", href: "#experiences" },
  { label: "Your invitation", href: "#journey" },
] as const;

/**
 * The full-story menu behind the header's menu button. Anchors follow the planned order in
 * docs/site-structure.md; most sections are not rebuilt yet.
 */
export const menu = [
  { label: "A pause", href: "#pause" },
  { label: "Our philosophy", href: "#philosophy" },
  { label: "The experiences", href: "#experiences" },
  { label: "Session rhythm", href: "#rhythm" },
  { label: "Your invitation", href: "#journey" },
  { label: "Member card", href: "#member" },
  { label: "Care & privacy", href: "#care" },
  { label: "Questions", href: "#questions" },
  { label: "Private session", href: "#private-session" },
] as const;

export const media = {
  wordmark: { src: "/media/brand/noura-wordmark.webp", width: 640, height: 166 },
  /**
   * The same supplied wordmark with only its off-white ground made transparent (mark pixels
   * unchanged), so it can sit over the hero. Presentation derivative; replace with the
   * original vector export once supplied (docs/design.md → logo, client-inputs).
   */
  wordmarkTransparent: { src: "/media/brand/noura-wordmark-transparent.webp", width: 640, height: 166 },
  logo: { src: "/media/brand/noura-logo.webp", width: 681, height: 754 },
  hero: {
    /**
     * Static hero still (no background film). Illustrative, AI-generated scene — not NOURA's
     * premises (docs/asset-manifest.md). `posterMobile` is the portrait recomposition used on
     * portrait screens. Media is cached as immutable: swap an image under a new file name.
     */
    poster: { src: "/media/hero/hero-desktop.jpg", width: 1920, height: 1080 },
    posterMobile: { src: "/media/hero/hero-mobile.jpg", width: 1080, height: 1920 },
  },
} as const;

/** Footer navigation. Public contact and profiles remain pending client approval. */
export const footer = {
  closing: "Come as you are. Take your time.",
  exploreHeading: "Explore",
  connectHeading: "Connect",
  legalHeading: "Legal",
  /**
   * "Explore" column. Page anchors only: every entry points at a section that is already
   * built, so no footer link dead-ends (docs/site-structure.md → definition of done). Add
   * "#philosophy", "#rhythm" and "#care" here as those chapters are implemented.
   */
  nav: [
    { label: "The experiences", href: "#experiences" },
    { label: "Shared experience", href: "#connection" },
    { label: "Your invitation", href: "#journey" },
    { label: "Member card", href: "#member" },
    { label: "Questions", href: "#questions" },
    { label: "Private session", href: "#private-session" },
  ],
  /**
   * "Connect" column: contact then social. Both stay empty until the client supplies a real
   * public business address and profiles — the column heading hides with them, so the footer
   * never shows a link that leads nowhere (docs/content.md → footer).
   *
   * e.g. { label: "Contact the team", href: "mailto:…" } once item 17 is answered.
   */
  contact: [] as ReadonlyArray<{ label: string; href: string }>,
  /** e.g. { label: "Instagram", href: "https://…" } once item 17 is answered. */
  social: [] as ReadonlyArray<{ label: string; href: string }>,
} as const;
