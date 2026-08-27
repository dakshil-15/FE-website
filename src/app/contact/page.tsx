import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Tell us about your challenge and First Economy's experts will get back to you within 24 hours. Offices in Mumbai, Bengaluru, Aurangabad and Pune.",
};

export default function Page() {
  return <ContactPage />;
}
