# Member experience design — 30 October 2026

Owner request: organize and design the member page from the eight supplied visual
references, using original images from the built-in generator and no Higgsfield
account. This adds an editorial design to the existing authenticated `/members`
page. `/member` redirects there, retaining the current server authorization.

## Design and scope

The page contains an introduction and chapter navigation followed by:

1. Three-day Arrive / Explore / Return cards.
2. Food: photography and an editorial introduction to nourishment.
3. Salons: small-group conversation photography and possible discussion themes.
4. Evening: sunset gathering photography beside a forest-green text panel.
5. Your journey: a decorative phone-shaped preview and personal-intention copy.
6. Before arrival: an illustrative preparation timeline and arched garden photo.
7. Concierge: invitation still life, preferences and a link to existing contact.
8. Invitation identity: the existing `MemberIdentity` component and sample code.

The gold logo, shared tokens, Playfair Display and Inter are preserved. All copy is
HTML; photographs contain no text. Native anchors work without JavaScript. The
phone is a visual illustration, not a new member application or preference form.
The sample card remains `NRA-DEMO-001`, not the signed-in user's membership record.

The owner approved the design work through the current request. Programme dates,
venue, services and concierge coverage remain explicitly illustrative and subject
to confirmation; this does not resolve the operational decisions in the original
specifications. No booking, payment, automated notification, real member card,
membership approval, database change or production deployment is part of this slice.

## Original generated assets

Tool: built-in `image_gen` (not the CLI fallback and not Higgsfield).
The exact shared brief and all seven scene prompts are in
[`member-image-prompts.json`](./member-image-prompts.json).

All assets are 1536 × 1024 WebP files, encoded from the generated PNGs at quality
84. The seven delivered images total approximately 1.6 MB before Next.js responsive
image optimization. Below-the-fold photos are lazy-loaded. This is a file-weight
measurement, not a production performance score.

| File in `public/media/members/` | Used for |
| --- | --- |
| `arrival-v1.webp` | Day one and the journey illustration |
| `garden-v1.webp` | Day two and the preparation chapter |
| `pavilion-v1.webp` | Day three |
| `nourish-v1.webp` | Food |
| `salons-v1.webp` | Small-group conversations |
| `evening-v1.webp` | Sunset gathering |
| `concierge-v1.webp` | Concierge still life |

These are conceptual scenes with fictional people and settings, not photographs
of a verified venue, actual guests or practitioners. The original generator
outputs are retained in the generator's local output directory; the page only
references files saved in this repository.

## Files changed by this slice

- `app/members/page.tsx`: render the design after the existing session check.
- `app/member/page.tsx`: redirect the singular URL to the existing member route.
- `components/members/MemberExperience.tsx`: eight-section server component.
- `components/members/MemberExperience.module.css`: responsive member-only styles.
- `content/members.ts`: typed image, chapter, day and preparation data.
- `public/media/members/`: seven original generated images.
- `docs/member-image-prompts.json`: exact generation prompts and provenance.
- `docs/member-page-design.md`: this scope and verification record.

The public homepage, shared header, existing identity component and authentication
implementation were reused. Other pre-existing/in-progress account and admin
changes in the working tree are outside this design slice.

## Verification

Environment: local production build, Chrome 156.0.8078.74, 30 October 2026.
Authentication used local Firebase Auth/Firestore emulators with the dummy project
`demo-noura-members-design`. Only disposable example accounts were created, then
removed. No live account, data, notification or production configuration was used.

- `npm run check`: TypeScript passed, ESLint had no errors, all 31 unit tests passed.
  The existing unused `f` warning in `components/sections/Enquire.tsx:15` remains.
- `npm run build`: passed, including `/member` and the protected `/members` route.
- `git diff --check`: passed.
- UX-01: all eight chapter links resolve; keyboard activation and skip link pass.
- UX-02: 320, 390, 768, 1024 and 1440 CSS-pixel widths have no horizontal overflow,
  clipped elements or broken images. These are desktop browser viewport tests.
- UX-05: one H1 and main landmark; eight H2 sections; page remains noindex.
- UX-07/08: conceptual programme/imagery and sample identity are identified;
  approved logo assets are reused unchanged.
- VID-02 / REL-03: no automatic media; all eight sections and the sample card render
  without JavaScript. Card visibility also passes with a leftover public-page
  reveal flag, avoiding content hidden after client navigation.
- AUTH-01: anonymous `/members` requests redirect to `/login`; `/member` redirects
  to that same protected route. Browser sign-in shows the design; sign-out and a
  subsequent direct visit return to login.
- No browser JavaScript errors occurred during the responsive review.

Screenshots and the executable temporary review script are in
`/tmp/noura-member-review/`. Physical devices, other browsers, field performance,
production launch and final operational/content approval were not tested or claimed.
