import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { UserLogin } from "@/components/account/UserLogin";
import { authorizeUser, userSessionCookie } from "@/lib/server/user-accounts";
import styles from "@/components/account/account.module.css";

export const metadata: Metadata = { title: "Sign in — NOURA", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export default async function LoginPage() {
  let signedIn = false;
  try { await authorizeUser((await cookies()).get(userSessionCookie)?.value); signedIn = true; } catch { /* keep sign-in available */ }
  if (signedIn) redirect("/members");
  return <><SiteHeader solid /><main id="main" className={styles.main}><UserLogin /></main><SiteFooter /><FloatingWhatsApp /></>;
}
