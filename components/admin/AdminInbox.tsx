"use client";
import { useEffect, useState, type FormEvent } from "react";
import {
  formatSubmissionTime, statusFlow, statusLabels,
  type RequestPage, type RequestRecord, type RequestStatus, type RequestView,
} from "@/lib/requests";
import styles from "@/app/admin/admin.module.css";

type Draft = Pick<RequestRecord, "full_name" | "email" | "phone" | "organization" | "private_note" | "contacted" | "status">;
const draftFor = (record: RequestRecord): Draft => ({
  full_name: record.full_name, email: record.email, phone: record.phone, organization: record.organization,
  private_note: record.private_note, contacted: record.contacted, status: record.status,
});

function LeadRow({ record, onChanged }: { record: RequestRecord; onChanged: (message: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Draft>(() => draftFor(record));
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const action = `/api/admin/requests/${record.kind}/${record.id}`;
  const availableStatuses = [record.status, ...(statusFlow[record.kind][record.status] ?? []).filter((status) => status !== "approved")];
  const change = (field: keyof Draft, value: string | boolean) => setDraft((current) => ({ ...current, [field]: value }));

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError("");
    try {
      const body = {
        version: record.version, reason, full_name: draft.full_name, email: draft.email, phone: draft.phone,
        private_note: draft.private_note, contacted: draft.contacted, status: draft.status,
        ...(record.kind === "invitation" ? { organization: draft.organization } : {}),
      };
      const response = await fetch(action, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if ([401, 403].includes(response.status)) { window.location.replace("/admin/login"); return; }
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to save this lead.");
      setEditing(false);
      onChanged("Lead updated.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to save this lead."); }
    finally { setBusy(false); }
  }

  async function remove() {
    if (!window.confirm(`Permanently delete ${record.full_name}'s ${record.kind === "invitation" ? "invitation" : "private-session"} request? This cannot be undone.`)) return;
    setBusy(true); setError("");
    try {
      const response = await fetch(action, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ version: record.version }) });
      if ([401, 403].includes(response.status)) { window.location.replace("/admin/login"); return; }
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to delete this lead.");
      onChanged("Lead deleted.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to delete this lead."); }
    finally { setBusy(false); }
  }

  return <details className={styles.record}>
    <summary>
      <span className={styles.person}><strong>{record.full_name}</strong><span className={styles.email}>{record.email}</span></span>
      <span className={styles.kind}>{record.kind === "invitation" ? "Invitation" : "Private session"}</span>
      <span className={`${styles.badge} ${record.contacted ? styles.contacted : ""}`}>{record.contacted ? "Contacted" : "To contact"}</span>
      <time dateTime={record.created_at}>{formatSubmissionTime(record.created_at)}</time>
      <span className={styles.chevron} aria-hidden="true">⌄</span>
    </summary>
    <div className={styles.recordBody}>
      <div className={styles.recordMeta}><span>Status: <strong>{statusLabels[record.status]}</strong></span><span>Submitted: <time dateTime={record.created_at}>{formatSubmissionTime(record.created_at)}</time></span>{record.contacted_at && <span>Contacted: <time dateTime={record.contacted_at}>{formatSubmissionTime(record.contacted_at)}</time></span>}</div>
      <dl className={styles.details}>
        {Object.entries({ Email: record.email, Phone: record.phone, Organization: record.organization, Interests: record.interest_choices?.join(", ") || record.interests, Message: record.message, Session: record.session_type, "Preferred date": record.preferred_date, "Preferred time": record.time_window, "Private note": record.private_note }).filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {editing ? <form className={styles.editForm} onSubmit={save}>
        <div className={styles.formGrid}>
          <label>Full name<input value={draft.full_name} onChange={(event) => change("full_name", event.target.value)} minLength={2} maxLength={100} required /></label>
          <label>Email<input type="email" value={draft.email} onChange={(event) => change("email", event.target.value)} maxLength={254} required /></label>
          <label>Phone<input value={draft.phone} onChange={(event) => change("phone", event.target.value)} maxLength={30} /></label>
          {record.kind === "invitation" && <label>Organization<input value={draft.organization} onChange={(event) => change("organization", event.target.value)} maxLength={100} /></label>}
          <label>Review status<select value={draft.status} onChange={(event) => change("status", event.target.value as RequestStatus)}>{availableStatuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></label>
          <label className={styles.checkbox}><input type="checkbox" checked={draft.contacted} onChange={(event) => change("contacted", event.target.checked)} />Contacted this lead</label>
        </div>
        <label>Private note<textarea value={draft.private_note} onChange={(event) => change("private_note", event.target.value)} maxLength={2000} rows={3} /></label>
        {record.status === "declined" && draft.status === "under_review" && <label>Reason for reopening<textarea value={reason} onChange={(event) => setReason(event.target.value)} minLength={5} maxLength={300} rows={2} required /></label>}
        <div className={styles.rowActions}><button type="submit" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button><button type="button" className={styles.secondary} disabled={busy} onClick={() => { setDraft(draftFor(record)); setEditing(false); setError(""); }}>Cancel</button></div>
      </form> : <div className={styles.rowActions}><button type="button" className={styles.secondary} disabled={busy} onClick={() => { setDraft(draftFor(record)); setEditing(true); setError(""); }}>Edit lead</button><button type="button" className={styles.danger} disabled={busy} onClick={remove}>{busy ? "Deleting…" : "Delete lead"}</button></div>}
    </div>
  </details>;
}

export function AdminInbox() {
  const [view, setView] = useState<RequestView>("all");
  const [cursor, setCursor] = useState<string | null>(null);
  const [page, setPage] = useState<RequestPage | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [reload, setReload] = useState(0);
  const [signingOut, setSigningOut] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/admin/requests?kind=${view}${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if ([401, 403].includes(response.status)) { window.location.replace("/admin/login"); return; }
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to load leads.");
        setError(""); setPage(result);
      }).catch((caught) => { if (!controller.signal.aborted) setError(caught instanceof Error ? caught.message : "Unable to load leads."); });
    return () => controller.abort();
  }, [view, cursor, reload]);
  const reset = () => { setPage(null); setError(""); };
  const selectView = (next: RequestView) => { reset(); setCursor(null); setView(next); };
  const refresh = (message = "") => { setNotice(message); reset(); setCursor(null); setReload((current) => current + 1); };
  const total = page ? page.totals.invitation + page.totals.session : null;
  const contacted = page ? page.contactedTotals.invitation + page.contactedTotals.session : null;
  const newCount = page ? page.newTotals.invitation + page.newTotals.session : null;

  return <section className={styles.dashboard}>
    <aside className={styles.sidebar} aria-label="Admin navigation"><p className={styles.sidebarLabel}>WORKSPACE</p><a href="#overview" className={styles.sidebarLink}>Overview</a><a href="#leads" className={styles.sidebarLink}>Leads</a><p className={styles.sidebarFoot}>Private records · NOURA</p></aside>
    <div className={styles.dashboardMain}>
      <div className={styles.titleRow}><div><p className={styles.eyebrow}>NOURA / PRIVATE WORKSPACE</p><h1>Lead dashboard</h1><p className={styles.subtitle}>Review each enquiry and record your follow-up.</p></div>
        <button className={styles.secondary} disabled={signingOut} onClick={async () => {
          setSigningOut(true);
          try {
            const response = await fetch("/api/admin/session", { method: "DELETE" });
            if (!response.ok) throw new Error("Unable to sign out. Please retry.");
            window.location.replace("/admin/login");
          } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to sign out."); setSigningOut(false); }
        }}>{signingOut ? "Signing out…" : "Sign out"}</button>
      </div>
      <section id="overview" aria-label="Lead overview" className={styles.overview}>
        <div className={styles.metric}><span>All leads</span><strong>{total ?? "—"}</strong><small>Invitation and session requests</small></div>
        <div className={styles.metric}><span>Contacted</span><strong>{contacted ?? "—"}</strong><small>Marked contacted by an admin</small></div>
        <div className={styles.metric}><span>To contact</span><strong>{total !== null && contacted !== null ? total - contacted : "—"}</strong><small>Not yet marked contacted</small></div>
        <div className={styles.metric}><span>New requests</span><strong>{newCount ?? "—"}</strong><small>Awaiting initial review</small></div>
      </section>
      <section id="leads" className={styles.leads} aria-label="Lead list">
        <div className={styles.listHeading}><div><p className={styles.eyebrow}>REQUESTS</p><h2>All enquiries</h2></div><button className={styles.secondary} onClick={() => refresh()}>Refresh</button></div>
        <div className={styles.tabs} role="group" aria-label="Filter leads by type">
          {(["all", "invitation", "session"] as const).map((option) => <button type="button" key={option} className={view === option ? styles.activeTab : styles.tab} aria-pressed={view === option} onClick={() => selectView(option)}>{option === "all" ? "All leads" : option === "invitation" ? "Invitations" : "Private sessions"}{page && <span>{option === "all" ? total : page.totals[option]}</span>}</button>)}
        </div>
        <p className={styles.hint}>All submitted times are shown in Indian Standard Time (IST). Requests do not confirm membership or reserve a session.</p>
        {notice && <p role="status" className={styles.success}>{notice}</p>}
        {error && <div role="alert" className={styles.error}>{error} <button type="button" className={styles.secondary} onClick={() => refresh()}>Try again</button></div>}
        {!page && !error && <p role="status" className={styles.loading}>Loading leads…</p>}
        {page?.records.length === 0 && <div className={styles.empty}><h3>No leads here yet</h3><p>New requests will appear here when submitted.</p></div>}
        {page && page.records.length > 0 && <><div className={styles.listHeader}><span>Lead</span><span>Type</span><span>Follow-up</span><span>Submitted</span></div><div className={styles.recordList}>{page.records.map((record) => <LeadRow key={`${record.kind}:${record.id}`} record={record} onChanged={refresh} />)}</div></>}
        <div className={styles.pagination}><span>{page ? `${page.records.length} shown · ${page.count} in this view` : ""}</span><div>{cursor && <button className={styles.secondary} onClick={() => { reset(); setCursor(null); }}>Back to newest</button>}{page?.next && <button className={styles.secondary} onClick={() => { reset(); setCursor(page.next); }}>Older leads</button>}</div></div>
      </section>
    </div>
  </section>;
}
