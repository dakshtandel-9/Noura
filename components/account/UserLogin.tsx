"use client";

import { useState, type FormEvent } from "react";
import styles from "./account.module.css";

export function UserLogin() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/user/session", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
      });
      const result = await response.json();
      if (!response.ok) {
        // Keep the rate limiter active, but don't expose its cooldown window in the
        // sign-in UI. The account flow uses one neutral recovery message for all
        // unsuccessful attempts.
        const message = response.status === 429
          ? "Unable to sign in. Please check your details and try again."
          : result.message || "Unable to sign in.";
        throw new Error(message);
      }
      form.reset();
      // A fresh document also refreshes the signed-in header on every page.
      window.location.replace("/members");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to sign in. Please retry."); }
    finally { setBusy(false); }
  }

  return <section className={styles.panel} aria-labelledby="login-title">
    <p className={styles.eyebrow}>NOURA / PRIVATE ACCESS</p>
    <h1 id="login-title">Welcome back.</h1>
    <p>Sign in with the account created for you by the NOURA team.</p>
    <form className={styles.form} onSubmit={submit}>
      <label>Email<input name="email" type="email" autoComplete="username" maxLength={254} required /></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" maxLength={128} required /></label>
      <button type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      {error && <p role="alert" className={styles.error}>{error}</p>}
    </form>
    <p className={styles.hint}>Need access or help with your password? Contact the NOURA team. Accounts are created by an admin.</p>
  </section>;
}
