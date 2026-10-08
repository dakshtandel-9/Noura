/** Website-ready draft supplied in Noura_Privacy_and_Terms_Conditions.docx.
 * Keep the source wording intact until the owner supplies final approved legal details.
 */
export interface LegalSection {
  title: string;
  paragraphs: readonly string[];
  contact?: boolean;
  relatedLink?: { label: string; href: string };
}

export interface LegalDocument {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: readonly LegalSection[];
  dateLabel: string;
  datePlaceholder: string;
  question: string;
}

export const legalDocuments = {
  privacy: {
    eyebrow: "Privacy policy",
    title: "Your privacy matters to us.",
    introduction: "At Noura, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, when we may share it, and the choices available to you when you visit our website, enquire about an experience, or participate in a Noura programme.",
    sections: [
      {
        title: "Information We Collect",
        paragraphs: [
          "We may collect information you provide directly to us, including your name, contact details, enquiry or booking information, travel preferences, dietary requirements, allergies, accessibility requirements, and other information you choose to share in connection with a Noura experience.",
          "We may also collect limited technical information when you use our website, such as your IP address, browser type, device information, pages visited, and general usage information.",
        ],
      },
      {
        title: "How We Use Your Information",
        paragraphs: [
          "We use personal information to respond to enquiries, manage invitations and bookings, communicate programme and travel information, coordinate accommodation and local logistics, personalise the guest experience, provide appropriate food or accessibility arrangements, improve our website and services, and meet applicable legal or regulatory obligations.",
          "We will use your information only for legitimate business purposes and in accordance with applicable law.",
        ],
      },
      {
        title: "Sharing Your Information",
        paragraphs: [
          "Noura does not sell or rent your personal information.",
          "Where necessary to deliver an experience, we may share relevant information with trusted service providers such as hotels, venues, transport providers, travel or hospitality partners, technology providers, payment processors, and professional advisers. We share only information reasonably required for the relevant purpose and expect our service providers to handle it appropriately.",
          "We may also disclose information where required by law, court order, or to protect the rights, safety, or security of Noura, our guests, or others.",
        ],
      },
      {
        title: "Payments",
        paragraphs: [
          "Where payments are made online, payment information may be processed by secure third-party payment providers. Noura generally does not retain complete payment-card details on its own systems. Payment providers may have their own privacy policies and terms.",
        ],
      },
      {
        title: "Cookies & Website Technologies",
        paragraphs: [
          "Our website may use cookies and similar technologies to remember preferences, understand website usage, improve performance, and support relevant communications. You can manage or disable cookies through your browser settings, although some website functions may be affected.",
        ],
      },
      {
        title: "Data Security & Retention",
        paragraphs: [
          "We take reasonable technical and organisational measures to protect personal information against unauthorised access, loss, misuse, alteration, or disclosure. No online system can be guaranteed to be completely secure.",
          "We retain personal information only for as long as reasonably necessary for the purposes described in this policy, including to provide services, maintain business records, resolve disputes, and comply with legal obligations.",
        ],
      },
      {
        title: "Your Rights",
        paragraphs: [
          "Subject to applicable law, you may have the right to request access to, correction of, or deletion of your personal information, withdraw consent where processing is based on consent, or object to certain uses of your information.",
          "To exercise your rights, please contact us using the details below. We may need to verify your identity before processing a request.",
        ],
      },
      {
        title: "Third-Party Links",
        paragraphs: [
          "Our website may contain links to third-party websites or services. Noura is not responsible for the privacy practices or content of those third parties. We encourage you to review their privacy policies before providing personal information.",
        ],
      },
      {
        title: "Updates to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time to reflect changes in our services, technology, or applicable law. The updated version will be published on this page with a revised effective date.",
        ],
      },
      {
        title: "Contact",
        paragraphs: ["For privacy questions or requests, please contact:"],
        contact: true,
      },
    ],
    dateLabel: "Effective date",
    datePlaceholder: "[DD Month YYYY]",
    question: "Questions about your privacy?",
  },
  terms: {
    eyebrow: "Terms & conditions",
    title: "Terms of use and booking.",
    introduction: "These Terms & Conditions govern your use of the Noura website and your participation in Noura experiences, programmes, retreats, stays, and related services. By using the website, accepting an invitation, making a booking, or participating in an experience, you agree to these Terms and any experience-specific terms communicated to you.",
    sections: [
      {
        title: "About Noura & Eligibility",
        paragraphs: [
          "Noura curates wellness-led experiences that may include accommodation, yoga, meditation, breathwork, sound healing, music, longevity practices, conversations, travel experiences, and related activities.",
          "You must provide accurate information and be legally capable of entering into an agreement. Where an experience has age or other eligibility requirements, these will be communicated before confirmation.",
        ],
      },
      {
        title: "Invitations, Availability & Pricing",
        paragraphs: [
          "Noura experiences may be offered on an invitation basis. Pricing, availability, inclusions, payment schedules, and other commercial terms will be communicated privately to invited guests and may vary by experience and destination.",
          "A place is confirmed only when Noura has accepted the booking and any required payment or confirmation conditions have been completed.",
        ],
      },
      {
        title: "What Is Included",
        paragraphs: [
          "The specific inclusions for each experience will be stated in the relevant invitation or booking confirmation. Unless expressly stated otherwise, the experience may include the agreed programme, accommodation, venue arrangements, and in-destination city travel and logistics.",
          "International or domestic flights and travel tickets to and from the destination are the guest's responsibility unless expressly included in writing.",
        ],
      },
      {
        title: "Travel & Logistics",
        paragraphs: [
          "Noura will coordinate the local transportation and logistics expressly included in the agreed experience. Guests are responsible for arriving at the destination on time and for obtaining all required passports, visas, permits, travel insurance, and other travel documentation.",
          "Travel times, routes, venues, accommodation, or programme elements may occasionally change due to weather, safety, operational requirements, supplier changes, government restrictions, or other circumstances beyond Noura's reasonable control.",
        ],
      },
      {
        title: "Food, Alcohol & Personal Requirements",
        paragraphs: [
          "Food served during a Noura experience will generally be predominantly Sattvic and aligned with the programme's wellness philosophy. Guests must inform Noura in advance of allergies, dietary requirements, medical restrictions, or accessibility needs.",
          "Alcohol is not included as part of the Noura experience. Guests may purchase alcohol independently where permitted by the venue and applicable local law, but Noura does not provide or include alcohol as part of the programme.",
        ],
      },
      {
        title: "Health, Wellness & Participation",
        paragraphs: [
          "Noura experiences are intended to support wellbeing and are not a substitute for medical diagnosis, treatment, or professional medical advice. Guests are responsible for assessing whether an activity is appropriate for their personal circumstances and should consult a qualified healthcare professional where appropriate.",
          "Guests should inform Noura in advance of any condition, injury, allergy, medication, dietary restriction, accessibility requirement, or other relevant circumstance that may affect safe participation.",
          "Noura may recommend that a guest refrain from an activity where there is a reasonable safety concern.",
        ],
      },
      {
        title: "Payments, Cancellations & Changes",
        paragraphs: [
          "Payment terms, cancellation rights, refunds, and applicable deadlines will be stated in the relevant invitation or booking confirmation. Unless otherwise agreed in writing, a booking may be subject to cancellation charges or non-refundable amounts.",
          "Noura may need to modify, postpone, or cancel an experience in exceptional circumstances. Where this occurs, Noura will communicate the available options in accordance with the applicable booking terms.",
        ],
      },
      {
        title: "Guest Conduct",
        paragraphs: [
          "Guests are expected to behave respectfully toward other guests, Noura personnel, local communities, venues, and service providers. Noura may refuse participation or ask a guest to leave an experience without refund where behaviour is abusive, disruptive, unlawful, threatening, or materially affects the safety or wellbeing of others.",
        ],
      },
      {
        title: "Limitation of Liability",
        paragraphs: [
          "To the extent permitted by applicable law, Noura will not be responsible for indirect, incidental, special, or consequential loss arising from participation in an experience or use of the website.",
          "Noura is not responsible for circumstances outside its reasonable control, including natural events, weather, illness, transport disruption, government restrictions, third-party supplier failures, or loss of personal belongings.",
          "Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited.",
        ],
      },
      {
        title: "Intellectual Property",
        paragraphs: [
          "All website content, including Noura's name, branding, text, imagery, graphics, design, and other materials, is owned by or licensed to Noura and may not be copied, reproduced, modified, distributed, or commercially used without prior written permission, except as permitted by law.",
        ],
      },
      {
        title: "Privacy",
        paragraphs: [
          "Personal information is handled in accordance with Noura's Privacy Policy. By using the website or participating in an experience, you acknowledge that relevant information may be processed and shared as reasonably necessary to provide the services described in your booking.",
        ],
        relatedLink: { label: "Read the Privacy Policy", href: "/privacy" },
      },
      {
        title: "Governing Law",
        paragraphs: [
          "These Terms are governed by the laws of India, unless otherwise required by applicable law. Any dispute arising in connection with these Terms or a Noura experience shall be subject to the jurisdiction of the courts specified by Noura in the final version of these Terms.",
          "Recommended final placeholder: [Courts of Goa, India / other agreed jurisdiction].",
        ],
      },
      {
        title: "Contact",
        paragraphs: ["For questions regarding these Terms, please contact:"],
        contact: true,
      },
    ],
    dateLabel: "Last updated",
    datePlaceholder: "[DD Month YYYY]",
    question: "Have a question?",
  },
} as const satisfies Record<"privacy" | "terms", LegalDocument>;

export type LegalDocumentKey = keyof typeof legalDocuments;
