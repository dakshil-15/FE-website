"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRightCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import InsightsBrowser from "@/components/insights/InsightsBrowser";
import InsightsSidebar from "@/components/insights/InsightsSidebar";
import { insightsCta, insightsHero, type InsightFilterKey, type InsightPost } from "@/content/insights";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type InsightsPageProps = {
  posts: InsightPost[];
};

export default function InsightsPage({ posts }: InsightsPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<InsightFilterKey>("all");

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
              opacity: 1,
              y: 0,
              scale: 1,
            });
            return;
          }

          const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
          heroTl
            .fromTo(
              "[data-animate='hero-copy']",
              { y: 28, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12, clearProps: "transform" },
            )
            .fromTo(
              "[data-animate='hero-visual']",
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.45 },
              "-=0.7",
            )
            .fromTo(
              "[data-animate='hero-seam']",
              { autoAlpha: 0, scale: 0.86 },
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.55,
                stagger: 0.08,
                clearProps: "scale",
              },
              "-=0.25",
            );

          gsap.utils.toArray<HTMLElement>("[data-animate-section]").forEach((section) => {
            const intro = section.querySelectorAll("[data-animate='fade-up']");
            const staggerRoots = section.querySelectorAll("[data-animate-stagger]");
            const staggerItems = staggerRoots.length
              ? gsap.utils.toArray<Element>(
                  Array.from(staggerRoots).flatMap((root) =>
                    Array.from(root.querySelectorAll(":scope > *")),
                  ),
                )
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
              tl.fromTo(
                intro,
                { y: 32, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.75, stagger: 0.1, clearProps: "transform" },
              );
            }

            if (staggerItems.length) {
              tl.fromTo(
                staggerItems,
                { y: 24, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.55,
                  stagger: 0.06,
                  clearProps: "transform",
                },
                intro.length ? "-=0.35" : 0,
              );
            }
          });

          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      <section
        className="section-shell bg-paper pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-16"
        aria-labelledby="insights-hero-heading"
      >
        <div className="section-inner">
          <nav aria-label="Breadcrumb" data-animate="hero-copy" className="text-body-sm">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-red">
              <li>
                <Link
                  href="/"
                  className="rounded-sm transition hover:text-ink focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                Insights
              </li>
            </ol>
          </nav>

          <div className="relative mt-8 lg:mt-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-0">
              <div className="relative z-[1] min-w-0 lg:pr-16 xl:pr-20">
                <p data-animate="hero-copy" className="text-eyebrow m-0">
                  {insightsHero.eyebrow}
                </p>
                <h1
                  id="insights-hero-heading"
                  data-animate="hero-copy"
                  className="text-display-xl mt-4 mb-0 text-balance"
                >
                  {insightsHero.headlineBefore}{" "}
                  <span className="text-red">{insightsHero.headlineAccent}</span>
                </h1>
                <p
                  data-animate="hero-copy"
                  className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem] sm:mt-6"
                >
                  {insightsHero.body}
                </p>
                <div data-animate="hero-copy" className="mt-6 sm:mt-7 lg:hidden">
                  <Link
                    href="#insights-listing"
                    className="text-cta tap-target inline-flex min-h-12 items-center gap-3 bg-ink px-5 py-3.5 pl-6 text-white transition hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                  >
                    Browse insights
                    <ArrowRightCircle size={24} strokeWidth={1.5} aria-hidden />
                  </Link>
                </div>
              </div>

              <div data-animate="hero-visual" className="relative z-[1] min-w-0">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-stretch gap-3 sm:gap-4">
                  <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]">
                    <div className="grid h-full grid-cols-2 gap-3 sm:gap-4">
                      <ImageSlot
                        asset={insightsHero.imagePrimary}
                        priority
                        className="aspect-[4/5] w-full lg:aspect-auto lg:h-full"
                        sizes="(max-width: 640px) 42vw, (max-width: 1024px) 40vw, 20vw"
                      />
                      <ImageSlot
                        asset={insightsHero.imageSecondary}
                        priority
                        className="aspect-[4/5] w-full translate-y-4 sm:translate-y-6 lg:aspect-auto lg:h-[calc(100%-1.5rem)] lg:translate-y-8"
                        sizes="(max-width: 640px) 42vw, (max-width: 1024px) 40vw, 20vw"
                      />
                    </div>
                  </div>

                  <div
                    className="hidden w-[4.5rem] flex-col justify-between bg-ink px-3 py-5 text-white sm:flex sm:w-20 sm:px-4 sm:py-6"
                    aria-hidden
                  >
                    <p className="m-0 font-display text-[10px] leading-[1.35] font-bold tracking-[0.18em] uppercase [writing-mode:vertical-rl] rotate-180 sm:text-[11px]">
                      {insightsHero.verticalMark}
                    </p>
                    <span className="grid size-9 place-items-center rounded-full border border-white/50 text-white">
                      <ArrowRightCircle size={22} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              data-animate="hero-seam"
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden size-[min(68%,20rem)] -translate-x-1/2 -translate-y-1/2 lg:block"
              aria-hidden
            >
              <Image
                src={insightsHero.burst}
                alt=""
                fill
                sizes="320px"
                unoptimized
                className="object-contain opacity-45"
              />
            </div>
            <Link
              href="#insights-listing"
              data-animate="hero-seam"
              className="absolute top-1/2 left-1/2 z-20 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red max-lg:hidden"
              aria-label="Continue to insights listing"
            >
              <Image src={insightsHero.arrow} alt="" aria-hidden width={56} height={56} unoptimized />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="insights-listing"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-mist"
        aria-labelledby="insights-listing-heading"
      >
        <div className="section-inner">
          <h2 id="insights-listing-heading" className="sr-only">
            Browse insights
          </h2>
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] xl:items-start xl:gap-12">
            <div className="min-w-0">
              <InsightsBrowser
                posts={posts}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>
            <InsightsSidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>
        </div>
      </section>

      <section
        data-animate-section
        className="section-shell section-pad bg-ink text-white"
        aria-labelledby="insights-cta-heading"
      >
        <div className="section-inner grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <h2
            data-animate="fade-up"
            id="insights-cta-heading"
            className="text-display-md m-0 min-w-0 text-balance"
          >
            {insightsCta.titleBefore}{" "}
            <span className="text-eyebrow-on-dark">{insightsCta.titleAccent}</span>
          </h2>
          <div data-animate="fade-up" className="min-w-0">
            <p className="text-body m-0 max-w-md text-muted-on-dark">{insightsCta.body}</p>
            <Link
              href={insightsCta.button.href}
              className="text-cta tap-target mt-6 inline-flex min-h-12 w-full max-w-full items-center justify-center gap-3 bg-red px-5 py-3.5 pl-6 text-white transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-7 sm:w-auto sm:justify-start sm:gap-4 sm:py-4 sm:pl-7"
            >
              {insightsCta.button.label}
              <ArrowRightCircle size={28} strokeWidth={1.5} className="shrink-0 sm:size-8" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
