import type { Metadata } from "next";
import CareersPage from "@/components/careers/CareersPage";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career at First Economy — engineer impact across media, creative, technology and data. Explore open roles across Mumbai, Bengaluru, Pune and Aurangabad.",
};

export default function Page() {
  return <CareersPage />;
}
