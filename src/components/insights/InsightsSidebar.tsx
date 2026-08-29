"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import NewsletterSubscribe from "@/components/forms/NewsletterSubscribe";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import {
  insightsFeaturedCard,
  insightsSidebarCategories,
  type InsightFilterKey,
} from "@/content/insights";
import { getFeaturedInsightCardHref, getInsightCategoryCounts } from "@/lib/insights";

type InsightsSidebarProps = {
  activeFilter: InsightFilterKey;
  onFilterChange: (filter: InsightFilterKey) => void;
};

export default function InsightsSidebar({ activeFilter, onFilterChange }: InsightsSidebarProps) {
  const categoryCounts = useMemo(() => getInsightCategoryCounts(), []);

  return (
    <aside
      className="min-w-0 xl:sticky xl:top-[calc(5.5rem+1rem)] xl:self-start"
      aria-label="Insights sidebar"
    >
      <nav
        className="border border-line bg-white p-5 sm:p-6"
        aria-label="Explore insights by category"
      >
        <h2 className="text-eyebrow m-0 text-ink">Explore by category</h2>
        <ul className="m-0 mt-4 grid list-none gap-0 p-0">
          {insightsSidebarCategories.map((category) => {
            const selected = activeFilter === category.filterKey;
            const count = categoryCounts[category.filterKey];
            return (
              <li key={category.filterKey}>
                <button
                  type="button"
                  onClick={() => onFilterChange(category.filterKey)}
                  aria-current={selected ? "true" : undefined}
                  aria-label={`${category.label}, ${count} article${count === 1 ? "" : "s"}`}
                  className={`text-body-sm tap-target flex w-full items-center justify-between gap-3 border-b border-line py-3.5 text-left transition last:border-b-0 hover:text-red focus-visible:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red ${
                    selected ? "font-semibold text-red" : "text-ink"
                  }`}
                >
                  <span aria-hidden>{category.label}</span>
                  <span className="inline-flex items-center gap-2 text-muted" aria-hidden>
                    <span>{count}</span>
                    <ChevronRight size={14} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <article className="mt-6 overflow-hidden border border-line bg-ink text-white sm:mt-8">
        <div className="p-5 sm:p-6">
          <p className="text-eyebrow-on-dark m-0">{insightsFeaturedCard.eyebrow}</p>
          <span className="mt-4 inline-block border border-white/50 px-3 py-1 text-[11px] font-bold tracking-[0.14em] uppercase">
            {insightsFeaturedCard.tag}
          </span>
          <h3 className="mt-4 mb-0 font-display text-lg leading-snug font-bold tracking-[0.01em] text-balance sm:text-xl">
            {insightsFeaturedCard.title}
          </h3>
          <Link
            href={getFeaturedInsightCardHref()}
            className="text-cta link-cta mt-5 inline-flex min-h-11 items-center gap-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Read more
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        <ImageSlot
          asset={insightsFeaturedCard.image}
          className="aspect-[16/10] w-full"
          sizes="(max-width: 1280px) 100vw, 360px"
        />
      </article>

      <section
        className="mt-6 border border-line bg-white p-5 sm:mt-8 sm:p-6"
        aria-labelledby="insights-newsletter-heading"
      >
        <h2 id="insights-newsletter-heading" className="text-eyebrow m-0 text-ink">
          Stay updated
        </h2>
        <p className="text-body-sm mt-3 mb-0 text-muted">
          Get perspectives on growth, media and technology delivered to your inbox.
        </p>
        <NewsletterSubscribe
          inputId="insights-newsletter-email"
          source="insights-sidebar"
          inputClassName="text-body min-h-12 min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-ink outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-inset"
        />
      </section>
    </aside>
  );
}
