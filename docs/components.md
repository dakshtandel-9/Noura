# Component inventory and interaction contracts
Every component must support keyboard interaction, zoom/reflow and reduced-motion behaviour where applicable. Use the exact tokens in `tokens.css`; component examples are not independent palettes.

| Component | Main inputs | Behaviour / states | Completion evidence |
|---|---|---|---|
| BrandLockup | approved logo asset, alt, size | Native aspect ratio, light zone, no filters | Correct gold variant at desktop/mobile |
| SiteHeader | anchors, invitation target | Sticky without covering headings; menu opens/closes with Escape and returns focus | Keyboard and 320px test |
| HeroFilm | poster, desktop/mobile sources, copy | Muted, loop, inline, caught play error, pause persists, poster fallback | Playback matrix |
| ChapterIntro | eyebrow, heading, text | Semantic heading, bounded line length | Readable with long text |
| ExperienceIndex | approved 4 anchors + icons | One target per card, no nested controls | All four links correct |
| ExperienceChapter | image, alt, copy, programme | Alternating desktop split; mobile logical order; action preselects programme | Form state mapping |
| QuietInterlude | still or copy | Does not force time or interaction | No JS / reduced motion |
| SessionRhythm | four approved steps | Static timeline on desktop; vertical on mobile | Labelled sample until approved |
| InvitationJourney | three steps | Submission is not approval | Process wording reviewed |
| MemberCardPreview | demonstration data | Label as example; no live data, no credential-like token | Long-name and ID wrap |
| PrivacyReassurance | approved content | No security absolutes | Text review |
| FAQ | question, answer | Native details/summary or fully accessible disclosure; no auto-advance | Tab/Space/Enter tests |
| RequestForm | kind, field schema, notice | Empty/focus/error/submitting/success/retry/rate-limit states | Field and API tests |
| FormField | id, label, helper, error | aria-describedby and aria-invalid; no placeholder-only label | Screen-reader labels |
| Button | variant, state, icon | 48–52px height; disabled is not interactive; loading is announced | State gallery |
| IconButton | icon, accessible name | ≥44px hit area, visible focus | Meaningful label |
| StatusBadge | status | Text plus colour, not colour alone | Contrast check |
| AdminTable | rows, sort, pagination | Search, filters, empty/loading/error; mobile horizontal table region or labelled cards | Real counts and states |
| RequestDetail | safe fields, notes, actions | Private notes separate from outward copy; confirm irreversible actions | Unauthorized-action test |
| MemberEditor | record, version | Constrained fields and conflict state; code not freely editable | Concurrent edit test |
| CardGenerator | approved member, template | Auth-only preview/download; no public storage | Private-download test |
| ConfirmationDialog | title, action, cancel | Focus trap, Escape/cancel, restore trigger focus | Keyboard test |
| Footer | approved links | No fabricated contact, unused links or fake socials | Link audit |

## Interaction mapping
The experience index arrows go to the matching narrative chapter. In a chapter, “Request a [programme] session” scrolls to `#private-session`, selects the corresponding option and focuses the session selector without automatically submitting. Invitation CTAs go to `#invitation`. External links use a descriptive label; a decorative arrow is aria-hidden. The card-preview arrow, if any, is not a public real-card download.

## Form design states
Show a local summary above the form after a failed submission and link errors to fields. On submit, prevent duplicate clicks while processing; on network failure, allow an explicit retry with the same idempotency key. Once saved, show a generic acknowledgement and avoid exposing membership status. Email automation is a separate implementation decision.

## Proposed media rules
Hero is full-bleed; chapter stills usually 4:5 or 3:2; keep faces and meaningful actions in the safe crop. Reserve image dimensions/aspect ratio to avoid layout shift. Images below the fold may lazy-load; the hero poster must not [T5]. Use approved alt text for meaningful imagery and empty alt for decoration.

## Admin visual rule
The admin is a working tool, not a luxury brochure. Use the body font, 14–16px table text, clean surfaces, clear filters and concise status labels. Keep brand colour in selected buttons and highlights. No animated background video, giant serif headings or ornamental image panels in admin.
