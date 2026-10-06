"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/app/admin/admin.module.css";

export function AdminLogin() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return <section className={`${styles.panel} ${styles.login}`}>
    <p className={styles.eyebrow}>For the NOURA team</p>
    <h1>A quiet place to manage requests.</h1>
    <p>Enter the admin password to continue.</p>
    <form className={styles.form} onSubmit={async (event) => {
      event.preventDefault();
      if (busy) return;
      const form = event.currentTarget;
      const data = new FormData(form);
      setBusy(true); setError("");
      try {
        const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: data.get("password") }) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        form.reset();
        router.replace("/admin");
      } catch (error) { setError(error instanceof Error ? error.message : "Unable to sign in. Please retry."); }
      finally { setBusy(false); }
    }}>
      <label>Password<input name="password" type="password" autoComplete="current-password" maxLength={128} required autoFocus /></label>
      <button disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      {error && <p role="alert" className={styles.error}>{error}</p>}
    </form>
    <p className={styles.hint}>Forgotten the password? Ask the site owner — it is set on the server.</p>
  </section>;
}
