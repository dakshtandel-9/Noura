import type { Metadata } from "next";
import Image from "next/image";
import { PreviewForm } from "@/components/forms/PreviewForm";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Icon } from "@/components/ui/Icon";
import { FIELD_LIMITS } from "@/content/home";
import { invitationPage as copy } from "@/content/subpages";
import styles from "./invitation.module.css";

export const metadata: Metadata = {
  title: "Begin your journey \u2014 NOURA",
  robots: { index: false, follow: false },
};

/** Required marker; screen readers get the native `required` state instead. */
function Req() {
  return (
    <span className={styles.req} aria-hidden="true">
      *
    </span>
  );
}

/**
 * Picture on the left, request form on a warm ivory panel on the right (2026-10-06
 * reference), under the shared site header, whose "Request an invitation" button opens this
 * page. Stacks picture-first on tablets and phones.
 */
export default function InvitationPage() {
  const f = copy.fields;

  return (
    <>
      <SiteHeader solid />
      <main id="main" tabIndex={-1} className={styles.page}>
        <div className={styles.media}>
          <Image
            className={styles.image}
            src={copy.image.src}
            width={copy.image.width}
            height={copy.image.height}
            alt=""
            priority
            sizes="(max-width: 1023px) 100vw, 43vw"
          />
          <p className={styles.caption}>
            {copy.imageCaption.map((word, i) => (
              <span key={word}>
                {i > 0 && <span aria-hidden="true"> / </span>}
                {word}
              </span>
            ))}
          </p>
        </div>

        <section className={styles.panel} aria-labelledby="inv-title">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 id="inv-title" className={styles.title}>
              {copy.title}
            </h1>
            <p className={styles.intro}>
              {copy.intro.before}
              <strong>{copy.intro.strong}</strong>
              {copy.intro.after}
            </p>

            <PreviewForm
              className={styles.form}
              aria-labelledby="inv-title"
              submit={
                <button type="submit" className={styles.submit}>
                  <span>{copy.submit}</span>
                  <Icon name="arrow-right" size={18} />
                </button>
              }
            >
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="inv-name">
                    {f.fullName.label} <Req />
                  </label>
                  <input
                    id="inv-name"
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
                  <label className={styles.label} htmlFor="inv-phone">
                    {f.phone.label} <Req />
                  </label>
                  <input
                    id="inv-phone"
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
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="inv-email">
                    {f.email.label} <Req />
                  </label>
                  <input
                    id="inv-email"
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
                  <label className={styles.label} htmlFor="inv-org">
                    {f.organization.label} {f.organization.optional}
                  </label>
                  <input
                    id="inv-org"
                    name="organization"
                    className={styles.control}
                    placeholder={f.organization.placeholder}
                    autoComplete="organization"
                    maxLength={FIELD_LIMITS.nameMax}
                  />
                </div>
              </div>

              <fieldset className={styles.interests}>
                <legend className={styles.label}>
                  {copy.interestsLabel} <Req />
                </legend>
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
                <label className={styles.label} htmlFor="inv-message">
                  {f.message.label} <Req />
                </label>
                <textarea
                  id="inv-message"
                  name="message"
                  className={`${styles.control} ${styles.textarea}`}
                  placeholder={f.message.placeholder}
                  minLength={FIELD_LIMITS.interestsMin}
                  maxLength={FIELD_LIMITS.textMax}
                  rows={4}
                  required
                />
              </div>
            </PreviewForm>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
