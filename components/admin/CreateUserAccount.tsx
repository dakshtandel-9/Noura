"use client";

import { useState, type FormEvent } from "react";
import styles from "@/app/admin/admin.module.css";

export function CreateUserAccount({ onCreated }: { onCreated: () => void }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true); setMessage(""); setError(""); setFields({});
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if ([401, 403].includes(response.status)) { window.location.replace("/admin/login"); return; }
      const result = await response.json();
      if (!response.ok) { setFields(result.fields ?? {}); throw new Error(result.message || "Unable to create the account."); }
      form.reset();
      setMessage(`Account created with unique ID ${result.id}. Share the email, password and /login address privately with the user.`);
      onCreated();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to create the account. Please retry."); }
    finally { setBusy(false); }
  }

  return <section id="create-user" className={styles.leads} aria-labelledby="create-user-title">
    <div className={styles.listHeading}><div><p className={styles.eyebrow}>USER ACCOUNTS</p><h2 id="create-user-title">Create a user account</h2></div></div>
    <p className={styles.hint}>Only admins can create accounts. Users sign in at /login. Phone is optional.</p>
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.formGrid}>
        <label>Full name<input name="full_name" autoComplete="off" minLength={2} maxLength={100} required aria-invalid={!!fields.full_name} aria-describedby={fields.full_name ? "user-name-error" : undefined} />{fields.full_name && <span id="user-name-error" className={styles.error}>{fields.full_name}</span>}</label>
        <label>Email<input name="email" type="email" autoComplete="off" maxLength={254} required aria-invalid={!!fields.email} aria-describedby={fields.email ? "user-email-error" : undefined} />{fields.email && <span id="user-email-error" className={styles.error}>{fields.email}</span>}</label>
        <label>Phone (optional)<input name="phone" type="tel" autoComplete="off" maxLength={30} aria-invalid={!!fields.phone} aria-describedby={fields.phone ? "user-phone-error" : undefined} />{fields.phone && <span id="user-phone-error" className={styles.error}>{fields.phone}</span>}</label>
        <label>Password<input name="password" type="password" autoComplete="new-password" minLength={12} maxLength={128} required aria-invalid={!!fields.password} aria-describedby="user-password-hint" /><span id="user-password-hint">{fields.password || "12–128 characters. Share this password privately."}</span></label>
      </div>
      <div><button type="submit" disabled={busy}>{busy ? "Creating account…" : "Create account"}</button></div>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {message && <p role="status" className={styles.success}>{message}</p>}
    </form>
  </section>;
}
