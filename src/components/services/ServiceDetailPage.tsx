"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import GrowthCta from "@/components/GrowthCta";
import PageHero from "@/components/PageHero";
import CapabilitiesWorkCarousel from "@/components/capabilities/CapabilitiesWorkCarousel";
import ServiceValueGrid from "@/components/services/ServiceValueGrid";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import { usePageReveal } from "@/hooks/usePageReveal";
import type { ServicePageContent } from "@/content/servicePages/types";

export default function ServiceDetailPage({ content }: { content: ServicePageContent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { hero, process, why, framework, caseStudies, impact, cta } = content;
  const idPrefix = content.slug;
  const processAnchor = process ? `#${idPrefix}-process` : undefined;

  usePageReveal({
    scope: rootRef,
    dependencies: [content.slug],
    reducedMotionSelectors: ["[data-funnel-icon]", "[data-funnel-copy]", "[data-funnel-line]"],
    onReveal: ({ gsap, animateStoryTimeline }) => {
      animateStoryTimeline(".services-timeline-wrap");

      const funnelWrap = gsap.utils.toArray<HTMLElement>(".media-funnel-wrap")[0];
      if (funnelWrap) {
        const funnelLine = funnelWrap.querySelector<HTMLElement>("[data-funnel-line]");
        const funnelIcons = funnelWrap.querySelectorAll("[data-funnel-icon]");
        const funnelCopies = funnelWrap.querySelectorAll("[data-funnel-copy]");
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

        if (funnelLine) {
          gsap.set(funnelLine, isDesktop ? { scaleX: 0 } : { scaleY: 0 });
        }
        gsap.set(funnelIcons, { scale: 0.55, opacity: 0 });
        gsap.set(funnelCopies, { y: 18, opacity: 0 });

        const funnelTl = gsap.timeline({
          scrollTrigger: {
            trigger: funnelWrap,
            start: "top 78%",
            toggleActions: "play none none none",
          },
          defaults: { ease: "power3.out" },
        });

        if (funnelLine) {
          funnelTl.to(funnelLine, {
            ...(isDesktop ? { scaleX: 1 } : { scaleY: 1 }),
            duration: 0.9,
            ease: "power2.inOut",
          });
        }

        funnelIcons.forEach((icon, i) => {
          const at = funnelLine ? (i === 0 ? "-=0.35" : "-=0.45") : i === 0 ? 0 : "-=0.45";
          funnelTl.to(
            icon,
            { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.6)" },
            at,
          );
          funnelTl.to(funnelCopies[i], { y: 0, opacity: 1, duration: 0.5 }, "-=0.28");
        });
      }
    },
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
              <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
                <p className="text-body section-copy section-copy-on-light m-0">{process.body}</p>
              </div>
            </div>

            <div className="services-timeline-wrap about-timeline-wrap section-media relative">
              <div data-timeline-line className="about-timeline-line" aria-hidden />
              <ol data-story-timeline className="about-timeline services-timeline m-0 list-none p-0">
                {process.steps.map((step) => (
                  <li key={step.id} className="about-timeline-item relative min-w-0">
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
      )}

      {why && why.valueCards.length > 0 && (
        <section
          id={`${idPrefix}-why`}
          data-animate-section
          className="section-shell section-pad bg-paper scroll-mt-[5.5rem]"
          aria-labelledby={`${idPrefix}-why-heading`}
        >
          <div className="section-inner grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-12">
            <div className="min-w-0">
              <p data-animate="fade-up" className="text-eyebrow m-0">
                {why.eyebrow}
              </p>
              <h2
                data-animate="fade-up"
                id={`${idPrefix}-why-heading`}
                className="text-display-md mt-4 mb-0"
              >
                {why.titleBefore} <span className="text-red">{why.titleAccent}</span>
              </h2>
              <p
                data-animate="fade-up"
                className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem] sm:mt-6"
              >
                {why.body}
              </p>
              <div data-animate="fade-up">
                <GrowthCta href={why.button.href} variant="primary" className="mt-7 sm:mt-8">
                  {why.button.label}
                </GrowthCta>
              </div>
            </div>

            <div className="min-w-0">
              <ServiceValueGrid cards={why.valueCards} />
            </div>
          </div>
        </section>
      )}

      {framework && framework.stages.length > 0 && (
        <section
          id={`${idPrefix}-framework`}
          data-animate-section
          className="section-shell section-pad bg-mist scroll-mt-[5.5rem]"
          aria-labelledby={`${idPrefix}-framework-heading`}
        >
          <div className="section-inner">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
              <div
                data-animate="fade-up"
                className="relative overflow-hidden bg-ink px-6 py-10 text-white sm:px-8 sm:py-12 lg:px-10 lg:py-14"
              >
                <div
                  className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 opacity-20"
                  aria-hidden
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, white 0, white 1px, transparent 1px, transparent 8px)",
                  }}
                />
                <p className="text-eyebrow text-eyebrow-on-dark m-0">{framework.eyebrow}</p>
                <h2
                  id={`${idPrefix}-framework-heading`}
                  className="text-display-md mt-4 mb-0 text-balance"
                >
                  {framework.title}
                </h2>
                <p className="text-body mt-5 mb-0 max-w-[20rem] text-muted-on-dark sm:mt-6">
                  {framework.body}
                </p>
              </div>

              <div className="media-funnel-wrap about-timeline-wrap relative min-w-0 self-center">
                <div data-funnel-line className="media-funnel-line" aria-hidden />
                <ol
                  data-story-timeline
                  className="media-funnel-timeline m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
                >
                  {framework.stages.map((stage) => (
                    <li key={stage.id} className="relative min-w-0">
                      <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                        <span
                          data-funnel-icon
                          className="about-timeline-icon grid h-12 w-12 flex-none place-items-center overflow-hidden rounded-full border border-red bg-white sm:h-14 sm:w-14 md:h-16 md:w-16"
                        >
                          <IconSlot
                            asset={stage.icon}
                            size={64}
                            tone="accent"
                            className="h-[70%] w-[70%] sm:h-[72%] sm:w-[72%]"
                          />
                        </span>
                        <div data-funnel-copy className="min-w-0 lg:mt-5">
                          <h3 className="m-0 font-display text-[1.05rem] leading-tight tracking-[0.03em] uppercase sm:text-lg">
                            {stage.title}
                          </h3>
                          <p className="text-body-sm mt-2 mb-0 text-muted">{stage.body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
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

      {impact && impact.stats.length > 0 && (
        <section
          id={`${idPrefix}-impact`}
          data-animate-section
          className="section-shell section-pad bg-ink text-white scroll-mt-[5.5rem]"
          aria-labelledby={`${idPrefix}-impact-heading`}
        >
          <div className="section-inner">
            <p data-animate="fade-up" className="text-eyebrow text-eyebrow-on-dark m-0">
              {impact.eyebrow}
            </p>
            <h2
              data-animate="fade-up"
              id={`${idPrefix}-impact-heading`}
              className="text-display-md mt-4 mb-0"
            >
              {impact.titleBefore} <span className="text-red">{impact.titleAccent}</span>
            </h2>

            <ul
              data-animate-stagger
              className={`section-media m-0 grid list-none grid-cols-2 gap-y-8 gap-x-6 p-0 sm:gap-y-10 ${
                impact.stats.length >= 5
                  ? "lg:grid-cols-5"
                  : impact.stats.length === 3
                    ? "lg:grid-cols-3"
                    : "lg:grid-cols-4"
              } lg:gap-y-0`}
            >
              {impact.stats.map((stat) => {
                const compact = /^[\d,.]+[KMB%+x×]*$/i.test(stat.value.trim());
                return (
                  <li key={`${stat.label}-${stat.value}`} className="stat-item min-w-0">
                    <p className={`m-0 text-red ${compact ? "text-stat" : "text-stat-phrase"}`}>
                      {stat.value}
                    </p>
                    <p className="mt-2 mb-0 text-xs font-bold tracking-[0.14em] text-white uppercase sm:mt-2.5 sm:text-sm">
                      {stat.label}
                    </p>
                  </li>
                );
              })}
            </ul>
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
          className={impact && impact.stats.length > 0 ? "border-t border-white/10" : undefined}
        />
      )}
    </div>
  );
}
