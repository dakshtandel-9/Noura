import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authorizeSession, sessionCookie } from "@/lib/server/auth";
import { AdminInbox } from "@/components/admin/AdminInbox";
import { RequestError } from "@/lib/requests";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";
export default async function AdminPage() {
  let unavailable = false;
  try { authorizeSession((await cookies()).get(sessionCookie)?.value); }
  catch (error) {
    if (error instanceof RequestError && [401, 403].includes(error.status)) redirect("/admin/login");
    unavailable = true;
  }
  if (unavailable) return <section className={styles.panel}><h1>Admin is temporarily unavailable</h1><p>Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET on the server, then reload this page.</p></section>;
  return <AdminInbox />;
}
