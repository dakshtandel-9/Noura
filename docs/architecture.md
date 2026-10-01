# Technical architecture / proposed lean implementation

## Recommendation and rationale
One **Next.js + TypeScript** application for the public page and authenticated admin. Use the Node.js server runtime for server-only validation, business logic and data access. Keep it in the same application unless a concrete integration requires a separate service. Prefer **Supabase Postgres + Auth** for the relational request/member workflow; Firebase remains the alternative allowed by the original scope. Do not provision both.

Use **Cloudflare R2** for agreed public brand media. Private card assets belong in a separate private bucket or are generated for an authorized download without persistent public storage. Choose the production host after validating the framework runtime and actual media/traffic budget. No particular free tier, visitor count, uptime or monthly price is assumed.

## Separation of concerns
Public server-rendered content → small client islands for navigation, video, forms and disclosures.

Public request → server payload/schema validation → origin and abuse checks → approved narrow write → generic response.

Staff request → authenticate session → check current server-controlled admin authorization → validate action → transaction/data layer → filtered response → minimal audit event.

Public media → optimized cached objects. Private data/card → authorize each access; private response or expiring object link.

## Proposed repository
```
app/
  (public)/page.tsx
  (public)/privacy/page.tsx         # scope/wording to approve
  (public)/terms/page.tsx           # scope/wording to approve
  admin/login/page.tsx
  admin/(protected)/layout.tsx
  admin/(protected)/page.tsx
  admin/(protected)/appointments/[id]/page.tsx
  admin/(protected)/invitations/[id]/page.tsx
  admin/(protected)/members/[id]/page.tsx
  admin/(protected)/members/[id]/card/page.tsx
  api/requests/invitation/route.ts
  api/requests/session/route.ts
components/
  story/  forms/  ui/  admin/  membership/
content/
  home.ts  programmes.ts  faqs.ts
lib/
  server/auth.ts  server/authorization.ts
  server/requests.ts  server/members.ts  server/cards.ts
  server/storage.ts  server/audit.ts
  validation/  types/
styles/tokens.css
supabase/migrations/
tests/unit/  tests/integration/  tests/e2e/
```
The repository tree is a build specification, not a claim that these routes are implemented in the HTML package.

## Server contracts
`POST /api/requests/invitation` and `POST /api/requests/session`: accept only allowlisted fields, validated content type and limited body size. A successful save returns 201 with a generic received state and a non-sensitive reference if required. Return field-level validation errors without internal traces. An idempotent retry can return 200 with the same safe acknowledgement. Rate limiting returns a recoverable generic state.

Admin list/detail endpoints or Server Functions: verify session and authorization for each operation, not only the layout. Return only needed fields. Use pagination; validate sort/filter values; never let client input choose a database table. Staff mutations include an expected record version to avoid silently overwriting another reviewer’s change.

Approve-invitation: authorization → transaction → lock/check request and expected state → create or link the approved member according to agreed deduplication → update request → append audit entry → commit. Replaying approval must be safe.

Card download: authorization → load approved member fields → create one template at known dimensions → stream private file or issue short-lived link. A request parameter alone is not authorization. Do not embed full personal details in a QR code.

## Content management boundary
Public copy may be a reviewed content file or a fixed-field content table. Choose one. The default for the ₹27,000 scope is a controlled set of editable content fields if agreed, not a drag-and-drop editor. Account provisioning can remain in the auth-provider console. A custom granular permissions editor is separate scope.

## Environments and configuration
Local development uses test accounts. Staging uses a separate database/project or securely isolated schema, dummy data, restricted access and noindex. Production uses client-owned accounts and a reviewed secret inventory. Environment variables must be documented by purpose; the handoff must never contain live keys. Provider secret/service keys stay server-side and are absent from every `NEXT_PUBLIC_` variable, browser bundle and client log [T7].

Use server authorization inside each sensitive Server Function because they are remotely callable [T6]. Adopt provider-recommended session/CSRF handling; verify custom Route Handler origins and request types separately. Use restrictive RLS as defense-in-depth [T7]. Cache public content, not staff responses.

## Public media vs private objects
Use a dedicated public path/bucket for approved marketing photos and film. Validate type and size on authorized uploads; sanitize names; avoid private data in object names. A public custom media domain must never expose member cards or invitation uploads. Short-lived R2 links are only issued after authorization and can be used by anyone who receives the valid link, so treat them as temporary bearer access [T8].

## Reliability
Test a database restore on staging before launch. Record the actual backup features and retention provided by the selected paid/free plan; do not claim backups merely because the provider offers them. Save a known-good deployment for rollback. Notification services, when separately approved, are ancillary: their failure must not lose a stored request. Report sanitized errors and correlate with a request reference without logging messages, phone numbers or access tokens.

## Research basis
See research.md: [T6] Next.js; [T7] Supabase; [T8] Cloudflare R2. Exact runtime/library versions and service plan limits must be rechecked when building.
