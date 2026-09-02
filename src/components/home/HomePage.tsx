"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceIconGrid from "@/components/home/ServiceIconGrid";
import FeaturedWorkCarousel from "@/components/home/FeaturedWorkCarousel";
import PartnerLogos from "@/components/home/PartnerLogos";
import InsightsSection from "@/components/home/InsightsSection";
import LocationsSection from "@/components/home/LocationsSection";
import CareersTeaser from "@/components/home/CareersTeaser";
import GrowthNetworkVisual from "@/components/home/GrowthNetworkVisual";
import CTASection from "@/components/CTASection";
import {
  AiAnalyticsIcon,
  AwardsIcon,
  CitiesIcon,
  GlobeIcon,
} from "@/components/brandIcons";
import { networkStats } from "@/content/stats";
import { homeCta } from "@/content/home";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const heroStatIcons = {
  "Marketing Agencies": GlobeIcon,
  Markets: CitiesIcon,
  "Media Awards": AwardsIcon,
  Billings: AiAnalyticsIcon,
} as const;

const heroStats = networkStats.map((stat) => ({
  ...stat,
  Icon: heroStatIcons[stat.label as keyof typeof heroStatIcons],
}));

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          canAnimate: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {};

          if (reduceMotion) {
            gsap.set("[data-animate], [data-animate-stagger] > *", {
              clearProps: "all",
              autoAlpha: 1,
              y: 0,
              scale: 1,
            });
            return;
          }

          const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
          heroTl
            .from("[data-animate='hero-copy']", {
              y: 28,
              autoAlpha: 0,
              duration: 0.9,
              stagger: 0.12,
              immediateRender: false,
            })
            .from(
              "[data-animate='hero-visual']",
              {
                autoAlpha: 0,
                duration: 0.4,
                immediateRender: false,
              },
              "-=0.7",
            )
            .from(
              "[data-animate='scroll-hint']",
              {
                y: -8,
                autoAlpha: 0,
                duration: 0.5,
                immediateRender: false,
              },
              "-=0.35",
            );

          const statsSection = gsap.utils.toArray<HTMLElement>("[data-stats-section]")[0];
          const counters = gsap.utils.toArray<HTMLElement>("[data-counter]");

          const formatCounter = (el: HTMLElement, val: number) => {
            const decimals = Number(el.dataset.decimals ?? 0);
            const prefix = el.dataset.prefix ?? "";
            const suffix = el.dataset.suffix ?? "";
            const display =
              decimals > 0 ? val.toFixed(decimals) : String(Math.round(val));
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

          gsap.utils.toArray<HTMLElement>("[data-animate-section]").forEach((section) => {
            const intro = section.querySelectorAll("[data-animate='fade-up']");
            const staggerRoot = section.querySelector("[data-animate-stagger]");
            const staggerItems = staggerRoot
              ? staggerRoot.querySelectorAll(":scope > *")
              : section.querySelectorAll("[data-animate='stagger-item']");

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                toggleActions: "play none none none",
              },
              defaults: { ease: "power3.out" },
            });

            if (intro.length) {
              tl.from(intro, {
                y: 32,
                autoAlpha: 0,
                duration: 0.75,
                stagger: 0.1,
              });
            }

            if (staggerItems.length) {
              tl.from(
                staggerItems,
                {
                  y: 24,
                  autoAlpha: 0,
                  duration: 0.55,
                  stagger: 0.06,
                },
                intro.length ? "-=0.35" : 0,
              );
            }
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      <section
        className="relative section-shell bg-paper pt-10 pb-5 sm:pt-14 sm:pb-7 lg:pt-16 lg:pb-10"
        aria-labelledby="hero-heading"
      >
        <div className="hero-grid">
          <div className="min-w-0 w-full max-w-[640px]">
            <h1
              id="hero-heading"
              data-animate="hero-copy"
              className="text-display-xl m-0 text-balance"
            >
              We don&rsquo;t offer{" "}
              <span className="sm:inline">services in silos.</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              We{" "}
              <span className="text-red">
                engineer
                <br className="hidden xs:block" />
                <span className="xs:hidden"> </span>
                growth systems.
              </span>
            </h1>
            <p
              data-animate="hero-copy"
              className="text-body section-copy section-copy-on-light mt-5 mb-0 sm:mt-6"
            >
              Strategy. Media. Creative. Technology.
              <br className="hidden xs:block" />
              <span className="xs:hidden"> </span>
              Built around one growth objective.
            </p>
            <div
              data-animate="hero-copy"
              className="mt-7 flex flex-col items-stretch gap-3 xs:mt-8 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:gap-5"
            >
              <Link
                href="/work"
                className="text-cta inline-flex min-h-12 items-center justify-center gap-4 bg-ink px-5 py-3.5 pl-6 text-white transition hover:bg-red sm:justify-start sm:py-4 sm:pl-7"
              >
                Explore our work
                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/70" aria-hidden>
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link
                href="/services"
                className="text-cta inline-flex min-h-12 items-center justify-center gap-3.5 border border-ink px-5 py-3.5 transition hover:border-red hover:text-red sm:justify-start sm:py-4"
              >
                Explore our services
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>

          <div data-animate="hero-visual" className="grid min-w-0 w-full place-items-center overflow-visible lg:place-items-stretch">
            <GrowthNetworkVisual />
          </div>
        </div>
      </section>

      <div
        data-animate="scroll-hint"
        className="flex justify-center bg-paper pb-5 sm:pb-7 lg:pb-8"
        aria-hidden="true"
      >
        <Image
          src="/assets/ui-scroll.png"
          alt=""
          width={40}
          height={52}
          className="animate-scroll-hint block h-8 w-auto sm:h-10 lg:h-11"
        />
      </div>

      <section
        data-animate-section
        data-stats-section
        className="section-shell section-pad-sm bg-ink text-white"
        aria-label="Network scale"
      >
        <div
          data-animate-stagger
          className="section-inner grid grid-cols-1 gap-y-7 xs:grid-cols-2 xs:gap-y-8 lg:grid-cols-4 lg:gap-y-0"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div
                className="mb-3.5 flex h-10 w-10 items-center justify-center border border-white/30 text-white sm:mb-4 sm:h-12 sm:w-12 md:h-14 md:w-14"
                aria-hidden
              >
                <stat.Icon className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              </div>
              <p className="text-stat m-0">
                <span
                  data-counter
                  data-target={stat.value}
                  data-prefix={stat.prefix ?? ""}
                  data-suffix={stat.suffix}
                  data-decimals={stat.decimals ?? 0}
                  aria-label={`${stat.prefix ?? ""}${stat.decimals ? stat.value.toFixed(stat.decimals) : stat.value}${stat.suffix}${stat.showPlus ? "+" : ""} ${stat.label}`}
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
              <p className="mt-2 text-xs font-bold tracking-[0.14em] uppercase sm:mt-2.5 sm:text-sm">
                {stat.label}
                {stat.footnoteMarker ? "*" : ""}
              </p>
              <p className="text-body-sm mt-2.5 mb-0 max-w-[220px] text-muted-on-dark sm:mt-3">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="services"
        data-animate-section
        className="section-shell section-pad bg-paper"
        aria-labelledby="services-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            What we do
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="services-heading" className="text-display-md m-0">
              Capabilities that
              <br />
              drive growth
            </h2>
            <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
              <p className="text-body section-copy section-copy-on-light m-0">
                An integrated suite of solutions across the entire marketing and technology ecosystem — one growth
                system, not disconnected departments.
              </p>
              <Link href="/services" className="text-cta link-cta text-ink">
                Explore all services
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
          <div className="section-media">
            <ServiceIconGrid />
          </div>
        </div>
      </section>

      <section
        id="work"
        data-animate-section
        className="section-shell section-pad bg-ink text-white"
        aria-labelledby="work-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            Our work
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="work-heading" className="text-display-md m-0">
              Ideas engineered.
              <br />
              <span className="text-red">Results delivered.</span>
            </h2>
            <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
              <p className="text-body section-copy section-copy-on-dark m-0">
                Real challenges. Integrated thinking.
                <br />
                Measurable impact.
              </p>
              <Link href="/work" className="text-cta link-cta text-white">
                View all case studies
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
          <div data-animate="fade-up" className="section-media">
            <FeaturedWorkCarousel />
          </div>
        </div>
      </section>

      <PartnerLogos />
      <InsightsSection />
      <LocationsSection />
      <CareersTeaser />

      <CTASection
        animate
        headingId="home-cta-heading"
        titleBreak
        titleBefore={homeCta.titleBefore}
        titleAccent={homeCta.titleAccent}
        body={homeCta.body}
        primaryLabel={homeCta.button.label}
        primaryHref={homeCta.button.href}
        burstSrc={homeCta.burst}
      />
    </div>
  );
}
