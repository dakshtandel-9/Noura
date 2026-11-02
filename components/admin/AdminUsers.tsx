"use client";

import { useEffect, useState, type FormEvent } from "react";
import { formatSubmissionTime } from "@/lib/requests";
import type { UserAccountPage, UserAccountRecord } from "@/lib/user-accounts";
import styles from "@/app/admin/admin.module.css";
import { CreateUserAccount } from "./CreateUserAccount";

function UserRow({ record, onChanged }: { record: UserAccountRecord; onChanged: (notice: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ full_name: record.full_name, email: record.email, phone: record.phone });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const path = `/api/admin/users/${encodeURIComponent(record.id)}`;

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setFields({});
    try {
      const response = await fetch(path, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...draft, version: record.version }) });
      if ([401, 403].includes(response.status)) { window.location.replace("/admin/login"); return; }
      const result = await response.json();
      if (!response.ok) { setFields(result.fields ?? {}); throw new Error(result.message || "Unable to save this account."); }
      setEditing(false); onChanged("Account updated.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to save this account."); }
    finally { setBusy(false); }
  }

  async function remove() {
    if (!window.confirm(`Permanently delete the login account for ${record.full_name} (${record.email})? This cannot be undone. Invitation and membership records are separate.`)) return;
    setBusy(true); setError("");
    try {
      const response = await fetch(path, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ version: record.version }) });
      if ([401, 403].includes(response.status)) { window.location.replace("/admin/login"); return; }
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to delete this account.");
      onChanged("Account deleted. Its login access has been removed.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to delete this account."); }
    finally { setBusy(false); }
  }

  return <details className={`${styles.record} ${styles.userRecord}`}>
    <summary><span className={styles.person}><strong>{record.full_name}</strong><span className={styles.email}>{record.email}</span></span><code className={styles.userId}>{record.account_code}</code><span className={styles.chevron} aria-hidden="true">⌄</span></summary>
    <div className={styles.recordBody}>
      <dl className={styles.details}><div><dt>Unique account ID</dt><dd><code className={styles.userId}>{record.account_code}</code></dd></div><div><dt>Phone</dt><dd>{record.phone || "Not supplied"}</dd></div><div><dt>Created</dt><dd><time dateTime={record.created_at}>{formatSubmissionTime(record.created_at)}</time></dd></div><div><dt>Last updated</dt><dd><time dateTime={record.updated_at}>{formatSubmissionTime(record.updated_at)}</time></dd></div></dl>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {editing ? <form className={styles.editForm} onSubmit={save}>
        <div className={styles.formGrid}>
          <label>Full name<input value={draft.full_name} minLength={2} maxLength={100} required aria-invalid={!!fields.full_name} onChange={(event) => setDraft({ ...draft, full_name: event.target.value })} />{fields.full_name && <span className={styles.error}>{fields.full_name}</span>}</label>
          <label>Email<input type="email" value={draft.email} maxLength={254} required aria-invalid={!!fields.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />{fields.email && <span className={styles.error}>{fields.email}</span>}</label>
          <label>Phone (optional)<input type="tel" value={draft.phone} maxLength={30} aria-invalid={!!fields.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />{fields.phone && <span className={styles.error}>{fields.phone}</span>}</label>
        </div>
        <div className={styles.rowActions}><button type="submit" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button><button type="button" className={styles.secondary} disabled={busy} onClick={() => { setEditing(false); setError(""); setDraft({ full_name: record.full_name, email: record.email, phone: record.phone }); }}>Cancel</button></div>
      </form> : <div className={styles.rowActions}><button type="button" className={styles.secondary} disabled={busy} onClick={() => setEditing(true)}>Edit account</button><button type="button" className={styles.danger} disabled={busy} onClick={remove}>Delete account</button></div>}
    </div>
  </details>;
}

export function AdminUsers() {
  const [cursor, setCursor] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  const [page, setPage] = useState<UserAccountPage | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/admin/users${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if ([401, 403].includes(response.status)) { window.location.replace("/admin/login"); return null; }
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to load user accounts.");
        return result as UserAccountPage;
      })
      .then((result) => { if (result && !controller.signal.aborted) setPage(result); })
      .catch((caught) => { if (!controller.signal.aborted) setError(caught instanceof Error ? caught.message : "Unable to load user accounts."); });
    return () => controller.abort();
  }, [cursor, reload]);
  const refresh = (message = "") => { setNotice(message); setError(""); setPage(null); setCursor(null); setReload((value) => value + 1); };
  return <section className={styles.dashboard}>
    <aside className={styles.sidebar} aria-label="Admin navigation"><p className={styles.sidebarLabel}>WORKSPACE</p><a href="/admin" className={styles.sidebarLink}>Overview</a><a href="/admin#leads" className={styles.sidebarLink}>Leads</a><a href="/admin/users" className={styles.sidebarLink} aria-current="page">Users</a><p className={styles.sidebarFoot}>Private records · NOURA</p></aside>
    <div className={styles.dashboardMain}>
      <div className={styles.titleRow}><div><p className={styles.eyebrow}>NOURA / PRIVATE WORKSPACE</p><h1>User accounts</h1><p className={styles.subtitle}>Manage login accounts created by the team.</p></div><a href="/admin" className={styles.sidebarLink}>Back to leads</a></div>
      <section className={styles.leads} aria-labelledby="users-title">
        <div className={styles.listHeading}><div><p className={styles.eyebrow}>DIRECTORY</p><h2 id="users-title">All users</h2></div><button type="button" className={styles.secondary} onClick={() => refresh()}>Refresh</button></div>
        <p className={styles.hint}>Each account has a stable unique account ID in the form NOURA-AB123. This is a login-account identifier, not a membership card number.</p>
        {notice && <p role="status" className={styles.success}>{notice}</p>}
        {error && <div role="alert" className={styles.error}>{error} <button type="button" className={styles.secondary} onClick={() => refresh()}>Try again</button></div>}
        {!page && !error && <p role="status" className={styles.loading}>Loading users…</p>}
        {page?.records.length === 0 && <div className={styles.empty}><h3>No user accounts yet</h3><p>Accounts created by an admin will appear here.</p></div>}
        {page && page.records.length > 0 && <div className={styles.recordList}>{page.records.map((record) => <UserRow key={record.id} record={record} onChanged={refresh} />)}</div>}
        <div className={styles.pagination}><span>{page ? `${page.records.length} shown` : ""}</span><div>{cursor && <button type="button" className={styles.secondary} onClick={() => { setPage(null); setCursor(null); }}>Back to first</button>}{page?.next && <button type="button" className={styles.secondary} onClick={() => { setPage(null); setCursor(page.next); }}>More users</button>}</div></div>
      </section>
      <CreateUserAccount onCreated={() => refresh("Account created.")} />
    </div>
  </section>;
}
