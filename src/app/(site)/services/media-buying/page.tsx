import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MediaBuyingPage from "@/components/media-buying/MediaBuyingPage";
import { mediaBuyingPage } from "@/content/servicePages/media-buying";
import { serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: mediaBuyingPage.name,
  description: mediaBuyingPage.summary,
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: mediaBuyingPage.name,
          description: mediaBuyingPage.summary,
          path: "/services/media-buying",
        })}
      />
      <MediaBuyingPage />
    </>
  );
}
