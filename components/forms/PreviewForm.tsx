"use client";

import { useEffect, useRef, useState, type FormHTMLAttributes, type ReactNode } from "react";
import { requestPreviewNotice } from "@/content/home";
import styles from "./forms.module.css";

type Tone = "light" | "dark";

interface PreviewFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  tone?: Tone;
  children: ReactNode;
}

/** Local calendar date as YYYY-MM-DD. */
function isoToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Request form shell while no backend is connected: native validation runs, then the visitor
 * is told plainly that nothing was sent (docs/requirements.md → submission outcomes). Swap the
 * submit handler for the narrow request endpoint in the backend slice.
 */
export function PreviewForm({ tone = "light", className, children, ...rest }: PreviewFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  // Past dates are a courtesy check in the visitor's timezone; the server must re-check them
  // against the approved operating timezone (FORM-05). Set after mount so a static build
  // never ships a stale minimum.
  useEffect(() => {
    const today = isoToday();
    formRef.current?.querySelectorAll<HTMLInputElement>('input[type="date"]').forEach((input) => {
      input.min = today;
    });
  }, []);

  return (
    <form
      ref={formRef}
      className={[styles.form, tone === "dark" ? styles.dark : null, className].filter(Boolean).join(" ")}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      onChange={() => setSubmitted(false)}
      {...rest}
    >
      {children}
      <p className={styles.status} role="status">
        {submitted ? requestPreviewNotice : ""}
      </p>
    </form>
  );
}
