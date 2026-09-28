# AGENTS.md / NOURA implementation guardrails

## Read first
README.md → requirements.md → design.md → site-structure.md → architecture.md → data-model.md → acceptance-tests.md. Do not infer requirements from earlier concept-image text when it conflicts with this approved version. Ask for approval where the specification says pending; do not invent an answer.

## Product boundaries
One calm long-form landing page, two manually reviewed request flows, admin-only records, stable unique member IDs and one card template. No checkout, instant booking, public member login, auto-approval, medical records, unrelated spa treatments, fake statistics/testimonials, page builder or paid integration without a written change request.

## Visual boundaries
Use the supplied gold NOURA logo unchanged. Use the shared CSS tokens and Playfair Display + Inter. Preserve the narrative order, white/ivory breathing space, understated gold detail and media controls. No scroll hijacking, heavy parallax, flashing, forced audio or content hidden until animation completes. Do not redraw the logo with SVG primitives or text.

## Engineering boundaries
Use server-side validation and current admin authorization for every sensitive operation. Do not treat a protected layout or hidden link as security. RLS is mandatory for client-accessible data; service credentials remain server-only. Public submission code is a narrowly validated write, not a database proxy. Member approval is idempotent and transactional. Store no live secrets or personal applicant details in logs, prompts or fixture files.

## Working method
Before each task, state the component/vertical slice, files to touch and acceptance cases. Implement one slice, run real checks, fix errors, then report changed files and tests actually run. Keep interfaces typed. Add database migrations and tests together. Use small commits after review. Do not claim completion of tests that were not executed. Do not silently rewrite commercial terms or broaden scope.

## Release discipline
No production deployment, migrations on a live database, deletion of live records, public bucket changes or sending of real notifications without the owner’s explicit approval. Use dummy data. Confirm backup/rollback before launch. The static HTML is a visual specification, not the backend implementation.
