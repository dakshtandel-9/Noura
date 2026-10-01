# NOURA — The Quiet Invitation

A calm, long-form landing page for NOURA, a private wellness community: yoga, meditation, Music & Sound and private group sessions, with a silent background film in the hero and two manually reviewed request flows.

Built with Next.js 16 (App Router) and TypeScript. The approved specification lives in [`docs/`](docs/README.md); read [`AGENTS.md`](AGENTS.md) before changing anything.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional; defaults are safe for local work
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm test` | Unit tests (Node's built-in runner) for the request validation rules |
| `npm run check` | All three checks above |

Requires Node.js ≥ 20.9 (tests use Node's type stripping, available in Node 22.6+).

## Repository layout

```
app/
  layout.tsx              local fonts (next/font), metadata, skip link
  globals.css             base styles, typography, buttons, reveal
  (public)/page.tsx       the landing page, sections in the approved narrative order
components/
  layout/                 SiteHeader, RevealObserver (page chrome and behaviour)
  sections/               one component + CSS module per landing-page section
  ui/                     shared primitives: Button, Icon, Lines
content/                  all public copy, navigation and media references (typed, reviewable)
styles/tokens.css         design tokens — the single source for colour, type, space, motion
public/media/
  brand/                  supplied NOURA logo and wordmark (use unchanged)
  hero/                   hero stills (desktop, portrait) and the social share image
docs/                     specification set, icon sources, and the reference presentation HTML
archive/                  compressed backups of removed code and unused media (see archive/README.md)
```

Adding a section: create `components/sections/<Name>.tsx` + `<Name>.module.css`, put its copy in `content/home.ts`, and place it in `app/(public)/page.tsx` at its position from `docs/site-structure.md`.

## Status

**Built:** header (transparent over the hero, solid on scroll, mobile menu), arrival hero (static art-directed still), the overview strip under it (the four experiences as anchors), the experience tiles, the shared-experience (Connect) section, the invitation journey, the member-identity sample card, the invitation and private-session request sections, the questions + closing section (UI only: native validation, then a "nothing has been sent" preview notice), and the redesigned footer. Shared experience, invitation journey and invitation request use conceptual artwork; the private-session image is still a grey placeholder.

**Legal/newsletter review:** `/terms`, `/privacy` and `/cookies` show review outlines in development; production returns 404 and omits those links until owner-approved wording is supplied. The footer introduces the newsletter, but collects no addresses until a mailing service and separate marketing consent/notice are approved.

**Removed for now** (restorable from `archive/`): every other section, the privacy notice dialog, the request validation/submission layer and its unit tests, and the unused hero variants and programme stills. Header and strip links point to sections that are not rebuilt yet.

**Client inputs still pending** (`docs/client-inputs.md`): approved hero and programme photography, the original vector / transparent logo, brand positioning copy, public contact and social links, approved privacy, terms and cookie wording, newsletter provider and consent wording, favicon.
