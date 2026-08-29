import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import { getServicePageContent, servicePageSlugs } from "@/content/servicePages";

export function generateStaticParams() {
  return servicePageSlugs
    .filter((slug) => slug !== "media-buying")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getServicePageContent(slug);
  if (!content) return {};
  return { title: content.name, description: content.summary };
}

export default async function ServiceDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "media-buying") notFound();

  const content = getServicePageContent(slug);
  if (!content) notFound();

  return <ServiceDetailPage content={content} />;
}
