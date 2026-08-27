"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import {
  careersBenefits,
  careersCta,
  careersCulture,
  careersHero,
  careersOpenings,
  careersRoles,
  careersValues,
  careersWhyJoin,
} from "@/content/careers";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CareersPage() {
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
      {/* ── Hero (paper) ──────────────────────────────── */}
      <section
        className="section-shell bg-paper pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-16"
        aria-labelledby="careers-hero-heading"
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
                Careers
              </li>
            </ol>
          </nav>

          <div className="relative mt-8 lg:mt-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-0">
              <div className="relative z-[1] min-w-0 lg:pr-20 xl:pr-24">
                <h1
                  id="careers-hero-heading"
                  data-animate="hero-copy"
                  className="text-display-xl mt-0 mb-0 text-balance"
                >
                  {careersHero.headlineBefore}{" "}
                  <span className="text-red">{careersHero.headlineAccent}</span>{" "}
                  {careersHero.headlineAfter}
                </h1>
                <p
                  data-animate="hero-copy"
                  className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem] sm:mt-6"
                >
                  {careersHero.body}
                </p>
                <div data-animate="hero-copy">
                  <Link
                    href={careersHero.cta.href}
                    className="text-cta tap-target mt-7 inline-flex min-h-12 items-center gap-3 bg-ink px-5 py-3.5 pl-6 text-white transition hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:mt-8 sm:gap-4 sm:py-4 sm:pl-7"
                  >
                    {careersHero.cta.label}
                    <ArrowRightCircle size={28} strokeWidth={1.5} className="sm:size-8" aria-hidden />
                  </Link>
                </div>
              </div>

              <div data-animate="hero-visual" className="relative z-[1] min-w-0 overflow-hidden">
                <ImageSlot
                  asset={careersHero.image}
                  priority
                  className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="pointer-events-none absolute top-1/2 right-0 left-0 z-[2] hidden h-px -translate-y-1/2 bg-red lg:block"
                  aria-hidden
                />
                <p
                  className="pointer-events-none absolute top-1/2 right-4 z-[3] hidden max-h-[85%] -translate-y-1/2 overflow-hidden font-display text-[10px] leading-none font-bold tracking-[0.42em] text-red uppercase [writing-mode:vertical-rl] rotate-180 lg:block xl:right-6 xl:text-xs"
                  aria-hidden
                >
                  {careersHero.verticalMark}
                </p>
              </div>
            </div>

            <div
              data-animate="hero-seam"
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden size-[min(68%,20rem)] -translate-x-1/2 -translate-y-1/2 lg:block"
              aria-hidden
            >
              <Image
                src={careersHero.burst}
                alt=""
                fill
                sizes="320px"
                unoptimized
                className="object-contain opacity-45"
              />
            </div>
            <Link
              href="#our-culture"
              data-animate="hero-seam"
              className="absolute top-1/2 left-1/2 z-20 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red max-lg:hidden"
              aria-label="Continue to our culture"
            >
              <Image src={careersHero.arrow} alt="" aria-hidden width={56} height={56} unoptimized />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Our Culture (mist) ─────────────────────────── */}
      <section
        id="our-culture"
        data-animate-section
        className="section-shell section-pad bg-mist"
        aria-labelledby="culture-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {careersCulture.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="culture-heading" className="text-display-md m-0">
              {careersCulture.titleBefore}{" "}
              <span className="text-red">{careersCulture.titleAccent}</span>
            </h2>
            <p
              data-animate="fade-up"
              className="text-body section-copy section-copy-on-light m-0 pt-0 md:pt-1"
            >
              {careersCulture.body}
            </p>
          </div>

          <ul
            data-animate-stagger
            className="section-media m-0 grid list-none grid-cols-1 gap-8 p-0 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-5"
          >
            {careersValues.map((value) => (
              <li key={value.title} className="min-w-0">
                <IconSlot asset={value.icon} size={56} className="text-ink" />
                <h3 className="mt-4 mb-0 font-display text-base tracking-[0.06em] uppercase sm:mt-5 sm:text-lg">
                  {value.title}
                </h3>
                <p className="text-body-sm mt-2 mb-0 max-w-[16rem] text-muted sm:mt-2.5">
                  {value.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Why Join Us (paper) ────────────────────────── */}
      <section
        data-animate-section
        className="section-shell section-pad bg-paper"
        aria-labelledby="why-join-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {careersWhyJoin.eyebrow}
          </p>
          <h2 data-animate="fade-up" id="why-join-heading" className="text-display-md mt-4 mb-0 max-w-3xl">
            {careersWhyJoin.titleBefore}{" "}
            <span className="text-red">{careersWhyJoin.titleAccent}</span>
          </h2>

          <ul
            data-animate-stagger
            className="section-media m-0 grid list-none grid-cols-1 gap-8 p-0 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6"
          >
            {careersBenefits.map((benefit) => (
              <li key={benefit.title} className="min-w-0">
                <IconSlot asset={benefit.icon} size={56} className="text-ink" />
                <h3 className="mt-4 mb-0 font-display text-base tracking-[0.06em] uppercase sm:mt-5 sm:text-lg">
                  {benefit.title}
                </h3>
                <p className="text-body-sm mt-2 mb-0 max-w-[16rem] text-muted sm:mt-2.5">
                  {benefit.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Open Positions (mist) ──────────────────────── */}
      <section
        id="open-positions"
        data-animate-section
        className="section-shell section-pad bg-mist"
        aria-labelledby="openings-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {careersOpenings.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="openings-heading" className="text-display-md m-0">
              {careersOpenings.title}
            </h2>
            <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
              <Link
                href={careersOpenings.viewAll.href}
                className="text-cta link-cta mt-0 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
              >
                {careersOpenings.viewAll.label}
                <ArrowRight size={16} strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Mobile: stacked cards (no horizontal scroll) */}
          <ul
            data-animate-stagger
            className="section-media m-0 flex list-none flex-col gap-0 p-0 md:hidden"
          >
            {careersRoles.map((role) => (
              <li key={role.slug} className="border-b border-line">
                <a
                  href={role.href}
                  className="group flex min-h-14 items-center justify-between gap-4 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                >
                  <div className="min-w-0">
                    <p className="m-0 font-display text-base font-bold tracking-[0.03em] text-ink uppercase transition group-hover:text-red">
                      {role.title}
                    </p>
                    <p className="text-body-sm mt-1.5 mb-0 text-muted">
                      {role.location} · {role.type} · {role.experience}
                    </p>
                  </div>
                  <span
                    className="grid h-11 w-11 flex-none place-items-center rounded-full bg-ink text-white"
                    aria-hidden
                  >
                    <ArrowRight size={16} strokeWidth={2} />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop/tablet: table */}
          <div
            data-animate="fade-up"
            role="region"
            aria-label="Open positions table"
            tabIndex={0}
            className="section-media hidden overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red md:block"
          >
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">Open positions at First Economy</caption>
              <thead>
                <tr className="border-b border-line">
                  <th
                    scope="col"
                    className="pb-4 pr-4 font-display text-xs font-bold tracking-[0.12em] text-muted uppercase"
                  >
                    Job Title
                  </th>
                  <th
                    scope="col"
                    className="pb-4 pr-4 font-display text-xs font-bold tracking-[0.12em] text-muted uppercase"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="hidden pb-4 pr-4 font-display text-xs font-bold tracking-[0.12em] text-muted uppercase lg:table-cell"
                  >
                    Job Type
                  </th>
                  <th
                    scope="col"
                    className="hidden pb-4 pr-4 font-display text-xs font-bold tracking-[0.12em] text-muted uppercase lg:table-cell"
                  >
                    Experience
                  </th>
                  <th scope="col" className="w-14 pb-4">
                    <span className="sr-only">Apply</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {careersRoles.map((role) => (
                  <tr key={role.slug} className="group border-b border-line">
                    <td className="py-5 pr-4 align-middle">
                      <a
                        href={role.href}
                        className="rounded-sm font-display text-base font-bold tracking-[0.03em] text-ink uppercase transition hover:text-red focus-visible:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red lg:text-lg"
                      >
                        {role.title}
                      </a>
                      <p className="text-body-sm mt-1 mb-0 text-muted lg:hidden">
                        {role.type} · {role.experience}
                      </p>
                    </td>
                    <td className="text-body-sm py-5 pr-4 align-middle text-muted">{role.location}</td>
                    <td className="text-body-sm hidden py-5 pr-4 align-middle text-muted lg:table-cell">
                      {role.type}
                    </td>
                    <td className="text-body-sm hidden py-5 pr-4 align-middle text-muted lg:table-cell">
                      {role.experience}
                    </td>
                    <td className="py-5 align-middle">
                      <a
                        href={role.href}
                        tabIndex={-1}
                        aria-hidden
                        className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition group-hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                      >
                        <ArrowRight size={16} strokeWidth={2} aria-hidden />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p data-animate="fade-up" className="mt-8 mb-0 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mt-10">
            <span className="text-body text-muted">{careersOpenings.emptyNote}</span>
            <a
              href={careersOpenings.resumeCta.href}
              className="text-cta link-cta mt-0 inline-flex min-h-11 items-center gap-2 text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
            >
              {careersOpenings.resumeCta.label}
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </a>
          </p>
        </div>
      </section>

      {/* ── Pre-footer CTA (ink) ───────────────────────── */}
      <section
        data-animate-section
        className="section-shell section-pad bg-ink text-white"
        aria-labelledby="careers-cta-heading"
      >
        <div className="section-inner grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_auto] xl:gap-12">
          <h2
            data-animate="fade-up"
            id="careers-cta-heading"
            className="text-display-md m-0 text-balance"
          >
            {careersCta.titleBefore}{" "}
            <span className="text-eyebrow-on-dark">{careersCta.titleAccent}</span>
          </h2>

          <ul data-animate-stagger className="m-0 flex list-none flex-col gap-6 p-0 sm:gap-7">
            <li className="flex items-start gap-4">
              <IconSlot asset={careersCta.email.icon} tone="dark" size={48} className="flex-none" />
              <div className="min-w-0 pt-1">
                <p className="text-body-sm m-0 text-muted-on-dark">{careersCta.email.label}</p>
                <a
                  href={careersCta.email.href}
                  className="text-body mt-0.5 inline-block rounded-sm text-white transition hover:text-[#e84848] focus-visible:text-[#e84848] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {careersCta.email.value}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <IconSlot
                asset={careersCta.culture.icon}
                tone="dark"
                size={48}
                className="flex-none"
              />
              <div className="min-w-0 pt-1">
                <p className="text-body-sm m-0 text-muted-on-dark">{careersCta.culture.label}</p>
                <Link
                  href={careersCta.culture.href}
                  className="text-body mt-0.5 inline-block rounded-sm text-white transition hover:text-[#e84848] focus-visible:text-[#e84848] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {careersCta.culture.value}
                </Link>
              </div>
            </li>
          </ul>

          <div data-animate="fade-up" className="lg:col-span-2 xl:col-span-1">
            <a
              href={careersCta.button.href}
              className="text-cta tap-target inline-flex min-h-12 w-full items-center justify-center gap-3 bg-red px-5 py-3.5 pl-6 text-white transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:justify-start sm:gap-4 sm:py-4 sm:pl-7"
            >
              {careersCta.button.label}
              <ArrowRightCircle size={28} strokeWidth={1.5} className="sm:size-8" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
