"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import PageHero from "@/components/PageHero";
import NewsletterSubscribe from "@/components/forms/NewsletterSubscribe";
import GrowthCta from "@/components/GrowthCta";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import StickySectionNav from "@/components/StickySectionNav";
import { useStickySectionNav } from "@/hooks/useStickySectionNav";
import { usePageReveal } from "@/hooks/usePageReveal";
import ShareBar from "@/components/ShareBar";
import {
  insightsCta,
  insightsFeaturedCard,
  insightsHero,
  type InsightArticle,
  type InsightPost,
} from "@/content/insights";
import type { InsightDetailSectionId, InsightDetailTab } from "@/lib/insights";
import { getFeaturedInsightCardHref, getInsightHref } from "@/lib/insights";

type InsightDetailPageProps = {
  article: InsightArticle;
  sectionTabs: InsightDetailTab[];
  relatedInsights: InsightPost[];
  featuredInsight: InsightPost | null;
  shareUrl: string;
};

const SECTION_NUMBERS: Record<InsightDetailSectionId, string> = {
  overview: "01",
  opportunity: "02",
  perspective: "03",
  pillars: "04",
  examples: "05",
  impact: "06",
  "whats-next": "07",
};

const SECTION_LABELS: Record<InsightDetailSectionId, string> = {
  overview: "Overview",
  opportunity: "The Opportunity",
  perspective: "Our Perspective",
  pillars: "Key Pillars",
  examples: "Real-World Examples",
  impact: "Impact",
  "whats-next": "What's Next",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function SectionLabel({
  id,
  onDark = false,
  headingId,
}: {
  id: InsightDetailSectionId;
  onDark?: boolean;
  headingId?: string;
}) {
  if (onDark) {
    return (
      <p id={headingId} className="text-eyebrow-on-dark m-0">
        {SECTION_NUMBERS[id]} {SECTION_LABELS[id]}
      </p>
    );
  }

  return (
    <p id={headingId} className="insight-section-label m-0">
      <span>{SECTION_NUMBERS[id]}</span>
      <span> {SECTION_LABELS[id]}</span>
    </p>
  );
}

export default function InsightDetailPage({
  article,
  sectionTabs,
  relatedInsights,
  featuredInsight,
  shareUrl,
}: InsightDetailPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const {
    activeTab,
    stickyOffsets,
    tabBarRef,
    tabNavRef,
    scrollToElement,
    handleTabKeyDown,
  } = useStickySectionNav({ tabs: sectionTabs });

  const showFeaturedCard = article.slug !== insightsFeaturedCard.slug;
  const featuredHref = getFeaturedInsightCardHref();

  usePageReveal({ scope: rootRef });

  const eyebrow =
    article.categoryParent && article.categoryParent !== article.category
      ? `${article.categoryParent} → ${article.category}`
      : article.category;

  return (
    <div
      ref={rootRef}
      style={{ "--insight-sticky-offset": `${stickyOffsets.total}px` } as CSSProperties}
    >
      <PageHero
        headingId="insight-hero-heading"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: article.title, title: article.title, clamp: true },
        ]}
        breadcrumbTone="accent"
        breadcrumbCurrentClassName="text-ink"
        eyebrow={eyebrow}
        title={
          <>
            {article.headlineBefore}{" "}
            <span className="text-red">{article.headlineAccent}</span>
          </>
        }
        body={article.excerpt}
        bodyClassName="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[32rem] sm:mt-6"
        copyAfterBody={
          <div
            data-animate="hero-copy"
            className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6"
          >
            <ul
              className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-2 p-0 sm:gap-x-6"
              aria-label="Article details"
            >
              <li className="flex items-center gap-2 text-body-sm text-muted">
                <Calendar size={15} className="flex-none text-red" aria-hidden />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </li>
              <li className="flex items-center gap-2 text-body-sm text-muted">
                <Clock size={15} className="flex-none text-red" aria-hidden />
                <span>
                  <span className="sr-only">Estimated reading time: </span>
                  {article.readTime}
                </span>
              </li>
              <li className="flex items-center gap-2 text-body-sm text-muted">
                <User size={15} className="flex-none text-red" aria-hidden />
                <span>
                  <span className="sr-only">Author: </span>
                  {article.author}
                </span>
              </li>
            </ul>
            <ShareBar
              title={article.title}
              shareUrl={shareUrl}
              variant="compact"
              ariaLabel="Share this article"
              copySuccessMessage="Article link copied to clipboard."
              copyErrorMessage="Could not copy the article link."
            />
          </div>
        }
        gridClassName="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-0"
        copyColumnClassName="relative z-[1] flex min-w-0 flex-col justify-center lg:pr-16 xl:pr-20"
        media={
          <>
            <ImageSlot
              asset={article.heroImage}
              priority
              className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:min-h-[420px] lg:h-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <p
              className="pointer-events-none absolute top-1/2 right-4 z-[3] hidden max-h-[85%] -translate-y-1/2 overflow-hidden font-display text-[10px] leading-none font-bold tracking-[0.42em] text-red uppercase [writing-mode:vertical-rl] rotate-180 lg:block xl:right-6 xl:text-xs"
              aria-hidden
            >
              {insightsHero.verticalMark}
            </p>
          </>
        }
        burstSrc={insightsHero.burst}
        seam={{
          onClick: () => scrollToElement("overview"),
          ariaLabel: "Continue to article overview",
          arrowSrc: insightsHero.arrow,
        }}
      />

      <StickySectionNav
        tabs={sectionTabs}
        activeTab={activeTab}
        headerOffset={stickyOffsets.header}
        tabBarRef={tabBarRef}
        tabNavRef={tabNavRef}
        ariaLabel="Article sections"
        ariaCurrentValue="location"
        scrollRegion={false}
        onSelect={scrollToElement}
        onTabKeyDown={handleTabKeyDown}
      />

      {/* Main content + sidebar */}
      <section className="section-shell section-pad bg-white" aria-label="Article content">
        <div className="section-inner">
          <div className="insight-detail-grid">
            <div className="min-w-0">
              {article.overview ? (
                <section id="overview" aria-labelledby="overview-label" className="insight-section-anchor w-full">
                  <SectionLabel id="overview" headingId="overview-label" />
                  <h2 className="text-display-sm mt-4 mb-0 max-w-[42rem] text-balance">
                    {article.overview.headline}
                  </h2>
                  <p className="text-body section-copy-on-light mt-5 mb-0 max-w-none sm:mt-6">
                    {article.overview.body}
                  </p>
                  {article.overview.quote ? (
                    <blockquote className="insight-quote mt-8 sm:mt-10">
                      <span className="insight-quote-mark" aria-hidden>
                        &ldquo;
                      </span>
                      <p className="text-body relative z-[1] m-0 pt-4 font-medium text-ink sm:text-lg">
                        {article.overview.quote}
                      </p>
                    </blockquote>
                  ) : null}
                </section>
              ) : null}

              {article.opportunity.items.length > 0 ? (
                <section
                  id="opportunity"
                  aria-labelledby="opportunity-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <SectionLabel id="opportunity" headingId="opportunity-label" />
                  <h2 className="text-display-sm mt-4 mb-0">{article.opportunity.headline}</h2>
                  {article.opportunity.subheadline ? (
                    <p className="text-body section-copy-on-light mt-4 mb-0 max-w-[42rem]">
                      {article.opportunity.subheadline}
                    </p>
                  ) : null}
                  <ul
                    data-animate-stagger
                    className="m-0 mt-8 grid list-none grid-cols-1 gap-2.5 p-0 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {article.opportunity.items.map((item, index) => (
                      <li
                        key={`${item.title}-${index}`}
                        className="cap-card flex min-h-[200px] flex-col border border-line bg-mist p-5 text-center transition-[border-color] duration-200 hover:border-ink sm:p-6"
                      >
                        <div className="flex justify-center">
                          <IconSlot
                            asset={item.icon}
                            tone="accent"
                            size={44}
                            className="h-9 w-9 sm:h-11 sm:w-11"
                          />
                        </div>
                        <h3 className="mt-5 mb-0 font-display text-sm font-bold tracking-[0.04em] uppercase sm:text-[15px]">
                          {item.title}
                        </h3>
                        <p className="text-body-sm mt-2 mb-0 text-muted">{item.body}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {article.perspective.items.length > 0 ? (
                <section
                  id="perspective"
                  aria-labelledby="perspective-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <SectionLabel id="perspective" headingId="perspective-label" />
                  <h2 className="text-display-sm mt-4 mb-0">{article.perspective.headline}</h2>
                  {article.perspective.subheadline ? (
                    <p className="text-body section-copy-on-light mt-4 mb-0 max-w-[42rem]">
                      {article.perspective.subheadline}
                    </p>
                  ) : null}
                  <ul
                    data-animate-stagger
                    className="m-0 mt-8 grid list-none grid-cols-1 gap-2.5 p-0 sm:mt-10 xs:grid-cols-2 xl:grid-cols-4"
                  >
                    {article.perspective.items.map((item, index) => (
                      <li
                        key={`${item.title}-${index}`}
                        className="cap-card flex min-h-[200px] flex-col border border-line bg-mist p-5 transition-[border-color] duration-200 hover:border-ink sm:p-6"
                      >
                        <IconSlot
                          asset={item.icon}
                          tone="accent"
                          size={40}
                          className="h-9 w-9 sm:h-10 sm:w-10"
                        />
                        <h3 className="mt-5 mb-0 font-display text-sm font-bold tracking-[0.04em] uppercase sm:text-[15px]">
                          {item.title}
                        </h3>
                        <p className="text-body-sm mt-2 mb-0 text-muted">{item.body}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {article.pillars.some((pillar) => pillar.title?.trim() || pillar.body?.trim()) ? (
                <section
                  id="pillars"
                  aria-labelledby="pillars-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <SectionLabel id="pillars" headingId="pillars-label" />
                  <ul
                    className="insight-pillars-grid m-0 mt-8 list-none p-0 sm:mt-10"
                    aria-label="Key pillars"
                  >
                    {article.pillars
                      .filter((pillar) => pillar.title?.trim() || pillar.body?.trim())
                      .map((pillar) => (
                        <li
                          key={pillar.number}
                          className="relative min-h-[11rem] min-w-0 p-5 sm:min-h-[12rem] sm:p-6"
                        >
                          <span
                            className="pointer-events-none absolute top-3 right-3 font-display text-4xl leading-none font-bold text-line/70 select-none sm:top-4 sm:right-4 sm:text-5xl"
                            aria-hidden
                          >
                            {pillar.number}
                          </span>
                          <h3 className="relative z-[1] m-0 max-w-[85%] font-display text-sm font-bold tracking-[0.04em] uppercase sm:text-[15px]">
                            {pillar.title}
                          </h3>
                          <p className="text-body-sm relative z-[1] mt-3 mb-0 text-muted">{pillar.body}</p>
                        </li>
                      ))}
                  </ul>
                </section>
              ) : null}

              {article.examples.items.length > 0 ? (
                <section
                  id="examples"
                  aria-labelledby="examples-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <SectionLabel id="examples" headingId="examples-label" />
                  <h2 className="text-display-sm mt-4 mb-0">{article.examples.headline}</h2>
                  {article.examples.subheadline ? (
                    <p className="text-body section-copy-on-light mt-4 mb-0 max-w-[42rem]">
                      {article.examples.subheadline}
                    </p>
                  ) : null}
                  <ul
                    data-animate-stagger
                    className="m-0 mt-8 grid list-none grid-cols-1 gap-2.5 p-0 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {article.examples.items.map((item, index) => (
                      <li
                        key={`${item.title}-${index}`}
                        className="cap-card flex min-w-0 flex-col overflow-hidden border border-line bg-white transition-[border-color] duration-200 hover:border-ink"
                      >
                        <ImageSlot
                          asset={item.image}
                          className="aspect-[16/10] w-full"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="flex flex-1 flex-col p-5">
                          <p className="insight-tag m-0 text-red">{item.category}</p>
                          <h3 className="mt-2 mb-0 font-display text-sm font-bold tracking-[0.04em] uppercase sm:text-[15px]">
                            {item.title}
                          </h3>
                          <p className="text-body-sm mt-2 mb-0 text-muted">{item.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 sm:mt-10">
                    <GrowthCta
                      href={article.examples.cta.href}
                      variant="secondary"
                      block
                      className="sm:w-auto"
                    >
                      {article.examples.cta.label}
                    </GrowthCta>
                  </div>
                </section>
              ) : null}

              {article.impact.stats.length > 0 ? (
                <section
                  id="impact"
                  aria-labelledby="impact-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <div className="insight-impact-banner px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
                    <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between xl:gap-12">
                      <div className="min-w-0 xl:max-w-[20rem]">
                        <SectionLabel id="impact" onDark headingId="impact-label" />
                        <h2 className="text-display-sm mt-3 mb-0 text-white">{article.impact.headline}</h2>
                        {article.impact.subheadline ? (
                          <p className="text-body mt-3 mb-0 text-muted-on-dark">{article.impact.subheadline}</p>
                        ) : null}
                      </div>
                      <dl className="m-0 grid w-full min-w-0 grid-cols-2 gap-x-4 gap-y-6 p-0 sm:gap-x-6 sm:gap-y-8 xl:flex-1">
                        {article.impact.stats.map((stat) => (
                          <div key={stat.label} className="min-w-0 text-center sm:text-left">
                            <dt className="sr-only">{stat.label}</dt>
                            <dd className="insight-impact-stat m-0 text-red">{stat.value}</dd>
                            <dd className="text-body-sm mt-1 mb-0 font-normal text-muted-on-dark" aria-hidden>
                              {stat.label}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </section>
              ) : null}

              {article.whatsNext?.trim() ? (
                <section
                  id="whats-next"
                  aria-labelledby="whats-next-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <SectionLabel id="whats-next" headingId="whats-next-label" />
                  <div className="mt-5 grid grid-cols-1 gap-6 sm:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-start lg:gap-8">
                    <p className="text-body section-copy-on-light m-0 max-w-none">{article.whatsNext}</p>
                    <aside className="border border-line bg-mist p-5 sm:p-6" aria-label="Get in touch">
                      <p className="m-0 font-display text-lg leading-snug font-bold tracking-[0.01em] uppercase text-balance sm:text-xl">
                        {insightsCta.titleBefore}{" "}
                        <span className="text-red">{insightsCta.titleAccent}</span>
                      </p>
                      <p className="text-body-sm mt-3 mb-0 text-muted">{insightsCta.body}</p>
                      <GrowthCta
                        href={insightsCta.button.href}
                        variant="accent"
                        block
                        className="mt-5 sm:w-auto"
                      >
                        {insightsCta.button.label}
                      </GrowthCta>
                    </aside>
                  </div>
                </section>
              ) : null}
            </div>

            <aside
              className="min-w-0 lg:sticky lg:max-h-[calc(100dvh-var(--insight-sticky-offset,8.5rem)-1rem)] lg:self-start lg:overflow-y-auto"
              style={{ top: stickyOffsets.total }}
              aria-label="Article sidebar"
            >
              {showFeaturedCard ? (
                <div className="overflow-hidden border border-line bg-ink text-white">
                  <div className="p-5 sm:p-6">
                    <p className="text-eyebrow-on-dark m-0">{insightsFeaturedCard.eyebrow}</p>
                    <span className="insight-tag mt-4 inline-block border border-white/40 px-3 py-1 text-white">
                      {insightsFeaturedCard.tag}
                    </span>
                    <h3 className="mt-4 mb-0 font-display text-lg leading-snug font-bold tracking-[0.01em] text-balance sm:text-xl">
                      {insightsFeaturedCard.title}
                    </h3>
                    <Link
                      href={featuredHref}
                      className="text-cta link-cta mt-5 inline-flex items-center gap-2 text-white"
                    >
                      Read more
                      <ArrowRight size={14} aria-hidden />
                    </Link>
                  </div>
                  <ImageSlot
                    asset={insightsFeaturedCard.image}
                    className="aspect-[16/10] w-full"
                    sizes="360px"
                  />
                </div>
              ) : featuredInsight ? (
                <div className="border border-line bg-white p-5 sm:p-6">
                  <h2 className="text-eyebrow m-0 text-ink">Featured insight</h2>
                  <Link
                    href={featuredInsight.href ?? getInsightHref(featuredInsight.slug)}
                    className="group mt-4 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                  >
                    <ImageSlot
                      asset={
                        featuredInsight.thumbnail ?? {
                          alt: featuredInsight.title,
                          label: `${featuredInsight.title} thumbnail`,
                        }
                      }
                      className="aspect-[16/10] w-full"
                      sizes="360px"
                    />
                    <h3 className="mt-4 mb-0 font-display text-sm font-bold tracking-[0.02em] uppercase transition group-hover:text-red sm:text-[15px]">
                      {featuredInsight.title}
                    </h3>
                    <span className="text-cta link-cta mt-3 inline-flex items-center gap-2 text-ink">
                      Read more
                      <ArrowRight size={14} aria-hidden />
                    </span>
                  </Link>
                </div>
              ) : null}

              {relatedInsights.length > 0 ? (
                <div className="mt-6 border border-line bg-white p-5 sm:mt-8 sm:p-6">
                  <h2 className="text-eyebrow m-0 text-ink">Related insights</h2>
                  <ul className="m-0 mt-4 grid list-none gap-5 p-0">
                    {relatedInsights.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={post.href ?? getInsightHref(post.slug)}
                          className="group flex gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                        >
                          <ImageSlot
                            asset={
                              post.thumbnail ?? {
                                alt: post.title,
                                label: `${post.title} thumbnail`,
                              }
                            }
                            className="aspect-square w-16 shrink-0 sm:w-20"
                            sizes="80px"
                          />
                          <div className="min-w-0">
                            <p className="insight-tag m-0 text-red">{post.category}</p>
                            <p className="mt-1 mb-0 font-display text-xs font-bold leading-snug tracking-[0.01em] uppercase transition group-hover:text-red sm:text-sm">
                              {post.title}
                            </p>
                            <span className="text-cta link-cta mt-2 inline-flex items-center gap-1.5 text-ink">
                              Read more
                              <ArrowRight size={12} aria-hidden />
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-6 border border-line bg-white p-5 sm:mt-8 sm:p-6">
                <h2 className="text-eyebrow m-0 text-ink">Stay updated</h2>
                <p className="text-body-sm mt-3 mb-0 text-muted">
                  Get perspectives on growth, media and technology delivered to your inbox.
                </p>
                <NewsletterSubscribe inputId="insight-newsletter-email" source="insight-detail" />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
