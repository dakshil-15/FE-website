import type { Metadata } from "next";
import CapabilitiesPage from "@/components/capabilities/CapabilitiesPage";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Technology, AI, data, digital platforms, automation and enterprise solutions — engineered as one connected growth system at First Economy.",
};

export default function Page() {
  return <CapabilitiesPage />;
}
