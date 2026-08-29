"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRightCircle } from "lucide-react";
import CTASection from "@/components/CTASection";
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
            <Link
              href="#insights-listing"
              className="text-cta tap-target inline-flex min-h-12 items-center gap-3 bg-ink px-5 py-3.5 pl-6 text-white transition hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              Browse insights
              <ArrowRightCircle size={24} strokeWidth={1.5} aria-hidden />
            </Link>
          </div>
        }
        gridClassName="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-0"
        copyColumnClassName="relative z-[1] min-w-0 lg:pr-16 xl:pr-20"
        mediaColumnClassName="relative z-[1] min-w-0"
        showMediaRule={false}
        media={
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-stretch gap-3 sm:gap-4">
            <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]">
              <div className="grid h-full grid-cols-2 gap-3 sm:gap-4">
                <ImageSlot
                  asset={insightsHero.imagePrimary}
                  priority
                  className="aspect-[4/5] w-full lg:aspect-auto lg:h-full"
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 40vw, 20vw"
                />
                <ImageSlot
                  asset={insightsHero.imageSecondary}
                  priority
                  className="aspect-[4/5] w-full translate-y-4 sm:translate-y-6 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:translate-y-8"
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 40vw, 20vw"
                />
              </div>
            </div>

            <div
              className="hidden w-[4.5rem] flex-col justify-between bg-ink px-3 py-5 text-white sm:flex sm:w-20 sm:px-4 sm:py-6"
              aria-hidden
            >
              <p className="m-0 font-display text-[10px] leading-[1.35] font-bold tracking-[0.18em] uppercase [writing-mode:vertical-rl] rotate-180 sm:text-[11px]">
                {insightsHero.verticalMark}
              </p>
              <span className="grid size-9 place-items-center rounded-full border border-white/50 text-white">
                <ArrowRightCircle size={22} strokeWidth={1.5} />
              </span>
            </div>
          </div>
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
