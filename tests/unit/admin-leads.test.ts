import { test } from "node:test";
import assert from "node:assert/strict";
import type { Firestore } from "firebase-admin/firestore";
import { applyUpdate, listRequests } from "../../lib/server/requests.ts";
import { createSession } from "../../lib/server/auth.ts";
import { formatSubmissionTime, parseUpdate, RequestError } from "../../lib/requests.ts";

test("submission timestamp displays a simple Indian date and 12-hour IST time", () => {
  const formatted = formatSubmissionTime("2026-10-07T11:23:45.123Z");
  assert.match(formatted, /7 Oct 2026/);
  assert.match(formatted, /4:53:45 pm IST/i);
  assert.notEqual(formatSubmissionTime("invalid"), "Invalid Date");
});

test("staff contact tracking accepts only a boolean", () => {
  assert.equal(parseUpdate("invitation", { version: 1, contacted: true }).changes.contacted, true);
  assert.throws(() => parseUpdate("invitation", { version: 1, contacted: "yes" }), (error) =>
    error instanceof RequestError && error.status === 422 && "contacted" in error.fields);
});

test("marking a legacy lead contacted stamps the action, preserves submission time, and checks version", async () => {
  const saved: Record<string, unknown> = {
    full_name: "Example Person", email: "example@example.com", status: "new", version: 1,
    created_at: "2026-10-07T11:23:45.123Z", updated_at: "2026-10-07T11:23:45.123Z",
  };
  const audits: Record<string, unknown>[] = [];
  const db = {
    collection: () => ({ doc: (id?: string) => ({ id }) }),
    runTransaction: async (run: (transaction: unknown) => Promise<unknown>) => run({
      get: async () => ({ exists: true, data: () => ({ ...saved }) }),
      update: (_ref: unknown, patch: Record<string, unknown>) => Object.assign(saved, patch),
      create: (_ref: unknown, event: Record<string, unknown>) => audits.push(event),
    }),
  } as unknown as Firestore;
  const id = "3f2b8c1e-4a5d-4e6f-8a7b-9c0d1e2f3a4b";
  const marked = await applyUpdate(db, "invitation", id, parseUpdate("invitation", { version: 1, contacted: true }), new Date("2026-10-07T12:00:00.000Z"));
  assert.equal(marked.contacted, true);
  assert.equal(marked.contacted_at, "2026-10-07T12:00:00.000Z");
  assert.equal(marked.created_at, "2026-10-07T11:23:45.123Z");
  assert.equal(saved.version, 2);
  assert.deepEqual((audits[0]!.metadata as { changed: string[] }).changed, ["contacted"]);
  await assert.rejects(() => applyUpdate(db, "invitation", id, parseUpdate("invitation", { version: 1, contacted: false }), new Date()),
    (error) => error instanceof RequestError && error.status === 409);
  const unmarked = await applyUpdate(db, "invitation", id, parseUpdate("invitation", { version: 2, contacted: false }), new Date("2026-10-07T12:30:00.000Z"));
  assert.equal(unmarked.contacted, false);
  assert.equal(unmarked.contacted_at, null);
});

test("all-leads pages combine both request types without duplicates and use real aggregate counts", async () => {
  const oldPassword = process.env.ADMIN_PASSWORD;
  const oldSecret = process.env.ADMIN_SESSION_SECRET;
  process.env.ADMIN_PASSWORD = "test-password";
  process.env.ADMIN_SESSION_SECRET = "test-secret-at-least-thirty-two-characters";
  try {
    const rows = Array.from({ length: 26 }, (_, index) => ({
      id: `00000000-0000-4000-8000-${(index + 1).toString(16).padStart(12, "0")}`,
      kind: index % 2 ? "session" : "invitation",
      created_at: new Date(Date.parse("2026-10-07T12:00:00.000Z") - index * 60_000).toISOString(),
      status: index < 3 ? "new" : "under_review", contacted: index < 4,
      full_name: `Example ${index}`, email: `example${index}@example.com`, version: 1,
    }));
    type Row = typeof rows[number];
    const db = {
      collection(name: string) {
        const source = rows.filter((row) => name === (row.kind === "invitation" ? "invitation_requests" : "appointment_requests"));
        const wrap = (row: Row) => ({ id: row.id, exists: true, data: () => row });
        let limit = 21;
        let after = "";
        const query = {
          orderBy: () => query,
          limit: (value: number) => { limit = value; return query; },
          startAfter: (last: { id: string }) => { after = last.id; return query; },
          get: async () => ({ docs: source.slice(after ? source.findIndex((row) => row.id === after) + 1 : 0, after ? source.findIndex((row) => row.id === after) + 1 + limit : limit).map(wrap) }),
        };
        return {
          ...query,
          doc: (id: string) => ({ get: async () => { const found = source.find((row) => row.id === id); return found ? wrap(found) : { exists: false }; } }),
          count: () => ({ get: async () => ({ data: () => ({ count: source.length }) }) }),
          where: (field: string, _operator: string, value: unknown) => ({ count: () => ({ get: async () => ({ data: () => ({ count: source.filter((row) => row[field as keyof Row] === value).length }) }) }) }),
        };
      },
    } as unknown as Firestore;
    const session = createSession();
    const first = await listRequests(session, "all", undefined, db);
    assert.equal(first.count, 26);
    assert.deepEqual(first.totals, { invitation: 13, session: 13 });
    assert.equal(first.contactedTotals.invitation + first.contactedTotals.session, 4);
    assert.equal(first.newTotals.invitation + first.newTotals.session, 3);
    assert.equal(first.records.length, 20);
    assert.ok(first.next);
    const second = await listRequests(session, "all", first.next!, db);
    assert.equal(second.records.length, 6);
    assert.equal(second.next, null);
    assert.equal(new Set([...first.records, ...second.records].map((row) => `${row.kind}:${row.id}`)).size, 26);
    assert.equal(second.records[0]!.created_at < first.records.at(-1)!.created_at, true);
  } finally {
    if (oldPassword === undefined) delete process.env.ADMIN_PASSWORD; else process.env.ADMIN_PASSWORD = oldPassword;
    if (oldSecret === undefined) delete process.env.ADMIN_SESSION_SECRET; else process.env.ADMIN_SESSION_SECRET = oldSecret;
  }
});
