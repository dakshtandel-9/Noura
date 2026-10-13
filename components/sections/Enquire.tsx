import { PreviewForm } from "@/components/forms/PreviewForm";
import { SelectField, SubmitButton, TextareaField, TextField } from "@/components/forms/fields";
import { FIELD_LIMITS, SESSION_TYPES, enquire as copy } from "@/content/home";
import styles from "./Enquire.module.css";

/**
 * 02e — Enquire: a centred heading and intro over a two-column form (first and last name,
 * email, phone beside a preferred experience, then the message). The form posts to the
 * invitation request endpoint: PreviewForm joins the two name boxes into `full_name`, the
 * message travels as the free-text `interests` field (10–1000 characters) and the experience
 * as the optional `session_type`. The contact cards live in the next section, Get in touch.
 * `headingLevel="h1"` is for the /invitation page, where this form is the whole page.
 */
export function Enquire({ headingLevel: Heading = "h2" }: { headingLevel?: "h1" | "h2" } = {}) {
  const f = copy.fields;

  return (
    <section className={styles.section} id="enquire" aria-labelledby="enquire-title">
      <div className={styles.inner}>
        <header className={styles.header} data-reveal>
          <Heading id="enquire-title" className={styles.title}>
            {copy.title}
          </Heading>
          <p className={styles.intro}>{copy.intro}</p>
        </header>

        <EnquireForm labelledBy="enquire-title" />
      </div>
    </section>
  );
}

/** The enquiry fields and button on their own, for pages that supply their own heading (/contact). */
export function EnquireForm({ labelledBy, className }: { labelledBy: string; className?: string }) {
  const f = copy.fields;

  return (
    <PreviewForm
      className={`${styles.form} ${className ?? ""}`}
      aria-labelledby={labelledBy}
      data-reveal
      submit={
        <div className={styles.actions}>
          <SubmitButton>{copy.submit}</SubmitButton>
        </div>
      }
    >
      <TextField
        id="enquire-first-name"
        name="first_name"
        label={f.firstName.label}
        placeholder={f.firstName.placeholder}
        autoComplete="given-name"
        minLength={1}
        maxLength={FIELD_LIMITS.nameMax}
        required
      />
      <TextField
        id="enquire-last-name"
        name="last_name"
        label={f.lastName.label}
        placeholder={f.lastName.placeholder}
        autoComplete="family-name"
        minLength={1}
        maxLength={FIELD_LIMITS.nameMax}
        required
      />
      <TextField
        id="enquire-email"
        name="email"
        type="email"
        label={f.email.label}
        placeholder={f.email.placeholder}
        autoComplete="email"
        maxLength={FIELD_LIMITS.emailMax}
        required
        className={styles.wide}
      />
      <TextField
        id="enquire-phone"
        name="phone"
        type="tel"
        label={f.phone.label}
        hint={f.phone.hint}
        placeholder={f.phone.placeholder}
        autoComplete="tel"
        maxLength={FIELD_LIMITS.phoneMax}
      />
      <SelectField
        id="enquire-experience"
        name="session_type"
        label={f.experience.label}
        placeholder={f.experience.placeholder}
        options={SESSION_TYPES}
      />
      <TextareaField
        id="enquire-message"
        name="interests"
        label={f.message.label}
        placeholder={f.message.placeholder}
        minLength={FIELD_LIMITS.interestsMin}
        maxLength={FIELD_LIMITS.textMax}
        rows={6}
        required
        className={`${styles.wide} ${styles.message}`}
      />
    </PreviewForm>
  );
}
