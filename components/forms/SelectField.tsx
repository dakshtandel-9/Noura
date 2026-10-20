"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { FieldShell } from "./FieldShell";
import styles from "./forms.module.css";

interface SelectFieldProps {
  id: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  name?: string;
  required?: boolean;
  className?: string;
}

/**
 * Select-only combobox (WAI-ARIA APG pattern) styled as an underlined field, with a NOURA
 * option panel instead of the browser's picker. A visually hidden native <select> carries the
 * value into FormData and keeps `required` validation; it is disabled with the form's fieldset.
 */
export function SelectField({ id, label, placeholder, options, name, required, className }: SelectFieldProps) {
  const uid = useId();
  const labelId = `${uid}-label`;
  const valueId = `${uid}-value`;
  const listId = `${uid}-list`;
  const optionId = (index: number) => `${uid}-option-${index}`;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", timer: 0 });
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (open) listRef.current?.querySelector(`#${CSS.escape(optionId(active))}`)?.scrollIntoView({ block: "nearest" });
    // optionId only depends on uid, which is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  useEffect(() => () => window.clearTimeout(typeahead.current.timer), []);

  const show = (index = Math.max(options.indexOf(value), 0)) => {
    setActive(index);
    setOpen(true);
  };

  const choose = (index: number) => {
    setValue(options[index] ?? "");
    setInvalid(false);
    setOpen(false);
  };

  /** Jump to the next option starting with the typed letters, as a native select does. */
  const match = (key: string) => {
    const state = typeahead.current;
    window.clearTimeout(state.timer);
    state.text += key.toLowerCase();
    state.timer = window.setTimeout(() => { state.text = ""; }, 500);
    const start = state.text.length === 1 ? active + 1 : active;
    const ordered = [...options.slice(start), ...options.slice(0, start)];
    const found = ordered.find((option) => option.toLowerCase().startsWith(state.text));
    return found === undefined ? -1 : options.indexOf(found);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    const { key, altKey } = event;

    if (!open) {
      if (key === "ArrowDown" || key === "ArrowUp" || key === "Enter" || key === " ") {
        event.preventDefault();
        show();
      } else if (key === "Home" || key === "End") {
        event.preventDefault();
        show(key === "Home" ? 0 : last);
      } else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !altKey) {
        const index = match(key);
        if (index >= 0) show(index);
      }
      return;
    }

    if ((key === "ArrowUp" && altKey) || key === "Enter" || key === " ") {
      event.preventDefault();
      choose(active);
    } else if (key === "ArrowDown") {
      event.preventDefault();
      setActive(Math.min(active + 1, last));
    } else if (key === "ArrowUp") {
      event.preventDefault();
      setActive(Math.max(active - 1, 0));
    } else if (key === "Home" || key === "PageUp") {
      event.preventDefault();
      setActive(0);
    } else if (key === "End" || key === "PageDown") {
      event.preventDefault();
      setActive(last);
    } else if (key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (key === "Tab") {
      setOpen(false);
    } else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !altKey) {
      const index = match(key);
      if (index >= 0) setActive(index);
    }
  };

  return (
    <FieldShell id={id} label={label} required={required} className={className} labelId={labelId}>
      <span className={styles.selectWrap}>
        <select
          className={styles.nativeSelect}
          name={name}
          required={required}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onInvalid={() => setInvalid(true)}
          // Focused only by validation or a server error; hand keyboard control to the trigger.
          onKeyDown={(event) => {
            if (event.key === "Tab") return;
            event.preventDefault();
            triggerRef.current?.focus();
            show();
          }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          ref={triggerRef}
          id={id}
          type="button"
          role="combobox"
          className={`${styles.control} ${styles.select}`}
          aria-labelledby={`${labelId} ${valueId}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open ? optionId(active) : undefined}
          aria-required={required || undefined}
          aria-invalid={invalid || undefined}
          data-placeholder={value === "" || undefined}
          onClick={() => (open ? setOpen(false) : show())}
          onKeyDown={onKeyDown}
          onBlur={() => setOpen(false)}
        >
          <span id={valueId} className={styles.selectValue}>
            {value || placeholder}
          </span>
        </button>
        <Icon name="chevron-down" size={20} className={styles.chevron} />
        <ul id={listId} ref={listRef} role="listbox" aria-labelledby={labelId} className={styles.listbox} hidden={!open} tabIndex={-1}>
          {options.map((option, index) => (
            <li
              key={option}
              id={optionId(index)}
              role="option"
              aria-selected={option === value}
              className={styles.option}
              data-active={index === active || undefined}
              // Keep focus on the trigger so the panel does not close before the click lands.
              onMouseDown={(event) => event.preventDefault()}
              onMouseMove={() => setActive(index)}
              onClick={() => choose(index)}
            >
              <span>{option}</span>
              {option === value && <Icon name="check" size={18} className={styles.optionCheck} />}
            </li>
          ))}
        </ul>
      </span>
    </FieldShell>
  );
}
