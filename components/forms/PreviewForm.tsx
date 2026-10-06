"use client";

import { useEffect, useId, useRef, useState, type FormHTMLAttributes, type ReactNode } from "react";
import type { RequestKind } from "@/lib/requests";
import styles from "./forms.module.css";

interface PreviewFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  kind?: RequestKind;
  tone?: "light" | "dark";
  children: ReactNode;
  /** The submit button (and any note beside it), placed after the privacy acknowledgement so
   *  the checkbox comes before the button both on screen and in keyboard order. */
  submit: ReactNode;
}

/** Shared request shell. Collection is disabled until server configuration is approved. */
export function PreviewForm({ kind = "invitation", tone = "light", className, children, submit, ...rest }: PreviewFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const token = useRef("");
  const started = useRef(0);
  const sending = useRef(false);
  const statusId = useId();
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("Checking request availability…");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    token.current = crypto.randomUUID();
    started.current = Date.now();
    const controller = new AbortController();
    fetch("/api/requests/config", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const config = await response.json();
        setEnabled(config.enabled);
        setStatus(config.enabled ? "" : "Requests are not open yet. This form is available for preview only; no details will be sent.");
        if (config.today) formRef.current?.querySelectorAll<HTMLInputElement>('input[type="date"]').forEach((input) => { input.min = config.today; });
      })
      .catch(() => { if (!controller.signal.aborted) setStatus("Requests are temporarily unavailable. Please reload to try again."); });
    return () => controller.abort();
  }, []);

  return <form {...rest} ref={formRef} aria-busy={busy} aria-describedby={statusId}
    className={[styles.form, tone === "dark" ? styles.dark : null, className].filter(Boolean).join(" ")}
    onSubmit={async (event) => {
      event.preventDefault();
      if (!enabled || sending.current || sent) return;
      const form = event.currentTarget;
      const values = new FormData(form);
      const payload: Record<string, unknown> = Object.fromEntries(values);
      if (form.querySelector('input[type="checkbox"][name="interests"]')) payload.interests = values.getAll("interests");
      payload.privacy_acknowledged = values.get("privacy_acknowledged") === "on";
      payload.idempotency_key = token.current;
      payload.started_at = started.current;
      sending.current = true; setBusy(true); setErrors({}); setStatus("Sending your request…");
      try {
        const response = await fetch(`/api/requests/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const result = await response.json();
        if (!response.ok) {
          setErrors(result.fields ?? {});
          const first = Object.keys(result.fields ?? {})[0];
          const field = first ? form.elements.namedItem(first) : null;
          if (field instanceof HTMLElement) { field.closest("details")?.setAttribute("open", ""); field.focus(); }
          throw new Error(result.message || "Unable to send. Please retry.");
        }
        setSent(true); setStatus(result.message);
      } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to send. Your entries are still here; please retry."); }
      finally { sending.current = false; setBusy(false); }
    }}>
    <fieldset className={styles.contents} disabled={!enabled || busy || sent}>
      {children}
      <label className={styles.privacy}><input name="privacy_acknowledged" type="checkbox" required /> <span>I have read the <a href="/privacy" target="_blank" rel="noreferrer">privacy notice</a> and acknowledge how my request will be handled.</span></label>
      <div className={styles.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {submit}
    </fieldset>
    <p id={statusId} className={styles.status} role="status">{status}</p>
    {Object.keys(errors).length > 0 && <ul className={styles.status} role="alert">{Object.entries(errors).map(([field, message]) => <li key={field}>{field.replaceAll("_", " ")}: {message}</li>)}</ul>}
  </form>;
}
