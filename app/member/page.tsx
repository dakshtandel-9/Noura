import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Members — NOURA", robots: { index: false, follow: false } };

/** Keep the existing sign-in destination canonical; it performs the server session check. */
export default function MemberPage() {
  redirect("/members");
}
