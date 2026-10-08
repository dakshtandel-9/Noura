export const sessionTypes = ["Yoga", "Meditation", "Music & Sound", "Private Group Sessions", "Not sure yet"] as const;
export const interestOptions = ["Yoga Kriyas", "Meditation", "Sound Healing", "Soulful Music", "Deep Conversations", "Rediscovering Oneself", "Experiencing Luxury", "All of the above"] as const;
export type RequestKind = "invitation" | "session";
export type RequestView = RequestKind | "all";
export interface RequestData {
  full_name: string;
  email: string;
  phone: string;
  interests: string;
  interest_choices: string[];
  organization: string;
  message: string;
  session_type: string;
  preferred_date: string;
  time_window: string;
}
export interface RequestRecord extends RequestData {
  id: string;
  kind: RequestKind;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
  private_note: string;
  notice_version: string;
  version: number;
  contacted: boolean;
  contacted_at: string | null;
}

export interface RequestPage {
  records: RequestRecord[];
  count: number;
  totals: Record<RequestKind, number>;
  contactedTotals: Record<RequestKind, number>;
  newTotals: Record<RequestKind, number>;
  next: string | null;
}

export function formatSubmissionTime(value: string): string {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "Time unavailable";
  const formatted = new Intl.DateTimeFormat("en-IN", {
    day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", second: "2-digit",
    hour12: true, timeZone: "Asia/Kolkata",
  }).format(date);
  return `${formatted} IST`;
}

/** Review states (docs/requirements.md → state models). */
export type RequestStatus = "new" | "under_review" | "follow_up_needed" | "approved" | "declined";
export const statusLabels: Record<RequestStatus, string> = {
  new: "New",
  under_review: "Under review",
  follow_up_needed: "Follow-up needed",
  approved: "Approved",
  declined: "Declined",
};

/**
 * Allowed moves from each state. Invitation: new → under_review → approved | declined.
 * Appointment: new → under_review → follow_up_needed | approved | declined. A declined request
 * may return to under_review only with a reason, which is kept in the audit log.
 */
export const statusFlow: Record<RequestKind, Partial<Record<RequestStatus, readonly RequestStatus[]>>> = {
  invitation: { new: ["under_review"], under_review: ["approved", "declined"], approved: [], declined: ["under_review"] },
  session: {
    new: ["under_review"],
    under_review: ["follow_up_needed", "approved", "declined"],
    follow_up_needed: ["approved", "declined"],
    approved: [],
    declined: ["under_review"],
  },
};
export const statusesFor = (kind: RequestKind) => Object.keys(statusFlow[kind]) as RequestStatus[];
export const needsReason = (from: RequestStatus, to: RequestStatus) => from === "declined" && to === "under_review";

/** Fields staff may correct. The applicant's own words (interests, message) stay as sent. */
export interface RequestUpdate {
  version: number;
  reason: string;
  changes: Partial<Pick<RequestRecord, "status" | "private_note" | "full_name" | "email" | "phone" | "organization" | "contacted">>;
}

export function parseUpdate(kind: RequestKind, input: unknown): RequestUpdate {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new RequestError("Invalid request.");
  const raw = input as Record<string, unknown>;
  const allowed = new Set(["version", "reason", "status", "private_note", "full_name", "email", "phone", "contacted", ...(kind === "invitation" ? ["organization"] : [])]);
  if (Object.keys(raw).some((key) => !allowed.has(key))) throw new RequestError("Unexpected fields.");
  if (!Number.isInteger(raw.version) || (raw.version as number) < 1) throw new RequestError("Refresh the inbox and try again.", 409);
  const fields: Record<string, string> = {};
  const changes: RequestUpdate["changes"] = {};
  function text(key: "private_note" | "full_name" | "email" | "phone" | "organization", min: number, max: number) {
    if (!(key in raw)) return;
    const value = raw[key];
    if (typeof value !== "string" || value.trim().length < min || value.length > max) {
      fields[key] = min ? `Please enter ${min}–${max} characters.` : `Please keep this under ${max} characters.`;
      return;
    }
    changes[key] = value.trim();
  }
  text("full_name", 2, 100);
  text("email", 3, 254);
  text("phone", 0, 30);
  text("organization", 0, 100);
  text("private_note", 0, 2000);
  if (changes.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(changes.email)) fields.email = "Enter a valid email address.";
  if ("status" in raw) {
    if (typeof raw.status !== "string" || !statusesFor(kind).includes(raw.status as RequestStatus)) fields.status = "Choose a listed status.";
    else changes.status = raw.status as RequestStatus;
  }
  if ("contacted" in raw) {
    if (typeof raw.contacted !== "boolean") fields.contacted = "Choose whether this lead has been contacted.";
    else changes.contacted = raw.contacted;
  }
  const reason = raw.reason ?? "";
  if (typeof reason !== "string" || reason.length > 300) fields.reason = "Please keep the reason under 300 characters.";
  if (Object.keys(fields).length) throw new RequestError("Please check the highlighted fields.", 422, fields);
  if (!Object.keys(changes).length) throw new RequestError("There is nothing to save.");
  return { version: raw.version as number, reason: (reason as string).trim(), changes };
}

/** Checks a status move against the flow; returns field errors (empty when allowed). */
export function checkTransition(kind: RequestKind, from: RequestStatus, to: RequestStatus, reason: string): Record<string, string> {
  if (from === to) return {};
  if (!statusFlow[kind][from]?.includes(to)) return { status: `A request that is ${statusLabels[from].toLowerCase()} cannot move to ${statusLabels[to].toLowerCase()}.` };
  if (needsReason(from, to) && reason.length < 5) return { reason: "Give a short reason for reopening a declined request." };
  return {};
}
export const receivedMessage = "Your request has been received. Our team will review it and contact you with next steps. This is not a confirmed booking or membership approval.";

export class RequestError extends Error {
  status: number;
  fields: Record<string, string>;
  constructor(message: string, status = 400, fields: Record<string, string> = {}) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

export function parseRequest(kind: RequestKind, input: unknown, timezone: string, now = new Date()) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new RequestError("Invalid request.");
  const raw = input as Record<string, unknown>;
  const allowed = new Set(["full_name", "email", "phone", "privacy_acknowledged", "idempotency_key", "website", "started_at",
    ...(kind === "invitation" ? ["interests", "organization", "message"] : ["session_type", "preferred_date", "time_window", "message"])]);
  if (Object.keys(raw).some((key) => !allowed.has(key))) throw new RequestError("Unexpected form fields.");
  const fields: Record<string, string> = {};
  function string(key: string, min: number, max: number) {
    const value = raw[key] ?? "";
    if (typeof value !== "string" || value.trim().length < min || value.length > max) {
      fields[key] = `Please enter ${min ? `${min}–` : "no more than "}${max} characters.`;
      return "";
    }
    return value.trim();
  }
  const data: RequestData = {
    full_name: string("full_name", 2, 100), email: string("email", 3, 254), phone: string("phone", 0, 30),
    message: string("message", 0, 1000), interests: "", interest_choices: [], organization: "",
    session_type: "", preferred_date: "", time_window: "",
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) fields.email = "Enter a valid email address.";
  if (raw.privacy_acknowledged !== true) fields.privacy_acknowledged = "Please acknowledge the privacy notice.";
  if (typeof raw.idempotency_key !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(raw.idempotency_key)) {
    throw new RequestError("Please refresh the form and try again.");
  }
  if (raw.website !== "" || typeof raw.started_at !== "number" || !Number.isFinite(raw.started_at) || now.getTime() - raw.started_at < 1500) {
    throw new RequestError("Please wait a moment and try again.");
  }
  if (kind === "invitation") {
    data.organization = string("organization", 0, 100);
    if (Array.isArray(raw.interests)) {
      if (!raw.interests.length || raw.interests.length > interestOptions.length || raw.interests.some((v) => typeof v !== "string" || !interestOptions.includes(v as typeof interestOptions[number]))) {
        fields.interests = "Choose at least one of the listed interests.";
      } else data.interest_choices = [...new Set(raw.interests as string[])];
      if (data.message.length < 10) fields.message = "Tell us a little about your interest (10–1000 characters).";
      data.interests = data.message;
    } else data.interests = string("interests", 10, 1000);
  } else {
    data.session_type = string("session_type", 1, 60);
    if (!sessionTypes.includes(data.session_type as typeof sessionTypes[number])) fields.session_type = "Choose a listed session type.";
    data.preferred_date = string("preferred_date", 0, 10);
    data.time_window = string("time_window", 0, 30);
    if (!["", "Morning", "Afternoon", "Evening", "No preference"].includes(data.time_window)) fields.time_window = "Choose a listed time preference.";
    if (data.preferred_date) {
      const parts = new Intl.DateTimeFormat("en-US", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
      const part = (type: string) => parts.find((p) => p.type === type)?.value;
      const today = `${part("year")}-${part("month")}-${part("day")}`;
      const date = new Date(`${data.preferred_date}T00:00:00Z`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data.preferred_date) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== data.preferred_date || data.preferred_date < today) {
        fields.preferred_date = "Choose a valid date today or later in the service timezone.";
      }
    }
  }
  if (Object.keys(fields).length) throw new RequestError("Please check the highlighted fields.", 422, fields);
  return { data, key: raw.idempotency_key };
}
