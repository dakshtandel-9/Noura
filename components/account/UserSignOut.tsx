"use client";

import { useState } from "react";
import styles from "./account.module.css";

export function UserSignOut() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return <div className={styles.signOut}>
    <button disabled={busy} onClick={async () => {
      setBusy(true); setError("");
      try {
        const response = await fetch("/api/user/session", { method: "DELETE" });
        if (!response.ok) throw new Error("Unable to sign out. Please retry.");
        window.location.replace("/login");
      } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to sign out."); setBusy(false); }
    }}>{busy ? "Signing out…" : "Sign out"}</button>
    {error && <p role="alert" className={styles.error}>{error}</p>}
  </div>;
}
