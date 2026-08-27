"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRightCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import ServicesLandingGrid from "@/components/services/ServicesLandingGrid";
import {
  servicesCta,
  servicesGrid,
  servicesHero,
  servicesProcess,
  servicesProcessSteps,
  servicesTrusted,
} from "@/content/servicesPage";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ServicesPage() {
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
            gsap.set(
              "[data-animate], [data-animate-stagger] > *, [data-timeline-icon], [data-timeline-copy], [data-timeline-line]",
              {
                clearProps: "all",
                autoAlpha: 1,
                opacity: 1,
                y: 0,
                scale: 1,
                scaleX: 1,
                scaleY: 1,
              },
            );
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

          /* Process timeline — draw connector, then reveal steps in order */
          const processWrap = gsap.utils.toArray<HTMLElement>(".services-timeline-wrap")[0];
          const processTimeline = processWrap?.querySelector<HTMLElement>("[data-story-timeline]");
          if (processWrap && processTimeline) {
            const line = processWrap.querySelector<HTMLElement>("[data-timeline-line]");
            const icons = processTimeline.querySelectorAll("[data-timeline-icon]");
            const copies = processTimeline.querySelectorAll("[data-timeline-copy]");
            const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

            if (line) {
              gsap.set(line, isDesktop ? { scaleX: 0 } : { scaleY: 0 });
            }
            gsap.set(icons, { scale: 0.55, opacity: 0 });
            gsap.set(copies, { y: 18, opacity: 0 });

            const processTl = gsap.timeline({
              scrollTrigger: {
                trigger: processWrap,
                start: "top 78%",
                toggleActions: "play none none none",
              },
              defaults: { ease: "power3.out" },
            });

            if (line) {
              processTl.to(line, {
                ...(isDesktop ? { scaleX: 1 } : { scaleY: 1 }),
                duration: 0.9,
                ease: "power2.inOut",
              });
            }

            icons.forEach((icon, i) => {
              const at = line ? (i === 0 ? "-=0.35" : "-=0.45") : i === 0 ? 0 : "-=0.45";
              processTl.to(
                icon,
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.45,
                  ease: "back.out(1.6)",
                },
                at,
              );
              processTl.to(
                copies[i],
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.5,
                },
                "-=0.28",
              );
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
        aria-labelledby="services-hero-heading"
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
              <li aria-current="page" className="font-semibold text-ink">
                Services
              </li>
            </ol>
          </nav>

          <div className="relative mt-8 lg:mt-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-0">
              <div className="relative z-[1] min-w-0 lg:pr-20 xl:pr-24">
                <h1
                  id="services-hero-heading"
                  data-animate="hero-copy"
                  className="text-display-xl mt-0 mb-0 text-balance"
                >
                  {servicesHero.headlineBefore}{" "}
                  <span className="text-red">{servicesHero.headlineAccent}</span>{" "}
                  {servicesHero.headlineAfter}
                </h1>
                <p
                  data-animate="hero-copy"
                  className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem] sm:mt-6"
                >
                  {servicesHero.body}
                </p>
              </div>

              <div data-animate="hero-visual" className="relative z-[1] min-w-0 overflow-hidden">
                <ImageSlot
                  asset={servicesHero.image}
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
                src={servicesHero.burst}
                alt=""
                fill
                sizes="320px"
                unoptimized
                className="object-contain opacity-45"
              />
            </div>
            <Link
              href="#our-services"
              data-animate="hero-seam"
              className="absolute top-1/2 left-1/2 z-20 grid size-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red max-lg:hidden xl:size-20"
              aria-label="Continue to our services"
            >
              <Image src={servicesHero.arrow} alt="" aria-hidden width={80} height={80} unoptimized className="size-full" />
            </Link>
          </div>
        </div>
      </section>

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
                      className="about-timeline-icon grid h-14 w-14 flex-none place-items-center overflow-hidden rounded-full border border-red bg-paper md:h-16 md:w-16"
                    >
                      <IconSlot asset={step.icon} size={56} />
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
      <section
        data-animate-section
        className="section-shell section-pad bg-ink text-white"
        aria-labelledby="services-cta-heading"
      >
        <div className="section-inner grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-12">
          <h2
            data-animate="fade-up"
            id="services-cta-heading"
            className="text-display-md m-0 text-balance"
          >
            {servicesCta.titleBefore}{" "}
            <span className="text-eyebrow-on-dark">{servicesCta.titleAccent}</span>
          </h2>

          <p
            data-animate="fade-up"
            className="text-body m-0 max-w-md text-muted-on-dark lg:max-w-none"
          >
            {servicesCta.body}
          </p>

          <div data-animate="fade-up">
            <Link
              href={servicesCta.button.href}
              className="text-cta tap-target inline-flex min-h-12 w-full items-center justify-center gap-3 bg-red px-5 py-3.5 pl-6 text-white transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:justify-start sm:gap-4 sm:py-4 sm:pl-7"
            >
              {servicesCta.button.label}
              <ArrowRightCircle size={28} strokeWidth={1.5} className="sm:size-8" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
