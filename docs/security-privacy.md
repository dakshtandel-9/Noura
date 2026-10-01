# Security and privacy / implementation checklist
This is technical planning, not a legal privacy policy or a certification. The client must approve collection purpose, consent/notice wording, applicable obligations, retention and deletion instructions with appropriate advice. Do not publish the prototype’s explanatory legal placeholder as a real notice.

## Before collecting a single live request
- Confirm why each field is necessary. Default to name, contact, relevant interests and session preference; no medical histories or identity documents.
- Record a versioned, approved privacy notice and any required acknowledgement. Marketing consent, if later introduced, is separate and optional.
- Name the authorized admin users and the person who handles privacy/support requests.
- Use client-owned service accounts with recovery controls; do not share passwords in the project files.
- Decide actual data region, retention, backup and deletion arrangements. Do not infer these from the chosen provider’s marketing.

## Access and data boundaries
Validate identity and current admin permission on every sensitive server action, endpoint and download [T6]. Enable restrictive RLS and test it with anonymous, authenticated non-admin and revoked users [T7]. A service key that bypasses row policies is server-only and is not a shortcut around per-operation checks. Keep private responses uncached; never include private records in generated public pages, open object lists or analytics events.

Protect custom submission endpoints against abuse with bounded body size, validated schemas, idempotency, origin handling, a honeypot/time heuristic and a real server-side rate limiter appropriate to the host. Client validation alone is not protection. Choose any challenge tool after cost, accessibility and privacy review. Do not silently make a paid anti-bot service part of the commercial scope.

## Input, errors and secrets
Treat all form content as untrusted. Render text safely; do not insert user HTML. Use parameterized database operations and allowlisted filters. Return useful but generic errors; never stack traces, service keys, role metadata or applicant status. Sanitize diagnostic events. Never put secrets in URLs, frontend environment variables, downloaded design files or client-visible logs.

## Files and cards
Keep approved public marketing media apart from private personal-data files. Auth-check every upload and private retrieval, validate MIME/type and size, and restrict object names. Never make an entire member-card bucket public. An expiring signed URL can be used by its holder until expiry, so issue only when needed after authorization [T8]. Prefer no persistent personal card file when an authorized stream is sufficient. A display member code or QR is not a login method.

## Operational controls
Enable owner/admin MFA where supported and appropriate; revoke departing staff; periodically review authorization. Use dummy staging records. Document backup availability on the actual plan and test a restore. Log minimal actor/action/time for significant changes, not sensitive free text. Define who investigates an incident and how the client is notified; applicable legal notification duties need separate review.

## Required negative tests
Anonymous reads return no staff data. Non-admin sessions cannot access lists or files. Revoked admins fail on an existing session. Directly called mutations enforce permission. Card IDs cannot be swapped to bypass access. Duplicate or concurrent approval is safe. Public caches/storage do not expose sensitive records. Error responses reveal no secrets. These tests are launch gates, not optional cosmetic QA.
