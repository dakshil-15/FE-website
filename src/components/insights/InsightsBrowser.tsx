"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import InsightCard from "@/components/insights/InsightCard";
import { insightsFilters, type InsightFilterKey, type InsightPost } from "@/content/insights";
import {
  getInsightFilterLabel,
  INSIGHTS_PAGE_SIZE,
  matchesInsightFilter,
  matchesInsightSearch,
  paginateInsights,
} from "@/lib/insights";

const RESULTS_PANEL_ID = "insights-results-panel";

type InsightsBrowserProps = {
  posts: InsightPost[];
  activeFilter: InsightFilterKey;
  onFilterChange: (filter: InsightFilterKey) => void;
};

export default function InsightsBrowser({ posts, activeFilter, onFilterChange }: InsightsBrowserProps) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return posts.filter(
      (post) => matchesInsightFilter(post, activeFilter) && matchesInsightSearch(post, query),
    );
  }, [posts, activeFilter, query]);

  const { items, page: safePage, totalPages } = useMemo(
    () => paginateInsights(filtered, page, INSIGHTS_PAGE_SIZE),
    [filtered, page],
  );

  const activeFilterLabel = useMemo(
    () => insightsFilters.find((filter) => filter.key === activeFilter)?.label ?? getInsightFilterLabel(activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    setPage(1);
  }, [activeFilter, query]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>([1, totalPages, safePage]);
    if (safePage > 2) pages.add(safePage - 1);
    if (safePage < totalPages - 1) pages.add(safePage + 1);

    return Array.from(pages).sort((a, b) => a - b);
  }, [safePage, totalPages]);

  function handleFilterChange(filter: InsightFilterKey) {
    onFilterChange(filter);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <div
          role="tablist"
          aria-label="Filter insights by category"
          className="insight-filter-tabs min-w-0 flex-1"
        >
          {insightsFilters.map((filter) => {
            const selected = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                role="tab"
                id={`insight-filter-${filter.key}`}
                aria-selected={selected}
                aria-controls={RESULTS_PANEL_ID}
                onClick={() => handleFilterChange(filter.key)}
                className={`text-cta tap-target relative shrink-0 px-3 py-2.5 whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:px-4 ${
                  selected ? "text-red" : "text-muted hover:text-ink"
                }`}
              >
                {filter.label}
                {selected ? (
                  <span
                    className="absolute right-3 bottom-0 left-3 h-0.5 bg-red sm:right-4 sm:left-4"
                    aria-hidden
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div role="search" className="relative w-full shrink-0 lg:max-w-xs">
          <label htmlFor={searchId} className="sr-only">
            Search insights
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search insights..."
            aria-controls={RESULTS_PANEL_ID}
            autoComplete="off"
            enterKeyHint="search"
            className="text-body min-h-11 w-full rounded-full border border-line bg-white py-2.5 pr-11 pl-4 text-ink outline-none transition placeholder:text-muted focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-red/20"
          />
          <Search
            size={18}
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {filtered.length} insight{filtered.length === 1 ? "" : "s"} shown
        {activeFilter !== "all" ? ` in ${activeFilterLabel}` : ""}
        {query.trim() ? ` matching “${query.trim()}”` : ""}.
        {totalPages > 1 ? ` Page ${safePage} of ${totalPages}.` : ""}
      </p>

      <div
        id={RESULTS_PANEL_ID}
        role="tabpanel"
        aria-labelledby={`insight-filter-${activeFilter}`}
        tabIndex={-1}
      >
        {items.length > 0 ? (
          <ul
            data-animate-stagger
            className="section-media m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 sm:gap-[18px] xl:grid-cols-2"
          >
            {items.map((post) => (
              <li key={post.slug} className="min-w-0">
                <InsightCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-body section-media mb-0 max-w-md text-muted" role="status">
            No insights match your search. Try another keyword or clear the filters.
          </p>
        )}

        {totalPages > 1 ? (
          <nav
            aria-label="Insights pagination"
            className="section-media mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12"
          >
            <button
              type="button"
              aria-label="Previous page"
              aria-disabled={safePage <= 1}
              disabled={safePage <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="tap-target grid size-11 place-items-center rounded-full border border-line text-ink transition hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>

            {pageNumbers.map((pageNumber, index) => {
              const previous = pageNumbers[index - 1];
              const showEllipsis = previous !== undefined && pageNumber - previous > 1;

              return (
                <span key={pageNumber} className="inline-flex items-center gap-2">
                  {showEllipsis ? (
                    <span className="px-1 text-muted" aria-hidden>
                      …
                    </span>
                  ) : null}
                  <button
                    type="button"
                    aria-label={`Page ${pageNumber}`}
                    aria-current={pageNumber === safePage ? "page" : undefined}
                    onClick={() => setPage(pageNumber)}
                    className={`tap-target grid size-11 place-items-center rounded-full text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red ${
                      pageNumber === safePage
                        ? "bg-red text-white"
                        : "border border-line text-ink hover:border-ink"
                    }`}
                  >
                    {pageNumber}
                  </button>
                </span>
              );
            })}

            <button
              type="button"
              aria-label="Next page"
              aria-disabled={safePage >= totalPages}
              disabled={safePage >= totalPages}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              className="tap-target grid size-11 place-items-center rounded-full border border-line text-ink transition hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </nav>
        ) : null}
      </div>
    </div>
  );
}
