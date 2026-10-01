import type { Metadata } from "next";
import { LegalReviewPage } from "@/components/legal/LegalReviewPage";

export const metadata: Metadata = { title: "Cookies — NOURA", robots: { index: false, follow: false } };

export default function CookiesPage() {
  return <LegalReviewPage kind="cookies" />;
}
