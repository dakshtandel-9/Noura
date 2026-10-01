import type { Metadata } from "next";
import { LegalReviewPage } from "@/components/legal/LegalReviewPage";

export const metadata: Metadata = { title: "Privacy policy — NOURA", robots: { index: false, follow: false } };

export default function PrivacyPage() {
  return <LegalReviewPage kind="privacy" />;
}
