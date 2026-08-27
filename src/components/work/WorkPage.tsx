"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRightCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import WorkCaseBrowser from "@/components/work/WorkCaseBrowser";
import { caseStudies } from "@/content/caseStudies";
import { workCta, workHero, workStats } from "@/content/workPage";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WorkPage() {
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
              { y: 28, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, clearProps: "transform" },
            )
            .fromTo(
              "[data-animate='hero-visual']",
              { opacity: 0 },
              { opacity: 1, duration: 0.45 },
              "-=0.7",
            )
            .fromTo(
              "[data-animate='hero-seam']",
              { opacity: 0, scale: 0.86 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.55,
                stagger: 0.08,
                clearProps: "scale",
              },
              "-=0.25",
            );

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
                { y: 32, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.75,
                  stagger: 0.1,
                  immediateRender: false,
                  clearProps: "transform",
                },
              );
            }

            if (staggerItems.length) {
              tl.fromTo(
                staggerItems,
                { y: 24, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.55,
                  stagger: 0.06,
                  immediateRender: false,
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
      {/* ── Hero (paper) ──────────────────────────────── */}
      <section
        className="section-shell bg-paper pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-16"
        aria-labelledby="work-hero-heading"
      >
        <div className="section-inner">
          <nav aria-label="Breadcrumb" data-animate="hero-copy" className="text-body-sm text-muted">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
              <li>
                <Link
                  href="/"
                  className="tap-target-sm inline-flex items-center rounded-sm text-ink transition hover:text-red focus-visible:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-line">
                /
              </li>
              <li aria-current="page" className="font-semibold text-red">
                Work
              </li>
            </ol>
          </nav>

          <div className="relative mt-8 lg:mt-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-0">
              <div className="relative z-[1] min-w-0 lg:pr-20 xl:pr-24">
                <h1
                  id="work-hero-heading"
                  data-animate="hero-copy"
                  className="text-display-xl mt-0 mb-0 text-balance"
                >
                  {workHero.headlineBefore}
                  <br />
                  <span className="text-red">{workHero.headlineAccent}</span>
                </h1>
                <p
                  data-animate="hero-copy"
                  className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem] sm:mt-6"
                >
                  {workHero.body}
                </p>
              </div>

              <div data-animate="hero-visual" className="relative z-[1] min-w-0 overflow-hidden">
                <ImageSlot
                  asset={workHero.image}
                  priority
                  className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="pointer-events-none absolute top-1/2 right-0 left-0 z-[2] hidden h-px -translate-y-1/2 bg-red lg:block"
                  aria-hidden
                />
              </div>
            </div>

            <div
              data-animate="hero-seam"
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden size-[min(68%,20rem)] -translate-x-1/2 -translate-y-1/2 lg:block"
              aria-hidden
            >
              <Image
                src={workHero.burst}
                alt=""
                fill
                sizes="320px"
                unoptimized
                className="object-contain opacity-45"
              />
            </div>
            <Link
              href="#case-studies"
              data-animate="hero-seam"
              className="absolute top-1/2 left-1/2 z-20 grid size-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red max-lg:hidden xl:size-20"
              aria-label="Continue to case studies"
            >
              <Image
                src={workHero.arrow}
                alt=""
                aria-hidden
                width={80}
                height={80}
                unoptimized
                className="size-full"
              />
            </Link>
          </div>
        </div>
      </section>

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
              <IconSlot asset={workStats.icon} tone="dark" size={88} />
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

      {/* ── Pre-footer CTA (mist) ─────────────────────── */}
      <section
        data-animate-section
        className="section-shell section-pad relative overflow-hidden bg-mist"
        aria-labelledby="work-cta-heading"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute top-1/2 right-0 hidden size-[min(38vw,20rem)] translate-x-[18%] -translate-y-1/2 opacity-40 lg:block xl:size-[22rem]">
            <Image
              src={workCta.burst}
              alt=""
              fill
              sizes="352px"
              unoptimized
              className="object-contain"
            />
          </div>
        </div>

        <div className="section-inner relative z-[1] grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <h2
            data-animate="fade-up"
            id="work-cta-heading"
            className="text-display-md m-0 min-w-0 text-balance"
          >
            {workCta.titleBefore}
            <br />
            <span className="text-red">{workCta.titleAccent}</span>
          </h2>

          <div data-animate="fade-up" className="min-w-0">
            <p className="text-body m-0 max-w-md text-muted">{workCta.body}</p>
            <Link
              href={workCta.button.href}
              className="text-cta tap-target mt-6 inline-flex min-h-12 w-full max-w-full items-center justify-center gap-3 bg-ink px-5 py-3.5 pl-6 text-white transition hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:mt-7 sm:w-auto sm:justify-start sm:gap-4 sm:py-4 sm:pl-7"
            >
              {workCta.button.label}
              <ArrowRightCircle size={28} strokeWidth={1.5} className="shrink-0 sm:size-8" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
