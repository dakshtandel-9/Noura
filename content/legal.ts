/** Review outlines only. Replace each with owner-approved, versioned policy text before launch. */
export const legalReviews = {
  terms: {
    title: "Terms & conditions",
    introduction: "This page is a review outline. It is not an operative set of terms.",
    sections: [
      { title: "Business details", detail: "Confirm the legal business name, public contact and applicable location." },
      { title: "Using this website", detail: "Approve the rules for website content, acceptable use and intellectual property." },
      { title: "Requests and experiences", detail: "Describe the manual invitation and session-review process, and approve any cancellation or payment terms that actually apply." },
      { title: "Legal details", detail: "Have the owner and adviser approve the appropriate disclaimers, dispute process, governing law and effective date." },
    ],
  },
  privacy: {
    title: "Privacy policy",
    introduction: "This page is a review outline. It is not an operative privacy notice.",
    sections: [
      { title: "Who handles your information", detail: "Confirm the legal operator and a real privacy-contact route." },
      { title: "What is collected and why", detail: "Approve the exact request fields, newsletter email purpose, lawful notice or consent mechanism and whether optional analytics will be used." },
      { title: "Where information goes", detail: "Name the actual hosting, database and mailing providers, data locations and any relevant transfers." },
      { title: "How long it stays", detail: "Approve retention, deletion, backup and privacy-request procedures before accepting live submissions." },
    ],
  },
  cookies: {
    title: "Cookies",
    introduction: "This page is a review outline. It is not an operative cookie notice.",
    sections: [
      { title: "Cookie inventory", detail: "Check the deployed website and its providers for cookies and similar storage before publishing this page." },
      { title: "Essential use", detail: "Describe any cookies needed for security, administration or basic site operation, with their providers and lifetimes." },
      { title: "Optional use", detail: "List analytics or marketing technologies only if they are actually installed; agree the appropriate choice and withdrawal controls first." },
      { title: "Keeping this current", detail: "Approve a contact route, effective date and review process when providers or site behaviour change." },
    ],
  },
} as const;

export type LegalReviewKey = keyof typeof legalReviews;
