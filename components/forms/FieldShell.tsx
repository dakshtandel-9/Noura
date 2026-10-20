import type { ReactNode } from "react";
import styles from "./forms.module.css";

interface FieldShellProps {
  id: string;
  label: string;
  /** Muted note after the label, e.g. "(optional)". */
  hint?: string;
  required?: boolean;
  className?: string;
  /** Lets a custom control name itself with `aria-labelledby`. */
  labelId?: string;
  children: ReactNode;
}

/** Visible label above an underlined control; the asterisk is visual, `required` is announced. */
export function FieldShell({ id, label, hint, required, className, labelId, children }: FieldShellProps) {
  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      <label id={labelId} className={styles.label} htmlFor={id}>
        {label}
        {hint && <span className={styles.hint}> {hint}</span>}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
