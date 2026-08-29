import type { Metadata } from "next";
import MediaBuyingPage from "@/components/media-buying/MediaBuyingPage";
import { mediaBuyingPage } from "@/content/servicePages/media-buying";

export const metadata: Metadata = {
  title: mediaBuyingPage.name,
  description: mediaBuyingPage.summary,
};

export default function Page() {
  return <MediaBuyingPage />;
}
