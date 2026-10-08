import type { IconName } from "@/components/ui/Icon";

// Landing copy from docs/content.md. Proposed wording for Sidhart's review, not approved
// business claims: no founder story, venue, capacity, response time or outcome is asserted.

export const hero = {
  titleLines: ["Three days.", "One pause"],
  /** Italic line under the headline. */
  subtitle: "A private gathering for conscious living.",
  /** Small meta line: location and month, supplied by the owner. */
  meta: ["Goa - Feb 2027"],
  /** Bottom-right control that opens the short film; the film never plays on its own. */
  film: { open: "Play film", close: "Close film", label: "NOURA film" },
  primary: "Request an invitation",
  /** Secondary action beside the invitation CTA; links to the experience index. */
  secondary: "Explore the experience",
};

/**
 * 01a — Story (`#story`), straight after the arrival: a short provocation beside a picture.
 * Copy follows the 2026-10-03 reference. The picture is an existing illustrative still, not
 * NOURA's premises; swap it (and add a film behind "Our story") once approved media exists.
 */
export const story = {
  eyebrow: "Why we created this",
  titleLines: ["When did you last", "do nothing?"],
  lines: [
    "Not escape. Not switch off. Not take a holiday.",
    "But truly pause.",
    "Step away from the noise.",
    "Listen. Breathe. Feel.",
    "And remember what matters.",
  ],
  caption: "Our story",
  image: { src: "/media/story-landscape.png", width: 1443, height: 1090 },
  imageAlt: "Misty mountain landscape at dusk",
};

/**
 * 01a2 — Founder note (`#founder`), after the story: picture left, text right. Placeholder
 * copy from the 2026-10-03 reference: the name stays "Founder" and the picture is an existing
 * illustrative still until the client supplies a real name, portrait and approved wording
 * (docs/client-inputs.md item 5). Never stand in a generated person for the founder.
 */
export const founderNote = {
  eyebrow: "Why we created this",
  paragraphs: [
    ["We live in a world that rewards speed.", "More meetings. More decisions. More screens. More expectations."],
    ["And somewhere between everything we need to do and everyone we need to be, we often forget to simply be."],
    ["This experience began with a question:"],
  ],
  question: "What happens when extraordinary people are given permission to pause?",
  closing: "This is our invitation to pause.",
  signature: "— Founder",
  image: { src: "/media/experiences/seated-outdoors-4k.webp", width: 3840, height: 2560 },
  imageAlt: "Person seated outdoors in natural light",
};

/**
 * 01a3 — Three stages (`#stages`), fourth on the page: Reset, Reconnect, Reimagine as three
 * cards. Copy follows the 2026-10-03 reference and is proposed wording, not approved claims.
 * Images are illustrative stills; an entry set to null shows a grey block instead.
 */
export const stages = {
  heading: "Reset. Reconnect. Reimagine.",
  items: [
    {
      id: "reset",
      title: "Reset",
      lead: ["Step away from the noise."],
      themes: "Movement. Breath. Sleep. Stillness.",
      image: { src: "/media/story-moments/sunset-ridge.webp", width: 1536, height: 1024 } as MediaImage | null,
    },
    {
      id: "reconnect",
      title: "Reconnect",
      lead: ["Come back to yourself \u2014", "and meet others more deeply."],
      themes: "Conversation. Nature. Food. Music.",
      image: { src: "/media/story-moments/woodland-gathering.webp", width: 1536, height: 1024 } as MediaImage | null,
    },
    {
      id: "reimagine",
      title: "Reimagine",
      lead: ["Return with a clearer sense", "of what comes next."],
      themes: "Purpose. Energy. Relationships. Possibility.",
      image: { src: "/media/story-moments/mountain-valley.webp", width: 1536, height: 1024 } as MediaImage | null,
    },
  ],
};

/**
 * 02b — The place (`#place`), after the experience cards: a short text block beside a mosaic of
 * four destination pictures. Copy and place names follow the 2026-10-03 reference and are
 * placeholders: the docs assert no venue, and the text says the destination is revealed to
 * invited guests, so confirm with the client before any real place is named publicly. Every
 * `image` is null, so a grey block shows until approved, rights-cleared files exist.
 */
export const place = {
  heading: "The place matters.",
  lead: ["Because the environment", "changes the way we feel."],
  lines: [
    "A place where mornings begin slowly.",
    "Where nature is never far away.",
    "Where the air feels different.",
    "Where dinner can move outdoors.",
    "Where a conversation can continue long after sunset.",
  ],
  note: ["The destination will be revealed", "to invited guests."],
  cta: "Explore Destinations",
  ctaHref: "#enquire",
  tiles: [
    { id: "goa", label: "Goa, India", image: { src: "/media/destinations/goa.webp", width: 1254, height: 1254 } as MediaImage | null },
    { id: "bali", label: "Bali, Indonesia", image: { src: "/media/destinations/bali.webp", width: 1024, height: 1536 } as MediaImage | null },
    { id: "coorg", label: "Coorg, India", image: { src: "/media/destinations/coorg.webp", width: 1774, height: 887 } as MediaImage | null },
    { id: "udaipur", label: "Udaipur, India", image: { src: "/media/destinations/udaipur.webp", width: 1672, height: 941 } as MediaImage | null },
  ],
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
 * 02 — Experience cards under the story chapters (`#experiences`). Copy follows the
 * 2026-10-03 reference and is proposed wording, not approved claims. Every `image` is null, so
 * a grey block shows until approved files exist in public/media/experiences/. `href` is
 * optional: a card without one is plain text rather than a link to nowhere.
 */
export interface ExperienceTile {
  id: string;
  title: string;
  lines: [string] | [string, string];
  href?: string;
  image: { src: string; width: number; height: number } | null;
}

export const experienceTiles: ExperienceTile[] = [
  { id: "movement", title: "Movement", lines: ["Move with intention.", "Feel alive."], image: { src: "/media/seven-panel-scenes/01-coastal-yoga.webp", width: 1086, height: 1448 } },
  { id: "meditation", title: "Meditation & Breathwork", lines: ["Calm your mind.", "Open your breath."], image: { src: "/media/seven-panel-scenes/02-meditation-bowl.webp", width: 1086, height: 1448 } },
  { id: "music", title: "Music", lines: ["Surrender to", "the sound within."], image: { src: "/media/seven-panel-scenes/03-handpan-sunset.webp", width: 1086, height: 1448 } },
  { id: "nutrition", title: "Nutrition", lines: ["Nourish your body.", "Fuel your journey."], image: { src: "/media/seven-panel-scenes/04-coastal-salad.webp", width: 1086, height: 1448 } },
  { id: "stays", title: "Luxury Stays", lines: ["Extraordinary places.", "Deeper rest."], image: { src: "/media/seven-panel-scenes/05-pool-terrace.webp", width: 1086, height: 1448 } },
  { id: "longevity", title: "Longevity & Conversations", lines: ["Live well. Share deeper."], image: { src: "/media/seven-panel-scenes/06-coastal-conversation.webp", width: 1086, height: 1448 } },
  { id: "destinations", title: "Destinations", lines: ["New places.", "Deeper perspectives."], image: { src: "/media/seven-panel-scenes/07-cliffside-retreat.webp", width: 1086, height: 1448 } },
];

/** Visible heading over the cards and the single action under them (2026-10-03 reference). */
export const experienceTilesCopy = {
  heading: "Experiences that stay with you",
  cta: "View the full experience",
  /** The overview strip that follows: the four experiences at a glance. */
  ctaHref: "#place",
};

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
  /** Optional; link to the experience section or the invitation request page. */
  link?: { label: string; href: "#experiences" | "/invitation" };
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

/**
 * 02c — The practitioners (`#experts`), straight after the place section: five portrait
 * disclosures, each opening its image and biography below the row. Everything here is SAMPLE
 * text from the 2026-10-03 reference: invented names, histories and credentials. The page
 * says so under the cards, and docs/content.md forbids publishing unconfirmed practitioner
 * claims, so replace each entry with client-approved facts (or set `profiles` to [] to hide
 * the section) before launch. Current portraits are illustrative placeholders; replace them
 * with approved portraits with publication rights before launch.
 */
export interface Practitioner {
  id: string;
  area: string;
  name: string;
  role: string;
  bio: string;
  leads: string;
  image: MediaImage | null;
}

export const practitioners = {
  eyebrow: "The practitioners",
  title: "Guides who live what they teach.",
  leadsLabel: "Leads",
  disclaimer: "Sample profiles: placeholder portraits and bios, to be replaced with our practitioners.",
  profiles: [
    {
      id: "ishaan-rao",
      area: "Body",
      name: "Ishaan Rao",
      role: "Yoga & Kriya Master",
      bio: "Fourteen years in the Himalayan kriya lineage. Ishaan teaches the body to move like breath: slow, precise, alive. Thousands of practitioners, from founders to athletes, have rediscovered their strength under his guidance.",
      leads: "Sunrise Kriya & Breathwork",
      image: { src: "/media/portrait-series/01-sunset.png", width: 1122, height: 1402 },
    },
    {
      id: "meera-kulkarni",
      area: "Mind",
      name: "Meera Kulkarni",
      role: "Meditation & Stillness Guide",
      bio: "A former neuroscientist who traded the lab for silence. After a decade of retreats from Ladakh to Kyoto, Meera guides sessions that people describe as the quietest they have felt in years.",
      leads: "Silent Dawn Meditation",
      image: { src: "/media/portrait-series/02-moon.png", width: 1122, height: 1402 },
    },
    {
      id: "rohan-nair",
      area: "Science",
      name: "Dr. Rohan Nair",
      role: "Longevity Physician",
      bio: "A preventive-medicine physician who turns frontier research into rituals you can actually keep: sleep, glucose, cold and heat. He designs every biohacking and nutrition protocol at the gathering.",
      leads: "The Longevity Lab & Chef\u2019s Table",
      image: { src: "/media/portrait-series/03-dna.png", width: 1122, height: 1402 },
    },
    {
      id: "anaya-desai",
      area: "Soul",
      name: "Anaya Desai",
      role: "Vocalist & Sound Artist",
      bio: "Trained in Hindustani classical voice, Anaya performs at dusk with handpan and tanpura. Her live sound journeys are remembered for one thing: a room of strangers breathing as one.",
      leads: "Sunset Sound Journey",
      image: { src: "/media/portrait-series/04-music.png", width: 1122, height: 1402 },
    },
    {
      id: "kabir-sethi",
      area: "Conversation",
      name: "Kabir Sethi",
      role: "Dialogue Facilitator",
      bio: "A storyteller and former broadcaster who hosts fireside salons where strangers become confidants. His questions are the kind you are still thinking about a year later.",
      leads: "Fireside Salons",
      image: { src: "/media/portrait-series/05-elder.png", width: 1122, height: 1402 },
    },
  ] as readonly Practitioner[],
};

/**
 * 02c+ — Begin your experience (`#begin`), straight after the practitioners: a picture on the
 * left (grey when `image` is null) and an enquiry card on the right, after the 2026-10-03
 * reference. The picture is a generated illustrative still (an empty coastal veranda with an
 * open journal), not NOURA's premises. `position` keeps the journal in frame on narrow crops.
 * Interest options are the client's list. No backend is connected, so the form only validates
 * and shows the preview notice; nothing is sent or stored.
 */
export const beginExperience = {
  title: "Begin Your Experience",
  image: {
    src: "/media/experiences/begin-experience.webp",
    width: 1120,
    height: 1504,
    position: "center 80%",
  } as (MediaImage & { position?: string }) | null,
  fields: {
    fullName: { label: "Full name", placeholder: "Priya Sharma" },
    phone: { label: "Phone", placeholder: "+91 98765 43210" },
    email: { label: "Email address", placeholder: "priya@example.com" },
    organization: { label: "Organization", optional: "(optional)", placeholder: "Acme Solutions India" },
    message: { label: "Message", placeholder: "Tell us a little about what you\u2019re looking for\u2026" },
  },
  interestsLabel: "I\u2019m interested in",
  interests: [
    "Holistic wellbeing",
    "Biohacking",
    "Sound & Meditation",
    "Learning from experts",
    "All the above",
    "Other",
  ],
  submit: "Let\u2019s begin your journey",
};

/**
 * Closing banner, the last section before the footer: a wide picture (grey until an image is
 * supplied) with the closing line and the invitation action on the right, after the 2026-10-03
 * reference. The reference's own dates and cities are not used: the place and month follow the
 * hero ("Goa - Feb 2027"), so confirm them before launch.
 */
export const closingBanner = {
  title: "Perhaps it is time to pause.",
  meta: ["Goa - Feb 2027", "By invitation"],
  cta: "Request an invitation",
  ctaHref: "/invitation",
  image: { src: "/media/beach-sunset-gathering.png", width: 2243, height: 701 } as MediaImage | null,
};

/**
 * 02e — Enquire (`#enquire`), after the practitioners: a short enquiry form on the left and contact
 * details on the right, after the "MVP - Enquire - page 10" reference (2026-10-03). The
 * contact details, location and response time were supplied with that reference; confirm
 * them with the client before launch (docs/client-inputs.md item 17, docs/content.md). The
 * form is a preview until the backend slice connects it: nothing is sent.
 */
export const enquire = {
  formTitle: "Tell us what you want to know.",
  fields: {
    fullName: { label: "Full name", placeholder: "Your name" },
    message: { label: "Message", placeholder: "What would you like to know?" },
    email: { label: "Email", placeholder: "you@example.com" },
    phone: { label: "Phone", placeholder: "Optional" },
  },
  submit: "Send enquiry",
  eyebrow: "Get in touch",
  titleLines: ["Tell us what you\u2019re", "looking for."],
  intro:
    "Whether you\u2019re drawn to 1:1 coaching, a retreat, or bringing this work to your team \u2014 start by saying hello. Every journey begins with one honest conversation.",
  details: [
    { id: "email", icon: "mail", label: "Email", value: "care@healwithshashank.com", href: "mailto:care@healwithshashank.com" },
    { id: "phone", icon: "phone", label: "Phone / WhatsApp", value: "+91 91096 94003", href: "tel:+919109694003" },
    { id: "based", icon: "map-pin", label: "Based in", value: "Pune, India \u00b7 Working Globally" },
    { id: "response", icon: "clock", label: "Response time", value: "Within 24 hours" },
  ] satisfies { id: string; icon: IconName; label: string; value: string; href?: string }[],
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
