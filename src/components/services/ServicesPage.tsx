"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import CapabilitiesWorkCarousel from "@/components/capabilities/CapabilitiesWorkCarousel";
import AdvantageToolsGrid from "@/components/home/AdvantageToolsGrid";
import { LogoMarkGrid } from "@/components/home/PartnerLogos";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import ServicesLandingGrid from "@/components/services/ServicesLandingGrid";
import { usePageReveal } from "@/hooks/usePageReveal";
import {
  advantageToolsSection,
  capabilityCaseStudies,
  ecosystemSection,
  intelligenceSection,
  platformPartnerLogos,
  techCaseStudiesSection,
} from "@/content/capabilities";
import {
  servicesCta,
  servicesGrid,
  servicesHero,
} from "@/content/servicesPage";
import { dataTools } from "@/content/site";

export default function ServicesPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  usePageReveal({ scope: rootRef });

  return (
    <div ref={rootRef}>
      <PageHero
        headingId="services-hero-heading"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        breadcrumbCurrentClassName="font-semibold text-ink"
        titleClassName="text-display-xl mt-0 mb-0 text-balance"
        title={
          <>
            {servicesHero.headlineBefore}{" "}
            <span className="text-red">{servicesHero.headlineAccent}</span>{" "}
            {servicesHero.headlineAfter}
          </>
        }
        body={servicesHero.body}
        media={
          <ImageSlot
            asset={servicesHero.image}
            priority
            className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        }
        burstSrc={servicesHero.burst}
        seam={{
          href: "#our-services",
          ariaLabel: "Continue to our services",
          arrowSrc: servicesHero.arrow,
        }}
      />

      {/* ── Our Services (mist) ────────────────────────── */}
      <section
        id="our-services"
        data-animate-section
        className="section-shell section-pad bg-mist scroll-mt-[5.5rem]"
        aria-labelledby="services-grid-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {servicesGrid.eyebrow}
          </p>
          <div className="section-intro">
            <h2
              data-animate="fade-up"
              id="services-grid-heading"
              className="text-display-md m-0"
            >
              {servicesGrid.titleBefore}{" "}
              <br className="hidden sm:block" />
              {servicesGrid.titleAfter}
            </h2>
            <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
              <p className="text-body section-copy section-copy-on-light m-0">
                {servicesGrid.body}
              </p>
            </div>
          </div>

          <div className="section-media">
            <ServicesLandingGrid />
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

      {/* ── Advantage tools (paper) ──────────────────────── */}
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
          </div>

          <div data-animate="fade-up" className="section-media">
            <AdvantageToolsGrid tools={dataTools} />
          </div>
        </div>
      </section>

      {/* ── Platform partners (paper) ────────────────────── */}
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
          </div>

          <div data-animate="fade-up" className="section-media" aria-label="Platform partner logos">
            <LogoMarkGrid logos={platformPartnerLogos} />
          </div>
        </div>
      </section>

      {/* ── Case studies (mist) ──────────────────────────── */}
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

      {/* ── Pre-footer CTA (ink) ───────────────────────── */}
      <CTASection
        animate
        headingId="services-cta-heading"
        titleBefore={servicesCta.titleBefore}
        titleAccent={servicesCta.titleAccent}
        body={servicesCta.body}
        primaryLabel={servicesCta.button.label}
        primaryHref={servicesCta.button.href}
      />
    </div>
  );
}
