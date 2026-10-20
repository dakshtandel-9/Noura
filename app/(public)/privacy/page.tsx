import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = { title: "Privacy policy — NOURA" };

export default function PrivacyPage() {
  return <LegalDocumentPage kind="privacy" />;
}
