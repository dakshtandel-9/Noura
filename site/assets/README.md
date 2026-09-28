# site/assets — approved media drop folder

The landing page loads these exact filenames. They are listed in `../../asset-manifest.md` but were not
included in the repository, so the page currently shows labelled "pending" placeholders in their place.
Add the files here to show them. Keep production assets out of git unless their rights are recorded.

| File | Used for | Target (see `media-motion.md`) |
|---|---|---|
| `noura-wordmark.webp` | Header lock-up (right-hand gold logo crop) | Original vector preferred; approve the crop |
| `noura-logo.webp` | Member-card emblem and footer mark | Unaltered supplied gold logo |
| `hero-poster.jpg` | Hero poster / reduced-motion and fallback state | ≤250KB desktop, first useful frame |
| `hero-motion-study.mp4` | Silent looping hero film | H.264, fast-start, no audio, ≤6MB desktop |
| `botanical.webp` | Philosophy arch (4:5) | Responsive derivative, explicit size |
| `yoga.webp` | Chapter 01 / Move (4:5) | |
| `meditation.webp` | Chapter 02 / Be still (4:5, arched) | |
| `sound.webp` | Chapter 03 / Listen (3:2) | |
| `community.webp` | Chapter 04 / Connect (4:5) | |
| `stillness.webp` | Sensory pause (21:9 desktop, 4:3 mobile) | Conceptual setting, not a venue claim |

An optional mobile film crop can be added with `data-src-mobile="assets/hero-mobile.mp4"` on the hero
`<video>` (target ≤2.5MB). Never redraw, recolour or filter the logo, and never replace it with typeset text.
