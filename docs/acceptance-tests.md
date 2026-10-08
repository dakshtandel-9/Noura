# Acceptance matrix / evidence before launch
All cases are proposed release checks. A tick needs a test result, date, browser/environment and reviewer. “Looks correct” is not a backend test. This HTML package demonstrates some UI cases only; it does not claim production tests have passed.

| ID | Area | Pass condition |
|---|---|---|
| UX-01 | Navigation | All anchors, experience arrows and both CTAs reach the correct section. |
| UX-02 | Mobile | 320/390px views have no unintended horizontal overflow or clipped controls. |
| UX-03 | Zoom | At 200% text zoom, all content and form actions remain reachable. |
| UX-04 | Keyboard | Menu, FAQ, controls and both forms work with keyboard; focus is visible. |
| UX-05 | Headings | One public H1, logical headings, useful landmarks and a skip link. |
| UX-06 | Contrast | Text/control contrast checked, including real video frames and every status. |
| UX-07 | Copy | No fake press, reviews, numbers, founder details, venue or outcome claims. |
| UX-08 | Logo | Only the approved gold mark; no stretching, recolouring or alternate SEREN mark. |
| VID-01 | Autoplay | Muted inline playback starts where permitted; blocked play shows a usable fallback. |
| VID-02 | Reduced motion | Poster-only on first load; no automatic transforms or background play. |
| VID-03 | Pause | Explicit pause remains paused after scrolling away and back or switching tabs. |
| VID-04 | Failure | Unavailable/unsupported video leaves poster, copy and CTAs intact. |
| VID-05 | Mobile media | Correct crop; important subject/content not obscured; no forced fullscreen. |
| VID-06 | Controls | Pause/play has a visible label, keyboard support and adequate hit area. |
| FORM-01 | Invitation valid | One valid invitation is saved and visible only to enabled admins. |
| FORM-02 | Session valid | One valid private request saves selected programme and date preference. |
| FORM-03 | Required fields | Invalid name/email/interest rejected server-side with clear safe errors. |
| FORM-04 | Limits | Oversize text, body or invalid session/status values cannot bypass validation. |
| FORM-05 | Date | Past date relative to approved timezone is rejected; no instant booking promise. |
| FORM-06 | Retry | Double click/retry with same idempotency key creates one request. |
| FORM-07 | Network | Recoverable failure preserves safe input and permits a deliberate retry. |
| FORM-08 | Abuse | Rate limit and abuse controls work at server boundary, not just in the browser. |
| FORM-09 | Privacy | Approved notice version and required acknowledgement recorded accurately. |
| FORM-10 | No leak | Duplicate/error responses do not reveal existing membership or private notes. |
| AUTH-01 | Anonymous | Direct private list/detail/mutation/card requests are denied. |
| AUTH-02 | Non-admin | Signed-in non-admin has no staff data access. |
| AUTH-03 | Revoked | Revoked admin cannot use a still-existing session for private actions. |
| AUTH-04 | Direct action | Authorization runs inside the operation, not only in page navigation. |
| AUTH-05 | Secrets | No service secrets or applicant data in browser bundle, public page or logs. |
| ADM-01 | Queues | Counts, filters, sort, pagination and empty/error states reflect actual records. |
| ADM-02 | Approval | Repeated or concurrent invitation approval creates/links one member. |
| ADM-03 | Conflicts | Concurrent record edits show a conflict rather than silent overwrite. |
| ADM-04 | Private notes | Review notes remain private and are not copied to public confirmations. |
| ADM-05 | Lead dashboard | Total, contacted, to-contact and new counts reflect both request collections; all-leads pagination has no omissions or duplicates. |
| ADM-06 | Submission time | Staff see the server-recorded submission date, exact time to the second and local time zone. |
| ADM-07 | Lead actions | An authorized admin can edit approved fields, mark/unmark contacted and delete a request; stale versions fail without overwriting another edit. |
| MEM-01 | Unique ID | Member code unique and stable after name/contact edits. |
| MEM-02 | Card | Long names and codes fit; authorized download succeeds; no live QR by default. |
| MEM-03 | Revocation | Agreed member state and access handling work consistently. |
| DATA-01 | RLS | Direct database tests deny anonymous and non-admin reads and mutations. |
| DATA-02 | Storage | Public media paths do not expose personal cards or private uploads. |
| DATA-03 | Backups | A real selected-plan backup can be restored on restricted staging. |
| REL-01 | Browsers | Supported current Chrome/Safari/Firefox/Edge and actual iOS/Android checks. |
| REL-02 | Performance | Measure production-like LCP/INP/CLS and file weights; record lab vs field. |
| REL-03 | No JavaScript | Core story/links readable; progressive enhancement failure is recoverable. |
| REL-04 | Launch | HTTPS/domain, final content, payment/acceptance and rollback verified. |
| REL-05 | Handover | Repo/access, environment inventory, training and support record delivered. |

## Severity and launch decision
P0: unauthorized personal-data access, secret exposure or broken security boundary — do not launch.
P1: lost/duplicated submissions, broken approval/card workflow, inaccessible core actions — fix before launch.
P2: important responsive, media, validation or content defects — fix before client acceptance unless expressly waived with a safe workaround.
P3: minor polish — record an owner/date and obtain agreement before deferral.

## Test record format
Case ID / version / environment / steps / expected result / actual result / evidence / reviewer / date / linked defect. Use fake personal details. Record exactly which device/browser was actually checked; do not label a desktop emulator as an actual iPhone test.

## Performance reporting
Targets in requirements.md are design goals. Use laboratory measurements during development and real-user field data when enough data exists after launch [T9]. Do not claim a guaranteed score, guaranteed conversion gain or unlimited visitors from a static demo.
