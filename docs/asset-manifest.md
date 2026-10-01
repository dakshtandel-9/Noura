# Asset manifest / no invented production footage

## Included visuals
- `noura-logo.webp`: presentation extraction of the supplied right-hand golden logo with sage leaves. The original raster source is the user's two-logo image. No left-hand green logo is used.
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

## Not included
No delivered production video shoot, professional filmed edit, location booking, stock subscription, provider accounts, deployed hosting, working backend, live card generation or true member records. Those are either implementation work described in this handoff or inputs/costs to approve.
