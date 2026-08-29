import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import WorkDetailPage from "@/components/work/WorkDetailPage";
import { caseStudies } from "@/content/caseStudies";
import {
  buildWorkDetailModel,
  enrichLinkGroupThumbnails,
  getCaseStudyBySlug,
  workDetailCta,
} from "@/content/workDetail";

/** Refresh Instagram OG thumbnails periodically (CDN signed URLs expire). */
export const revalidate = 86400;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  return {
    title: `${caseStudy.client} — ${caseStudy.campaign}`,
    description: caseStudy.hero,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const model = buildWorkDetailModel(caseStudy);
  const linkGroups = await enrichLinkGroupThumbnails(model.linkGroups);

  return (
    <>
      <WorkDetailPage model={{ ...model, linkGroups }} />
      <CTASection
        titleBefore={workDetailCta.titleBefore}
        titleAccent={workDetailCta.titleAccent}
        body={workDetailCta.body}
        primaryLabel={workDetailCta.button.label}
        primaryHref={workDetailCta.button.href}
        burstSrc={workDetailCta.burst}
        headingId="work-detail-cta-heading"
      />
    </>
  );
}
