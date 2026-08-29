"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import CapabilitiesGrid from "@/components/capabilities/CapabilitiesGrid";
import CapabilitiesHexNetwork from "@/components/capabilities/CapabilitiesHexNetwork";
import CapabilitiesWorkCarousel from "@/components/capabilities/CapabilitiesWorkCarousel";
import AdvantageToolsGrid from "@/components/home/AdvantageToolsGrid";
import { LogoMarkGrid } from "@/components/home/PartnerLogos";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import { usePageReveal } from "@/hooks/usePageReveal";
import {
  advantageToolsSection,
  capabilitiesCta,
  capabilitiesGridSection,
  capabilitiesHero,
  capabilityCards,
  capabilityCaseStudies,
  ecosystemSection,
  growthSystemSection,
  growthSystemSteps,
  intelligenceSection,
  platformPartnerLogos,
  techCaseStudiesSection,
} from "@/content/capabilities";
import { dataTools } from "@/content/site";

export default function CapabilitiesPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  usePageReveal({
    scope: rootRef,
    onReveal: ({ animateStoryTimeline }) => {
      animateStoryTimeline(".capabilities-timeline-wrap");
    },
  });

  return (
    <div ref={rootRef}>
      <PageHero
        headingId="capabilities-hero-heading"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Capabilities" }]}
        breadcrumbCurrentClassName="font-semibold text-red"
        eyebrow={capabilitiesHero.eyebrow}
        title={
          <>
            {capabilitiesHero.headlineBefore}{" "}
            <span className="text-red">{capabilitiesHero.headlineAccent}</span>
          </>
        }
        body={capabilitiesHero.body}
        media={
          capabilitiesHero.visual.src ? (
            <ImageSlot
              asset={capabilitiesHero.visual}
              priority
              className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center bg-mist sm:aspect-[16/10] lg:aspect-auto lg:min-h-[420px] lg:h-full">
              <CapabilitiesHexNetwork asset={capabilitiesHero.visual} />
            </div>
          )
        }
        burstSrc={capabilitiesHero.burst}
        seam={{
          href: "#our-capabilities",
          ariaLabel: "Continue to our capabilities",
          arrowSrc: capabilitiesHero.arrow,
          arrowSize: 80,
          className:
            "absolute top-1/2 left-1/2 z-20 grid size-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red max-lg:hidden xl:size-20",
        }}
      />

      {/* ── Capabilities grid (mist) ──────────────────── */}
      <section
        id="our-capabilities"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-mist"
        aria-labelledby="capabilities-grid-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {capabilitiesGridSection.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="capabilities-grid-heading" className="text-display-md m-0">
              {capabilitiesGridSection.titleBefore}{" "}
              <br className="hidden sm:block" />
              {capabilitiesGridSection.titleAfter}
            </h2>
            <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
              <p className="text-body section-copy section-copy-on-light m-0">
                {capabilitiesGridSection.body}
              </p>
            </div>
          </div>

          <div className="section-media">
            <CapabilitiesGrid cards={capabilityCards} />
          </div>
        </div>
      </section>

      {/* ── Growth system process (paper) ─────────────── */}
      <section
        id="growth-system"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-paper"
        aria-labelledby="growth-system-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {growthSystemSection.eyebrow}
          </p>
          <h2 data-animate="fade-up" id="growth-system-heading" className="text-display-md mt-4 mb-0">
            {growthSystemSection.title}
          </h2>

          <div className="capabilities-timeline-wrap about-timeline-wrap section-media relative">
            <div data-timeline-line className="about-timeline-line" aria-hidden />
            <ol
              data-story-timeline
              className="about-timeline capabilities-timeline m-0 list-none p-0"
            >
              {growthSystemSteps.map((step) => (
                <li key={step.id} className="about-timeline-item relative min-w-0">
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                    <span
                      data-timeline-icon
                      className="about-timeline-icon grid h-14 w-14 flex-none place-items-center overflow-hidden rounded-full border border-red bg-paper md:h-16 md:w-16"
                    >
                      <IconSlot asset={step.icon} size={56} />
                    </span>
                    <div data-timeline-copy className="min-w-0 lg:mt-6">
                      <h3 className="m-0 font-display text-[1.05rem] leading-tight tracking-[0.03em] uppercase sm:text-lg">
                        <span className="text-red">{step.number}.</span> {step.title}
                      </h3>
                      <p className="text-body-sm mt-2 mb-0 max-w-[20rem] text-muted lg:max-w-[16rem]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Intelligent solutions (mist) ────────────────── */}
      <section
        id="intelligence"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-mist"
        aria-labelledby="intelligence-heading"
      >
        <div className="section-inner grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-12">
          <div className="min-w-0">
            <p data-animate="fade-up" className="text-eyebrow m-0">
              {intelligenceSection.eyebrow}
            </p>
            <h2 data-animate="fade-up" id="intelligence-heading" className="text-display-md mt-4 mb-0">
              {intelligenceSection.titleBefore}{" "}
              <span className="text-red">{intelligenceSection.titleAccent}</span>
            </h2>
            <p
              data-animate="fade-up"
              className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem] sm:mt-6"
            >
              {intelligenceSection.body}
            </p>
            <ul
              data-animate-stagger
              className="intelligence-stats m-0 mt-8 list-none p-0 sm:mt-10"
            >
              {intelligenceSection.stats.map((stat) => (
                <li key={stat.label} className="intelligence-stat min-w-0">
                  <p className="intelligence-stat-value m-0 text-red">{stat.value}</p>
                  <p className="intelligence-stat-label m-0 text-ink">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>

          <div data-animate="fade-up" className="min-w-0">
            <ImageSlot
              asset={intelligenceSection.image}
              className="aspect-[4/3] w-full lg:aspect-[5/4] lg:min-h-[400px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── Advantage tools (paper) — deck slide 97 ───── */}
      <section
        id="advantage"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-paper"
        aria-labelledby="advantage-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {advantageToolsSection.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="advantage-heading" className="text-display-md m-0">
              {advantageToolsSection.titleBefore}{" "}
              <span className="text-red">{advantageToolsSection.titleAccent}</span>
            </h2>
            <p
              data-animate="fade-up"
              className="text-body section-copy section-copy-on-light m-0 pt-0 md:pt-1"
            >
              {advantageToolsSection.body}
            </p>
          </div>

          <div data-animate="fade-up" className="section-media">
            <AdvantageToolsGrid tools={dataTools} />
          </div>
        </div>
      </section>

      {/* ── Platform partners (paper) — deck slide 98 ── */}
      <section
        id="ecosystem"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-paper"
        aria-labelledby="ecosystem-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {ecosystemSection.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="ecosystem-heading" className="text-display-md m-0">
              {ecosystemSection.titleBefore}{" "}
              <span className="text-red">{ecosystemSection.titleAccent}</span>
            </h2>
            <p
              data-animate="fade-up"
              className="text-body section-copy section-copy-on-light m-0 pt-0 md:pt-1"
            >
              {ecosystemSection.body}
            </p>
          </div>

          <div data-animate="fade-up" className="section-media" aria-label="Platform partner logos">
            <LogoMarkGrid logos={platformPartnerLogos} />
          </div>
        </div>
      </section>

      {/* ── Case studies (mist) ───────────────────────── */}
      <section
        id="tech-case-studies"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-mist"
        aria-labelledby="tech-case-studies-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {techCaseStudiesSection.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="tech-case-studies-heading" className="text-display-md m-0">
              {techCaseStudiesSection.titleBefore}{" "}
              <span className="text-red">{techCaseStudiesSection.titleAccent}</span>
            </h2>
            <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
              <p className="text-body section-copy section-copy-on-light m-0">
                {techCaseStudiesSection.body}
              </p>
              <Link href={techCaseStudiesSection.exploreHref} className="text-cta link-cta mt-0 text-ink">
                {techCaseStudiesSection.exploreLabel}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>

          <div data-animate="fade-up" className="section-media">
            <CapabilitiesWorkCarousel cases={capabilityCaseStudies} />
          </div>
        </div>
      </section>

      {/* ── Pre-footer CTA (ink) ──────────────────────── */}
      <CTASection
        animate
        headingId="capabilities-cta-heading"
        titleBefore={capabilitiesCta.titleBefore}
        titleAccent={capabilitiesCta.titleAccent}
        body={capabilitiesCta.body}
        primaryLabel={capabilitiesCta.button.label}
        primaryHref={capabilitiesCta.button.href}
      />
    </div>
  );
}
