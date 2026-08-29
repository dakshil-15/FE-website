import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import InsightDetailPage from "@/components/insights/InsightDetailPage";
import { insightsCta } from "@/content/insights";
import {
  getFeaturedInsight,
  getInsightBySlug,
  getInsightDetailTabs,
  getInsightPosts,
  getRelatedInsights,
} from "@/lib/insights";
import { getSiteUrl } from "@/lib/site-url";

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getInsightPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} — Insights`,
    description: article.excerpt,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, relatedInsights, featuredInsight, siteUrl] = await Promise.all([
    getInsightBySlug(slug),
    getRelatedInsights(slug),
    Promise.resolve(getFeaturedInsight(slug)),
    getSiteUrl(),
  ]);

  if (!article) notFound();

  const sectionTabs = getInsightDetailTabs(article);
  const shareUrl = `${siteUrl}/insights/${slug}`;

  return (
    <>
      <InsightDetailPage
        article={article}
        sectionTabs={sectionTabs}
        relatedInsights={relatedInsights}
        featuredInsight={featuredInsight}
        shareUrl={shareUrl}
      />
      <CTASection
        titleBefore={insightsCta.titleBefore}
        titleAccent={insightsCta.titleAccent}
        body={insightsCta.body}
        primaryLabel={insightsCta.button.label}
        primaryHref={insightsCta.button.href}
        headingId="insight-detail-cta-heading"
      />
    </>
  );
}
