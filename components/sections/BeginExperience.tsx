import Image from "next/image";
import { PreviewForm } from "@/components/forms/PreviewForm";
import { Icon } from "@/components/ui/Icon";
import { beginExperience as copy, FIELD_LIMITS } from "@/content/home";
import styles from "./BeginExperience.module.css";

/**
 * Begin your experience: a picture on the left (grey block when no image is set) and a
 * white enquiry card on the right. Interests are checkboxes styled as pills, so any number can
 * be chosen with the keyboard or without scripts. PreviewForm only validates and shows the
 * preview notice; swap it for the narrow request endpoint in the backend slice.
 */
export function BeginExperience() {
  const f = copy.fields;

  return (
    <section className={styles.section} id="begin" aria-labelledby="begin-title">
      <div className={styles.media}>
        {copy.image && (
          <Image
            className={styles.image}
            src={copy.image.src}
            width={copy.image.width}
            height={copy.image.height}
            alt=""
            sizes="(max-width: 1023px) 100vw, 50vw"
            style={{ objectPosition: copy.image.position }}
          />
        )}
      </div>

      <div className={styles.side}>
        <div className={styles.card} data-reveal>
          <h2 id="begin-title" className={styles.title}>
            {copy.title}
          </h2>

          <PreviewForm
            className={styles.form}
            aria-labelledby="begin-title"
            submit={
              <button type="submit" className={styles.submit}>
                <span>{copy.submit}</span>
                <Icon name="arrow-right" size={18} />
              </button>
            }
          >
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="begin-name">
                  {f.fullName.label}
                </label>
                <input
                  id="begin-name"
                  name="full_name"
                  className={styles.control}
                  placeholder={f.fullName.placeholder}
                  autoComplete="name"
                  minLength={FIELD_LIMITS.nameMin}
                  maxLength={FIELD_LIMITS.nameMax}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="begin-phone">
                  {f.phone.label}
                </label>
                <input
                  id="begin-phone"
                  name="phone"
                  type="tel"
                  className={styles.control}
                  placeholder={f.phone.placeholder}
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="[0-9+()\-\s]{7,30}"
                  maxLength={FIELD_LIMITS.phoneMax}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="begin-email">
                {f.email.label}
              </label>
              <input
                id="begin-email"
                name="email"
                type="email"
                className={styles.control}
                placeholder={f.email.placeholder}
                autoComplete="email"
                maxLength={FIELD_LIMITS.emailMax}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="begin-organization">
                {f.organization.label} <span className={styles.optional}>{f.organization.optional}</span>
              </label>
              <input
                id="begin-organization"
                name="organization"
                className={styles.control}
                placeholder={f.organization.placeholder}
                autoComplete="organization"
                maxLength={FIELD_LIMITS.nameMax}
              />
            </div>

            <fieldset className={styles.interests}>
              <legend className={styles.label}>{copy.interestsLabel}</legend>
              <div className={styles.pills}>
                {copy.interests.map((interest) => (
                  <label key={interest} className={styles.pill}>
                    <input type="checkbox" name="interests" value={interest} className={styles.pillInput} />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="begin-message">
                {f.message.label}
              </label>
              <textarea
                id="begin-message"
                name="message"
                className={`${styles.control} ${styles.textarea}`}
                placeholder={f.message.placeholder}
                maxLength={FIELD_LIMITS.textMax}
                rows={4}
              />
            </div>
          </PreviewForm>
        </div>
      </div>
    </section>
  );
}
