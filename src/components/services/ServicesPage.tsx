"use client";

import Image from "next/image";
import { useRef } from "react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import ServicesLandingGrid from "@/components/services/ServicesLandingGrid";
import { usePageReveal } from "@/hooks/usePageReveal";
import {
  servicesCta,
  servicesGrid,
  servicesHero,
  servicesProcess,
  servicesProcessSteps,
  servicesTrusted,
} from "@/content/servicesPage";

export default function ServicesPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  usePageReveal({
    scope: rootRef,
    onReveal: ({ animateStoryTimeline }) => {
      animateStoryTimeline(".services-timeline-wrap");
    },
  });

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

      {/* ── Process (paper) ───────────────────────────── */}
      <section
        id="our-process"
        data-animate-section
        className="section-shell section-pad bg-paper scroll-mt-[5.5rem]"
        aria-labelledby="process-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {servicesProcess.eyebrow}
          </p>
          <h2 data-animate="fade-up" id="process-heading" className="text-display-md mt-4 mb-0">
            {servicesProcess.title}
          </h2>

          <div className="services-timeline-wrap about-timeline-wrap section-media relative">
            <div data-timeline-line className="about-timeline-line" aria-hidden />
            <ol data-story-timeline className="about-timeline services-timeline m-0 list-none p-0">
              {servicesProcessSteps.map((step) => (
                <li key={step.number} className="about-timeline-item relative min-w-0">
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                    <span
                      data-timeline-icon
                      className="about-timeline-icon grid h-12 w-12 flex-none place-items-center overflow-hidden rounded-full border border-red bg-paper sm:h-14 sm:w-14 md:h-16 md:w-16"
                    >
                      <IconSlot asset={step.icon} size={64} className="h-full w-full" />
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

      {/* ── Trusted brands (mist) ─────────────────────── */}
      <section
        data-animate-section
        className="section-shell section-pad-sm bg-mist"
        aria-labelledby="trusted-heading"
      >
        <div className="section-inner">
          <h2
            data-animate="fade-up"
            id="trusted-heading"
            className="text-eyebrow m-0 text-center !text-muted"
          >
            {servicesTrusted.title}
          </h2>

          <ul
            data-animate-stagger
            className="section-media m-0 mx-auto flex list-none flex-wrap items-center justify-center gap-x-8 gap-y-6 p-0 sm:gap-x-12 md:gap-x-14 lg:gap-x-16"
          >
            {servicesTrusted.logos.map((logo) => (
              <li key={logo.name} className="flex h-10 items-center sm:h-11">
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={logo.w}
                  height={logo.h}
                  className="h-8 w-auto max-w-[7.5rem] object-contain opacity-90 grayscale sm:h-9 sm:max-w-[8.5rem] md:h-10"
                />
              </li>
            ))}
          </ul>
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
