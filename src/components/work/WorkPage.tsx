"use client";

import { useRef } from "react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import WorkCaseBrowser from "@/components/work/WorkCaseBrowser";
import { usePageReveal } from "@/hooks/usePageReveal";
import { caseStudies } from "@/content/caseStudies";
import { workCta, workHero, workStats } from "@/content/workPage";

export default function WorkPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  usePageReveal({
    scope: rootRef,
    onReveal: ({ gsap, ScrollTrigger }) => {
      const statsSection = gsap.utils.toArray<HTMLElement>("[data-stats-section]")[0];
      const counters = gsap.utils.toArray<HTMLElement>("[data-counter]");

      const formatCounter = (el: HTMLElement, val: number) => {
        const decimals = Number(el.dataset.decimals ?? 0);
        el.textContent = decimals > 0 ? val.toFixed(decimals) : `${Math.round(val)}`;
      };

      const runCounters = () => {
        counters.forEach((el, index) => {
          const target = Number(el.dataset.target ?? 0);
          const state = ((el as HTMLElement & { __count?: { val: number } }).__count ??= {
            val: 0,
          });
          gsap.killTweensOf(state);
          state.val = 0;
          formatCounter(el, 0);
          gsap.to(state, {
            val: target,
            duration: 1.8,
            delay: index * 0.08,
            ease: "power2.out",
            onUpdate: () => formatCounter(el, state.val),
          });
        });
      };

      if (statsSection && counters.length) {
        ScrollTrigger.create({
          trigger: statsSection,
          start: "top 78%",
          onEnter: runCounters,
          onEnterBack: runCounters,
        });
      }
    },
  });

  return (
    <div ref={rootRef}>
      <PageHero
        headingId="work-hero-heading"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        breadcrumbCurrentClassName="font-semibold text-red"
        titleClassName="text-display-xl mt-0 mb-0 text-balance"
        title={
          <>
            {workHero.headlineBefore}
            <br />
            <span className="text-red">{workHero.headlineAccent}</span>
          </>
        }
        body={workHero.body}
        media={
          <ImageSlot
            asset={workHero.image}
            priority
            className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        }
        burstSrc={workHero.burst}
        seam={{
          href: "#case-studies",
          ariaLabel: "Continue to case studies",
          arrowSrc: workHero.arrow,
        }}
      />

      {/* ── Case studies (paper) ──────────────────────── */}
      <section
        id="case-studies"
        data-animate-section
        className="section-shell section-pad bg-mist scroll-mt-[5.5rem]"
        aria-labelledby="work-cases-heading"
      >
        <h2 id="work-cases-heading" className="sr-only">
          Case studies
        </h2>
        <div className="section-inner">
          <WorkCaseBrowser caseStudies={caseStudies} />
        </div>
      </section>

      {/* ── Results (ink) ─────────────────────────────── */}
      <section
        data-animate-section
        data-stats-section
        className="section-shell section-pad bg-ink text-white"
        aria-labelledby="work-stats-heading"
      >
        <div className="section-inner">
          <h2 id="work-stats-heading" className="sr-only">
            Results from our work
          </h2>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
            <span data-animate="fade-up" className="flex-none self-start lg:self-center">
              <IconSlot
                asset={workStats.icon}
                tone="dark"
                size={88}
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-[5.5rem] md:w-[5.5rem]"
              />
            </span>
            <ul
              data-animate-stagger
              className="m-0 grid min-w-0 flex-1 list-none grid-cols-1 gap-y-8 p-0 xs:grid-cols-2 xs:gap-y-10 lg:grid-cols-4 lg:gap-y-0"
            >
              {workStats.items.map((stat) => (
                <li key={stat.label} className="stat-item">
                  <p className="text-stat m-0 text-white">
                    <span
                      data-counter
                      data-target={stat.value}
                      data-decimals={stat.decimals}
                    >
                      {stat.decimals > 0 ? stat.value.toFixed(stat.decimals) : stat.value}
                    </span>
                    {stat.unit}
                    {stat.plus ? <span className="text-red">+</span> : null}
                  </p>
                  <p className="mt-2.5 mb-0 text-[13px] font-bold tracking-[0.14em] text-white uppercase sm:mt-3">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <p
            data-animate="fade-up"
            className="text-body-sm mt-10 mb-0 text-center text-muted-on-dark sm:mt-12"
          >
            {workStats.tagline}
          </p>
        </div>
      </section>

      {/* ── Pre-footer CTA ────────────────────────────── */}
      <CTASection
        animate
        titleBreak
        headingId="work-cta-heading"
        titleBefore={workCta.titleBefore}
        titleAccent={workCta.titleAccent}
        body={workCta.body}
        primaryLabel={workCta.button.label}
        primaryHref={workCta.button.href}
      />
    </div>
  );
}
