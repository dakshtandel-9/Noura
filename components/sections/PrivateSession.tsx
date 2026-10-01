"use client";

import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import { SelectField, SubmitButton, TextareaField, TextField } from "@/components/forms/fields";
import { PreviewForm } from "@/components/forms/PreviewForm";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { FIELD_LIMITS, SESSION_TYPES, TIME_WINDOWS, privateSession as copy } from "@/content/home";
import styles from "./PrivateSession.module.css";

/** A quiet introduction followed by a native, keyboard-accessible request disclosure. */
export function PrivateSession() {
  const f = copy.fields;
  const disclosureRef = useRef<HTMLDetailsElement>(null);

  function openRequest(event: MouseEvent<HTMLAnchorElement>) {
    if (!disclosureRef.current) return;
    event.preventDefault();
    disclosureRef.current.open = true;
    disclosureRef.current.querySelector<HTMLInputElement>("#session-name")?.focus();
  }

  return (
    <section className={styles.section} id="private-session" aria-labelledby="private-session-title">
      <div className={styles.story}>
        <div className={styles.intro} data-reveal>
          <span className={`eyebrow ${styles.eyebrow}`}>{copy.eyebrow}</span>
          <h2 id="private-session-title" className={styles.title}>
            <Lines lines={copy.titleLines} />
          </h2>
          <p className={styles.text}>{copy.intro}</p>
          <p className={styles.reassurance}>An enquiry, always answered by a person.</p>
          <a className={styles.link} href="#private-session-form" onClick={openRequest}>
            <span>{copy.link}</span>
            <Icon name="arrow-right" size={18} />
          </a>
        </div>

        <div className={styles.media}>
          {copy.image && (
            <Image
              className={styles.image}
              src={copy.image.src}
              width={copy.image.width}
              height={copy.image.height}
              alt="A quiet interior with two chairs, warm light and an arched doorway"
              sizes="(max-width: 767px) 100vw, 48vw"
            />
          )}
        </div>
      </div>

      <details className={styles.disclosure} id="private-session-form" ref={disclosureRef}>
        <summary className={styles.trigger}>
          <span>Appointment request form</span>
          <span className={styles.triggerRing}>
            <Icon name="arrow-right" size={20} />
          </span>
        </summary>
        <div className={styles.panel}>
          <div className={styles.panelIntro}>
            <span className="eyebrow">Your request</span>
            <h3 id="session-form-title">Tell us a little about your visit.</h3>
            <p>A preferred date or time helps us follow up. It does not reserve an appointment.</p>
          </div>
          <PreviewForm className={styles.form} aria-labelledby="session-form-title">
            <TextField
              id="session-name"
              name="full_name"
              label={f.fullName.label}
              placeholder={f.fullName.placeholder}
              autoComplete="name"
              minLength={FIELD_LIMITS.nameMin}
              maxLength={FIELD_LIMITS.nameMax}
              required
            />
            <TextField
              id="session-email"
              name="email"
              type="email"
              label={f.email.label}
              placeholder={f.email.placeholder}
              autoComplete="email"
              maxLength={FIELD_LIMITS.emailMax}
              required
            />
            <SelectField
              id="session-type"
              name="session_type"
              label={f.sessionType.label}
              placeholder={f.sessionType.placeholder}
              options={SESSION_TYPES}
              required
            />

            <details className={styles.optional}>
              <summary>
                <span>Add a date, phone number or note <span className={styles.optionalHint}>(optional)</span></span>
                <Icon name="chevron-down" size={19} />
              </summary>
              <div className={styles.optionalFields}>
                <TextField id="session-date" name="preferred_date" type="date" label={f.preferredDate.label} />
                <SelectField
                  id="session-time"
                  name="time_window"
                  label={f.timeWindow.label}
                  placeholder={f.timeWindow.placeholder}
                  options={TIME_WINDOWS}
                />
                <TextField
                  id="session-phone"
                  name="phone"
                  type="tel"
                  label={f.phone.label}
                  placeholder={f.phone.placeholder}
                  autoComplete="tel"
                  maxLength={FIELD_LIMITS.phoneMax}
                />
                <TextareaField
                  id="session-message"
                  name="message"
                  label={f.message.label}
                  placeholder={f.message.placeholder}
                  maxLength={FIELD_LIMITS.textMax}
                  rows={2}
                  className={styles.wide}
                />
              </div>
            </details>
            <div className={styles.actions}>
              <SubmitButton>{copy.submit}</SubmitButton>
            </div>
          </PreviewForm>
        </div>
      </details>
    </section>
  );
}
