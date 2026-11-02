import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { authorizeSession, sessionCookie } from "@/lib/server/auth";
import { RequestError } from "@/lib/requests";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";
export default async function AdminUsersPage() {
  try { authorizeSession((await cookies()).get(sessionCookie)?.value); }
  catch (error) {
    if (error instanceof RequestError && [401, 403].includes(error.status)) redirect("/admin/login");
    return <section className={styles.panel}><h1>Admin is temporarily unavailable</h1><p>Check the admin configuration, then reload this page.</p></section>;
  }
  return <AdminUsers />;
}
