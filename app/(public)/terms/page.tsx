import type { Metadata } from "next";
import { LegalReviewPage } from "@/components/legal/LegalReviewPage";

export const metadata: Metadata = { title: "Terms & conditions — NOURA", robots: { index: false, follow: false } };

export default function TermsPage() {
  return <LegalReviewPage kind="terms" />;
}
