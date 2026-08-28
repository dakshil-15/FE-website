"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CaseStudyCard from "@/components/CaseStudyCard";
import AdvantageToolsGrid from "@/components/home/AdvantageToolsGrid";
import GrowthNetworkVisual from "@/components/home/GrowthNetworkVisual";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import { platformIcons } from "@/components/toolIcons";
import {
  architectureSection,
  capabilitiesCta,
  capabilitiesHero,
  capabilityPillars,
  ecosystemColumns,
  ecosystemSection,
  intelligenceSection,
  techCaseStudiesSection,
} from "@/content/capabilities";
import { caseStudies } from "@/content/caseStudies";
import { dataTools, growthNodes, platformPartners } from "@/content/site";
import type { CapabilityPillar } from "@/content/capabilities";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function CapabilityPillarBlock({
  pillar,
  index,
  onDark = false,
}: {
  pillar: CapabilityPillar;
  index: number;
  onDark?: boolean;
}) {
  const reverse = index % 2 === 1;

  return (
    <section
      id={pillar.id}
      data-animate-section
      className={`section-shell section-pad scroll-mt-[5.5rem] ${onDark ? "bg-ink text-white" : index % 2 === 0 ? "bg-paper" : "bg-mist"}`}
      aria-labelledby={`${pillar.id}-heading`}
    >
      <div
        className={`section-inner grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="min-w-0">
          <p
            data-animate="fade-up"
            className={`text-eyebrow m-0 ${onDark ? "text-eyebrow-on-dark" : ""}`}
          >
            {pillar.eyebrow}
          </p>
          <h2
            data-animate="fade-up"
            id={`${pillar.id}-heading`}
            className="text-display-md mt-4 mb-0 text-balance"
          >
            {pillar.title}
          </h2>
          <p
            data-animate="fade-up"
            className={`text-body section-copy mt-5 mb-0 max-w-[28rem] sm:mt-6 ${
              onDark ? "section-copy-on-dark" : "section-copy-on-light"
            }`}
          >
            {pillar.body}
          </p>
          {pillar.serviceHref ? (
            <div data-animate="fade-up">
              <Link
                href={pillar.serviceHref}
                className={`text-cta link-cta mt-6 inline-flex sm:mt-7 ${onDark ? "text-white" : "text-ink"}`}
              >
                {pillar.serviceLabel ?? "Learn more"}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>

        <ul
          data-animate-stagger
          className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2"
        >
          {pillar.items.map((item) => (
            <li
              key={item}
              className={`border px-4 py-4 sm:px-5 sm:py-5 ${
                onDark ? "border-white/20 bg-white/5" : "border-line bg-white"
              }`}
            >
              <p className={`text-body-sm m-0 ${onDark ? "text-white/90" : "text-ink"}`}>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function CapabilitiesPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const techStudies = caseStudies.filter((study) =>
    ["technology", "ai"].includes(study.family) ||
    study.services.some((service) => ["technology", "ai-solutions"].includes(service)),
  );

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
                start: "top 82%",
                toggleActions: "play none none none",
              },
              defaults: { ease: "power3.out" },
            });

            if (intro.length) {
              tl.fromTo(intro, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.1 });
            }
            if (staggerItems.length) {
              tl.fromTo(
                staggerItems,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 },
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
        className="section-shell bg-paper pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-16"
        aria-labelledby="capabilities-hero-heading"
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
                Capabilities
              </li>
            </ol>
          </nav>

          <div className="relative mt-8 lg:mt-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-0">
              <div className="relative z-[1] min-w-0 lg:pr-20 xl:pr-24">
                <p data-animate="hero-copy" className="text-eyebrow m-0">
                  {capabilitiesHero.eyebrow}
                </p>
                <h1
                  id="capabilities-hero-heading"
                  data-animate="hero-copy"
                  className="text-display-xl mt-4 mb-0 text-balance"
                >
                  {capabilitiesHero.headlineBefore}
                  <br />
                  <span className="text-red">{capabilitiesHero.headlineAccent}</span>
                </h1>
                <p
                  data-animate="hero-copy"
                  className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem] sm:mt-6"
                >
                  {capabilitiesHero.body}
                </p>
              </div>

              <div data-animate="hero-visual" className="relative z-[1] min-w-0 overflow-hidden">
                <ImageSlot
                  asset={capabilitiesHero.image}
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
                src={capabilitiesHero.burst}
                alt=""
                fill
                sizes="320px"
                unoptimized
                className="object-contain opacity-45"
              />
            </div>
            <Link
              href="#architecture"
              data-animate="hero-seam"
              className="absolute top-1/2 left-1/2 z-20 grid size-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red max-lg:hidden xl:size-20"
              aria-label="Continue to growth-system architecture"
            >
              <Image
                src={capabilitiesHero.arrow}
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

      <section
        id="architecture"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-mist"
        aria-labelledby="architecture-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {architectureSection.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="architecture-heading" className="text-display-md m-0">
              {architectureSection.titleBefore}{" "}
              <span className="text-red">{architectureSection.titleAccent}</span>
            </h2>
            <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
              <p className="text-body section-copy section-copy-on-light m-0">{architectureSection.body}</p>
              <p className="text-body-sm mt-4 mb-0 max-w-[28rem] text-muted sm:mt-5">
                {architectureSection.networkNote}
              </p>
            </div>
          </div>

          <div className="section-media mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-16">
            <ul
              data-animate-stagger
              className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2"
            >
              {growthNodes.map((node) => (
                <li key={node.id} className="min-w-0">
                  {node.relatedServiceSlug ? (
                    <Link
                      href={`/services/${node.relatedServiceSlug}`}
                      className="group flex h-full flex-col border border-line bg-white p-4 transition hover:border-ink sm:p-5"
                    >
                      <span className="font-display text-sm font-bold tracking-[0.04em] uppercase transition group-hover:text-red">
                        {node.label}
                      </span>
                      <p className="text-body-sm mt-2 mb-0 text-muted">{node.description}</p>
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col border border-line bg-white p-4 sm:p-5">
                      <span className="font-display text-sm font-bold tracking-[0.04em] uppercase">{node.label}</span>
                      <p className="text-body-sm mt-2 mb-0 text-muted">{node.description}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div data-animate="fade-up" className="grid min-w-0 place-items-center">
              <GrowthNetworkVisual />
            </div>
          </div>
        </div>
      </section>

      {capabilityPillars.slice(0, 2).map((pillar, index) => (
        <CapabilityPillarBlock key={pillar.id} pillar={pillar} index={index} />
      ))}

      <section
        id="data-analytics"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-mist"
        aria-labelledby="data-analytics-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {capabilityPillars[2].eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="data-analytics-heading" className="text-display-md m-0">
              {capabilityPillars[2].title}
            </h2>
            <p
              data-animate="fade-up"
              className="text-body section-copy section-copy-on-light m-0 pt-0 md:pt-1"
            >
              {capabilityPillars[2].body}
            </p>
          </div>
          <div data-animate="fade-up" className="section-media mt-8 border border-line sm:mt-10">
            <AdvantageToolsGrid tools={dataTools} />
          </div>
        </div>
      </section>

      {capabilityPillars.slice(3, 5).map((pillar, index) => (
        <CapabilityPillarBlock key={pillar.id} pillar={pillar} index={index + 3} />
      ))}

      <CapabilityPillarBlock pillar={capabilityPillars[5]} index={5} onDark />

      <section
        id="ecosystem"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-mist"
        aria-labelledby="ecosystem-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {ecosystemSection.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="ecosystem-heading" className="text-display-md m-0">
              {ecosystemSection.titleBefore}{" "}
              <span className="text-red">{ecosystemSection.titleAccent}</span>
            </h2>
            <p
              data-animate="fade-up"
              className="text-body section-copy section-copy-on-light m-0 pt-0 md:pt-1"
            >
              {ecosystemSection.body}
            </p>
          </div>

          <div data-animate="fade-up" className="section-media mt-8 flex flex-wrap gap-3 sm:mt-10">
            {platformPartners.map((platform) => {
              const Icon = platformIcons[platform];
              return (
                <span
                  key={platform}
                  className="inline-flex items-center gap-2 border border-line bg-white px-4 py-3 text-sm font-medium sm:px-5"
                >
                  {Icon ? <Icon size={15} className="text-red" aria-hidden /> : null}
                  {platform}
                </span>
              );
            })}
          </div>

          <div
            data-animate-stagger
            className="section-media mt-8 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:mt-10 sm:grid-cols-3 lg:grid-cols-7"
          >
            {ecosystemColumns.map((column) => (
              <div key={column.title} className="bg-white px-4 py-5 sm:px-5 sm:py-6">
                <p className="m-0 text-[11px] font-bold tracking-[0.16em] text-red uppercase">{column.title}</p>
                <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                  {column.items.map((item) => (
                    <li key={item} className="text-body-sm text-[#333]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            data-animate="fade-up"
            className="mt-10 border border-line bg-ink p-6 text-white sm:mt-12 sm:p-8 lg:p-10"
          >
            <p className="text-eyebrow-on-dark m-0">{intelligenceSection.eyebrow}</p>
            <h3 className="text-display-md mt-4 mb-0 max-w-2xl text-balance">{intelligenceSection.title}</h3>
            <p className="text-body section-copy section-copy-on-dark mt-5 mb-0 max-w-2xl sm:mt-6">
              {intelligenceSection.body}
            </p>
          </div>
        </div>
      </section>

      <section
        id="tech-case-studies"
        data-animate-section
        className="section-shell section-pad scroll-mt-[5.5rem] bg-paper"
        aria-labelledby="tech-case-studies-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {techCaseStudiesSection.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="tech-case-studies-heading" className="text-display-md m-0">
              {techCaseStudiesSection.titleBefore}{" "}
              <span className="text-red">{techCaseStudiesSection.titleAccent}</span>
            </h2>
            <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
              <p className="text-body section-copy section-copy-on-light m-0">
                {techCaseStudiesSection.body}
              </p>
              <Link href="/work" className="text-cta link-cta mt-0 text-ink">
                View all work
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
          <div
            data-animate-stagger
            className="section-media mt-8 grid grid-cols-1 gap-6 sm:mt-10 md:grid-cols-2 xl:grid-cols-3"
          >
            {techStudies.map((study) => (
              <CaseStudyCard key={study.slug} caseStudy={study} />
            ))}
          </div>
        </div>
      </section>

      <section
        data-animate-section
        className="section-shell section-pad bg-ink text-white"
        aria-labelledby="capabilities-cta-heading"
      >
        <div className="section-inner grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <h2
            data-animate="fade-up"
            id="capabilities-cta-heading"
            className="text-display-md m-0 min-w-0 text-balance"
          >
            {capabilitiesCta.titleBefore}{" "}
            <span className="text-eyebrow-on-dark">{capabilitiesCta.titleAccent}</span>
          </h2>
          <div data-animate="fade-up" className="min-w-0">
            <p className="text-body m-0 max-w-md text-muted-on-dark">{capabilitiesCta.body}</p>
            <Link
              href={capabilitiesCta.button.href}
              className="text-cta tap-target mt-6 inline-flex min-h-12 w-full max-w-full items-center justify-center gap-3 bg-red px-5 py-3.5 pl-6 text-white transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-7 sm:w-auto sm:justify-start sm:gap-4 sm:py-4 sm:pl-7"
            >
              {capabilitiesCta.button.label}
              <ArrowRightCircle size={28} strokeWidth={1.5} className="shrink-0 sm:size-8" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
