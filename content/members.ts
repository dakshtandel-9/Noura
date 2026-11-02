/** Member-page concept copy. Dates, services and locations remain illustrative until approved. */
export type MemberPhoto = {
  src: string;
  alt: string;
};

export const memberPhotos = {
  arrival: { src: "/media/members/arrival-v1.webp", alt: "An imagined palm-lined shoreline in soft morning light." },
  garden: { src: "/media/members/garden-v1.webp", alt: "A sunlit stone path beside a still tropical garden pool." },
  pavilion: { src: "/media/members/pavilion-v1.webp", alt: "An open timber pavilion overlooking a quiet coastline." },
  nourish: { src: "/media/members/nourish-v1.webp", alt: "A chef finishes a seasonal vegetable dish with fresh herbs." },
  salons: { src: "/media/members/salons-v1.webp", alt: "An imagined small gathering sharing conversation on a shaded veranda." },
  evening: { src: "/media/members/evening-v1.webp", alt: "An imagined gathering around a small fire as the sun sets over the sea." },
  concierge: { src: "/media/members/concierge-v1.webp", alt: "An ivory invitation, linen journal and gold pen on a sunlit writing desk." },
} as const satisfies Record<string, MemberPhoto>;

export const memberChapters = [
  { id: "three-days", label: "The three days" },
  { id: "nourish", label: "The food" },
  { id: "salons", label: "The salons" },
  { id: "evening", label: "The evening" },
  { id: "your-journey", label: "Your journey" },
  { id: "before-arrival", label: "Before you arrive" },
  { id: "concierge", label: "The concierge" },
  { id: "member", label: "Your invitation" },
] as const;

type RetreatDay = {
  number: string;
  day: string;
  title: string;
  description: string;
  photo: MemberPhoto;
  moments: readonly string[];
};

export const retreatDays = [
  {
    number: "01", day: "Day one", title: "Arrive", description: "Leave the world behind.", photo: memberPhotos.arrival,
    moments: ["A gentle arrival", "Welcome ritual", "Mindful movement", "Opening circle", "Dinner together", "Music under the stars"],
  },
  {
    number: "02", day: "Day two", title: "Explore", description: "Follow your curiosity.", photo: memberPhotos.garden,
    moments: ["Sunrise practice", "Time for stillness", "Seasonal nourishment", "Private salons", "Space in nature", "A sound journey"],
  },
  {
    number: "03", day: "Day three", title: "Return", description: "Take something with you.", photo: memberPhotos.pavilion,
    moments: ["Morning movement", "Quiet reflection", "Time to integrate", "Closing circle", "A shared celebration", "An unhurried farewell"],
  },
] as const satisfies readonly RetreatDay[];

export const salonThemes = [
  "Purpose beyond achievement",
  "The art of living well",
  "Relationships & connection",
  "Conscious leadership",
  "What comes next?",
  "What does a good life look like?",
] as const;

export const preparationSteps = [
  { timing: "30 days before", title: "Your intention", text: "A moment to consider what you would like to make room for." },
  { timing: "21 days before", title: "Your first practice", text: "A gentle introduction to slowing down, wherever you are." },
  { timing: "14 days before", title: "Meet your journey", text: "A closer look at the rhythm and experiences ahead." },
  { timing: "7 days before", title: "The personal details", text: "Time to discuss your arrival and individual preferences." },
  { timing: "1 day before", title: "Tomorrow, we begin.", text: "A little less to do. A little more to look forward to." },
] as const;
