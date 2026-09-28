# NOURA landing page — `site/`

The public long-form landing page (`/`) built from this design library: all 18 blocks of
`site-structure.md` in the approved order, draft copy from `content.md`, the shared `tokens.css`,
Playfair Display + Inter and the supplied 24px icon set.

It is a framework-free static page (HTML + CSS + a small progressive-enhancement script) so it can be
reviewed now and lifted into the proposed Next.js app later (`architecture.md`) without redesign.

## Run it
Serve the **repository root** (the page links `../tokens.css`):

```sh
python3 -m http.server 8765
# open http://localhost:8765/site/
```

## What works
- Video hero, poster first: the film is only requested when motion is allowed and data-saver is off.
  Muted, inline and looping, with a persistent ≥44px Pause/Play control. An explicit pause survives
  scrolling away and switching tabs. If the film is blocked or missing, the poster stays and the copy
  and CTAs keep working. Reduced motion shows the poster and offers Play.
- Anchor navigation, sticky header and an accessible mobile menu (Escape closes it and returns focus),
  plus a skip link.
- The experience index links to the four chapters. The Yoga / Meditation / Sound actions scroll to the
  private-session form, preselect that programme and focus the selector. Private Groups goes to the
  invitation form.
- A native `details` FAQ, the sample member card (`NRA-DEMO-001`, demonstration only) and the
  illustrative session rhythm.
- Both request forms use the field rules from `requirements.md`. They have a linked error summary,
  inline errors (text + icon), a duplicate-click guard, an idempotency key and a honeypot, and they
  show the generic acknowledgement copy.

## Deliberately not done (needs approval or a later slice)
- **The forms do not send anything.** They validate locally and show a clearly labelled simulated
  result. The production endpoints `POST /api/requests/invitation|session` (server validation, rate
  limit, storage) belong to the backend slice.
- **No media assets are in the repository.** The page loads the filenames in `assets/README.md` and
  shows labelled "pending" slots until they are added. The logo is never redrawn or typeset.
- Public contact, social links, privacy notice and terms stay hidden until the client supplies them.
  The referral-source options are a proposal.
- Preview labels are controlled by `data-mode="preview"` on `<html>`. Remove that attribute (and the
  `noindex` meta) only when content, assets and legal copy are approved.

## Checks
`tests/landing.check.cjs` drives Chromium through structure, responsive, keyboard, media-state and
demo-form checks. See the header of that file for how to run it.
