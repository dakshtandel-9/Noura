# Media direction / a film that lets the page remain quiet

## What is actually included in this presentation
A 12-second, audio-free MP4 motion study created by gently panning/zooming a still crop from the earlier supplied concept artwork. It demonstrates video placement, controls and text contrast. It is not a filmed scene, a confirmed venue or an approved production asset. The local-video picker replaces it temporarily on the reviewer’s device without uploading anything. Reloading restores the bundled motion study.

## Proposed final film
Duration 12–20 seconds; 3–4 unhurried shots; no hard light flashes; no baked-in text, logos, faces speaking or essential information. Avoid commercial-ad editing, rapid camera moves and a dramatic music soundtrack. A soft loop should feel continuous, not like an animation repeatedly starting over.

| Sequence | Approximate span | Composition | Production requirement |
|---|---|---|---|
| 01 Arrival | 0–5s | Natural light across foliage or a simple real setting | Stable camera, gentle light, no busy objects behind copy |
| 02 Presence | 5–10s | Approved scene of stillness or mindful movement | Signed permissions for identifiable people; appropriate, comfortable clothing |
| 03 Sound / detail | 10–15s | An approved instrument, hands or material detail | No medical procedure or fake outcome implied |
| 04 Return | 15–20s optional | Return to the opening composition | Match tone and motion for the loop |

Do not show a luxury resort as NOURA’s premises unless it actually is. Original filming, editing and asset licensing costs are separate from simply implementing the background player unless agreed in writing. Required legal permissions must be verified by the client.

## Delivery and engineering targets — proposed budgets
- High-quality master supplied separately for editing; produce a reviewed desktop crop and a genuinely considered mobile crop.
- Desktop derivative: 1280×720 or 1920×1080 as needed, 24/25fps, MP4 H.264 with fast-start metadata, no audio track. Target ≤6MB for the short loop.
- Mobile derivative: approximately 720px wide appropriate crop; target ≤2.5MB. Use poster-only by default for supported data-saver preference and when reduced motion is on.
- Optional WebM derivative after testing; never assume every browser plays one codec.
- Poster: matching first useful frame, JPEG/WebP/AVIF where supported; target ≤250KB desktop and ≤120KB mobile. Critical hero poster is not lazy-loaded [T5].
- Chapter stills: separate responsive derivatives, explicit width/height or aspect ratio, correct subject crop and useful alt text. Do not bake narrative text into photos.
These are proposed engineering budgets, not claims that unprovided footage already meets them. Check real quality and performance on the chosen host.

## Playback state model
Initial poster visible → assess reduced motion/data saver → load suitable video when appropriate → attempt muted inline play → if rejected, stay on poster and expose Play. Keep the headline and CTAs usable in every state.

Provide a persistent pause/play control with a visible label and accessible name [T1,T2]. An explicit user pause persists when the video exits/re-enters the viewport. Pause offscreen and when the document is hidden; only auto-resume if playback was automatic and the user did not pause. Handle media errors gracefully. Never force an audio unlock, full-screen player or an interaction before the visitor can scroll.

Production should not assign the video src or preload the full file under reduced-motion/data-saver defaults. The bundled single-file demo already contains its tiny study as embedded bytes for portability; that packaging choice is not the production loading architecture.

## Motion tokens
Micro controls: 180–220ms. Optional chapter reveal: 500–650ms ease-out, opacity and ≤12px vertical motion, once. No progress-controlled video scrubbing or mandatory pinned chapters. No ambient audio is included. Any future sound player requires explicit user action and independent controls.

## Accessibility
WCAG Pause/Stop/Hide applies to non-essential auto motion exceeding five seconds beside other content [T1]. Reduced-motion preferences are respected [T3]. Large text over video requires measured contrast across actual frames, not just the first poster [T4]. Use an opaque enough text scrim rather than a light shadow. Decorative video is hidden from assistive technology; a separately viewed story film with meaningful audio would need appropriate captions/transcript and a new specification.

## Media approval checklist
Client approves footage/rights, people/venue permissions, all crops, no misleading setting, absence of flashing, text-safe area, mobile legibility, poster, silent loop, motion off state, file weights and fallback behaviour. Request original vector logo independently; do not extract a production brand mark from a screenshot.
