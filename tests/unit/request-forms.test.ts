import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { interestOptions, parseRequest, type RequestKind } from "../../lib/requests.ts";

// Each public form posts its field names through PreviewForm; these tests read the names from
// the component source and check the server schema accepts what the form would send, so a
// renamed or missing field fails here instead of in front of a visitor.

const sample: Record<string, string> = {
  full_name: "Sample Person",
  email: "sample@example.com",
  phone: "+91 98765 43210",
  organization: "Sample Organisation",
  message: "I would like to know more about the next gathering.",
  interests: "I would like to know more about the next gathering.",
};

function fieldNames(file: string) {
  const source = readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
  return [...new Set([...source.matchAll(/\bname="([a-z_]+)"/g)].map((m) => m[1]!))];
}

/** The payload PreviewForm builds: form values, checkbox interests as a list, plus its own fields. */
function payload(names: string[], checkboxInterests: boolean) {
  const body: Record<string, unknown> = {};
  for (const name of names) if (name !== "interests" || !checkboxInterests) body[name] = sample[name] ?? "";
  if (checkboxInterests) body.interests = [interestOptions[1]];
  body.privacy_acknowledged = true;
  body.website = "";
  body.idempotency_key = "3f2b8c1e-4a5d-4e6f-8a7b-9c0d1e2f3a4b";
  body.started_at = Date.now() - 10_000;
  return body;
}

const forms: { file: string; kind: RequestKind; checkboxInterests: boolean }[] = [
  { file: "components/sections/Enquire.tsx", kind: "invitation", checkboxInterests: false },
  { file: "app/(public)/invitation/page.tsx", kind: "invitation", checkboxInterests: true },
];

for (const form of forms) {
  test(`${form.file} sends fields the ${form.kind} schema accepts`, () => {
    const names = fieldNames(form.file);
    assert.ok(names.includes("full_name") && names.includes("email"), "name and email fields are present");
    const { data } = parseRequest(form.kind, payload(names, form.checkboxInterests), "Asia/Kolkata");
    assert.equal(data.full_name, sample.full_name);
    assert.equal(data.email, sample.email);
    assert.ok(data.interests.length >= 10);
  });
}

test("the invitation form's interest pills are all options the server accepts", () => {
  const source = readFileSync(new URL("../../content/subpages.ts", import.meta.url), "utf8");
  const block = source.slice(source.indexOf("export const invitationPage"));
  const pills = [...block.slice(block.indexOf("interests: ["), block.indexOf("],", block.indexOf("interests: ["))).matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  assert.ok(pills.length > 0);
  for (const pill of pills) assert.ok((interestOptions as readonly string[]).includes(pill!), `${pill} is accepted`);
});

test("an enquiry without a name or with a too-short message is rejected with field errors", () => {
  const body = payload(fieldNames("components/sections/Enquire.tsx"), false);
  body.full_name = "";
  body.interests = "Hi";
  assert.throws(() => parseRequest("invitation", body, "Asia/Kolkata"), (error: { status: number; fields: Record<string, string> }) =>
    error.status === 422 && "full_name" in error.fields && "interests" in error.fields);
});
