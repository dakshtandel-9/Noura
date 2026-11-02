import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MemberExperience } from "@/components/members/MemberExperience";
import { RequestError } from "@/lib/requests";
import { authorizeUser, userSessionCookie } from "@/lib/server/user-accounts";
import styles from "@/components/account/account.module.css";

export const metadata: Metadata = { title: "Members — NOURA", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export default async function MembersPage() {
  try { await authorizeUser((await cookies()).get(userSessionCookie)?.value); }
  catch (error) {
    if (error instanceof RequestError && [401, 403].includes(error.status)) redirect("/login");
    return <><SiteHeader solid /><main id="main" className={styles.main}><p role="alert">Member access is temporarily unavailable. Please try again.</p></main><FloatingWhatsApp /></>;
  }
  return <><SiteHeader solid /><MemberExperience /><FloatingWhatsApp /></>;
}
