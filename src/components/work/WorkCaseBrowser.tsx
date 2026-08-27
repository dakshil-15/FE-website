"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, SlidersHorizontal } from "lucide-react";
import WorkCaseCard from "@/components/work/WorkCaseCard";
import { industries } from "@/content/industries";
import {
  matchesWorkFilter,
  orderedWorkStudies,
  workFilters,
  type WorkFilterKey,
} from "@/content/workPage";
import type { CaseStudy } from "@/content/types";

const industryFilters = industries.filter((industry) => industry.caseStudySlugs.length > 0);

const industryChipLabels: Record<string, string> = {
  "real-estate": "Real Estate",
  bfsi: "BFSI",
  "consumer-retail": "Consumer & Retail",
  "travel-hospitality": "Travel & Hospitality",
  "technology-manufacturing-energy": "Tech & Manufacturing",
};

export default function WorkCaseBrowser({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [active, setActive] = useState<WorkFilterKey>("all");
  const [industry, setIndustry] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterWrapRef = useRef<HTMLDivElement>(null);

  const ordered = useMemo(() => orderedWorkStudies(caseStudies), [caseStudies]);

  const filtered = useMemo(() => {
    return ordered.filter((study) => {
      if (!matchesWorkFilter(study, active)) return false;
      if (industry !== "all" && study.industry !== industry) return false;
      return true;
    });
  }, [ordered, active, industry]);

  const industryActive = industry !== "all";
  const activeIndustryName = industryFilters.find((item) => item.slug === industry)?.name;

  useEffect(() => {
    if (!filtersOpen) return;

    const onPointerDown = (event: MouseEvent | PointerEvent) => {
      if (!filterWrapRef.current?.contains(event.target as Node)) {
        setFiltersOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFiltersOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [filtersOpen]);

  function selectIndustry(slug: string) {
    setIndustry(slug);
    setFiltersOpen(false);
  }

  const industryOptions = [
    { slug: "all", label: "All industries", name: "All industries" },
    ...industryFilters.map((item) => ({
      slug: item.slug,
      label: industryChipLabels[item.slug] ?? item.name,
      name: item.name,
    })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div
          role="group"
          aria-label="Filter case studies by capability"
          className="work-filter-tabs min-w-0 flex-1"
        >
          {workFilters.map((filter) => {
            const selected = active === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                aria-pressed={selected}
                className={`text-cta tap-target shrink-0 px-3.5 py-2.5 whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:px-4 ${
                  selected
                    ? "bg-ink text-white"
                    : "text-ink hover:bg-mist focus-visible:bg-mist"
                }`}
                onClick={() => setActive(filter.key)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div ref={filterWrapRef} className="relative self-end sm:self-auto">
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-haspopup="listbox"
            aria-controls="work-industry-filters"
            aria-label={
              industryActive
                ? `Filter by industry, ${activeIndustryName} selected`
                : "Filter by industry"
            }
            className={`text-cta tap-target inline-flex w-fit shrink-0 items-center gap-2 border px-3.5 py-2.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red ${
              filtersOpen || industryActive
                ? "border-ink bg-ink text-white"
                : "border-line text-ink hover:border-ink hover:text-red"
            }`}
            onClick={() => setFiltersOpen((open) => !open)}
          >
            Filter
            {industryActive ? (
              <span className="grid size-5 place-items-center rounded-full bg-red text-[10px] font-bold text-white">
                1
              </span>
            ) : (
              <SlidersHorizontal size={18} strokeWidth={2} aria-hidden />
            )}
          </button>

          <div
            id="work-industry-filters"
            hidden={!filtersOpen}
            role="listbox"
            aria-label="Filter by industry"
            className="absolute top-[calc(100%+0.5rem)] right-0 z-30 w-[min(18.5rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line bg-white py-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
          >
            <ul className="m-0 list-none p-0">
              {industryOptions.map((option) => {
                const selected = industry === option.slug;
                return (
                  <li key={option.slug} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      aria-label={option.name}
                      title={option.name}
                      className={`text-cta tap-target flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-red ${
                        selected
                          ? "bg-ink text-white"
                          : "text-ink hover:bg-mist focus-visible:bg-mist"
                      }`}
                      onClick={() => selectIndustry(option.slug)}
                    >
                      <span className="min-w-0 truncate">{option.label}</span>
                      {selected ? (
                        <Check size={16} strokeWidth={2.5} className="shrink-0" aria-hidden />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} case {filtered.length === 1 ? "study" : "studies"} shown
        {industryActive && activeIndustryName ? ` in ${activeIndustryName}` : ""}
      </p>

      {filtered.length > 0 ? (
        <ul
          data-animate-stagger
          className="section-media m-0 grid list-none grid-cols-1 gap-x-5 gap-y-8 p-0 xs:grid-cols-2 xs:gap-y-10 md:gap-x-6 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12 xl:grid-cols-4"
        >
          {filtered.map((study) => (
            <li key={study.slug} className="min-w-0">
              <WorkCaseCard caseStudy={study} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-body section-media mb-0 max-w-md text-muted" role="status">
          No case studies match these filters. Try another capability or clear the industry filter.
        </p>
      )}
    </div>
  );
}
