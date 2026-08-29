import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { privacyPolicyContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How First Economy collects, uses, and protects personal information on this website.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocument document={privacyPolicyContent} />;
}
