"use client";

import { useRef } from "react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import ServicesLandingGrid from "@/components/services/ServicesLandingGrid";
import { usePageReveal } from "@/hooks/usePageReveal";
import {
  servicesCta,
  servicesGrid,
  servicesHero,
} from "@/content/servicesPage";

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
