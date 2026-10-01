# Archive

Backups made on 2026-09-30 when the landing page was cut back to the header, hero and
overview strip. Nothing here is served or built.

| File | Contents |
|---|---|
| `source-snapshot-2026-09-30.tar.gz` | The full source tree before the cut: `app/`, `components/` (all sections, footer, notice dialog, forms), `content/` (all copy, FAQs, programme chapters), `lib/` (request validation, submission client, events), `tests/`, `styles/`, `next.config.ts`, `package.json`, `README.md`. |
| `unused-media-2026-09-30.tar.gz` | Hero candidates v1–v3 (sources, masters, jpg/webp exports), hero motion-study MP4s, programme stills (botanical, yoga, meditation, sound, community), and the hero generation records (`docs/hero-bright-exports.json`, `docs/hero-bright-prompts.json`). Not committed to git (see `.gitignore`). |

List or restore a file (paths inside the archives are repo-relative):

```bash
tar -tzf archive/source-snapshot-2026-09-30.tar.gz
tar -xzf archive/source-snapshot-2026-09-30.tar.gz -C /tmp/noura-restore components/story/Faq.tsx
```

Extract into a scratch folder and copy across what you need; extracting in place would
overwrite the current files.
