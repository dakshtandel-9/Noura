# NOURA design.md — The Quiet Invitation
Status: proposed final direction for client sign-off. Version 1.0. 24 September 2026.

## 1. Design objective
Create a calm, mindful, peaceful arrival followed by a long, intentional story. A visitor should understand what NOURA offers, how the experience feels, and how to request access without being hurried. The visual should feel luxurious because of restraint, composition, credible imagery and clarity, not because everything is gold.

The site uses Option 3’s narrative flow and botanical/arched composition with Option 4’s fine gold lines and considered control details. The system below resolves the four options into **one consistent set of production tokens**, rather than mixing competing palettes or font families.

## 2. Brand rules
Use the supplied **right-hand gold NOURA logo**. The green version and the earlier SEREN mark are not alternatives. Do not recreate, trace, recolour, distort, animate, outline or apply CSS filters to the logo. Use a clean light logo zone, preserve its aspect ratio, and keep clear space of at least one quarter of the emblem’s height. The isolated wordmark used in the prototype is a presentation crop; the exact header lock-up and original vector file need approval. Do not manually typeset NOURA as a replacement logo.

The gold UI token is a proposed flat companion to the raster logo’s tonal gold, not a claim that a multitone image has one official hex value. Request the original SVG/PDF brand source before final favicon and small-size exports.

## 3. Colour system
| Role | Token | Value | Rule |
|---|---|---|---|
| Presentation canvas | canvas | #FFFFFF | Documentation, header and clean whitespace |
| Main website ground | background | #FBF9F4 | Warm off-white, not yellow |
| Secondary panel | surface | #F1EDE4 | Forms and quiet section variation |
| Material accent | sand | #EAE2D4 | Card backplates and dividers |
| Brand companion | gold | #C9A962 | Primary controls, small marks, hairlines |
| Hover gold | gold-hover | #B9974D | Preserve dark button text |
| Readable accent | bronze | #765626 | Small links/eyebrows on light backgrounds |
| Botanical accent | sage | #95A187 | Decorative fills, never default body text |
| Deep interlude | forest | #31473C | One sound chapter and selected controls |
| Main text | ink | #27352D | Headings, paragraphs and gold-button labels |
| Supporting text | muted | #586259 | Captions and labels after contrast checking |
| Decorative border | border | #DDD9CF | Dividers; not the only input boundary |
| Input boundary | input-border | #7D877D | Clearly visible form-control border |
| Focus | focus | #765626 | 3px outline with 3px offset on light surfaces |
| Error | error | #A22D2D | With text and an icon, never colour alone |
| Success | success | #285B40 | With an explicit textual confirmation |

Aim for mostly white/ivory space, natural imagery and dark readable type; gold is an accent, not a gold-washed page. This is an art-direction recommendation, not a numerical brand contract.

### Measured solid-colour contrast
- Ink / canvas: **12.86:1**.
- Muted / background: **6.04:1**.
- Ink / gold: **5.72:1**.
- White / forest: **10.01:1**.
- Bronze / background: **6.38:1**.
- White / gold — avoid: **2.25:1**.

Ratios are calculated from the listed sRGB values using relative luminance, rounded for display. Normal text must reach 4.5:1 and qualifying large text 3:1 [T4]. Do not use small white text on pale gold. A ratio for a solid palette does not prove contrast over moving footage: review every exported shot and the actual overlay.

## 4. Typography
**Playfair Display 400/500** for display headings. **Inter 400/500/600** for body, labels, navigation, forms and all admin UI. Fallbacks: Georgia/serif and system-ui/Arial/sans-serif. No third family and no script taglines. Check font licensing, subset/weights and loading during implementation; do not distribute local font binaries in the handoff.

| Style | Desktop | Mobile | Leading / weight |
|---|---|---|---|
| H1 | 80–92px fluid | 46–54px fluid | 1.06 / 400 |
| H2 | 48–60px | 34–40px | 1.12 / 400 |
| H3 | 28–32px | 25–28px | 1.2 / 400 |
| Large intro | 20px | 18px | 1.65 / 400 |
| Body | 17–18px | 16–17px | 1.65 / 400 |
| Form label | 14px | 14px | 1.45 / 500 |
| Button | 14px | 14px | 1.35 / 600 |
| Eyebrow | 11–12px | 11–12px | 1.4 / 500; .16em tracking |
| Supporting note | 13px | 13px | 1.5 / 400 |

Use one H1 per page and a logical heading outline. Do not centre long paragraphs or use uppercase body copy. Text columns are normally 42–65 characters wide. Keep hero line breaks editorial on desktop but allow natural reflow on mobile. Long names, translated content and text zoom must not be clipped.

## 5. Grid, space and surfaces
Use a 4px micro-grid within an 8px rhythm. Spacing: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160. Maximum content width 1,240px. Suggested gutters: 24px mobile, 40px tablet, 64–72px desktop. Major sections: 128px desktop, 88px tablet, 64px mobile; related submodules 32–48px. Form/card padding: 24px mobile / 32–40px desktop.

Desktop uses a 12-column mental grid; editorial splits alternate 5/7 and 7/5. Tablet is a simpler two-column grid; below 768px stack in a meaningful reading order. Breakpoints: 640 / 768 / 1024 / 1280px are proposed implementation points, not device guarantees. Test at 320, 390, 768, 1024 and 1440px and with 200% text zoom.

Hero minimum height: about 680px desktop and 680–760px mobile, allowed to grow for text; never crop CTAs to enforce a screen height. Use small-viewport units as an enhancement. No horizontal scroll-jacking. Use 12px card radius, 8px field radius and pill CTA radius. Arch crops are a distinctive image treatment, not a shape for every card. Borders are 1px; shadows are very subtle and never the only visual boundary.

## 6. Narrative and navigation
The 18 blocks in `site-structure.md` form one landing page. Header links are anchors: Philosophy, Experiences, Your invitation. Primary action is **Request an invitation**. Secondary conversion is **Request a private session**. Experience arrows either move to a chapter or preselect a session in the private-session form. No new About, Journal, Membership checkout or programme-detail routes are implied.

Story order: arrival → pause → intention → four ways → yoga → meditation → sound → private groups → sample session rhythm → sensory pause → invitation process → member identity → privacy → questions → invitation form → private-session form → close. Do not put two large forms before the visitor understands the experience.

## 7. Video hero
The video is atmosphere; the headline, explanation and CTAs remain real selectable HTML. There is no text burned into footage. Muted, audio-free, looping, inline video; 12–20 second final edit proposed. A poster is shown immediately and whenever playback is unavailable. Never wait for the film to reveal the headline. Show a persistent ≥44px pause/play control, handle blocked autoplay, and stop autoplay for reduced motion or a supported data-saver preference [T1–T3]. No sound plays automatically. A visitor can still request access without video or JavaScript.

Final film shot plan and export targets are in `media-motion.md`. The bundled 12-second MP4 is a motion study made from supplied concept artwork, not a filmed production asset. Reviewers can choose a local video in the preview without uploading it.

## 8. Components and states
Buttons: 48–52px tall, 24px horizontal padding; icon gap 12px; dark ink on gold primary; forest/ivory secondary; text links underlined or otherwise unmistakably linked. Show hover, active, focus-visible, disabled and loading states. An arrow moves at most 3px; do not move the target hitbox. Circular arrow hit areas are 44–48px with 20–24px glyphs. Every icon-only action needs a descriptive accessible name.

Fields: visible labels, 52px minimum height, 16px text, helper text and error association. Use real select, email, tel and date controls where appropriate. Required state is explicit. Loading prevents duplicate submissions. Failed requests preserve safe input; success never announces a confirmed booking. Exact field rules live in `requirements.md`.

Cards: whole-card links are appropriate only for a single destination. Do not nest buttons inside links. Status badges use text plus colour. Sample member card is illustrative; real cards are only for authorized admins. Admin screens use the body font and compact, readable information density, not giant editorial headings.

## 9. Icons and motion
Use the provided 24×24 SVG set with 1.5px rounded strokes. Motifs: leaf, lotus, waves, people, calendar, lock, shield, card and restrained arrows. Gold/bronze for decorative emphasis, ink/forest for functional clarity. No emoji as production interface icons. Hide decorative SVGs from assistive technology.

Micro-interactions: 180–220ms ease-out. Optional section reveal: 500–650ms, opacity and at most 12px movement, once. No endlessly pulsing icons, breathing timers, cursor trails, autoplay carousels, compulsory audio, blocking preloaders, or a forced “slow” scroll. Reduced motion removes transforms and automatic video [T3]. All narrative text stays readable without animation.

## 10. Content and trust
Keep an unhurried, specific, welcoming voice. Describe yoga, meditation, Music & Sound and Private Group Sessions. Do not add facials, massage, nutrition programmes, retreats, medical services or public subscriptions merely because earlier concept boards suggested them. Do not publish made-up founder stories, customer counts, years in business, awards, publication logos or testimonials. Do not promise health outcomes. Real testimonials are an optional slot only after client approval and permission.

## 11. Completion gate
Approve the desktop and mobile hero; entire narrative order; each experience chapter; logo treatment; both form states; admin list/detail; digital card; reduced-motion/poster state; text contrast; legal/contact inputs and scope changes. “Looks calm” is not sufficient acceptance if the request workflow is wrong.

## Source basis and document status
S1: `Sidhart_Luxury_Wellness_Proposal_Updated.pdf`, pp4–16. S2: `Sidhart_Website_Build_Roadmap_Step_0_to_100.pdf`, pp6–12. S3: `NOURA_All_Options_design.md`, Options 3 and 4. S4: the supplied two-logo image; only the right-hand gold version is selected. S5: latest instruction for calm, mindful, peaceful storytelling, a background-video hero and one long landing page.

S1 is the documented scope, not proof that the agreement is signed or an advance was paid. S2 and S3 are earlier proposals, not independently approved requirements. This release is a proposed consolidated design and implementation specification. It does not silently revise the agreement. Any new module or production cost needs approval. Research sources and the decisions drawn from them are listed in `research.md`.
