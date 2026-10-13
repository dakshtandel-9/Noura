import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { EnquireForm } from "@/components/sections/Enquire";
import { GetInTouch } from "@/components/sections/GetInTouch";
import { contactPage as copy, invitationPage } from "@/content/subpages";
import styles from "../invitation/invitation.module.css";

export const metadata: Metadata = {
  title: "Contact Noura",
  description: "Send an enquiry to NOURA or reach the team by email or phone.",
};

/**
 * Same split layout as /invitation: picture on the left, ivory panel on the right. The panel
 * carries the contact introduction and the enquiry form; the contact cards follow below.
 */
export default function ContactPage() {
  return (
    <>
      <SiteHeader solid />
      <main id="main" tabIndex={-1}>
        <div className={styles.page}>
          <div className={styles.media}>
            <Image
              className={styles.image}
              src={invitationPage.image.src}
              width={invitationPage.image.width}
              height={invitationPage.image.height}
              alt=""
              priority
              sizes="(max-width: 1023px) 100vw, 43vw"
            />
            <p className={styles.caption}>
              {invitationPage.imageCaption.map((word, i) => (
                <span key={word}>
                  {i > 0 && <span aria-hidden="true"> / </span>}
                  {word}
                </span>
              ))}
            </p>
          </div>

          <section className={styles.panel} aria-labelledby="contact-page-title">
            <div className={styles.inner}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 id="contact-page-title" className={styles.title}>
                {copy.title}
              </h1>
              <p className={styles.intro}>{copy.lead}</p>
              <EnquireForm labelledBy="contact-page-title" />
            </div>
          </section>
        </div>
        <GetInTouch />
      </main>
      <SiteFooter />
    </>
  );
}
