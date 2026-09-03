"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CTASection from "@/components/CTASection";
import GrowthCta from "@/components/GrowthCta";
import PageHero from "@/components/PageHero";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import InsightsBrowser from "@/components/insights/InsightsBrowser";
import InsightsSidebar from "@/components/insights/InsightsSidebar";
import { usePageReveal } from "@/hooks/usePageReveal";
import { insightsCta, insightsHero, type InsightFilterKey, type InsightPost } from "@/content/insights";
import { parseInsightCategoryParam } from "@/lib/insights";

type InsightsPageProps = {
  posts: InsightPost[];
};

export default function InsightsPage({ posts }: InsightsPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeFilter, setActiveFilter] = useState<InsightFilterKey>(() =>
    parseInsightCategoryParam(categoryParam),
  );

  usePageReveal({ scope: rootRef });

  useEffect(() => {
    setActiveFilter(parseInsightCategoryParam(categoryParam));
  }, [categoryParam]);

  function handleFilterChange(filter: InsightFilterKey) {
    setActiveFilter(filter);
    const nextUrl = filter === "all" ? "/insights" : `/insights?category=${filter}`;
    router.replace(nextUrl, { scroll: false });
  }

  return (
    <div ref={rootRef}>
      <PageHero
        headingId="insights-hero-heading"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        breadcrumbTone="accent"
        breadcrumbCurrentClassName="text-ink"
        eyebrow={insightsHero.eyebrow}
        title={
          <>
            {insightsHero.headlineBefore}{" "}
            <span className="text-red">{insightsHero.headlineAccent}</span>
          </>
        }
        body={insightsHero.body}
        copyAfterBody={
          <div data-animate="hero-copy" className="mt-6 sm:mt-7 lg:hidden">
            <GrowthCta href="#insights-listing" variant="primary">
              Browse insights
            </GrowthCta>
          </div>
        }
        media={
          <ImageSlot
            asset={insightsHero.image}
            priority
            className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        }
        burstSrc={insightsHero.burst}
        seam={{
          href: "#insights-listing",
          ariaLabel: "Continue to insights listing",
          arrowSrc: insightsHero.arrow,
        }}
      />

      <section
        id="insights-listing"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-mist"
        aria-labelledby="insights-listing-heading"
      >
        <div className="section-inner">
          <h2 id="insights-listing-heading" className="sr-only">
            Browse insights
          </h2>
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] xl:items-start xl:gap-12">
            <div className="min-w-0">
              <InsightsBrowser
                posts={posts}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
              />
            </div>
            <InsightsSidebar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          </div>
        </div>
      </section>

      <CTASection
        animate
        headingId="insights-cta-heading"
        titleBefore={insightsCta.titleBefore}
        titleAccent={insightsCta.titleAccent}
        body={insightsCta.body}
        primaryLabel={insightsCta.button.label}
        primaryHref={insightsCta.button.href}
      />
    </div>
  );
}
