"use client";

import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import { mediaBuyingPage } from "@/content/servicePages/media-buying";

/** Thin wrapper so /services/media-buying keeps its dedicated route. */
export default function MediaBuyingPage() {
  return <ServiceDetailPage content={mediaBuyingPage} />;
}
