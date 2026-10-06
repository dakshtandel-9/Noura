"use client";
import { useEffect, useState } from "react";
import type { RequestKind, RequestRecord } from "@/lib/requests";
import styles from "@/app/admin/admin.module.css";

type Page = { records: RequestRecord[]; count: number; next: string | null };
export function AdminInbox() {
  const [kind, setKind] = useState<RequestKind>("invitation");
  const [cursor, setCursor] = useState<string | null>(null);
  const [page, setPage] = useState<Page | null>(null);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [signingOut, setSigningOut] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/admin/requests?kind=${kind}${cursor ? `&cursor=${cursor}` : ""}`, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if ([401, 403].includes(response.status)) { window.location.replace("/admin/login"); return; }
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setPage(result);
      }).catch((e) => { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : "Unable to load requests."); });
    return () => controller.abort();
  }, [kind, cursor, reload]);
  const reset = () => { setPage(null); setError(""); };
  return <section className={styles.inbox}>
    <div className={styles.titleRow}><div><p className={styles.eyebrow}>Every request, personally considered</p><h1>Request inbox</h1></div>
      <button className={styles.secondary} disabled={signingOut} onClick={async () => {
        setSigningOut(true);
        try {
          const response = await fetch("/api/admin/session", { method: "DELETE" });
          if (!response.ok) throw new Error("Unable to sign out. Please retry.");
          window.location.replace("/admin/login");
        } catch (e) { setError(e instanceof Error ? e.message : "Unable to sign out."); setSigningOut(false); }
      }}>{signingOut ? "Signing out…" : "Sign out"}</button>
    </div>
    <div className={styles.toolbar}>
      <label>Request type<select value={kind} onChange={(e) => { reset(); setCursor(null); setKind(e.target.value as RequestKind); }}><option value="invitation">Invitations</option><option value="session">Private sessions</option></select></label>
      <button className={styles.secondary} onClick={() => { reset(); setCursor(null); setReload((r) => r + 1); }}>Refresh</button>
      {page && <p>{page.count} {page.count === 1 ? "request" : "requests"} · newest first</p>}
    </div>
    <p className={styles.hint}>Submissions are enquiries. A request does not confirm membership or reserve a session.</p>
    {error && <p role="alert" className={styles.error}>{error}</p>}
    {!page && !error && <p role="status">Loading requests…</p>}
    {page?.records.length === 0 && <div className={styles.panel}><h2>No requests yet</h2><p>New submissions will appear here once collection is enabled.</p></div>}
    {page?.records.map((record) => <details className={styles.record} key={record.id}>
      <summary><span><strong>{record.full_name}</strong><span className={styles.email}>{record.email}</span></span><span className={styles.badge}>{record.status.replaceAll("_", " ")}</span><time dateTime={record.created_at}>{new Date(record.created_at).toLocaleDateString("en-GB")}</time></summary>
      <dl className={styles.details}>
        {Object.entries({ Email: record.email, Phone: record.phone, Organization: record.organization, Interests: record.interest_choices?.join(", ") || record.interests, Message: record.message, Session: record.session_type, "Preferred date": record.preferred_date, "Preferred time": record.time_window }).filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
    </details>)}
    <div className={styles.toolbar}>
      {cursor && <button className={styles.secondary} onClick={() => { reset(); setCursor(null); }}>Back to newest</button>}
      {page?.next && <button onClick={() => { const next = page.next; reset(); setCursor(next); }}>Older requests</button>}
    </div>
  </section>;
}
