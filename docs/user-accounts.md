# Admin-created user accounts

Owner change request, 30 October 2026: admins may create login accounts with a name,
email, optional phone and admin-set password. Users sign in at `/login`; a signed-in
header link opens `/members`, which is blank for now apart from navigation/sign-out.
This explicitly adds the requested login flow to the original scope. It does not
approve invitations, create membership records/codes, or grant staff access.

## Configuration

Use the existing server-only Firebase project/service account and Firestore setup.
Enable Firebase Authentication's Email/Password provider and set
`FIREBASE_WEB_API_KEY` on the server. Existing `NOURA_APP_ORIGIN` and
`NOURA_RATE_LIMIT_SECRET` are required for sign-in. Admin authentication continues
to use the current `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` setup.

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
