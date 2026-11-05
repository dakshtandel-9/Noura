import { test, type TestContext } from "node:test";
import assert from "node:assert/strict";
import { RequestError } from "../../lib/requests.ts";
import { checkOrigin, readJson } from "../../lib/server/http.ts";

const canonical = "https://www.noura.example";
const rejected = (status: number) => (error: unknown) => error instanceof RequestError && error.status === status;

function configure(t: TestContext, appOrigin?: string, siteUrl?: string, mode = "production") {
  const values = { NOURA_APP_ORIGIN: appOrigin, NEXT_PUBLIC_SITE_URL: siteUrl, NODE_ENV: mode };
  const previous = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  const apply = (env: Record<string, string | undefined>) => {
    for (const [key, value] of Object.entries(env)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  };
  apply(values);
  t.after(() => apply(previous));
}

function request(origin: string | null, extraHeaders: Record<string, string> = {}) {
  return new Request("http://internal-proxy:3000/api/admin/session", {
    method: "POST", headers: { "Content-Type": "application/json", ...(origin === null ? {} : { Origin: origin }), ...extraHeaders },
    body: JSON.stringify({ password: "dummy-password" }),
  });
}

test("production accepts the configured browser origin behind an internal proxy", (t) => {
  configure(t, canonical);
  assert.doesNotThrow(() => checkOrigin(request(canonical)));
});

test("environment URL whitespace, trailing slashes, host case and default ports normalize", (t) => {
  configure(t, "  https://WWW.NOURA.EXAMPLE:443/ \n");
  assert.doesNotThrow(() => checkOrigin(request(canonical)));
});

test("the public site URL is the fallback when the dedicated origin is absent or blank", (t) => {
  configure(t, undefined, `${canonical}/`);
  assert.doesNotThrow(() => checkOrigin(request(canonical)));
  process.env.NOURA_APP_ORIGIN = "   ";
  assert.doesNotThrow(() => checkOrigin(request(canonical)));
});

test("explicit origins override the public metadata URL and allow only listed aliases", (t) => {
  configure(t, ` ${canonical}/, https://noura.example/ `, "https://unused.example");
  for (const origin of [canonical, "https://noura.example"]) assert.doesNotThrow(() => checkOrigin(request(origin)));
  for (const origin of ["https://unused.example", "https://other.noura.example"]) assert.throws(() => checkOrigin(request(origin)), rejected(403));
});

test("cross-site, missing, opaque and malformed Origin headers stay blocked", (t) => {
  configure(t, canonical);
  for (const origin of [null, "null", "https://attacker.example", "https://www.noura.example.attacker.example", "https://noura.example", "http://www.noura.example", `${canonical}:444`, `${canonical}/`, `${canonical} https://attacker.example`]) {
    assert.throws(() => checkOrigin(request(origin)), rejected(403));
  }
});

test("Host and forwarded headers cannot add an attacker to the allowed origins", (t) => {
  configure(t, canonical);
  assert.throws(() => checkOrigin(request("https://attacker.example", {
    Host: "attacker.example", "X-Forwarded-Host": "attacker.example", "X-Forwarded-Proto": "https",
  })), rejected(403));
});

test("production without an address fails closed with a configuration error", (t) => {
  configure(t);
  assert.throws(() => checkOrigin(request(canonical)), rejected(503));
  assert.throws(() => checkOrigin(request("http://internal-proxy:3000")), rejected(503));
});

test("invalid configured addresses fail closed without falling back to a different policy", (t) => {
  configure(t, canonical, canonical);
  for (const origin of ["not-a-url", "*", "https://*.noura.example", "ftp://www.noura.example", `${canonical}/admin/login`, `${canonical}?query=1`, `${canonical}#fragment`, "https://user:password@www.noura.example", `${canonical},`, `${canonical},invalid`, "https:\\www.noura.example"]) {
    process.env.NOURA_APP_ORIGIN = origin;
    assert.throws(() => checkOrigin(request(canonical)), rejected(503));
  }
});

test("local development still works without deployment configuration", (t) => {
  configure(t, undefined, undefined, "development");
  assert.doesNotThrow(() => checkOrigin(request("http://internal-proxy:3000")));
  assert.throws(() => checkOrigin(request(canonical)), rejected(403));
});

test("both login paths share origin protection before parsing credentials", async (t) => {
  configure(t, `${canonical}/`);
  for (const path of ["/api/admin/session", "/api/user/session"]) {
    const make = (origin: string) => new Request(`http://internal-proxy:3000${path}`, {
      method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: "{}",
    });
    assert.deepEqual(await readJson(make(canonical)), {});
    await assert.rejects(() => readJson(make("https://attacker.example")), rejected(403));
  }
});
