"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import CapabilitiesWorkCarousel from "@/components/capabilities/CapabilitiesWorkCarousel";
import ServiceValueGrid from "@/components/services/ServiceValueGrid";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import { usePageReveal } from "@/hooks/usePageReveal";
import type { ServicePageContent } from "@/content/servicePages/types";

export default function ServiceDetailPage({ content }: { content: ServicePageContent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { hero, process, caseStudies, cta } = content;
  const idPrefix = content.slug;
  const processAnchor = process ? `#${idPrefix}-process` : undefined;

  usePageReveal({
    scope: rootRef,
    dependencies: [content.slug],
  });

  return (
    <div ref={rootRef}>
      <PageHero
        headingId={`${idPrefix}-hero-heading`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: content.name },
        ]}
        breadcrumbCurrentClassName="font-semibold text-red"
        eyebrow={hero.eyebrow}
        title={
          <>
            {hero.headlineBefore}{" "}
            <span className="text-red">{hero.headlineAccent}</span>
          </>
        }
        body={hero.body}
        copyAfterBody={
          hero.highlights.length > 0 ? (
            <ul
              data-animate="hero-copy"
              className="mt-8 flex list-none flex-wrap gap-x-6 gap-y-4 p-0 sm:mt-10 sm:gap-x-8"
            >
              {hero.highlights.map((item) => (
                <li key={item.id} className="flex min-w-[8.5rem] items-center gap-2.5">
                  <IconSlot
                    asset={item.icon}
                    size={32}
                    tone="accent"
                    className="h-7 w-7 sm:h-8 sm:w-8"
                  />
                  <span className="text-body-sm font-semibold tracking-[0.04em] text-ink uppercase">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          ) : null
        }
        media={
          <ImageSlot
            asset={hero.visual}
            priority
            className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        }
        burstSrc={hero.burst}
        seam={
          processAnchor
            ? {
                href: processAnchor,
                ariaLabel: `Continue to ${content.name} capabilities`,
                arrowSrc: hero.arrow,
              }
            : undefined
        }
      />

      {process && process.steps.length > 0 && (
        <section
          id={`${idPrefix}-process`}
          data-animate-section
          className="section-shell section-pad bg-mist scroll-mt-[5.5rem]"
          aria-labelledby={`${idPrefix}-process-heading`}
        >
          <div className="section-inner">
            <p data-animate="fade-up" className="text-eyebrow m-0">
              {process.eyebrow}
            </p>
            <div className="section-intro">
              <h2
                data-animate="fade-up"
                id={`${idPrefix}-process-heading`}
                className="text-display-md m-0"
              >
                {process.title}
              </h2>
            </div>

            <div data-animate="fade-up" className="section-media">
              <ServiceValueGrid
                cards={process.steps}
                gridClassName="grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              />
            </div>
          </div>
        </section>
      )}

      {caseStudies && caseStudies.items.length > 0 && (
        <section
          id={`${idPrefix}-case-studies`}
          data-animate-section
          className="section-shell section-pad bg-paper scroll-mt-[5.5rem]"
          aria-labelledby={`${idPrefix}-case-studies-heading`}
        >
          <div className="section-inner">
            <p data-animate="fade-up" className="text-eyebrow m-0">
              {caseStudies.eyebrow}
            </p>
            <div className="section-intro">
              <h2
                data-animate="fade-up"
                id={`${idPrefix}-case-studies-heading`}
                className="text-display-md m-0"
              >
                {caseStudies.titleBefore}{" "}
                <span className="text-red">{caseStudies.titleAccent}</span>
              </h2>
              <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
                <p className="text-body section-copy section-copy-on-light m-0">{caseStudies.body}</p>
                <Link href={caseStudies.exploreHref} className="text-cta link-cta mt-4 text-ink">
                  {caseStudies.exploreLabel}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </div>

            <div data-animate="fade-up" className="section-media">
              <CapabilitiesWorkCarousel cases={caseStudies.items} />
            </div>
          </div>
        </section>
      )}

      {cta && (
        <CTASection
          animate
          headingId={`${idPrefix}-cta-heading`}
          titleBefore={cta.titleBefore}
          titleAccent={cta.titleAccent}
          body={cta.body}
          primaryLabel={cta.button.label}
          primaryHref={cta.button.href}
        />
      )}
    </div>
  );
}
