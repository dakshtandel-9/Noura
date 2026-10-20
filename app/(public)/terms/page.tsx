import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = { title: "Terms & conditions — NOURA" };

export default function TermsPage() {
  return <LegalDocumentPage kind="terms" />;
}
