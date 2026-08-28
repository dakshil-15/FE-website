import type { Metadata } from "next";
import CapabilitiesPage from "@/components/capabilities/CapabilitiesPage";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Engineering intelligent growth systems — technology, AI, data, platforms, automation and strategy connected as one at First Economy.",
};

export default function Page() {
  return <CapabilitiesPage />;
}
