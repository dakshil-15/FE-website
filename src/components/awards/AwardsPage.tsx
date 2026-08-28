"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRightCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AwardsGalleryGrid from "@/components/awards/AwardsGalleryGrid";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import {
  awardsCta,
  awardsGallerySection,
  awardsHero,
  awardsStatsBar,
  industryRecognitions,
} from "@/content/awards";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function statSlug(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

export default function AwardsPage() {
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
          const counters = gsap.utils.toArray<HTMLElement>("[data-counter]");

          if (reduceMotion) {
            gsap.set("[data-animate], [data-animate-stagger] > *, [data-counter]", {
              clearProps: "all",
              autoAlpha: 1,
              opacity: 1,
              y: 0,
              scale: 1,
            });
            counters.forEach((el) => {
              const target = Number(el.dataset.target ?? 0);
              const suffix = el.dataset.suffix ?? "";
              el.textContent = `${target}${suffix}`;
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

          const statsSection = gsap.utils.toArray<HTMLElement>("[data-stats-section]")[0];

          const formatCounter = (el: HTMLElement, val: number) => {
            const suffix = el.dataset.suffix ?? "";
            el.textContent = `${Math.round(val)}${suffix}`;
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
        aria-labelledby="awards-hero-heading"
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
              <li>
                <Link
                  href="/about"
                  className="rounded-sm transition hover:text-ink focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                >
                  About
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink" aria-current="page">
                Awards &amp; Recognition
              </li>
            </ol>
          </nav>

          <div className="relative mt-8 lg:mt-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-12">
              <div className="relative z-[1] min-w-0 lg:pr-12 xl:pr-20">
                <p data-animate="hero-copy" className="text-eyebrow m-0">
                  {awardsHero.eyebrow}
                </p>
                <h1
                  id="awards-hero-heading"
                  data-animate="hero-copy"
                  className="text-display-xl mt-4 mb-0 text-balance"
                >
                  {awardsHero.headlineBefore}{" "}
                  <span className="text-red">{awardsHero.headlineAccent}</span>
                  <span
                    className="ml-[0.12em] inline-block h-[0.22em] w-[0.22em] translate-y-[-0.08em] bg-red align-middle"
                    aria-hidden
                  />
                </h1>
                <p
                  data-animate="hero-copy"
                  className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem] sm:mt-6"
                >
                  {awardsHero.body}
                </p>
                <Link
                  href="#awards-stats"
                  data-animate="hero-copy"
                  className="text-cta link-cta mt-6 inline-flex min-h-11 items-center gap-2 text-ink lg:hidden"
                >
                  View awards stats
                  <ArrowRightCircle size={18} strokeWidth={1.5} aria-hidden />
                </Link>
              </div>

              <div data-animate="hero-visual" className="relative z-[1] min-w-0 overflow-hidden">
                <ImageSlot
                  asset={awardsHero.image}
                  priority
                  className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[380px] xl:min-h-[420px]"
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
                src={awardsHero.burst}
                alt=""
                fill
                sizes="320px"
                unoptimized
                className="object-contain opacity-45"
              />
            </div>
            <Link
              href="#awards-stats"
              data-animate="hero-seam"
              className="absolute top-1/2 left-1/2 z-20 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:opacity-80 focus-visible:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red max-lg:hidden"
              aria-label="Continue to awards stats"
            >
              <Image src={awardsHero.arrow} alt="" aria-hidden width={56} height={56} unoptimized />
            </Link>
          </div>
        </div>
      </section>

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
            className="grid grid-cols-1 gap-8 rounded-2xl border border-line bg-white px-5 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:px-8 sm:py-10 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6"
            role="list"
          >
            {awardsStatsBar.map((stat) => {
              const slug = statSlug(stat.label);
              return (
                <div
                  key={stat.label}
                  role="listitem"
                  className="min-w-0"
                  aria-label={`${stat.value}${stat.suffix} ${stat.label}. ${stat.description}`}
                >
                  <span aria-hidden>
                    <IconSlot asset={stat.icon} size={40} className="text-red" />
                  </span>
                  <p className="text-stat mt-4 mb-0 text-ink sm:mt-5">
                    <span
                      id={`awards-stat-value-${slug}`}
                      data-counter
                      data-target={stat.value}
                      data-suffix={stat.suffix}
                      aria-hidden="true"
                    >
                      {stat.value}
                      {stat.suffix}
                    </span>
                  </p>
                  <p
                    id={`awards-stat-${slug}`}
                    className="mt-2 mb-0 text-xs font-bold tracking-[0.14em] text-ink uppercase sm:mt-2.5 sm:text-sm"
                  >
                    {stat.label}
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
        id="awards-gallery"
        data-animate-section
        className="section-shell section-pad scroll-mt-24 bg-paper"
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

      <section
        data-animate-section
        className="section-shell section-pad bg-mist"
        aria-labelledby="industry-recognitions-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {industryRecognitions.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="industry-recognitions-heading" className="text-display-md m-0">
              {industryRecognitions.titleBefore}{" "}
              <span className="text-red">{industryRecognitions.titleAccent}</span>
            </h2>
            <p data-animate="fade-up" className="text-body section-copy section-copy-on-light m-0 pt-0 md:pt-1">
              {industryRecognitions.body}
            </p>
          </div>

          <ul
            data-animate-stagger
            className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4"
          >
            {industryRecognitions.items.map((item) => (
              <li
                key={item.organization}
                className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-white p-5 sm:p-6"
              >
                <div className="mb-5 flex min-h-12 items-center sm:min-h-14">
                  {item.logo.src ? (
                    <Image
                      src={item.logo.src}
                      alt={item.logo.alt}
                      width={140}
                      height={48}
                      className="h-auto max-h-12 w-auto max-w-[140px] object-contain object-left"
                      unoptimized={item.logo.src.endsWith(".svg")}
                    />
                  ) : (
                    <div
                      className="flex min-h-12 min-w-[8rem] items-center justify-center rounded border border-dashed border-line bg-mist px-4"
                      role="img"
                      aria-label={`${item.logo.label} (placeholder)`}
                    >
                      <span className="text-[10px] font-bold tracking-[0.14em] text-muted uppercase">
                        {item.organization}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="m-0 font-display text-base leading-tight tracking-[0.04em] uppercase sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-body-sm mt-2.5 mb-0 text-muted">{item.body}</p>
                <span className="mt-4 block h-0.5 w-8 bg-red" aria-hidden />
                <p className="mt-3 mb-0 text-[13px] font-semibold tracking-[0.06em] text-muted uppercase">
                  <span className="sr-only">Year: </span>
                  {item.year}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        data-animate-section
        className="section-shell section-pad relative overflow-hidden bg-ink text-white"
        aria-labelledby="awards-cta-heading"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute top-1/2 right-0 hidden size-[min(38vw,20rem)] translate-x-[18%] -translate-y-1/2 opacity-35 lg:block xl:size-[22rem]">
            <Image
              src={awardsCta.burst}
              alt=""
              fill
              sizes="352px"
              unoptimized
              className="object-contain"
            />
          </div>
        </div>

        <div className="section-inner relative z-[1] grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)_auto] lg:items-center lg:gap-12">
          <h2
            data-animate="fade-up"
            id="awards-cta-heading"
            className="text-display-md m-0 text-balance"
          >
            {awardsCta.titleBefore}{" "}
            <span className="text-eyebrow-on-dark">{awardsCta.titleAccent}</span>
          </h2>
          <p
            data-animate="fade-up"
            className="text-body section-copy section-copy-on-dark m-0 max-w-md lg:pt-1"
          >
            {awardsCta.body}
          </p>
          <div data-animate="fade-up">
            <Link
              href={awardsCta.button.href}
              className="text-cta tap-target inline-flex min-h-12 w-full items-center justify-center gap-3 bg-red px-5 py-3.5 pl-6 text-white transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:justify-start sm:gap-4 sm:py-4 sm:pl-7"
            >
              {awardsCta.button.label}
              <ArrowRightCircle size={28} strokeWidth={1.5} className="sm:size-8" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
