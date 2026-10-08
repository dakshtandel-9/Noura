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

/**
 * Inline header links (1200px and up). Labels are set in capitals by CSS, so keep them in
 * sentence case here for assistive technology. The header is shared by every page, so section
 * anchors are written from the root ("/#place") and work from /about, /FAQ and /invitation
 * too. "Story" opens the About page.
 */
export const nav = [
  { label: "Story", href: "/about" },
  { label: "Journey", href: "/#experiences" },
  { label: "Place", href: "/#place" },
  { label: "Experts", href: "/#experts" },
  { label: "Enquire", href: "/#enquire" },
] as const;

/** The header's outlined button, on every page: the invitation request page. */
export const headerCta = { label: "Request an invitation", href: "/invitation" } as const;

/**
 * The full-story menu behind the header's menu button (below 1200px). Like `nav`, anchors are
 * written from the root so the menu works on every page; "Our story" opens the About page.
 */
export const menu = [
  { label: "Our story", href: "/about" },
  { label: "The experiences", href: "/#experiences" },
  { label: "The place", href: "/#place" },
  { label: "The practitioners", href: "/#experts" },
  { label: "Enquire", href: "/#enquire" },
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
  /** Transparent full logo matched to the header's muted gold and sage palette for the intro and footer. */
  logoTransparentGlow: { src: "/media/brand/noura-logo-transparent-matched.webp", width: 1191, height: 1321 },
  hero: {
    /**
     * Static hero still (no background film). Illustrative, AI-generated scene — not NOURA's
     * premises (docs/asset-manifest.md). `posterMobile` is the portrait recomposition used on
     * portrait screens. Media is cached as immutable: swap an image under a new file name.
     */
    poster: { src: "/media/hero/herosectionbg.png", width: 1672, height: 941 },
    posterMobile: { src: "/media/hero/herosection-mobile.png", width: 941, height: 1672 },
    /**
     * Short film behind the hero's "Play film" button. PLACEHOLDER: an 8-second silent push-in
     * on the hero still, not filmed footage. Replace with the approved film under a new file name;
     * a film with speech or meaningful audio also needs captions (docs/media-motion.md).
     */
    film: { src: "/media/hero/film-placeholder.mp4", poster: "/media/hero/herosectionbg.png" },
  },
} as const;

/**
 * Footer strip under the closing banner (2026-10-03 reference): wordmark, place and month,
 * a short link row and a back-to-top control. Page anchors only, so no link dead-ends.
 */
export const footer = {
  place: "Goa - Feb 2027",
  backToTop: "Back to top",
  /** Always shown: the enquiry section and the FAQ page (FAQ is linked only from here). */
  nav: [
    { label: "Contact", href: "#enquire" },
    { label: "FAQ", href: "/FAQ" },
  ],
  /**
   * Instagram stays out until the client supplies the real profile address (docs/client-inputs.md
   * item 17); the link row then picks it up with no other change, e.g.
   * { label: "Instagram", href: "https://www.instagram.com/…" }. A public email or phone for
   * "Contact" would be added the same way and replaces the on-page enquiry link.
   */
  social: [] as ReadonlyArray<{ label: string; href: string }>,
} as const;
