import Image from "next/image";
import { FormNote, SubmitButton, TextareaField, TextField } from "@/components/forms/fields";
import { PreviewForm } from "@/components/forms/PreviewForm";
import { Lines } from "@/components/ui/Lines";
import { FIELD_LIMITS, invitationRequest as copy } from "@/content/home";
import styles from "./InvitationRequest.module.css";

/**
 * 15 — Invitation request: image with the section title on the left, the forest form panel on
 * the right. Submission is not approval; every request is reviewed by the team.
 */
export function InvitationRequest() {
  const f = copy.fields;

  return (
    <section className={styles.section} id="invitation" aria-labelledby="invitation-title">
      <div className={styles.media}>
        {copy.image && (
          <>
            <Image
              className={styles.image}
              src={copy.image.src}
              width={copy.image.width}
              height={copy.image.height}
              alt=""
              sizes="(max-width: 1023px) 100vw, 46vw"
            />
            <span className={styles.scrim} aria-hidden="true" />
          </>
        )}
        <div className={styles.mediaCopy} data-reveal>
          <span className={`eyebrow ${styles.eyebrow}`}>{copy.eyebrow}</span>
          <h2 id="invitation-title" className={styles.title}>
            <Lines lines={copy.titleLines} />
          </h2>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelInner} data-reveal>
          <span className={`eyebrow ${styles.eyebrow}`}>{copy.formEyebrow}</span>
          <h3 id="invitation-form-title" className={styles.formTitle}>
            {copy.formTitle}
          </h3>

          <PreviewForm
            tone="dark"
            className={styles.form}
            aria-labelledby="invitation-form-title"
            submit={
              <div className={styles.actions}>
                <SubmitButton>{copy.submit}</SubmitButton>
                <FormNote>{copy.note}</FormNote>
              </div>
            }
          >
            <TextField
              id="invitation-name"
              name="full_name"
              label={f.fullName.label}
              placeholder={f.fullName.placeholder}
              autoComplete="name"
              minLength={FIELD_LIMITS.nameMin}
              maxLength={FIELD_LIMITS.nameMax}
              required
            />
            <TextField
              id="invitation-email"
              name="email"
              type="email"
              label={f.email.label}
              placeholder={f.email.placeholder}
              autoComplete="email"
              maxLength={FIELD_LIMITS.emailMax}
              required
            />
            <TextareaField
              id="invitation-interests"
              name="interests"
              label={f.interests.label}
              placeholder={f.interests.placeholder}
              className={styles.interestsField}
              minLength={FIELD_LIMITS.interestsMin}
              maxLength={FIELD_LIMITS.textMax}
              rows={2}
              required
            />
          </PreviewForm>
        </div>
      </div>
    </section>
  );
}
