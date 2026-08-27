import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "First Economy engineers growth systems that drive real impact — 250+ minds across Mumbai, Bengaluru, Aurangabad and Pune.",
};

export default function Page() {
  return <AboutPage />;
}
