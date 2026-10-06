# Homepage design review and refinement

6 October 2026 · Current local homepage · Presentation-only changes

## Diagnosis

The photographs already provide atmosphere. The main weakness was repetition in the layout and typography: two consecutive, similarly sized, full-bleed 50/50 sections, followed by repeated widely tracked uppercase section headings. That made the page feel assembled from equivalent blocks instead of a deliberately paced story.

The existing copy, images, gold logo, section order and interactions were preserved. This review describes the current working homepage rather than replacing it with the older specification's section inventory. No new claims, services or content were introduced.

## Section-by-section assessment

| Area | Finding | Treatment |
|---|---|---|
| Header and hero | Strong visual arrival and clear branding. Their scale already contrasts well with the body. | Preserved imagery, overlays, logo, film control and navigation. Removed an obsolete, overridden mobile header-height declaration from global CSS. |
| Second section: story | Headline, supporting lines and sign-off relied largely on the same serif voice. A large identical split with the following section flattened the sequence. | Follow-up redesign: replaced the split with a large editorial question and compact reflection above a wide landscape. The italic bronze question leads; the closing line sits in an ivory inset at the photograph’s lower edge. |
| Third section: founder | The key question looked like another body paragraph. The mirrored edge-to-edge split repeated the previous section. | Used a white background, inset portrait, fine offset frame, more readable paragraph measure, and a larger Playfair question with a gold rule. Preserved the text-first mobile reading order. |
| Three stages | The uppercase section title competed with the uppercase card labels. | Introduced a sentence-case display heading, balanced wrapping, 32px desktop card gaps and padding. Existing images and card content remain. |
| Experience index | Seven images form a useful visual sequence, but wide tracking increased wrapping in narrow labels. | Applied the shared editorial heading scale, reduced desktop label tracking and standardized image-to-title and title-to-description spacing. |
| Place | The mosaic already offers a useful change of composition. The heading felt like a small label beside it. | Increased heading prominence using the shared display scale; preserved mosaic, labels, copy and links. |
| Practitioners | Portraits, numbered labels and aligned biographies already establish hierarchy. It is a dense section, but changing bios would be content work. | Preserved. Existing placeholder-profile disclosure remains. |
| Begin experience | The large image and form create a recognizable conversion section. | Preserved form fields, image and behavior; checked field reflow with the rest of the page. |
| Guides | Another uppercase heading repeated the catalogue treatment. | Applied the same balanced editorial heading system; preserved disclosure controls and profile layouts. |
| Enquiry, closing and footer | These already provide distinct form, contact and closing treatments. | Preserved their layout and content; checked internal anchor destinations and page-width reflow. |

## Spacing and visual system

- Retained shared palette, Playfair Display, Inter, content width and responsive section spacing from the existing tokens.
- Shared section-heading scale: 34–52px; heading-to-content spacing: 32–64px.
- Story and founder paragraphs use 16–18px Inter with 1.8 leading. The founder question uses 26–36px Playfair with 1.35 leading.
- Internal text spacing follows the existing 16/24/32px tokens. Story section padding follows the shared section-gap token on desktop and mobile.
- Founder photograph is inset on desktop, with a 24px offset frame, reducing to 16px on narrower layouts. Existing image files, content source paths and focal-position declarations are unchanged; the layouts change the size of the displayed frames. The follow-up story redesign replaces its blanket darkening filter with a lower gradient behind the media label.
- Removed the global pre-reveal opacity hiding. Existing optional movement remains, but section text is readable before the observer runs.
- Added no packages, new image requests, third-party calls or JavaScript interactions.

## Initial homepage refinement: verification actually performed

Environment: local macOS workspace; Chrome through the connected browser; Next.js 16.3.6. Desktop browser viewport overrides are not actual mobile-device tests.

| Check | Result |
|---|---|
| `npm run typecheck` | Passed. |
| `npm run lint` | Passed. |
| `npm run build` | Passed; homepage and utility routes prerendered. |
| `git diff --check` | Passed. |
| Dev and production viewport checks at 320, 390, 768, 1024 and 1440px | Document width matched viewport width; no measured heading, paragraph, input or textarea overflow. |
| Visual inspection | Reviewed story and founder on desktop/mobile, founder at 1024px, and the experience index on desktop. |
| Internal links | Every rendered hash link resolved to an existing ID. Story navigation, Journey navigation and the experience-to-Place link were exercised. |
| Mobile keyboard menu | Enter activated navigation; Escape closed the menu; focus returned to the menu trigger with a visible solid outline. |
| Heading and visibility checks | One H1; no section reveal elements had zero opacity in the production page. |
| Content preservation | Normalized rendered main text matched before/after, ignoring CSS capitalization and whitespace. All 29 rendered main image sources and alt texts matched. |
| File preservation | SHA-256 comparison confirmed every existing file under `public/` and `content/` was unchanged during this task. |

No unit test suite was run: the repository has a test command but no `tests/` directory. No backend submission, cross-browser, actual-device, explicit reduced-motion emulation, JavaScript-disabled browser, 200% text-zoom or performance certification is claimed.

## Existing issues outside this styling change

- The story's “Play our story” button has no playback handler or film destination. It needs an approved story film and a real interaction in a separate media slice.
- Development logs contain existing image-quality configuration warnings. A browser-extension-added body attribute also causes a hydration warning in this Chrome session; these were observed before editing.
- The forms still use `PreviewForm`; this visual refinement does not connect submissions or implement private operations.
- The current content and section inventory differ from the older approved specification. Practitioner profiles are explicitly marked as samples. Content verification and reconciliation remain separate from this request to preserve all copy and images.

## Files changed by this task

- `app/globals.css`
- `components/sections/Story.tsx`
- `components/sections/Story.module.css`
- `components/sections/FounderNote.module.css`
- `components/sections/Stages.module.css`
- `components/sections/ExperienceTiles.module.css`
- `components/sections/Place.module.css`
- `components/sections/Guides.module.css`
- `docs/homepage-design-review.md`

Changes are applied to the existing working tree. Pre-existing uncommitted work was preserved. No production deployment was performed.


## Follow-up: second-section redesign

The owner requested a more substantial redesign after the initial spacing pass. This follow-up changes only `Story.tsx`, `Story.module.css` and this review.

- Replaced the 50/50 image-and-copy split with a heading/reflection row above one panoramic photograph.
- Enlarged the italic question and emphasized the existing “But truly pause.” line.
- Moved the existing media control to the photograph’s lower-right corner; its existing unconnected behavior is unchanged.
- Used an ivory cutout for the closing line on desktop. On tablet and mobile, the closing line follows the photograph without overlap.
- Updated the image `sizes` hint for its wider frame. No source image or copy was replaced or edited.
- Re-ran TypeScript, lint, production build and `git diff --check`: passed.
- Browser layout checks at 320, 390, 768, 1024 and 1440px: no horizontal page overflow or clipped story text; media control is 48px on phones and 56px above the mobile breakpoint.
- Visually reviewed the desktop composition and mobile heading, reflection, image and closing line. File hashes confirm public assets and content files remain unchanged.

These follow-up responsive checks used the development preview; the revised production build passed separately. The initial refinement’s broader browser checks are recorded above, not claimed as re-executed here.


## Follow-up: consolidate guide disclosures into practitioners

The owner requested removal of “The people who will guide the journey” and relocation of its interaction into “Guides who live what they teach.”

- Removed the duplicate homepage section, its `Guides.tsx`/`Guides.module.css` implementation and its unused content/types.
- Practitioner choices now contain a name, existing portrait and downward chevron. The whole card is a native button, including the chevron hit area.
- Selecting a practitioner opens their larger portrait, name, role, biography and lead session beneath the row. Selecting another replaces the open profile; selecting the same one closes it.
- The open state uses `aria-expanded`, `aria-controls` and labelled regions. Hidden profiles are removed from the accessibility tree with `hidden`.
- Retained all practitioner names, biographies, image source files and the sample-profile disclosure. No new biographical claims were added.
- Mobile retains a swipeable portrait row with a visible scrollbar; the expanded image and copy stack beneath it.

Changed: `app/(public)/page.tsx`, `components/sections/Practitioners.tsx`, `components/sections/Practitioners.module.css`, `content/home.ts`, and this review. Removed: `components/sections/Guides.tsx`, `components/sections/Guides.module.css`.

Executed checks: TypeScript, ESLint, production build and whitespace diff check passed. In Chrome's local development preview, tested all five selections, single-open behavior, repeat-selection collapse, Enter/Space keyboard operation, removal of the old section and validity of internal hash links. Open-panel layouts at 320/390/768/1024/1440px had no page overflow or measured text clipping. Visually inspected desktop closed/open states and the mobile selector and expanded panel. These are desktop-browser viewport checks, not physical mobile-device tests.
