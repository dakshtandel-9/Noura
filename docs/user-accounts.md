# Admin-created user accounts

Owner change request, 30 October 2026: admins may create login accounts with a name,
email, optional phone and admin-set password. Users sign in at `/login`; a signed-in
header link opens `/members`, which is blank for now apart from navigation/sign-out.
This explicitly adds the requested login flow to the original scope. It does not
approve invitations, create membership records/codes, or grant staff access.

## Configuration

Use the existing server-only Firebase project/service account and Firestore setup.
Enable Firebase Authentication's Email/Password provider and set
`FIREBASE_WEB_API_KEY` on the server. A configured website origin and
`NOURA_RATE_LIMIT_SECRET` are required for sign-in. Admin authentication continues
to use the current `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` setup.

### Deployment address and "Request not allowed"

Both login endpoints use the same origin guard, before checking credentials. Set
these non-secret values in the hosting project's **Production** environment:

```dotenv
NOURA_APP_ORIGIN=https://www.nourawellbeing.com
NEXT_PUBLIC_SITE_URL=https://www.nourawellbeing.com
```

The apex domain redirects to `www`, so the allowed browser origin must include
`www`. `.env.local` is ignored by Git and does not configure a Vercel deployment.
An environment change applies to a new deployment, not an already running one.
Preview deployments need their own explicit origin and isolated test services.

The guard normalizes surrounding whitespace, trailing slashes, hostname case and
default ports. `NOURA_APP_ORIGIN` may contain comma-separated exact origins when
multiple domains actually serve the app. It takes precedence over
`NEXT_PUBLIC_SITE_URL`, which is used only when `NOURA_APP_ORIGIN` is unset/blank.
No implicit `www` alias, wildcard subdomain or request/forwarded-host fallback is
allowed in production. Missing/invalid configuration returns 503; an unlisted or
missing request Origin still returns 403. Keep the existing credentials, secure
cookies, authorization and rate limits in place.

For a credential-free origin check, POST an empty `text/plain` body to either
`/api/admin/session` or `/api/user/session` with the real browser Origin. Expect
415 (the origin passed; JSON is required), while an untrusted Origin must return
403. This stops before credentials, Firebase or rate-limit writes.

Before an owner-approved production release, record the current Vercel deployment
ID and prior non-secret origin values for rollback. This fix requires no data
migration; retain the existing database backup policy. After release, check both
login flows and protected pages with approved accounts. If necessary, restore the
prior origin configuration and promote the recorded prior deployment.

No signup endpoint, browser Firebase SDK, notification service, or automatic email
is added. The admin shares credentials privately. Firebase stores the password;
the application never saves passwords in Firestore or returns them in responses.
Password recovery/reset through Firebase's owner console remains operational work.

## Server-only collection schema

New collection: `user_accounts/{firebaseAuthUid}`. Required fields: `full_name`
(2–100 characters), normalized `email` (max 254), `phone` (empty or max 30),
`created_at` (server UTC ISO timestamp), `provisioned_by` (`admin`). This is a
schemaless Firestore addition; no migration or backfill is needed. Existing deny-all
`firestore.rules` apply to this collection too. All reads/writes use the server SDK.

Each account also has a short `account_code` such as `NOURA-AB123` (two letters,
three digits), shown in the admin Users list as the unique account ID. The Firebase UID
stays the document key and internal identifier. Codes are claimed through a second
server-only collection, `user_account_codes/{code}`, using a create-if-absent write with
retry on collision, so two accounts cannot share one. Codes are never reissued, even
after an account is deleted. Accounts created before this change receive a code the
first time an admin opens the Users list or the user opens `/members`. Same deny-all
rules; no migration script.

The authenticated `/members` page shows the signed-in account's name and
`account_code` on an ivory-and-gold **NOURA Privé** card preview. The server reads only
the session owner's provisioning record; legacy accounts without a code receive one
through the same collision-checked claim. This is an account number, not the separate
approved `members.member_code`, and the preview is not proof of membership approval.

The creation operation checks the current admin cookie, validates an allowlist,
creates a disabled Firebase Auth user, saves the provisioning record, then enables
the user. A failed operation attempts to remove only its own partial account.
Firebase enforces unique login emails. Retrying a completed creation returns a
duplicate error rather than changing an existing user's password.

Every login/session check verifies the Firebase identity and server-only provisioning
record; an arbitrary Firebase identity cannot gain NOURA access. `/members` verifies
the session on the server. Sessions use an HttpOnly, SameSite=Strict cookie lasting
eight hours, Secure in production. Disabled/deleted accounts, revoked sessions and
removed provisioning records lose access. Staff APIs continue to require the
separate admin cookie. Private APIs return no-store responses; both new pages are
noindex and absent from the sitemap. No production configuration has been changed.

## Verification cases

- Admin creates with and without phone; duplicate email fails without overwriting.
- Anonymous, expired-admin, forged-admin and regular-user requests cannot create.
- Invalid fields, unexpected role fields and oversized inputs are rejected.
- Correct credentials reach `/members`; wrong credentials fail generically.
- Firebase identities without provisioning records cannot log in.
- Disabled/deleted/revoked/expired sessions cannot open `/members`.
- Signed-in desktop/mobile headers show Members; signed-out headers do not.
- Sign out clears the user cookie; `/members` subsequently redirects to `/login`.
- Direct Firestore reads/writes remain denied for anonymous and regular users.

Run `npm run check` and `npm run build`. The emulator integration suite additionally
requires local Auth + Firestore emulators and only accepts a `demo-` project:

```sh
FIREBASE_PROJECT_ID=demo-noura-users NOURA_FIREBASE_EMULATORS=true \
FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099 FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 \
FIREBASE_WEB_API_KEY=demo-key \
node --conditions=react-server --experimental-strip-types --no-warnings=ExperimentalWarning \
  --test tests/integration/user-accounts.test.ts
```

To check the HTTP boundary, start a production build on localhost with those same
demo settings, `ADMIN_PASSWORD=dummy-admin-password`, a test-only admin session
secret, rate-limit secret, and matching `NOURA_APP_ORIGIN`. Then run the HTTP suite
with the same emulator environment and `NOURA_TEST_APP_ORIGIN=http://localhost:3100`:
`node --conditions=react-server --experimental-strip-types --test tests/integration/user-account-http.test.ts`.
The suite creates and removes only its own dummy user. Use fresh emulators if the
shared 10-attempt login limiter has already been exhausted by other tests.

## Deployment login regression verification — 6 November 2026

- Live diagnostic: the apex redirected to `https://www.nourawellbeing.com`.
  Empty `text/plain` POSTs to both login endpoints with that browser Origin returned
  403 before credential validation. No credentials or applicant data were sent.
  Vercel's Production and Preview value for `NOURA_APP_ORIGIN` was
  `https://www.nourawellbeing.com/`; the trailing slash caused the mismatch.
  The in-code normalization fixes this without broadening the trusted domain or
  changing Vercel secrets/configuration.
- `npm run check`: TypeScript passed; all 43 unit tests passed, including 10 new
  origin cases. ESLint had no errors and retained the existing unused `f` warning
  in `components/sections/Enquire.tsx`.
- `npm run build`: passed with dummy configuration and a reserved test domain.
- `tests/integration/user-accounts.test.ts`: both tests passed against isolated
  Auth/Firestore emulators using `demo-noura-login-fix` on ports 9199/8180.
- `tests/integration/user-account-http.test.ts`: passed against `next start` on
  localhost:3100 with `NOURA_TEST_REQUEST_ORIGIN=https://www.noura.example` and
  a comma-separated origin configuration containing whitespace/trailing slashes.
  Verified admin and user sign-in, wrong credentials, protected pages, secure
  cookies, authorization separation, sign-out and cross-origin rejection. The
  first HTTP attempt raced server startup (connection refused); rerunning after
  the server reported ready passed. The final run including admin sign-out passed.
- Credential-free HTTP checks accepted each explicitly listed test domain through
  the origin guard (415 for non-JSON), and rejected the unlisted domain (403), on
  both login endpoints.
- Final TypeScript, targeted ESLint and `git diff --check` passed.
- Files: `lib/server/http.ts`, `.env.example`, `tests/unit/http-origin.test.ts`,
  `tests/integration/user-account-http.test.ts`, and this document. The HTTP test's
  response assertion now includes the already-existing `account_code` field.
- Production deployment `AA6UUyQvAyRNMGBSjEaVSYJJqR8R` (commit `28250dc`) reported
  Ready on Vercel, with `www.nourawellbeing.com` assigned. Post-deploy smoke checks
  returned 415 for the configured origin and 403 for an untrusted origin on both
  login endpoints. Real-account credential entry/sign-in remains for the owner to
  verify. No live database/schema, accounts, environment variables or credentials
  changed.

## Verification record — 30 October 2026

- `npm run check`: passed TypeScript, ESLint (no errors), and all 28 unit tests.
  The existing unused `f` warning in `components/sections/Enquire.tsx:15` remains.
- `npm run build`: passed, including the four new dynamic page/API routes.
- Both integration suites: passed against local Firebase Auth/Firestore emulators
  using the `demo-noura-users` project and a production server on localhost:3100.
- Direct HTTP checks: anonymous access, cross-origin writes, wrong content type,
  oversized bodies, role injection, duplicate emails, wrong/correct credentials,
  private cache headers, secure cookies, admin isolation and logout all passed.
- Additional real HTTP abuse check: the user-login limiter returned 429 with
  `Retry-After: 900` after its shared attempt limit was reached.
- Chrome browser: account-creation success, login, desktop Members link, mobile
  Members menu and sign-out verified. Refresh after logout stays signed out.
  Verified 320/390/1200 CSS-pixel layouts without horizontal overflow on the new
  pages. These were resized desktop Chrome views, not physical phone tests.
- No live accounts, notifications, deployment, database migrations or production
  settings were changed. The temporary local test services were stopped afterward.

## Changed files

- Admin: `components/admin/AdminInbox.tsx`, `components/admin/CreateUserAccount.tsx`.
- New pages/components: `app/login/page.tsx`, `app/members/page.tsx`,
  `components/account/UserLogin.tsx`, `components/account/UserSignOut.tsx`,
  `components/account/account.module.css`.
- Navigation: `components/layout/SiteHeader.tsx`.
- Server/validation: `app/api/admin/users/route.ts`, `app/api/user/session/route.ts`,
  `lib/server/user-accounts.ts`, `lib/user-accounts.ts`.
- Configuration/discovery: `.env.example`, `lib/seo.ts`.
- Tests: `tests/unit/user-accounts.test.ts`, `tests/unit/seo.test.ts`,
  `tests/integration/user-accounts.test.ts`, `tests/integration/user-account-http.test.ts`.
- Documentation: this file. The existing public sections and shared styles are unchanged.
