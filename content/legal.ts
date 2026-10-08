/** Cookies review outline only. Privacy and terms drafts live in legal-documents.ts. */
export const legalReviews = {
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
