# Research and provenance / reviewed 24 September 2026

## What was researched
Official brand pages for Aman, Six Senses, Aro Hā and COMO Shambhala were reviewed for content organization, philosophy, experience explanation and user journey. This was desk research of available page content, not a claim that every live animation, device view or conversion outcome was tested. No competitor assets or text are copied into the proposed site.

The decisions below are design interpretations for NOURA. They are not evidence that a particular visual arrangement increases conversion. Wellness claims appearing on a reference site are not adopted as medical facts or as NOURA claims.

## Brand references

### R1 — Aman · Wellness
Source: [Aman · Wellness](https://www.aman.com/wellness)

**Observed content pattern:** Introduces a wellness philosophy, then groups experiences under a small set of principles.

**Our proposed application:** Give NOURA a short philosophy before the detailed experience chapters. Do not copy Aman’s wording or clinical positioning.

### R2 — Six Senses · Integrated Wellness
Source: [Six Senses · Integrated Wellness](https://www.sixsenses.com/en/wellness-spa/)

**Observed content pattern:** Connects wellbeing to several parts of the guest experience rather than presenting only a treatment list.

**Our proposed application:** Make movement, stillness, sound and connection feel like one coherent experience; keep only NOURA’s approved offerings.

### R3 — Aro Hā · Homepage
Source: [Aro Hā · Homepage](https://www.aro-ha.com/)

**Observed content pattern:** Combines a long narrative with experience descriptions, a typical-day section, and repeated next-step actions.

**Our proposed application:** Use distinct chapters and an illustrative session rhythm. Replace its booking flow with NOURA’s manual request process.

### R4 — COMO Shambhala · About
Source: [COMO Shambhala · About](https://www.comoshambhala.com/about)

**Observed content pattern:** Explains its philosophy before describing where and how the experience is delivered.

**Our proposed application:** Connect the brand intention to human, sensory details. Do not invent a NOURA venue, founder history or healing claims.

## Technical references

### T1 — W3C · Pause, Stop, Hide
Source: [W3C · Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)

**Source-supported point:** Automatically moving content lasting more than five seconds alongside other content needs a pause, stop or hide mechanism unless essential.

**Our proposed application:** The hero has a persistent pause/play button. A deliberate pause is not undone by scrolling back into view.

### T2 — MDN · Autoplay guide
Source: [MDN · Autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)

**Source-supported point:** Muted or audio-free video is more compatible with autoplay policies; play attempts can still be rejected.

**Our proposed application:** Use muted, loop and playsinline, handle play() rejection, and always keep a usable poster fallback.

### T3 — MDN · prefers-reduced-motion
Source: [MDN · prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

**Source-supported point:** The media query detects a preference to reduce non-essential movement.

**Our proposed application:** Start with a still poster and remove reveals or transforms when reduced motion is requested.

### T4 — W3C · Contrast Minimum
Source: [W3C · Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

**Source-supported point:** Normal text needs at least 4.5:1 contrast; qualifying large text needs at least 3:1.

**Our proposed application:** Use dark ink on gold buttons and a dark bronze for small accent text. Check actual video frames, not just the palette.

### T5 — web.dev · Lazy loading video
Source: [web.dev · Lazy loading video](https://web.dev/articles/lazy-loading-video)

**Source-supported point:** Discusses video poster, preload and loading choices, including the importance of the poster when it is an LCP candidate.

**Our proposed application:** Load the hero poster promptly; do not lazy-load that poster. Defer non-critical media and keep the final video separately cached.

### T6 — Next.js · Mutating Data
Source: [Next.js · Mutating Data](https://nextjs.org/docs/app/getting-started/mutating-data)

**Source-supported point:** Server Functions can be invoked directly through requests, so identity and permission checks belong inside each sensitive operation.

**Our proposed application:** Authorize every admin mutation and card download. A hidden admin link or protected layout alone is not authorization.

### T7 — Supabase · Row Level Security
Source: [Supabase · Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

**Source-supported point:** RLS controls row access; elevated service credentials can bypass it.

**Our proposed application:** Enable restrictive RLS, keep elevated keys server-only, and test anonymous, non-admin and revoked-admin requests.

### T8 — Cloudflare R2 · Presigned URLs
Source: [Cloudflare R2 · Presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/)

**Source-supported point:** Presigned URLs grant temporary access to specified object operations.

**Our proposed application:** Separate public brand media from private personal-data assets. Authorize before issuing a short-lived private link.

### T9 — web.dev · Web Vitals
Source: [web.dev · Web Vitals](https://web.dev/articles/vitals)

**Source-supported point:** Defines the Core Web Vitals and good thresholds for LCP, INP and CLS.

**Our proposed application:** Target LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1 at the 75th percentile in production; the presentation is not a performance certification.

## Source vs recommendation ledger
**S1 / documented baseline:** `Sidhart_Luxury_Wellness_Proposal_Updated.pdf`, pp4–16. Features, maintenance and commercial baseline.
**S2 / earlier planning:** `Sidhart_Website_Build_Roadmap_Step_0_to_100.pdf`, pp6–12. Proposed routes, workflows and technical decisions; not proof of approval.
**S3 / earlier concepts:** `NOURA_All_Options_design.md`, Options 3–4. Storytelling and gold-led visual ideas. Some examples included spa treatments, fabricated example proof or additional content that is not part of the documented scope.
**S4 / user-selected identity:** supplied two-logo image; gold right-hand NOURA mark only.
**S5 / latest user request:** peaceful background-video hero and complete long storytelling landing page with downloadable specifications.

## Deliberate reconciliation — not silent scope changes
The new design splits the earlier experience area into multiple story chapters. This increases design/content detail, not automatically the number of included standalone pages. We retain yoga, meditation, sound and private groups and do not import facials, massages, paid subscriptions, clinical claims, fake reviews or press logos from prior generated concept boards. The new session-rhythm and FAQ copy is a proposed content treatment needing approval. Gold UI values, widths, budgets, exact states and schema are recommendations, not extracted official brand standards.

No signed acceptance, paid advance, final video, actual venue, legal notice, admin list or final production hosting plan is verified by this artifact. Open questions stay visible in client-inputs.md.
