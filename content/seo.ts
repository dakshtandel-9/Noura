// Search-engine and link-preview copy: page titles, meta descriptions and structured-data
// facts. None of it renders on the page. Wording reuses what the pages already say; keep to
// docs/design.md → voice (no retreats, outcomes, counts or invented claims).

export interface SeoPage {
  /** Route path, also used as the canonical URL. */
  path: string;
  /** Under 60 characters so results show it whole. */
  title: string;
  /** Roughly 120–160 characters. */
  description: string;
}

/** Public pages offered to search engines (listed in the sitemap). Legal drafts and admin stay out. */
export const seoPages = {
  home: {
    path: "/",
    title: "NOURA — Yoga, Meditation & Sound Experiences in Goa",
    description:
      "A private, by-invitation gathering for conscious living in Goa. Yoga, meditation, breathwork, sound and meaningful connection, shared at an unhurried pace.",
  },
  about: {
    path: "/about",
    title: "About NOURA — A more conscious way to travel inward",
    description:
      "Based in Goa, NOURA brings together exceptional destinations, meaningful wellness and remarkable people for immersive experiences of body, mind and spirit.",
  },
  faq: {
    path: "/FAQ",
    title: "Frequently asked questions — NOURA",
    description:
      "Answers about NOURA experiences: how pricing is shared, what is included, flights and local transport, Sattvic meals, alcohol and preparing before you arrive.",
  },
  contact: {
    path: "/contact",
    title: "Contact NOURA — Porvorim, North Goa",
    description:
      "Get in touch with NOURA by email, phone or WhatsApp. Based in Porvorim, North Goa, India. Share what you’re looking for and our team will be in touch.",
  },
  invitation: {
    path: "/invitation",
    title: "Request an invitation — NOURA",
    description:
      "Request an invitation to a NOURA luxury wellness experience in yoga, meditation, sound healing and music. Share a few details and our team will be in touch.",
  },
} as const satisfies Record<string, SeoPage>;

/** Link-preview picture: a 1200×630 crop of the hero still (public/media/hero/herosectionbg.png). */
export const shareImage = {
  url: "/media/hero/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "A person meditating on a coastal rock at sunset",
} as const;

/** Postal parts of the "Based in" address shown on /contact and /about. Update both together. */
export const organizationAddress = {
  addressLocality: "Porvorim",
  addressRegion: "Goa",
  postalCode: "403501",
  addressCountry: "IN",
} as const;
