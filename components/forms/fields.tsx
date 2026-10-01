import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./forms.module.css";

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** Visible label above an underlined control; the asterisk is visual, `required` is announced. */
function FieldShell({ id, label, required, className, children }: FieldShellProps) {
  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      <label className={styles.label} htmlFor={id}>
        {label}
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

type TextFieldProps = { id: string; label: string; className?: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "className"
>;

export function TextField({ id, label, className, required, ...rest }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} className={className}>
      <input id={id} className={styles.control} required={required} {...rest} />
    </FieldShell>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className" | "children">;

export function SelectField({ id, label, placeholder, options, className, required, ...rest }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} className={className}>
      <span className={styles.selectWrap}>
        <select id={id} className={`${styles.control} ${styles.select}`} required={required} defaultValue="" {...rest}>
          <option value="" disabled={required}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={20} className={styles.chevron} />
      </span>
    </FieldShell>
  );
}

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
