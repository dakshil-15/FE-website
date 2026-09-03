"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRightCircle } from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import AwardsGalleryGrid from "@/components/awards/AwardsGalleryGrid";
import FeaturedAwardHighlight from "@/components/about/FeaturedAwardHighlight";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import { usePageReveal } from "@/hooks/usePageReveal";
import {
  awardsCta,
  awardsGallerySection,
  awardsHero,
  awardsStatsBar,
} from "@/content/awards";

function statSlug(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

export default function AwardsPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  usePageReveal({
    scope: rootRef,
    onReveal: ({ gsap, ScrollTrigger }) => {
      const statsSection = gsap.utils.toArray<HTMLElement>("[data-stats-section]")[0];
      const counters = gsap.utils.toArray<HTMLElement>("[data-counter]");

      const formatCounter = (el: HTMLElement, val: number) => {
        const decimals = Number(el.dataset.decimals ?? 0);
        const prefix = el.dataset.prefix ?? "";
        const suffix = el.dataset.suffix ?? "";
        const display = decimals > 0 ? val.toFixed(decimals) : String(Math.round(val));
        el.textContent = `${prefix}${display}${suffix}`;
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
        headingId="awards-hero-heading"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Awards & Recognition" },
        ]}
        breadcrumbTone="accent"
        breadcrumbCurrentClassName="text-ink"
        eyebrow={awardsHero.eyebrow}
        title={
          <>
            {awardsHero.headlineBefore}{" "}
            <span className="text-red">{awardsHero.headlineAccent}</span>
            <span
              className="ml-[0.12em] inline-block h-[0.22em] w-[0.22em] translate-y-[-0.08em] bg-red align-middle"
              aria-hidden
            />
          </>
        }
        body={awardsHero.body}
        copyAfterBody={
          <Link
            href="#awards-stats"
            data-animate="hero-copy"
            className="text-cta link-cta mt-6 inline-flex min-h-11 items-center gap-2 text-ink lg:hidden"
          >
            View awards stats
            <ArrowRightCircle size={18} strokeWidth={1.5} aria-hidden />
          </Link>
        }
        gridClassName="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-12"
        copyColumnClassName="relative z-[1] min-w-0 lg:pr-12 xl:pr-20"
        media={
          <ImageSlot
            asset={awardsHero.image}
            priority
            className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[380px] xl:min-h-[420px]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        }
        burstSrc={awardsHero.burst}
        seam={{
          href: "#awards-stats",
          ariaLabel: "Continue to awards stats",
          arrowSrc: awardsHero.arrow,
        }}
      />

      <section
        id="awards-stats"
        data-animate-section
        data-stats-section
        className="section-shell section-pad-sm scroll-mt-24 bg-mist"
        aria-labelledby="awards-stats-heading"
      >
        <div className="section-inner">
          <h2 id="awards-stats-heading" className="sr-only">
            Awards at a glance
          </h2>
          <div
            data-animate-stagger
            className="grid grid-cols-1 gap-8 rounded-2xl border border-line bg-white px-5 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:px-8 sm:py-10 xs:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            role="list"
          >
            {awardsStatsBar.map((stat) => {
              const slug = statSlug(stat.label);
              return (
                <div
                  key={stat.label}
                  role="listitem"
                  className="min-w-0"
                  aria-label={`${stat.prefix ?? ""}${stat.decimals ? stat.value.toFixed(stat.decimals) : stat.value}${stat.suffix}${stat.showPlus ? "+" : ""} ${stat.label}. ${stat.description}`}
                >
                  <span aria-hidden>
                    <IconSlot
                      asset={stat.icon}
                      size={40}
                      className="h-9 w-9 text-red sm:h-10 sm:w-10"
                    />
                  </span>
                  <p className="text-stat mt-4 mb-0 text-ink sm:mt-5">
                    <span
                      id={`awards-stat-value-${slug}`}
                      data-counter
                      data-target={stat.value}
                      data-prefix={stat.prefix ?? ""}
                      data-suffix={stat.suffix}
                      data-decimals={stat.decimals ?? 0}
                      aria-hidden="true"
                    >
                      {stat.prefix ?? ""}
                      {stat.decimals ? stat.value.toFixed(stat.decimals) : stat.value}
                      {stat.suffix}
                    </span>
                    {stat.showPlus && (
                      <span className="text-red" aria-hidden>
                        +
                      </span>
                    )}
                  </p>
                  <p
                    id={`awards-stat-${slug}`}
                    className="mt-2 mb-0 text-xs font-bold tracking-[0.14em] text-ink uppercase sm:mt-2.5 sm:text-sm"
                  >
                    {stat.label}
                    {stat.footnoteMarker ? "*" : ""}
                  </p>
                  <p className="text-body-sm mt-2 mb-0 max-w-none text-muted sm:mt-2.5 xl:max-w-[14rem]">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="awards-featured"
        data-animate-section
        className="section-shell section-pad scroll-mt-24 bg-paper"
        aria-labelledby="awards-featured-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            Featured achievement
          </p>
          <h2 data-animate="fade-up" id="awards-featured-heading" className="sr-only">
            Guinness World Record with Godrej Properties
          </h2>
          <div data-animate="fade-up" className="section-media mt-6 sm:mt-8">
            <FeaturedAwardHighlight />
          </div>
        </div>
      </section>

      <section
        id="awards-gallery"
        data-animate-section
        className="section-shell section-pad scroll-mt-24 bg-mist"
        aria-labelledby="awards-gallery-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {awardsGallerySection.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="awards-gallery-heading" className="text-display-md m-0">
              {awardsGallerySection.title}
            </h2>
            <p
              data-animate="fade-up"
              className="text-body section-copy section-copy-on-light m-0 pt-0 md:pt-1"
            >
              {awardsGallerySection.body}
            </p>
          </div>

          <div className="section-media">
            <AwardsGalleryGrid headingId="awards-gallery-heading" />
          </div>
        </div>
      </section>

      <CTASection
        animate
        headingId="awards-cta-heading"
        titleBefore={awardsCta.titleBefore}
        titleAccent={awardsCta.titleAccent}
        body={awardsCta.body}
        primaryLabel={awardsCta.button.label}
        primaryHref={awardsCta.button.href}
        burstSrc={awardsCta.burst}
      />
    </div>
  );
}
