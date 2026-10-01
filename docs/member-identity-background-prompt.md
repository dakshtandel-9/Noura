# Member identity background — generation record

- Created: 2026-10-01.
- Tool: built-in image_gen, new image generation.
- Asset: `public/media/experiences/member-identity-background-v1.png`.
- Native dimensions: 2172 × 724 pixels (3:1).
- Intended placement: section 12, `#member`, behind the existing heading and illustrative invitation card.
- Status: applied to the member identity section through `content/home.ts` on 2026-10-01, at the owner's request.
- Provenance: AI-generated botanical still life; not a photograph of NOURA premises.
- Visual review: dark, quiet left copy area; olive foliage concentrated at the right edge; no text, logo, card, people or venue depiction. Native dimensions and PNG format checked with `sips`. Applied image reviewed in Chrome at 1440 × 900 and 390 × 844: background and wordmark loaded, white heading and supporting text visually readable, no horizontal overflow. Mobile uses the quiet central texture crop. This was browser viewport emulation, not a physical mobile-device test or a measured WCAG contrast audit.
- Implementation checks: `npm run typecheck`, `npm run lint` and `git diff --check` passed. Browser logs also showed unrelated image-quality configuration warnings for other experience images and a hydration warning involving a browser-added `cz-shortcut-listen` body attribute.

## Final generation prompt

Use case: photorealistic-natural.
Asset type: a standalone atmospheric background photograph for NOURA's private invitation / member identity website section.
Primary request: Create an exceptionally refined, calm, dark botanical background that makes an existing white serif heading on the left and an existing olive membership card with gold detail on the right feel elegant and clear.
Scene/backdrop: a seamless deep forest-olive mineral limewash surface with very fine natural matte texture, quiet soft shadows from olive branches, and sparse real olive foliage entering only from the outermost upper-right and lower-right edges. It should feel like intimate editorial botanical photography in warm late-afternoon side light, grounded and tactile.
Composition/framing: ultra-wide panoramic horizontal image, approximately 3:1, ideally 3072 x 1024. A single uninterrupted full-bleed background, no panels. The left 48% and middle should be spacious and very low-detail, mostly smooth deep olive with extremely subtle tonal depth for overlaid white copy. Keep the right 35% mostly softly shaded and unobtrusive too, because a large card will overlay that area. Let a few beautifully lit natural olive leaves at the far right border and whisper-soft branch shadows near the upper edge provide the visual interest; do not form a border or wreath. Details remain graceful if cropped to a very wide 3.36:1 banner or a centered mobile crop.
Lighting/mood: soft raking golden-hour light entering from outside the upper right, gently illuminating fine natural surface texture and leaf edges, deep soft shadows, restrained contrast, meditative, quiet luxury. No white hotspots; luminosity stays low enough for white copy. Rich visible olive tones, not featureless black.
Color palette: primarily deep forest #31473C and olive-charcoal #27352D, muted sage leaves inspired by #95A187, very restrained warm natural light inspired by #C9A962. No gold glitter or metallic surface.
Style/medium: premium photorealistic editorial still-life photograph, realistic leaves, slight organic imperfections, subtle surface texture, natural depth, extremely considered minimalist art direction.
Constraints: Deliver the background image alone. Absolutely no text, letters, logo, brand wordmark, invitation card, frame, UI, watermark, people, furniture, architecture, flowers, candles, spa objects, sparkles, lens flare, theatrical light beams, or artificial glow. Do not produce a screenshot or website mockup.
