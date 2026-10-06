import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { authorizeSession, sessionCookie } from "@/lib/server/auth";

export const dynamic = "force-dynamic";
export default async function LoginPage() {
  let signedIn = false;
  try { authorizeSession((await cookies()).get(sessionCookie)?.value); signedIn = true; } catch { /* show the form */ }
  if (signedIn) redirect("/admin");
  return <AdminLogin />;
}
