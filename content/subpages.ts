// Copy for the standalone /FAQ, /about and /invitation pages. The FAQ answers are the client's
// own text. The /about copy is proposed wording that asserts no credential or venue; the
// client must supply the real names, address and contact details before launch.
// Founder and board portraits on /about are grey placeholders until real photographs exist.

export const faqPage = {
  title: "Frequently Asked Questions",
  lead: "Everything you need to know before beginning your Noura journey.",
  intro: "A considered guide to the practical details, inclusions and experience that await you.",
  side: ["Curated journeys.", "Thoughtful details."],
  quote: ["Arrive. Exhale.", "Be present."],
  // Higgsfield recreations of the 2026-10-06 FAQ reference pictures, overlaid text removed
  // (docs/asset-manifest.md). Illustrative only: not NOURA premises, guests or menus.
  images: {
    hero: { src: "/media/faq/hero.webp", width: 2016, height: 864 },
    band: { src: "/media/faq/band.webp", width: 2016, height: 864 },
    food: { src: "/media/faq/food.webp", width: 1728, height: 1296 },
    terrace: { src: "/media/faq/terrace.webp", width: 2016, height: 864 },
    closing: { src: "/media/faq/closing.webp", width: 2016, height: 864 },
  },
  // Answers are the client's FAQ text (supplied 2026-10-06), unchanged. Each group sits
  // beside a picture, as in the reference layout.
  groups: [
    {
      id: "before",
      items: [
        {
          q: "How do I know the pricing for a Noura experience?",
          a: [
            "Noura experiences are curated by invitation and designed around each destination, programme and group. Pricing is shared privately with invited guests once the details of the experience have been confirmed.",
          ],
        },
        {
          q: "What does the Noura experience include?",
          a: [
            "Your Noura experience includes the curated wellness programme, accommodation and the in-destination venue, city travel and logistics associated with the experience.",
            "Specific inclusions will be clearly outlined in your invitation.",
          ],
        },
        {
          q: "Do I need to arrange my own flights and tickets?",
          a: [
            "Yes. International or domestic flights and travel tickets to and from the destination are arranged by the guest.",
            "Once you arrive at the destination, Noura takes care of the planned local transportation and logistics included in your experience.",
          ],
        },
        {
          q: "How are local transportation and logistics handled?",
          a: [
            "Once you arrive at the destination, Noura coordinates the planned city transfers, venue transportation and local logistics that form part of your experience.",
            "Our intention is for you to spend less time managing the details and more time being present in the experience.",
          ],
        },
      ],
    },
    {
      id: "experience",
      items: [
        {
          q: "What kind of food will be served?",
          a: [
            "Food is an integral part of the Noura experience.",
            "Meals will be predominantly Sattvic, thoughtfully prepared and aligned with the philosophy of the programme.",
            "Any specific dietary requirements or allergies should be shared with us in advance so that we can plan accordingly.",
          ],
        },
        {
          q: "Is alcohol included?",
          a: [
            "Alcohol is not part of the Noura experience.",
            "Guests who wish to purchase alcohol independently may do so at their own discretion, subject to the policies of the venue and applicable local regulations.",
          ],
        },
        {
          q: "What can I expect from a Noura experience?",
          a: [
            "Each Noura experience is thoughtfully curated around wellness, restoration, connection and discovery.",
            "Depending on the programme, this may include yoga, meditation, breathwork, sound healing, music, longevity practices, meaningful conversations and immersive experiences at exceptional destinations.",
            "No two Noura journeys need to be exactly alike.",
          ],
        },
        {
          q: "What should I know before I arrive?",
          a: [
            "After confirmation, guests receive a detailed pre-arrival guide covering the itinerary, what to bring, travel information, timings, wellness preparation and other practical details.",
            "Our intention is to make the journey feel seamless from the moment you accept your invitation.",
          ],
        },
      ],
    },
    {
      id: "invitation",
      items: [
        {
          q: "Can my individual needs or preferences be accommodated?",
          a: [
            "We encourage guests to share any important dietary requirements, allergies, accessibility needs or other considerations with us before the experience.",
            "Where possible, we will work with our destination and hospitality partners to accommodate individual needs.",
          ],
        },
        {
          q: "What happens after I accept my invitation?",
          a: [
            "Once your place is confirmed, our team will guide you through the next steps \u2014 including payment, travel information, pre-arrival preparation, your detailed itinerary and everything you need to know before you arrive.",
            "From there, your Noura journey begins.",
          ],
        },
      ],
    },
  ] as const,
  closing: {
    title: "Have a question that isn’t answered here?",
    lines: [
      "Every Noura journey is intentionally personal.",
      "If there is something you’d like to know before accepting your invitation, our team would be delighted to help.",
    ],
    cta: "Speak to Noura",
  },
};

export const aboutPage = {
  eyebrow: "About NOURA",
  title: "A more conscious way to travel inward.",
  lead: "NOURA brings together exceptional destinations, meaningful wellness and remarkable people to create immersive experiences for body, mind and spirit.",
  cta: "Discover our experiences",
  // Higgsfield recreations of the 2026-10-06 About reference pictures, overlaid text removed
  // (docs/asset-manifest.md). Illustrative only: not NOURA premises. The founder and board
  // portraits stay grey until real, approved photographs exist.
  images: {
    hero: { src: "/media/about/hero.webp", width: 2016, height: 864 },
    stillLife: { src: "/media/about/still-life.webp", width: 864, height: 1536 },
    philosophy: { src: "/media/about/philosophy.webp", width: 2016, height: 864 },
    home: { src: "/media/about/home.webp", width: 1728, height: 1344 },
    closing: { src: "/media/about/closing.webp", width: 2016, height: 864 },
  },
  founder: {
    label: "Founder",
    portraitCaption: "Founder — portrait",
    heading: "Founded with purpose.",
    name: "Founder name",
    role: "Founder & wellness practitioner",
    // Placeholder: the founder's real story, experience and credentials are the client's to supply.
    paragraphs: [
      "Founder introduction to be supplied. It will describe, in the founder’s own words, why NOURA exists and what they hope each guest takes home.",
    ],
    quote: "Wellness is not a destination. It is a way of being.",
  },
  board: {
    // Temporarily hidden at the owner's request; retain the section for later use.
    visible: false,
    label: "02 / Board",
    heading: "A collective of accomplished minds.",
    // Placeholder: roles and backgrounds are illustrative, no real person or employer is named.
    intro: "NOURA is guided by a diverse board of leaders who bring perspectives from business, culture, entrepreneurship, industry and the creative world.",
    members: [
      { n: "01", field: "Film & media" },
      { n: "02", field: "Professional services" },
      { n: "03", field: "Industry & enterprise" },
      { n: "04", field: "Entrepreneur & founder" },
      { n: "05", field: "Culture & creative industries" },
    ],
    bio: "Board member introduction to be supplied.",
  },
  philosophy: {
    label: "03 / Our philosophy",
    items: [
      { title: "Wellness", text: "Thoughtfully curated experiences that restore balance and vitality." },
      { title: "Perspective", text: "Diverse expertise and fresh thinking to inspire new ways of seeing." },
      { title: "Connection", text: "Meaningful human connection that enriches the journey and beyond." },
    ],
  },
  home: {
    label: "04 / Our home",
    heading: "Our home, in Goa.",
    text: "NOURA is based in Goa, India — a place where nature, culture and a long tradition of wellbeing meet.",
    connectLabel: "Visit / Connect",
    // Placeholders in square brackets until the client supplies real details.
    details: [
      { id: "address", label: "NOURA", value: "[Office / Building Name], [Area], Goa, India — [PIN CODE]" },
      { id: "phone", label: "Phone", value: "[PHONE NUMBER]" },
      { id: "email", label: "Email", value: "[EMAIL ADDRESS]" },
      { id: "social", label: "Social", value: "[Instagram / LinkedIn]" },
    ],
  },
  closing: {
    title: ["Come as you are.", "Leave with something renewed."],
    cta: "Enquire with NOURA",
  },
};

/**
 * /invitation: a picture beside the "Begin your journey" request form, after the 2026-10-06
 * reference. The form is a preview (PreviewForm): it validates and shows the preview notice,
 * and nothing is sent or stored until the backend slice connects it.
 */
export const invitationPage = {
  /** Higgsfield recreation of the reference photograph (docs/asset-manifest.md). Illustrative. */
  image: { src: "/media/invitation/hero.webp", width: 1296, height: 1728 },
  imageCaption: ["Wellness", "Nature", "Connection"],
  eyebrow: "Exclusive wellness experiences",
  title: "Begin Your Journey",
  /** The intro, split around the emphasised phrase. */
  intro: {
    before: "Whether you\u2019re looking for a transformative ",
    strong: "luxury wellness",
    after:
      " experience, personalised coaching, or a new way of living wellness driven life \u2014 we\u2019d love to hear from you. Share a few details below, and our team will be in touch with curated options just for you.",
  },
  fields: {
    fullName: { label: "Full name", placeholder: "Your name" },
    phone: { label: "Phone", placeholder: "+91 98765 43210" },
    email: { label: "Email address", placeholder: "you@company.com" },
    organization: { label: "Organization", optional: "(optional)", placeholder: "Your organization" },
    message: { label: "Message", placeholder: "Tell us a little about what you\u2019re looking for\u2026" },
  },
  interestsLabel: "I\u2019m interested in",
  interests: [
    "Yoga Kriyas",
    "Meditation",
    "Sound Healing",
    "Soulful Music",
    "Deep Conversations",
    "Rediscovering Oneself",
    "Experiencing Luxury",
    "All of the above",
  ],
  submit: "Let\u2019s begin your journey",
};
