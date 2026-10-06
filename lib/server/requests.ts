import "server-only";
import { createHash } from "node:crypto";
import { FieldPath, type DocumentData, type Firestore } from "firebase-admin/firestore";
import { firebase, collectionConfig } from "./firebase.ts";
import {
  checkTransition, needsReason, parseRequest, parseUpdate, RequestError, statusesFor,
  type RequestKind, type RequestRecord, type RequestStatus, type RequestUpdate,
} from "../requests.ts";
import { authorizeSession } from "./auth.ts";

export const requestCollection = (kind: RequestKind) => kind === "invitation" ? "invitation_requests" : "appointment_requests";

export async function saveRequest(kind: RequestKind, raw: unknown) {
  const { notice, timezone } = collectionConfig();
  const { data, key } = parseRequest(kind, raw, timezone);
  const fingerprint = createHash("sha256").update(JSON.stringify(data)).digest("hex");
  const { db } = firebase();
  const ref = db.collection(requestCollection(kind)).doc(key);
  return db.runTransaction(async (tx) => {
    const prior = await tx.get(ref);
    if (prior.exists) {
      if (prior.get("fingerprint") !== fingerprint) throw new RequestError("This form was already sent. Refresh before starting another request.", 409);
      return false;
    }
    const now = new Date().toISOString();
    tx.create(ref, { ...data, kind, email_normalized: data.email.toLowerCase(), status: "new", created_at: now, updated_at: now,
      notice_version: notice, acknowledged_at: now, timezone, fingerprint, version: 1, private_note: "", reviewer_id: null });
    return true;
  });
}

/** One shared admin password means one staff identity; audit entries record it as such. */
const actor = "shared-admin";
const auditCollection = "audit_events";

function requestId(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new RequestError("This request could not be found.", 404);
  return id;
}

function toRecord(id: string, kind: RequestKind, d: DocumentData): RequestRecord {
  return {
    id, kind, full_name: d.full_name, email: d.email, phone: d.phone ?? "", interests: d.interests ?? "",
    interest_choices: d.interest_choices ?? [], organization: d.organization ?? "", message: d.message ?? "",
    session_type: d.session_type ?? "", preferred_date: d.preferred_date ?? "", time_window: d.time_window ?? "",
    status: d.status, created_at: d.created_at, updated_at: d.updated_at ?? d.created_at,
    private_note: d.private_note ?? "", notice_version: d.notice_version ?? "", version: d.version ?? 1,
  };
}

export async function listRequests(session: string | undefined, kind: RequestKind, cursor?: string) {
  authorizeSession(session);
  if (cursor && !/^[0-9a-f-]{36}$/i.test(cursor)) throw new RequestError("Invalid page.");
  const { db } = firebase();
  const collection = db.collection(requestCollection(kind));
  const other = db.collection(requestCollection(kind === "invitation" ? "session" : "invitation"));
  let query = collection.orderBy("created_at", "desc").orderBy(FieldPath.documentId(), "desc").limit(21);
  if (cursor) {
    const last = await collection.doc(cursor).get();
    if (!last.exists) throw new RequestError("This page is no longer available. Refresh the inbox.");
    query = query.startAfter(last);
  }
  const statuses = statusesFor(kind);
  const [snapshot, count, otherCount, ...byStatus] = await Promise.all([
    query.get(), collection.count().get(), other.count().get(),
    ...statuses.map((status) => collection.where("status", "==", status).count().get()),
  ]);
  const records = snapshot.docs.slice(0, 20).map((doc) => toRecord(doc.id, kind, doc.data()));
  const total = count.data().count;
  return {
    records,
    count: total,
    totals: kind === "invitation" ? { invitation: total, session: otherCount.data().count } : { invitation: otherCount.data().count, session: total },
    statusCounts: Object.fromEntries(statuses.map((status, i) => [status, byStatus[i]!.data().count])) as Partial<Record<RequestStatus, number>>,
    next: snapshot.size > 20 ? records.at(-1)!.id : null,
  };
}

export async function updateRequest(session: string | undefined, kind: RequestKind, id: string, input: unknown) {
  authorizeSession(session);
  const update = parseUpdate(kind, input);
  return applyUpdate(firebase().db, kind, requestId(id), update, new Date());
}

/**
 * Applies a validated staff edit in one transaction: the expected version must match (so two
 * reviewers cannot overwrite each other), status moves follow the state model, and an audit
 * entry records which fields changed — never their values, apart from status and the reason
 * for reopening a declined request.
 */
export async function applyUpdate(db: Firestore, kind: RequestKind, id: string, update: RequestUpdate, now: Date) {
  const ref = db.collection(requestCollection(kind)).doc(id);
  const audit = db.collection(auditCollection).doc();
  return db.runTransaction(async (tx) => {
    const snapshot = await tx.get(ref);
    if (!snapshot.exists) throw new RequestError("This request no longer exists. Refresh the inbox.", 404);
    const current = snapshot.data()!;
    if ((current.version ?? 1) !== update.version) {
      throw new RequestError("This request was changed elsewhere. Refresh to see the latest version, then edit again.", 409);
    }
    const from = current.status as RequestStatus;
    const to = update.changes.status ?? from;
    const fields = checkTransition(kind, from, to, update.reason);
    if (Object.keys(fields).length) throw new RequestError("Please check the highlighted fields.", 422, fields);
    const changed = Object.entries(update.changes).filter(([key, value]) => (current[key] ?? "") !== value).map(([key]) => key);
    if (!changed.length) return toRecord(id, kind, current);
    const stamp = now.toISOString();
    const patch: DocumentData = { updated_at: stamp, version: update.version + 1, reviewer_id: actor };
    for (const key of changed) patch[key] = update.changes[key as keyof RequestUpdate["changes"]];
    if (changed.includes("email")) patch.email_normalized = String(patch.email).toLowerCase();
    tx.update(ref, patch);
    tx.create(audit, {
      actor_id: actor, action: "request.update", entity_type: requestCollection(kind), entity_id: id, timestamp: stamp,
      metadata: { changed, ...(to !== from ? { from_status: from, to_status: to } : {}), ...(needsReason(from, to) ? { reason: update.reason } : {}) },
    });
    return toRecord(id, kind, { ...current, ...patch });
  });
}

export async function deleteRequest(session: string | undefined, kind: RequestKind, id: string, input: unknown) {
  authorizeSession(session);
  const raw = input && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : null;
  if (!raw || Object.keys(raw).some((key) => key !== "version") || !Number.isInteger(raw.version)) throw new RequestError("Invalid request.");
  return applyDelete(firebase().db, kind, requestId(id), raw.version as number, new Date());
}

/** Permanently removes one request (an administrative deletion, docs/data-model.md → privacy). */
export async function applyDelete(db: Firestore, kind: RequestKind, id: string, version: number, now: Date) {
  const ref = db.collection(requestCollection(kind)).doc(id);
  const audit = db.collection(auditCollection).doc();
  await db.runTransaction(async (tx) => {
    const snapshot = await tx.get(ref);
    if (!snapshot.exists) throw new RequestError("This request was already deleted. Refresh the inbox.", 404);
    if ((snapshot.get("version") ?? 1) !== version) {
      throw new RequestError("This request was changed elsewhere. Refresh to see the latest version before deleting.", 409);
    }
    tx.delete(ref);
    tx.create(audit, {
      actor_id: actor, action: "request.delete", entity_type: requestCollection(kind), entity_id: id,
      timestamp: now.toISOString(), metadata: { status: snapshot.get("status") },
    });
  });
}
