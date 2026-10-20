import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { Icon } from "@/components/ui/Icon";
import { FieldShell } from "./FieldShell";
import styles from "./forms.module.css";

type TextFieldProps = { id: string; label: string; hint?: string; className?: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "className"
>;

export function TextField({ id, label, hint, className, required, ...rest }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} required={required} className={className}>
      <input id={id} className={styles.control} required={required} {...rest} />
    </FieldShell>
  );
}

export { SelectField } from "./SelectField";

type TextareaFieldProps = { id: string; label: string; className?: string } & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "className"
>;

export function TextareaField({ id, label, className, required, rows = 3, ...rest }: TextareaFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} className={className}>
      <textarea id={id} className={`${styles.control} ${styles.textarea}`} required={required} rows={rows} {...rest} />
    </FieldShell>
  );
}

/** Rectangular gold submit from the reference board. */
export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button type="submit" className={styles.submit}>
      <span>{children}</span>
      <Icon name="arrow-right" size={18} />
    </button>
  );
}

export function FormNote({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={[styles.note, className].filter(Boolean).join(" ")}>{children}</p>;
}
