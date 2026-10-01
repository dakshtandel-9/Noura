import type { IconName } from "@/components/ui/Icon";

// Landing copy from docs/content.md. Proposed wording for Sidhart's review, not approved
// business claims: no founder story, venue, capacity, response time or outcome is asserted.

export const hero = {
  titleLines: ["A quieter moment.", "A deeper connection."],
  /** Second sentence of the approved hero intro, set as the italic line. */
  subtitle: "Thoughtful experiences, shared at an unhurried pace.",
  /** First sentence of the intro, condensed into the small meta line. No venue or dates are asserted. */
  meta: ["By invitation", "Yoga / Meditation / Sound / Connection"],
  primary: "Request an invitation",
  /** Secondary action beside the invitation CTA; links to the experience index. */
  secondary: "Explore the experience",
};

/** 01b — Overview strip under the arrival: the four experiences at a glance. */
export const ways = {
  eyebrow: "The journey",
  titleLines: ["Reset. Reconnect.", "Reimagine."],
  /** Proposed supporting line under the heading; asserts no outcome. */
  intro: "A slower rhythm. A deeper connection. Experiences designed to help you return to what matters.",
  link: "Explore the journey",
};

/**
 * 02 — Image tiles under the overview strip. Set `image` once the file exists in
 * public/media/experiences/; until then each tile shows a neutral grey placeholder.
 */
export interface ExperienceTile {
  id: string;
  title: string;
  lines: [string] | [string, string];
  href: string;
  image: { src: string; width: number; height: number } | null;
}

export const experienceTiles: ExperienceTile[] = [
  { id: "movement", title: "Movement", lines: ["Yoga. Mobility.", "Slow, mindful flow."], href: "#yoga", image: { src: "/media/experiences/movement.jpg", width: 1600, height: 2000 } },
  { id: "breath", title: "Breath", lines: ["Gentle breathing.", "A slower rhythm."], href: "#breath", image: { src: "/media/experiences/breath.jpg", width: 1600, height: 2000 } },
  { id: "meditation", title: "Meditation", lines: ["Silence. Reflection.", "Room to settle."], href: "#meditation", image: { src: "/media/experiences/meditation.jpg", width: 1600, height: 2000 } },
  { id: "sound", title: "Sound", lines: ["Music. Resonance.", "Room for silence."], href: "#sound", image: { src: "/media/experiences/sound.jpg", width: 1600, height: 2000 } },
  { id: "setting", title: "Setting", lines: ["Light. Texture.", "Quiet."], href: "#setting", image: { src: "/media/experiences/setting.jpg", width: 1600, height: 2000 } },
  { id: "conversations", title: "Conversations", lines: ["A smaller circle.", "Unhurried talk."], href: "#connection", image: { src: "/media/experiences/conversations.jpg", width: 1600, height: 2000 } },
];

export const experienceTilesCopy = { heading: "The experiences", cta: "Discover" };

export interface MediaImage {
  src: string;
  width: number;
  height: number;
}

/** 08 — Connect / Private Group Sessions. The group photograph is conceptual artwork. */
export const sharedExperience = {
  eyebrow: "The shared experience",
  titleLines: ["Shared practice.", "Personal space."],
  intro:
    "Thoughtfully hosted gatherings created around movement, stillness, listening and connection. Participation is reviewed personally, allowing each experience to remain considered, comfortable and unhurried.",
  features: [
    { id: "groups", icon: "people", title: "Considered groups", text: "A smaller circle." },
    { id: "presence", icon: "lotus", title: "Room to be present", text: "Space to be yourself." },
    // Privacy wording must match the implemented controls and approved notice (docs/content.md).
    { id: "privacy", icon: "lock", title: "Private by design", text: "Handled with care." },
  ] satisfies { id: string; icon: IconName; title: string; text: string }[],
  image: { src: "/media/experiences/conversations.jpg", width: 1600, height: 2000 } satisfies MediaImage,
};

/**
 * Optional editorial guide profile. Keep this null until the client confirms the actual
 * practitioner's name, exact role, own introduction, portrait and publication rights.
 * A generated or stock portrait must never stand in for the named person.
 */
export interface ApprovedGuideProfile {
  name: string;
  role: string;
  bio: string;
  portrait: MediaImage & { alt: string };
  /** Include only the practices this person actually offers. */
  practices?: readonly string[];
  /** Optional; limit links to sections present in the current landing page. */
  link?: { label: string; href: "#experiences" | "#private-session" | "#invitation" };
}

export const guide = {
  eyebrow: "The guide",
  titleLines: ["Practice, held", "with intention."],
  profile: null as ApprovedGuideProfile | null,
};

/**
 * 08b — Experts (`#experts`): three equal portraits, after the 2026-10-01 design review. Layout
 * preview only: names, roles and introductions are sample text, and the portraits are Unsplash
 * stock (free Unsplash License), so they must never stand in for a named NOURA practitioner
 * (docs/content.md → optional guide profile). Replace each entry with the client-approved name,
 * role, credential, introduction and portrait, or set `profiles` to [] to hide the section.
 * Approved portraits should share one warm, natural light and colour grade.
 *
 * Photo credits (unsplash.com/photos/<id>): 1 Ricardo Morales (D_Y-BuWJvjw), 4 Štefan Štefančík
 * (QXevDflbl8A), 5 mojtaba mosayebzadeh (NaBvtu5Llug). Files 2 and 3 are no longer used.
 */
export interface ExpertProfile {
  id: string;
  name: string;
  role: string;
  /** Verified qualification or training only, confirmed by the client; omit rather than guess. */
  credential?: string;
  bio: string;
  /** `position` is an optional CSS object-position to keep the face in frame. */
  portrait: MediaImage & { alt: string; position?: string };
}

const SAMPLE_EXPERT_BIO =
  "Temporary layout text. An approved introduction of around forty to sixty words will sit here, written with the practitioner and checked with the client before publication. It describes how they hold a session, without credentials or outcomes that have not been confirmed.";

const samplePortrait = (n: number, position?: string): ExpertProfile["portrait"] => ({
  src: `/media/experts/sample-expert-${n}.jpg`,
  width: 1200,
  height: 1600,
  alt: "Sample portrait, stock photograph",
  position,
});

export const experts = {
  eyebrow: "The people behind the practice",
  title: "Our guides.",
  viewProfile: "View profile",
  profiles: [
    { id: "expert-1", name: "Sample Guide One", role: "Yoga practitioner", bio: SAMPLE_EXPERT_BIO, portrait: samplePortrait(1, "center 20%") },
    { id: "expert-2", name: "Sample Guide Two", role: "Meditation guide", bio: SAMPLE_EXPERT_BIO, portrait: samplePortrait(5, "center 10%") },
    { id: "expert-3", name: "Sample Guide Three", role: "Sound practitioner", bio: SAMPLE_EXPERT_BIO, portrait: samplePortrait(4, "center 25%") },
  ] as readonly ExpertProfile[],
};

/** Programme options shared by both request forms (docs/requirements.md → session_type). */
export const SESSION_TYPES = ["Yoga", "Meditation", "Music & Sound", "Private Group Sessions", "Not sure yet"] as const;

/** Proposed; not yet in docs/data-model.md — confirm with the client before the backend stores it. */
export const TIME_WINDOWS = ["Morning", "Afternoon", "Evening", "No preference"] as const;

/** Field limits from docs/requirements.md; the server must re-check them before any write. */
export const FIELD_LIMITS = { nameMin: 2, nameMax: 100, emailMax: 254, phoneMax: 30, interestsMin: 10, textMax: 1000 } as const;

/**
 * 11 — Invitation journey (`#journey`), after the reference board supplied on 2026-10-01.
 * Submission is not approval. Step 04 describes a post-invitation details flow that is not in
 * docs/requirements.md yet — confirm it before launch. The setting image is conceptual.
 */
export const invitationJourney = {
  eyebrow: "Your invitation",
  titleLines: ["A personal process,", "from interest to invitation."],
  steps: [
    { id: "interest", title: "Share your interest", text: "Tell us about yourself and the experience you’re drawn to." },
    { id: "review", title: "Private review", text: "Every request is read personally by our team." },
    { id: "invitation", title: "Personal invitation", text: "Selected guests receive next steps privately." },
    { id: "details", title: "Complete your details", text: "Invited guests securely complete their details." },
  ],
  link: "Request an invitation",
  image: { src: "/media/experiences/invitation-journey.jpg", width: 1672, height: 941 } satisfies MediaImage,
};

/**
 * 12 — Member identity (`#member`), after the reference board supplied on 2026-10-01.
 * The card is an illustrative sample: the demonstration code from docs/content.md, no real
 * person, no QR and no download. Real cards are issued only to authorized staff (FR-14).
 */
export const memberIdentity = {
  eyebrow: "After your invitation",
  titleLines: ["Something personal", "to carry forward."],
  intro: "Following approval, invited guests receive a personal invitation identity created for their experience.",
  card: {
    label: "Private invitation",
    nameLabel: "Guest name",
    /** Placeholder wording, never a real member. */
    name: "Sample member",
    numberLabel: "Invitation number",
    /** Demonstration code only (docs/data-model.md → ID format); never a real member code. */
    number: "NRA-DEMO-001",
    footnote: "Issued after approval",
    /** Generated olive paper with subtle botanical embossing; no baked-in branding or text. */
    image: { src: "/media/experiences/member-card-surface-v1.png", width: 1536, height: 1024 } satisfies MediaImage,
  },
  image: { src: "/media/experiences/member-identity-background-v1.png", width: 2172, height: 724 } satisfies MediaImage,
};

/** Invitation request. The background is conceptual artwork, not a NOURA venue or member. */
export const invitationRequest = {
  eyebrow: "A considered invitation",
  titleLines: ["Your interest.", "Our attention."],
  formEyebrow: "Invitation request",
  formTitle: "Begin here.",
  fields: {
    fullName: { label: "Full name", placeholder: "Your full name" },
    email: { label: "Email address", placeholder: "you@domain.com" },
    interests: { label: "What would you like to know?", placeholder: "Tell us a little about your interest…" },
  },
  submit: "Submit invitation request",
  note: "Your request will be reviewed privately. No online payment is collected.",
  image: { src: "/media/experiences/invitation-coast.jpg", width: 1950, height: 807 } satisfies MediaImage,
};

/** 16 — Private-session (appointment) request. A preferred date or time is not a booking. */
export const privateSession = {
  eyebrow: "Prefer to speak first?",
  titleLines: ["Let us arrange", "the next conversation."],
  intro:
    "If you’d like to understand an experience before requesting an invitation, share a preferred date or time and our team can follow up personally.",
  link: "Request an appointment",
  fields: {
    fullName: { label: "Full name", placeholder: "Your name" },
    email: { label: "Email address", placeholder: "you@example.com" },
    sessionType: { label: "Reason for appointment", placeholder: "Select a reason" },
    preferredDate: { label: "Preferred date" },
    timeWindow: { label: "Preferred time window", placeholder: "Select time" },
    phone: { label: "Phone (optional)", placeholder: "Include your country code" },
    message: { label: "Additional note", placeholder: "Tell us anything else…" },
  },
  submit: "Send appointment request",
  image: { src: "/media/experiences/private-session-conversation.jpg", width: 1024, height: 1536 } satisfies MediaImage,
};

/**
 * 14 + close — Questions (`#questions`) and the closing invitation, after the reference board
 * supplied on 2026-10-01. The last section before the footer. Answers follow docs/content.md
 * → FAQs; the final one depends on a retention/deletion process the client has not approved yet.
 */
export const questions = {
  eyebrow: "A few things to know",
  title: "Before you begin.",
  intro: "A few answers about invitations, appointments and privacy.",
  items: [
    {
      id: "who-can-join",
      question: "Can anyone join an experience?",
      answer:
        "Experiences are by invitation. Anyone is welcome to share their interest. The team reviews each request personally and shares next steps where appropriate.",
    },
    {
      id: "appointment-confirmed",
      question: "Does requesting an appointment confirm it?",
      answer:
        "No. Appointment and invitation requests are reviewed by the team. A preferred date or time is not a confirmed booking until the team confirms it with you.",
    },
    {
      id: "payment",
      question: "Is payment collected through the website?",
      answer: "No. There is no online payment step in either request.",
    },
    {
      id: "access",
      question: "Who can access my information?",
      // Must match the implemented access controls (docs/content.md → care and privacy).
      answer:
        "Requests are intended for review by authorized team members. We ask only for the information needed for that conversation.",
    },
    {
      id: "update-withdraw",
      question: "Can I update or withdraw my information?",
      // Pending: retention and deletion handling are client decisions (docs/data-model.md).
      answer:
        "You can ask the team to update or withdraw your details. How these requests are handled will be set out in the privacy notice.",
    },
  ],
  closing: {
    eyebrow: "When the time feels right",
    titleLines: ["Leave a little room", "for something quieter."],
    primary: "Request an invitation",
    secondary: "Request an appointment",
  },
};

/** Shown after submit while no backend is connected (docs/requirements.md → submission outcomes). */
export const requestPreviewNotice = "Thank you. This page is a preview, so nothing has been sent yet.";
