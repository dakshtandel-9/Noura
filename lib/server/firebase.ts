import "server-only";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";
import { RequestError } from "../requests.ts";

let cachedApp: { auth: Auth; db: Firestore } | null = null;

export async function firebase() {
  if (cachedApp) return cachedApp;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) throw new RequestError("The service is not configured yet. Please try again later.", 503);
  const emulator = process.env.FIREBASE_AUTH_EMULATOR_HOST || process.env.FIRESTORE_EMULATOR_HOST;
  if (emulator && (!projectId.startsWith("demo-") || process.env.NOURA_FIREBASE_EMULATORS !== "true")) {
    throw new RequestError("Invalid emulator configuration.", 503);
  }

  try {
    const { applicationDefault, cert, getApps, initializeApp } = await import("firebase-admin/app");
    const { getAuth } = await import("firebase-admin/auth");
    const { getFirestore } = await import("firebase-admin/firestore");

    const app = getApps().find((app) => app.name === "noura") ?? initializeApp({
      projectId,
      ...(emulator ? {} : { credential: process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY
        ? cert({ projectId, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") })
        : applicationDefault() }),
    }, "noura");

    cachedApp = { auth: getAuth(app), db: getFirestore(app) };
    return cachedApp;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const name = error instanceof Error ? error.name : "Unknown";
    console.error(`[Firebase] Failed to initialize: ${name}: ${message}`);
    throw new RequestError("The service is temporarily unavailable. Please try again in a moment.", 503);
  }
}

export function collectionConfig() {
  const notice = process.env.NOURA_PRIVACY_NOTICE_VERSION;
  const timezone = process.env.NOURA_OPERATING_TIMEZONE;
  if (process.env.NOURA_REQUESTS_ENABLED !== "true" || process.env.NOURA_FORM_FIELDS_APPROVED !== "true" || !notice || !timezone) {
    throw new RequestError("Requests are not open yet. Your details have not been sent. Please try again later.", 503);
  }
  try { new Intl.DateTimeFormat("en", { timeZone: timezone }).format(); }
  catch { throw new RequestError("Requests are temporarily unavailable.", 503); }
  return { notice, timezone };
}
