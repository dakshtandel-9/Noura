# Asset manifest / no invented production footage

## Included visuals
- `public/media/brand/noura-logo-transparent-matched.webp`: current footer/loading logo, color-matched with built-in imagegen on 2026-10-08 to the existing header wordmark's muted gold and sage. A 1191 × 1321 WebP with alpha, replacing the brighter `noura-logo-transparent-glow.webp` in those two locations. Prompt: change only the full logo's colors and finish to match the header reference, retain the full composition and lettering, preserve transparency, and avoid bright yellow/orange gold, bevels, halos, or shadows. Visually compared against the header wordmark on ivory; the header code and asset were left untouched.
- `noura-logo.webp`: presentation extraction of the supplied right-hand golden logo with sage leaves. The original raster source is the user's two-logo image. No left-hand green logo is used.
- `public/media/brand/noura-logo-transparent-glow.webp`: transparent full-logo derivative generated with the built-in imagegen tool on 2026-10-08 from `noura-logo.webp`, then encoded as a 1191 × 1320 WebP with alpha. It replaces the opaque logo in the loading screen and footer; the original remains available for the admin area. The edit removes the rectangular white ground and adds only a very slight neutral edge lift, with no separate CSS gold effect or shadow.
- `noura-wordmark.webp`: crop of that right-hand wordmark for a readable header. Final lock-up needs client approval and original vector assets.
- `hero-poster.jpg` and `stillness.webp`: cropped scene from the earlier supplied SEREN concept artwork, excluding presentation text. The brand name in the artwork is not used on the website.
- `hero-motion-study.mp4`: 12-second, silent MP4 made from that still to illustrate background video layout and controls. It is an animated still, not filmed video or actual NOURA premises.
- `yoga.webp`, `meditation.webp`, `sound.webp`, `community.webp`, `botanical.webp`: crops from the earlier supplied experience-section concept image. These are illustrative concept assets and not testimonials or photos of actual members.
- `icon-*.svg`: simple interface icon set created for the handoff. Icons are distinct from the protected identity/logo; the logo is not redrawn.

## Usage in the HTML
Images and the short study are embedded for portability. Named fonts load from Google Fonts when online, with system fallbacks offline. No font binaries are included. The HTML uses no competitor photography, logo marks, testimonials, awards or code. Research is linked and attributed separately.

## Production replacement checklist
Original brand vectors, commissioned/licensed film, rights record, mobile/desktop crops, first-frame poster, actual venue/people permission, programme photographs, useful alternative text and compressed derivatives. Replace illustrative art where it would imply a real place, actual staff or a documented participant experience. Keep a rights log for every production asset.

## Current implementation concept images
The landing-page implementation uses AI-generated editorial images: `public/media/experiences/shared-practice.jpg` for the shared-experience section, `public/media/experiences/invitation-journey.jpg` for the invitation-process section, and `public/media/experiences/private-session-conversation.jpg` (1024 × 1536 JPEG, generated 2026-10-01) for the private-session form. The latter shows a quiet two-chair conversation nook. These images are illustrative and do not depict NOURA premises, staff or participants. Replace or approve them before production publication.

## Generated member identity background
- `public/media/experiences/member-identity-background-v1.png` (2172 × 724 PNG), created with built-in image_gen on 2026-10-01. Deep olive mineral texture, warm botanical shadows and sparse olive foliage; no text, logo, card or venue depiction. Applied to the member identity section through `content/home.ts`, with responsive cover cropping and a light dark overlay. See [generation prompt and review notes](member-identity-background-prompt.md). Visually checked in Chrome at 1440 × 900 and 390 × 844; image loads, text remains readable and there is no horizontal overflow. Production publication remains subject to owner approval.

## Generated invitation card surface
- `public/media/experiences/member-card-surface-v1.png` (1536 × 1024 PNG), created with built-in image_gen on 2026-10-01 for the illustrative invitation card. Deep olive artisan-paper texture with restrained botanical embossing on the right, without text or logo. Applied through `memberIdentity.card.image`; the supplied gold wordmark and sample details remain separate. See [generation prompt](member-card-surface-prompt.md).

## Generated destination concepts
- `public/media/destinations/goa.webp` (1254 × 1254), `bali.webp` (1024 × 1536), `coorg.webp` (1774 × 887), and `udaipur.webp` (1672 × 941) were generated with built-in image_gen on 2026-10-03, using the supplied four-panel collage as a visual reference. The files are separate, text-free editorial concepts: an aerial beach and garden, jungle pavilions and pool, forest pool and stairs, and sunset hillside resort, respectively. They do not depict verified venues or NOURA locations, and are not connected to the landing page. Obtain owner approval and location/rights review before production publication.

## Generated five-panel scene concepts
- `public/media/five-panel-scenes/` contains five separate 1918 × 820 WebP editorial concepts generated with built-in image_gen on 2026-10-03 from the supplied five-thumbnail reference: woodland meditation, handpan practice, a singing bowl, a garden table, and a candlelit conversation. They are illustrative recreations, not exact source photographs or depictions of verified NOURA participants or premises. They are not connected to the landing page; owner approval is needed before production publication.

## Not included
No delivered production video shoot, professional filmed edit, location booking, stock subscription, provider accounts, deployed hosting, working backend, live card generation or true member records. Those are either implementation work described in this handoff or inputs/costs to approve.

## Generated begin-experience picture
- `public/media/experiences/begin-experience.webp` (1120 × 1504 WebP), generated with the Higgsfield API (`higgsfield-ai/soul/v2/standard`) on 2026-10-06 for the `#begin` enquiry section, then trimmed of thin frame edges. An empty, sunlit coastal veranda with a drifting linen curtain, an open journal and pen, and a cup of mint tea; no people, text or logos. Applied through `beginExperience.image`. Illustrative only: it does not depict NOURA premises or a verified venue. Owner approval is needed before production publication.

## Generated FAQ page pictures
- `public/media/faq/` holds five WebP pictures for the standalone `/FAQ` page: `hero.webp`, `band.webp`, `closing.webp`, `terrace.webp` (2016 × 864) and `food.webp` (1728 × 1296). They were recreated on 2026-10-06 with the Higgsfield API (`alibaba/qwen-image-3/edit`, 2K), using crops of the owner-supplied FAQ reference board as image references. The scenes, composition and colour grade match the reference; the overlaid headings, quote and buttons were removed, and the frames were extended slightly above and below to fit the generation ratio. Applied through `faqPage.images` in `content/subpages.ts`. Illustrative only: they do not depict NOURA premises, guests or menus. Owner approval is needed before production publication.

## Generated About (/about) page pictures
- `public/media/about/` holds five WebP pictures for the standalone `/about` page: `hero.webp`, `philosophy.webp`, `closing.webp` (2016 × 864), `home.webp` (1728 × 1344) and `still-life.webp` (864 × 1536). They were recreated on 2026-10-06 with the Higgsfield API (`alibaba/qwen-image-3/edit`, 2K) from crops of the owner-supplied About reference board, with the overlaid text, buttons and divider lines removed and the frames extended slightly to fit the generation ratio. Applied through `aboutPage.images` in `content/subpages.ts`. Illustrative only: they do not depict NOURA premises or the Goa base. The founder and board portrait slots remain grey placeholders on purpose; only real, approved photographs go there. Owner approval is needed before production publication.

## Generated invitation page picture
- `public/media/invitation/hero.webp` (1296 × 1728 WebP), recreated on 2026-10-06 with the Higgsfield API (`alibaba/qwen-image-3/edit`, 2K) from the photograph in the owner-supplied "Begin Your Journey" reference: a woman seen from behind, seated by an infinity pool facing a sunset sea. The overlaid "Wellness / Nature / Connection" line was removed and is set as page text. Applied through `invitationPage.image` in `content/subpages.ts`. Illustrative only: the person is generated and is not a NOURA guest, member or practitioner, and the setting is not a NOURA venue. Owner approval is needed before production publication.
