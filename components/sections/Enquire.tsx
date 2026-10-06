import { PreviewForm } from "@/components/forms/PreviewForm";
import { SubmitButton, TextareaField, TextField } from "@/components/forms/fields";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { FIELD_LIMITS, enquire as copy } from "@/content/home";
import styles from "./Enquire.module.css";

/**
 * 02e — Enquire: the enquiry form on the left (message, name, email, phone), and on the right a
 * soft panel with the heading, a short intro and four contact cards. The form posts to the
 * invitation request endpoint, so its fields follow that schema: the message travels as the
 * free-text `interests` field (10–1000 characters) and a full name is required.
 */
export function Enquire() {
  const f = copy.fields;

  return (
    <section className={styles.section} id="enquire" aria-labelledby="enquire-title">
      <div className={styles.inner}>
        <div className={styles.formSide} data-reveal>
          {/* A labelled paragraph, not a heading: the section's h2 sits in the panel after it. */}
          <p id="enquire-form-title" className={styles.formTitle}>
            {copy.formTitle}
          </p>
          <PreviewForm
            className={styles.form}
            aria-labelledby="enquire-form-title"
            submit={
              <div className={styles.actions}>
                <SubmitButton>{copy.submit}</SubmitButton>
              </div>
            }
          >
            <TextareaField
              id="enquire-message"
              name="interests"
              label={f.message.label}
              placeholder={f.message.placeholder}
              minLength={FIELD_LIMITS.interestsMin}
              maxLength={FIELD_LIMITS.textMax}
              rows={4}
              required
            />
            <TextField
              id="enquire-name"
              name="full_name"
              label={f.fullName.label}
              placeholder={f.fullName.placeholder}
              autoComplete="name"
              minLength={FIELD_LIMITS.nameMin}
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
            />
            <TextField
              id="enquire-phone"
              name="phone"
              type="tel"
              label={f.phone.label}
              placeholder={f.phone.placeholder}
              autoComplete="tel"
              maxLength={FIELD_LIMITS.phoneMax}
            />
          </PreviewForm>
        </div>

        <div className={styles.panel} data-reveal>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h2 id="enquire-title" className={styles.title}>
            <Lines lines={copy.titleLines} />
          </h2>
          <p className={styles.intro}>{copy.intro}</p>

          <ul className={styles.details} role="list">
            {copy.details.map((d) => {
              const body = (
                <>
                  <Icon name={d.icon} size={20} className={styles.icon} />
                  <span>
                    <span className={styles.label}>{d.label}</span>
                    <span className={styles.value}>{d.value}</span>
                  </span>
                </>
              );
              return (
                <li key={d.id}>
                  {d.href ? (
                    <a className={`${styles.card} ${styles.cardLink}`} href={d.href}>
                      {body}
                    </a>
                  ) : (
                    <div className={styles.card}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
