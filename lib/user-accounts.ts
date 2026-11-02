import { RequestError } from "./requests.ts";

export type NewUserAccount = { full_name: string; email: string; phone: string; password: string };
export type UserCredentials = Pick<NewUserAccount, "email" | "password">;
export type UserAccountRecord = {
  id: string;
  account_code: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  version: number;
};
export type UserAccountPage = { records: UserAccountRecord[]; next: string | null };
export type UserAccountUpdate = Pick<NewUserAccount, "full_name" | "email" | "phone"> & { version: number };

function object(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new RequestError("Enter the account details.", 422);
  return input as Record<string, unknown>;
}

function credentials(input: Record<string, unknown>, creating: boolean): UserCredentials {
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const password = typeof input.password === "string" ? input.password : "";
  const fields: Record<string, string> = {};
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = "Enter a valid email address.";
  if (password.length < (creating ? 12 : 1) || password.length > 128) fields.password = creating ? "Use a password with 12–128 characters." : "Enter your password.";
  if (Object.keys(fields).length) throw new RequestError("Check the highlighted fields.", 422, fields);
  return { email, password };
}

function profileFields(value: Record<string, unknown>): Pick<NewUserAccount, "full_name" | "phone"> {
  const full_name = typeof value.full_name === "string" ? value.full_name.trim() : "";
  const phone = typeof value.phone === "string" ? value.phone.trim() : "";
  const fields: Record<string, string> = {};
  if (full_name.length < 2 || full_name.length > 100) fields.full_name = "Enter a name with 2–100 characters.";
  if ((value.phone !== undefined && typeof value.phone !== "string") || phone.length > 30 || (phone && !/^[+\d\s().-]{5,30}$/.test(phone))) fields.phone = "Enter a phone number, or leave it blank.";
  if (Object.keys(fields).length) throw new RequestError("Check the highlighted fields.", 422, fields);
  return { full_name, phone };
}

export function parseNewUserAccount(input: unknown): NewUserAccount {
  const value = object(input);
  if (Object.keys(value).some((key) => !["full_name", "email", "phone", "password"].includes(key))) throw new RequestError("Unexpected account fields.", 422);
  return { ...credentials(value, true), ...profileFields(value) };
}

export function parseUserCredentials(input: unknown): UserCredentials {
  const value = object(input);
  if (Object.keys(value).some((key) => !["email", "password"].includes(key))) throw new RequestError("Unexpected sign-in fields.", 422);
  return credentials(value, false);
}

export function parseUserAccountUpdate(input: unknown): UserAccountUpdate {
  const value = object(input);
  if (Object.keys(value).some((key) => !["full_name", "email", "phone", "version"].includes(key))) throw new RequestError("Unexpected account fields.", 422);
  if (!Number.isSafeInteger(value.version) || (value.version as number) < 1) throw new RequestError("Refresh the users page and try again.", 409);
  const email = typeof value.email === "string" ? value.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new RequestError("Check the highlighted fields.", 422, { email: "Enter a valid email address." });
  return { ...profileFields(value), email, version: value.version as number };
}

export function parseUserAccountId(id: string): string {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(id)) throw new RequestError("Account not found.", 404);
  return id;
}

// Short, human-friendly account code, e.g. NOURA-AB123. It is a display/support identifier;
// the Firebase UID remains the internal key. Uniqueness is enforced server-side when claimed.
export const accountCodePattern = /^NOURA-[A-Z]{2}\d{3}$/;

export function generateAccountCode(randomInt: (max: number) => number = (max) => crypto.getRandomValues(new Uint32Array(1))[0]! % max): string {
  const letter = () => String.fromCharCode(65 + randomInt(26));
  const digits = String(randomInt(1000)).padStart(3, "0");
  return `NOURA-${letter()}${letter()}${digits}`;
}
