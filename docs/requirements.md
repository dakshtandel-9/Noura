# NOURA / Product Requirements Document
Version 1.0 · proposed for sign-off · 24 September 2026

## Purpose and success
Build an invitation-only wellness landing experience with private operational tools. Public visitors understand the offering and submit one of two requests. Authorized staff review requests, create or manage approved members and issue a digital card. The website does not decide who is accepted.

Business success to measure after launch: qualified invitation requests, private-session enquiries and the team’s ability to review them accurately. No conversion uplift or visitor capacity is promised. Agree analytics and consent before installing measurement tools.

## Evidence and precedence
**Documented:** S1 includes the public experience, two forms, manual reviews, private admin, unique IDs, digital cards, source handover and 12-month maintenance. **Latest instruction:** S5 requests calm storytelling, a background-video hero and a long landing page. **Proposed here:** precise sections, field limits, technical architecture, status names, validation, copy and test criteria. If a proposal differs from a signed document, log a change and obtain agreement rather than silently treating it as included.

## Roles
| Role | Allowed | Not allowed |
|---|---|---|
| Public visitor | Read public content, control video, submit either request | Read private requests, see applicant status or create a member |
| Authenticated but non-admin | No staff data access | Any admin operation merely because a session exists |
| Approved admin | Review requests, manage approved fields, create/link member, generate card | Edit server-controlled authorization or bypass agreed rules |
| Client owner | Approve content, provide accounts and provision authorized admins through the chosen provider | Assume a custom roles-management console is included |
| Revoked admin | Public content only | Use an old session to access staff data |

## Functional requirements
| ID | Requirement | Acceptance evidence |
|---|---|---|
| FR-01 | One responsive long landing page with the gold NOURA identity | Section inventory and mobile review approved |
| FR-02 | Video hero with real HTML text, muted loop, poster and persistent pause/play | Playback, blocked autoplay, reduced-motion and offline cases pass |
| FR-03 | Anchor navigation and mobile menu with correct focus behaviour | Keyboard and touch tests pass; no dead links |
| FR-04 | Four approved experiences with relevant actions | Every chapter and programme selection maps correctly |
| FR-05 | Invitation request form saves an approved field set to the backend | Valid test appears once in private admin with notice version/time |
| FR-06 | Private-session form saves a date preference, not a confirmed booking | Inline confirmation and staff view distinguish preference from confirmation |
| FR-07 | Client and server validation, abuse protection and bounded payloads | Invalid/direct requests rejected; valid content preserved on recoverable error |
| FR-08 | Duplicate submission guard | A repeated idempotency token does not create extra requests |
| FR-09 | Staff authentication, sign out, expiry and recovery | Unapproved/revoked users cannot read or mutate data |
| FR-10 | Admin overview uses real counts from authorized data | Counts agree with filtered lists; loading/empty/error views exist |
| FR-11 | Appointment list, details, filters, review status and private notes | Staff can review and follow up without exposing notes publicly |
| FR-12 | Invitation list, detail, approve/decline and create/link member | Repeated approval never creates a second member |
| FR-13 | Member record with stable unique member code | Code remains unchanged after a name edit; database enforces uniqueness |
| FR-14 | One approved digital-card template | Long names and codes remain legible; export only for authorized staff |
| FR-15 | Approved member state changes | Deactivated/revoked record is clearly shown; associated access follows policy |
| FR-16 | Restricted public/private asset access | Public marketing assets cannot reveal personal-data objects |
| FR-17 | Agreed site content/settings fields | Only a written field list is editable; no hidden promise of a page builder |
| FR-18 | Privacy, terms and contact links use approved content | No placeholder public contact or legal text at launch |
| FR-19 | Accessible FAQ and clear request process | No instant-acceptance, false availability or health-guarantee copy |
| FR-20 | Staging, deployment, rollback and source handover | Client receives repo/access, environment inventory and recovery instructions |
| FR-21 | Included maintenance for delivered scope | Support owner, launch date and request channel recorded |
| FR-22 | Optional approved testimonial slot | Hidden until real approved quote, permission and attribution exist |

FR-17 exact CMS coverage, FR-22 content, optional QR and any automated messaging remain decisions. They are not already approved additions.

## Field dictionary: invitation
| Field | Proposed rule | Production note |
|---|---|---|
| full_name | Required; trimmed; 2–100 characters | Preserve international names; do not enforce two words |
| email | Required; reasonable email validation; max 254 | Normalize for comparisons; preserve display value |
| phone | Optional; max 30 characters | Only collect if the client needs phone follow-up |
| referral_source | Optional approved select + Other | No long freeform tracking data |
| interests | Required; 10–1000 characters | Ask what draws the visitor to the experience; not medical history |
| privacy_acknowledged | Required acknowledgement of approved notice | Final lawful wording/mechanism is supplied by client adviser |
| notice_version | Server-recorded approved policy version | Do not trust a client-supplied value as authoritative |
| received_at | Server timestamp | UTC storage; format appropriately for the team |
| idempotency_key | Request-scoped random token | Prevent accidental repeats, not a public status lookup token |

## Field dictionary: private session
Required name, email and **session_type** from Yoga / Meditation / Music & Sound / Private Group Sessions / Not sure yet. Phone and additional message are optional. **preferred_date** is optional; reject a past date relative to the confirmed operating timezone. The timezone and operating location must be approved; do not hard-code the client’s phone country as the service location. Max message length 1000. Record the same privacy/version and submission metadata as appropriate. A date alone does not reserve a slot.

## Submission outcomes
Design empty, focus, invalid, submitting, success, network error, server error, duplicate retry and rate-limited states. Production confirmation: “Your request has been received. Our team will review it and contact you with next steps. This is not a confirmed booking or membership approval.” Do not promise a response time until Sidhart confirms it. Anonymous duplicate handling should not reveal whether an email belongs to an existing member.

The HTML preview explicitly says no data is sent. Production must save first, then return a generic acknowledgement. An email-provider failure must not lose a successfully stored request; automation is not included until approved.

## State machines — proposed canonical terms
**Invitation:** `new → under_review → approved | declined`. Staff can return a declined request to under_review only with an audit reason. Approved invitations create/link a member once; changing a request does not silently delete its member.

**Appointment:** `new → under_review → follow_up_needed | approved | declined`. `approved` means staff approved next steps, not automatic time reservation. A separate nullable `confirmed_at`/scheduled time may be recorded only after an actual external confirmation; confirm that field before implementing it.

**Member:** `active | inactive | revoked`. Revoke access on the server, not just by hiding a row. A card number is an identifier, never a password, bearer credential or public data URL.

## Non-functional requirements
- NFR-01: Responsive and readable from 320px wide; no forced desktop layout; meaningful keyboard order.
- NFR-02: Use WCAG 2.2 AA as the implementation target, not a claim of certification. Test contrast, labels, focus, reflow and motion controls [T1,T3,T4].
- NFR-03: Target production LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1 at the 75th percentile; measure after deployment [T9].
- NFR-04: Initial compressed first-view budget target ≤1.2MB excluding deferred video; final desktop video ≤6MB and mobile ≤2.5MB are proposed media budgets, not measured production results.
- NFR-05: Minimize browser JavaScript, layout shifts and third-party requests. Keep the hero poster prioritized [T5].
- NFR-06: Authenticate and authorize each sensitive action; restrict row access and secrets [T6,T7].
- NFR-07: Staff data uses private/no-store responses; no member data in public HTML, logs or search-engine metadata.
- NFR-08: Encrypted transport, provider-backed authentication and approved account ownership; no custom password system.
- NFR-09: Clear error recovery, staged release and tested backup restoration subject to selected plan.
- NFR-10: No arbitrary user-capacity promise. Agree a realistic traffic/concurrency profile and test the actual stack and plans.
- NFR-11: Use dummy or anonymized data on staging; staging is access-controlled, not merely noindex.
- NFR-12: Document exact dependencies and lock versions when the implementation starts. Do not imply this handoff is already installed.

## Explicitly out of scope unless agreed
Payments/checkout, instant slot booking, public member login, mobile apps, a full CRM, AI assistants, WhatsApp automation, public card verification, ecommerce, subscription billing, a full blog, multi-location management, medical records, paid advertising, stock/video production and unlimited changes. A long page does not mean unlimited unique animations or endless content creation.

## Release blockers
Final film and rights; clean production logo assets; approved actual programme/venue details; accepted form field set; policy/consent and retention instructions; admin list; domain/hosting/data ownership and charges; final content; client acceptance; payment evidence; successful security and recovery tests.

## Source basis and document status
S1: `Sidhart_Luxury_Wellness_Proposal_Updated.pdf`, pp4–16. S2: `Sidhart_Website_Build_Roadmap_Step_0_to_100.pdf`, pp6–12. S3: `NOURA_All_Options_design.md`, Options 3 and 4. S4: the supplied two-logo image; only the right-hand gold version is selected. S5: latest instruction for calm, mindful, peaceful storytelling, a background-video hero and one long landing page.

S1 is the documented scope, not proof that the agreement is signed or an advance was paid. S2 and S3 are earlier proposals, not independently approved requirements. This release is a proposed consolidated design and implementation specification. It does not silently revise the agreement. Any new module or production cost needs approval. Research sources and the decisions drawn from them are listed in `research.md`.
