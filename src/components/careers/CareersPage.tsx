"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import { usePageReveal } from "@/hooks/usePageReveal";
import type { CareerRole } from "@/content/careers";
import { getCareerRoleHref } from "@/lib/careers";
import {
  careersBenefits,
  careersCta,
  careersCulture,
  careersHero,
  careersOpenings,
  careersValues,
  careersWhyJoin,
} from "@/content/careers";

type CareersPageProps = {
  roles: CareerRole[];
};

export default function CareersPage({ roles }: CareersPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  usePageReveal({ scope: rootRef });

  return (
    <div ref={rootRef}>
      <PageHero
        headingId="careers-hero-heading"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        breadcrumbTone="accent"
        breadcrumbCurrentClassName="text-ink"
        titleClassName="text-display-xl mt-0 mb-0 text-balance"
        title={
          <>
            {careersHero.headlineBefore}{" "}
            <span className="text-red">{careersHero.headlineAccent}</span>{" "}
            {careersHero.headlineAfter}
          </>
        }
        body={careersHero.body}
        copyAfterBody={
          <div data-animate="hero-copy">
            <Link
              href={careersHero.cta.href}
              className="text-cta tap-target mt-7 inline-flex min-h-12 items-center gap-3 bg-ink px-5 py-3.5 pl-6 text-white transition hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:mt-8 sm:gap-4 sm:py-4 sm:pl-7"
            >
              {careersHero.cta.label}
              <ArrowRightCircle size={28} strokeWidth={1.5} className="sm:size-8" aria-hidden />
            </Link>
          </div>
        }
        media={
          <>
            <ImageSlot
              asset={careersHero.image}
              priority
              className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <p
              className="pointer-events-none absolute top-1/2 right-4 z-[3] hidden max-h-[85%] -translate-y-1/2 overflow-hidden font-display text-[10px] leading-none font-bold tracking-[0.42em] text-red uppercase [writing-mode:vertical-rl] rotate-180 lg:block xl:right-6 xl:text-xs"
              aria-hidden
            >
              {careersHero.verticalMark}
            </p>
          </>
        }
        burstSrc={careersHero.burst}
        seam={{
          href: "#our-culture",
          ariaLabel: "Continue to our culture",
          arrowSrc: careersHero.arrow,
        }}
      />

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
            {roles.map((role) => (
              <li key={role.slug} className="border-b border-line">
                <Link
                  href={role.href ?? getCareerRoleHref(role.slug)}
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
                </Link>
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
                {roles.map((role) => (
                  <tr key={role.slug} className="group border-b border-line">
                    <td className="py-5 pr-4 align-middle">
                      <Link
                        href={role.href ?? getCareerRoleHref(role.slug)}
                        className="rounded-sm font-display text-base font-bold tracking-[0.03em] text-ink uppercase transition hover:text-red focus-visible:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red lg:text-lg"
                      >
                        {role.title}
                      </Link>
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
                      <Link
                        href={role.href ?? getCareerRoleHref(role.slug)}
                        tabIndex={-1}
                        aria-hidden
                        className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition group-hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                      >
                        <ArrowRight size={16} strokeWidth={2} aria-hidden />
                      </Link>
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
      <CTASection
        animate
        headingId="careers-cta-heading"
        titleBefore={careersCta.titleBefore}
        titleAccent={careersCta.titleAccent}
        primaryLabel={careersCta.button.label}
        primaryHref={careersCta.button.href}
        aside={
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
              <IconSlot asset={careersCta.culture.icon} tone="dark" size={48} className="flex-none" />
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
        }
      />
    </div>
  );
}
