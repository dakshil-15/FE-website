"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Layers, Play } from "lucide-react";
import type { CSSProperties } from "react";
import WorkDetailGallery from "@/components/work/WorkDetailGallery";
import {
  ContentBlock,
  PILLAR_ICONS,
  SECTION_META,
  SectionLabel,
  SERVICE_ICONS,
} from "@/components/work/WorkDetailShared";
import WorkDetailVideoSlider from "@/components/work/WorkDetailVideoSlider";
import type { WorkDetailModel, WorkDetailSectionId } from "@/content/workDetail";
import {
  parseWorkMetricValue,
  workDetailHeadlines,
  workResultGridClass,
} from "@/content/workDetail";

type WorkDetailStoryProps = {
  title: WorkDetailModel["title"];
  caseStudy: WorkDetailModel["caseStudy"];
  objective: WorkDetailModel["objective"];
  mandate: WorkDetailModel["mandate"];
  executionSummary: WorkDetailModel["executionSummary"];
  pillars: WorkDetailModel["pillars"];
  heroImage: WorkDetailModel["heroImage"];
  gallery: WorkDetailModel["gallery"];
  galleryGroups: WorkDetailModel["galleryGroups"];
  videos: WorkDetailModel["videos"];
  linkGroups: WorkDetailModel["linkGroups"];
  results: WorkDetailModel["results"];
  resultHighlights: WorkDetailModel["resultHighlights"];
  builtWith: WorkDetailModel["builtWith"];
  hasSection: (id: WorkDetailSectionId) => boolean;
  sectionNumber: (id: WorkDetailSectionId) => string;
  sectionScrollStyle: CSSProperties;
};

export default function WorkDetailStory({
  title,
  caseStudy,
  objective,
  mandate,
  executionSummary,
  pillars,
  heroImage,
  gallery,
  galleryGroups,
  videos,
  linkGroups,
  results,
  resultHighlights,
  builtWith,
  hasSection,
  sectionNumber,
  sectionScrollStyle,
}: WorkDetailStoryProps) {
  return (
    <section
      data-animate-section
      className="section-shell section-pad bg-white"
      aria-label="Case study details"
    >
      <div className="section-inner">
        {/* Objective — full-width editorial block */}
        {hasSection("objective") ? (
        <ContentBlock
          id="objective"
          style={sectionScrollStyle}
          labelledBy="work-objective-heading"
        >
          <div data-animate="fade-up">
            <SectionLabel
              id="objective"
              number={sectionNumber("objective")}
              headingId="work-objective-label"
            />
            <div className="section-intro">
              <h2
                id="work-objective-heading"
                className="text-display-md m-0 text-balance"
              >
                {workDetailHeadlines.objective}
              </h2>
              <p className="text-body section-copy-on-light m-0 max-w-none pt-0 md:pt-1">
                {objective}
              </p>
            </div>
          </div>
        </ContentBlock>
        ) : null}

        {/* Mandate — full-width section, checklist uses available columns */}
        {hasSection("mandate") ? (
        <ContentBlock
          id="mandate"
          className="mt-12 sm:mt-16"
          style={sectionScrollStyle}
          labelledBy="work-mandate-heading"
        >
          <div data-animate="fade-up">
            <SectionLabel
              id="mandate"
              number={sectionNumber("mandate")}
              headingId="work-mandate-label"
            />
            <h2
              id="work-mandate-heading"
              className="text-display-md mt-4 mb-0 max-w-[42rem] text-balance"
            >
              {workDetailHeadlines.mandate}
            </h2>
            <ul
              data-animate-stagger
              className="m-0 mt-8 grid list-none grid-cols-1 gap-x-8 gap-y-5 p-0 sm:mt-10 sm:grid-cols-2 lg:gap-x-10 xl:grid-cols-4"
            >
              {mandate.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span
                    className="mt-0.5 grid size-6 flex-none place-items-center border border-red/50 text-red"
                    aria-hidden
                  >
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <p className="text-body section-copy-on-light m-0 min-w-0 text-pretty">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </ContentBlock>
        ) : null}

        {/* Execution */}
        {hasSection("execution") ? (
        <ContentBlock
          id="execution"
          className="mt-12 sm:mt-16"
          style={sectionScrollStyle}
          labelledBy="work-execution-heading"
        >
          <SectionLabel
            id="execution"
            number={sectionNumber("execution")}
            headingId="work-execution-label"
          />
          <div className="section-intro">
            <h2
              data-animate="fade-up"
              id="work-execution-heading"
              className="text-display-md m-0 text-balance"
            >
              {workDetailHeadlines.execution}
            </h2>
            {executionSummary ? (
              <p
                data-animate="fade-up"
                className="text-body section-copy section-copy-on-light m-0 pt-0 md:pt-1"
              >
                {executionSummary}
              </p>
            ) : null}
          </div>

          <ul
            data-animate-stagger
            className="m-0 mt-8 grid list-none grid-cols-1 gap-3 p-0 xs:grid-cols-2 sm:mt-10 lg:grid-cols-4"
            aria-label="Execution pillars"
          >
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length]!;
              const num = String(i + 1).padStart(2, "0");
              return (
                <li key={pillar.title} className="min-w-0">
                  <article className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-[20px] border border-[#e6e6e6] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-red/35 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] sm:min-h-[240px] sm:rounded-[22px] sm:p-5 md:p-6">
                    <svg
                      className="pointer-events-none absolute -bottom-6 -left-8 h-[140px] w-[140px] text-red/[0.12]"
                      viewBox="0 0 140 140"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M12 128C12 64 64 12 128 12"
                        stroke="currentColor"
                        strokeWidth="1.25"
                      />
                    </svg>

                    <div className="relative flex items-start justify-between gap-3">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-red text-white shadow-[0_8px_20px_rgba(210,37,37,0.3)] sm:h-14 sm:w-14">
                        <Icon size={22} strokeWidth={1.75} aria-hidden className="text-white" />
                      </span>
                      <span
                        className="font-display text-[2.5rem] leading-none font-light tracking-tight text-[#e4e4e4] select-none sm:text-[2.75rem]"
                        aria-hidden
                      >
                        {num}
                      </span>
                    </div>

                    <div className="relative mt-6 flex flex-1 flex-col sm:mt-7">
                      <h3 className="m-0 w-full font-display text-[1.05rem] leading-[1.15] font-bold tracking-[0.02em] text-ink uppercase sm:text-[1.125rem]">
                        {pillar.title}
                      </h3>
                      <span className="mt-3 block h-[3px] w-8 rounded-full bg-red" aria-hidden />
                      {pillar.description ? (
                        <p className="mt-3.5 mb-0 text-[13px] leading-snug text-muted sm:text-sm">
                          {pillar.description}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </ContentBlock>
        ) : null}

        {/* Live activations / proof links — CMS-driven, only when linkGroups exist */}
        {hasSection("activations") ? (
          <ContentBlock
            id="activations"
            className="mt-12 sm:mt-16"
            style={sectionScrollStyle}
            labelledBy="work-activations-heading"
          >
            <SectionLabel
              id="activations"
              number={sectionNumber("activations")}
              headingId="work-activations-label"
            />
            <div className="section-intro">
              <h2
                data-animate="fade-up"
                id="work-activations-heading"
                className="text-display-md m-0 text-balance"
              >
                {workDetailHeadlines.activations}
              </h2>
            </div>

            <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
              {linkGroups.map((group) => (
                <div key={group.title} data-animate="fade-up" className="min-w-0">
                  <p className="text-eyebrow m-0">{group.title}</p>
                  {group.description ? (
                    <p className="text-body section-copy-on-light mt-3 mb-0 max-w-[42rem]">
                      {group.description}
                    </p>
                  ) : null}
                  <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-4 p-0 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {group.links.map((link) => {
                      const isReel =
                        /instagram\.com\/(?:[\w.]+\/)?reel\//i.test(link.href) ||
                        /live reel/i.test(link.description ?? "");

                      return (
                        <li key={`${link.href}-${link.label}`}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex h-full flex-col overflow-hidden border border-line bg-white transition hover:border-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                          >
                            <span className="relative block aspect-[4/5] w-full overflow-hidden bg-mist">
                              {link.thumbnail ? (
                                <Image
                                  src={link.thumbnail}
                                  alt=""
                                  fill
                                  sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                                  unoptimized
                                />
                              ) : (
                                <span
                                  className="absolute inset-0 flex items-center justify-center bg-ink/[0.04]"
                                  aria-hidden
                                >
                                  <span className="grid size-12 place-items-center rounded-full border border-line bg-white text-ink">
                                    <ArrowUpRight size={20} strokeWidth={2} />
                                  </span>
                                </span>
                              )}
                              {isReel ? (
                                <span
                                  className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/15 opacity-100 transition group-hover:bg-ink/25"
                                  aria-hidden
                                >
                                  <span className="grid size-11 place-items-center rounded-full border border-white/70 bg-ink/55 text-white backdrop-blur-[2px] sm:size-12">
                                    <Play size={18} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                                  </span>
                                </span>
                              ) : null}
                            </span>
                            <span className="flex flex-1 items-start justify-between gap-3 px-4 py-3.5">
                              <span className="min-w-0">
                                <span className="block text-[15px] font-semibold text-ink transition group-hover:text-red">
                                  {link.label}
                                </span>
                                {link.description ? (
                                  <span className="mt-1 block text-[13px] leading-snug text-muted">
                                    {link.description}
                                  </span>
                                ) : null}
                              </span>
                              <ArrowUpRight
                                size={18}
                                strokeWidth={2}
                                className="mt-0.5 flex-none text-red"
                                aria-hidden
                              />
                            </span>
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </ContentBlock>
        ) : null}

        {/* Gallery */}
        {hasSection("gallery") ? (
          <ContentBlock
            id="gallery"
            className="mt-12 sm:mt-16"
            style={sectionScrollStyle}
            labelledBy="work-gallery-heading"
          >
            <SectionLabel
              id="gallery"
              number={sectionNumber("gallery")}
              headingId="work-gallery-label"
            />
            <h2
              data-animate="fade-up"
              id="work-gallery-heading"
              className="text-display-sm mt-4 mb-0 max-w-[42rem] text-balance"
            >
              {workDetailHeadlines.gallery}
            </h2>
            <div data-animate="fade-up" className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
              {galleryGroups.length > 0
                ? galleryGroups.map((group) => (
                    <div key={group.title} className="min-w-0">
                      {galleryGroups.length > 1 ? (
                        <p className="text-eyebrow m-0 mb-4">{group.title}</p>
                      ) : null}
                      <WorkDetailGallery items={group.items} title={`${title} — ${group.title}`} />
                    </div>
                  ))
                : (
                    <WorkDetailGallery items={gallery} title={title} />
                  )}
            </div>
          </ContentBlock>
        ) : null}

        {/* Video — center-focus film slider */}
        {hasSection("video") ? (
          <ContentBlock
            id="video"
            className="mt-12 overflow-x-clip sm:mt-16"
            style={sectionScrollStyle}
            labelledBy="work-video-heading"
          >
            <div data-animate="fade-up" className="max-w-[42rem]">
              <SectionLabel
                id="video"
                number={sectionNumber("video")}
                headingId="work-video-label"
              />
              <h2
                id="work-video-heading"
                className="text-display-sm mt-4 mb-0 text-balance"
              >
                {workDetailHeadlines.video}
              </h2>
            </div>
            <div data-animate="fade-up" className="mt-2 sm:mt-3">
              <WorkDetailVideoSlider
                videos={videos}
                campaign={caseStudy.campaign}
                fallbackPoster={heroImage.src}
              />
            </div>
          </ContentBlock>
        ) : null}

        {/* Result — stats band matching Work / Home */}
        {hasSection("result") ? (
        <ContentBlock
          id="result"
          className="mt-12 sm:mt-16"
          style={sectionScrollStyle}
          labelledBy="work-result-heading"
        >
          <div
            data-animate="fade-up"
            className="bg-ink px-5 pt-10 pb-12 text-white sm:px-8 sm:pt-12 sm:pb-16 lg:px-10 lg:pt-14 lg:pb-20"
          >
            <p className="text-eyebrow-on-dark m-0" id="work-result-label">
              {sectionNumber("result")} {SECTION_META.result.label}
            </p>
            <div className="section-intro mt-4">
              <h2
                id="work-result-heading"
                className="text-display-md m-0 text-balance text-white"
              >
                {workDetailHeadlines.result}
              </h2>
              <p className="text-body section-copy section-copy-on-dark m-0 pt-0 md:pt-1">
                Measurable outcomes from strategy, craft, and integrated execution.
              </p>
            </div>

            {resultHighlights.length > 0 ? (
              <ul
                data-animate-stagger
                className="m-0 mt-8 grid list-none grid-cols-1 gap-3 p-0 sm:mt-10 sm:grid-cols-2"
              >
                {resultHighlights.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 border border-white/15 bg-white/[0.04] px-4 py-3.5"
                  >
                    <span
                      className="mt-0.5 grid size-5 flex-none place-items-center text-red"
                      aria-hidden
                    >
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <p className="text-body m-0 min-w-0 text-pretty text-white/85">{line}</p>
                  </li>
                ))}
              </ul>
            ) : null}

            {results.length > 0 ? (
            <ul
              data-animate-stagger
              data-cols={
                results.length === 4 ? "4" : results.length === 3 ? "3" : results.length === 2 ? "2" : results.length > 4 ? "3" : "1"
              }
              className={`work-result-stats m-0 mt-10 grid list-none p-0 sm:mt-12 ${workResultGridClass(results.length)}`}
            >
              {results.map((metric) => {
                const parsed = parseWorkMetricValue(metric.value);
                const spoken = `${metric.value} ${metric.label}`;

                return (
                  <li key={`${metric.label}-${metric.value}`} className="work-result-stat min-w-0">
                    <p
                      className={`m-0 text-white ${parsed.isPhrase ? "text-stat-phrase" : "text-stat"}`}
                      aria-label={spoken}
                    >
                      <span aria-hidden="true" className="inline-flex flex-wrap items-baseline">
                        <span>{parsed.figure}</span>
                        {parsed.unit ? (
                          <span
                            className={
                              parsed.unit === "%" || parsed.unit === "x"
                                ? undefined
                                : "text-[0.55em] font-extrabold tracking-[0.02em]"
                            }
                          >
                            {parsed.unit}
                          </span>
                        ) : null}
                        {parsed.plus ? <span className="text-red">+</span> : null}
                      </span>
                    </p>
                    <p className="mt-2.5 mb-0 text-[13px] font-bold tracking-[0.14em] text-white/75 uppercase sm:mt-3">
                      {metric.label}
                    </p>
                  </li>
                );
              })}
            </ul>
            ) : null}
          </div>
        </ContentBlock>
        ) : null}

        {/* Built With — service cards like home / capabilities */}
        {hasSection("built-with") ? (
          <ContentBlock
            id="built-with"
            className="mt-12 sm:mt-16"
            style={sectionScrollStyle}
            labelledBy="work-built-heading"
          >
            <SectionLabel
              id="built-with"
              number={sectionNumber("built-with")}
              headingId="work-built-label"
            />
            <div className="section-intro">
              <h2
                data-animate="fade-up"
                id="work-built-heading"
                className="text-display-md m-0 text-balance"
              >
                {workDetailHeadlines.built}
              </h2>
              <p
                data-animate="fade-up"
                className="text-body section-copy section-copy-on-light m-0 pt-0 md:pt-1"
              >
                The capabilities that powered this campaign — explore each service for more.
              </p>
            </div>

            <ul
              data-animate-stagger
              className={`m-0 mt-8 grid list-none grid-cols-1 gap-3 p-0 sm:mt-10 ${
                builtWith.length === 1
                  ? "max-w-md"
                  : builtWith.length === 2
                    ? "xs:grid-cols-2"
                    : builtWith.length === 3
                      ? "xs:grid-cols-2 lg:grid-cols-3"
                      : "xs:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {builtWith.map((service, i) => {
                const Icon = SERVICE_ICONS[service.slug] ?? Layers;
                const num = String(i + 1).padStart(2, "0");
                const titleId = `built-with-${service.slug}`;

                return (
                  <li key={service.slug} className="min-w-0">
                    <Link
                      href={`/services/${service.slug}`}
                      aria-labelledby={titleId}
                      className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-[20px] border border-[#e6e6e6] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-red/35 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] focus-visible:border-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:min-h-[248px] sm:rounded-[22px] sm:p-5 md:p-6"
                    >
                      <svg
                        className="pointer-events-none absolute -bottom-6 -left-8 h-[140px] w-[140px] text-red/[0.12]"
                        viewBox="0 0 140 140"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M12 128C12 64 64 12 128 12"
                          stroke="currentColor"
                          strokeWidth="1.25"
                        />
                      </svg>

                      <div className="relative flex items-start justify-between gap-3">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-red text-white shadow-[0_8px_20px_rgba(210,37,37,0.3)] sm:h-14 sm:w-14">
                          <Icon size={26} aria-hidden className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                        </span>
                        <span
                          className="font-display text-[2.5rem] leading-none font-light tracking-tight text-[#e4e4e4] select-none sm:text-[2.75rem]"
                          aria-hidden
                        >
                          {num}
                        </span>
                      </div>

                      <div className="relative mt-6 flex flex-1 flex-col sm:mt-7">
                        <h3
                          id={titleId}
                          className="m-0 w-full font-display text-[1.05rem] leading-[1.15] font-bold tracking-[0.02em] text-ink uppercase sm:text-[1.125rem]"
                        >
                          {service.shortName}
                        </h3>
                        <span className="mt-3 block h-[3px] w-8 rounded-full bg-red" aria-hidden />
                        <p className="mt-3.5 mb-0 line-clamp-3 text-[13px] leading-snug text-muted sm:text-sm">
                          {service.summary}
                        </p>
                      </div>

                      <div className="relative mt-5 flex min-h-11 items-center justify-between gap-3 sm:mt-6">
                        <span className="text-cta text-ink transition group-hover:text-red">
                          Learn more
                        </span>
                        <span
                          className="grid h-11 w-11 flex-none place-items-center rounded-full border border-red bg-white text-red transition duration-200 group-hover:bg-red group-hover:text-white"
                          aria-hidden
                        >
                          <ArrowRight size={15} strokeWidth={2.25} />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </ContentBlock>
        ) : null}
      </div>
    </section>
  );
}
