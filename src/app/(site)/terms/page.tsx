import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { termsContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing use of the First Economy website and online forms.",
};

export default function TermsPage() {
  return <LegalDocument document={termsContent} />;
}
