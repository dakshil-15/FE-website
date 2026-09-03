"use client";

import Image from "next/image";
import { Building2, Calendar, Layers, Network, type LucideIcon } from "lucide-react";
import type { RefObject } from "react";
import PageHero from "@/components/PageHero";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import type { WorkDetailModel } from "@/content/workDetail";
import { workHero } from "@/content/workPage";

type WorkDetailHeroProps = {
  caseStudy: WorkDetailModel["caseStudy"];
  title: WorkDetailModel["title"];
  familyLabel: WorkDetailModel["familyLabel"];
  familyOverviewLabel: WorkDetailModel["familyOverviewLabel"];
  tags: WorkDetailModel["tags"];
  industryName: WorkDetailModel["industryName"];
  servicesUsed: WorkDetailModel["servicesUsed"];
  heroImage: WorkDetailModel["heroImage"];
  displayTitle: string;
  flipTargetRef: RefObject<HTMLDivElement | null>;
  flipEntrance: boolean;
  firstSectionId: string;
  scrollToElement: (elementId: string) => void;
};

export default function WorkDetailHero({
  caseStudy,
  title,
  familyLabel,
  familyOverviewLabel,
  tags,
  industryName,
  servicesUsed,
  heroImage,
  displayTitle,
  flipTargetRef,
  flipEntrance,
  firstSectionId,
  scrollToElement,
}: WorkDetailHeroProps) {
  const overviewItems = [
    caseStudy.year
      ? { label: "Year", value: String(caseStudy.year), Icon: Calendar }
      : null,
    { label: "Industry", value: industryName, Icon: Building2 },
    {
      label: "Services",
      value: servicesUsed.length ? servicesUsed.join(" · ") : tags.slice(0, 3).join(" · "),
      Icon: Layers,
    },
    { label: "Family", value: familyOverviewLabel, Icon: Network },
  ].filter(Boolean) as { label: string; value: string; Icon: LucideIcon }[];

  return (
    <PageHero
      headingId="work-detail-heading"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Work", href: "/work" },
        { label: title, title, clamp: true },
      ]}
      breadcrumbTone="accent"
      breadcrumbCurrentClassName="text-ink"
      eyebrow={familyLabel}
      title={
        caseStudy.hashtag ? (
          <>
            {caseStudy.campaign}{" "}
            <span className="text-red">{caseStudy.hashtag}</span>
          </>
        ) : (
          displayTitle
        )
      }
      body={caseStudy.hero}
      bodyClassName="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[32rem] sm:mt-6"
      copyAfterBody={
        <>
          <ul
            data-animate="hero-copy"
            className="mt-6 mb-0 flex list-none flex-wrap gap-2 p-0"
            aria-label="Campaign tags"
          >
            {tags.map((tag) => (
              <li key={tag} className="insight-tag border border-line px-3 py-1 text-ink">
                {tag}
              </li>
            ))}
          </ul>

          <ul
            data-animate="hero-copy"
            className="m-0 mt-6 flex list-none flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 p-0 sm:mt-8 sm:gap-x-6"
            aria-label="Campaign overview"
          >
            {overviewItems.map(({ label, value, Icon }) => (
              <li key={label} className="flex items-center gap-2 text-body-sm text-muted">
                <Icon size={15} className="flex-none text-red" aria-hidden />
                <span>
                  <span className="sr-only">{label}: </span>
                  {value}
                </span>
              </li>
            ))}
          </ul>

          {caseStudy.clientLogo ? (
            <div data-animate="hero-copy" className="mt-6 sm:mt-7">
              <Image
                src={caseStudy.clientLogo}
                alt={caseStudy.client}
                width={140}
                height={48}
                className="h-9 w-auto object-contain sm:h-10"
              />
            </div>
          ) : (
            <p
              data-animate="hero-copy"
              className="text-body-sm mt-6 mb-0 font-semibold tracking-wide text-muted sm:mt-7"
            >
              {caseStudy.client}
            </p>
          )}
        </>
      }
      gridClassName="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-0"
      copyColumnClassName="relative z-[1] flex min-w-0 flex-col justify-center lg:pr-20 xl:pr-24"
      mediaColumnClassName="relative z-[1] min-w-0"
      media={
        <div aria-busy={flipEntrance || undefined}>
          <div
            ref={flipTargetRef}
            data-work-flip-target={caseStudy.slug}
            className="relative h-full min-h-0 overflow-hidden"
          >
            <ImageSlot
              asset={heroImage}
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
      }
      burstSrc={workHero.burst}
      burstClassName="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden size-[min(58%,17rem)] -translate-x-1/2 -translate-y-1/2 lg:block xl:size-[min(68%,20rem)]"
      seam={{
        onClick: () => scrollToElement(firstSectionId),
        ariaLabel: "Continue to case study",
        arrowSrc: workHero.arrow,
      }}
    />
  );
}
