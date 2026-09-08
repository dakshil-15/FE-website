"use client";

import Image from "next/image";
import { useRef, useState, type RefObject } from "react";
import { Play } from "lucide-react";
import PageHero from "@/components/PageHero";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import type { WorkDetailModel } from "@/content/workDetail";
import { workHero } from "@/content/workPage";

type WorkDetailHeroProps = {
  caseStudy: WorkDetailModel["caseStudy"];
  title: WorkDetailModel["title"];
  familyLabel: WorkDetailModel["familyLabel"];
  tags: WorkDetailModel["tags"];
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
  tags,
  heroImage,
  displayTitle,
  flipTargetRef,
  flipEntrance,
  firstSectionId,
  scrollToElement,
}: WorkDetailHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const heroClip =
    caseStudy.heroVideo
      ? caseStudy.videos?.[0] ?? caseStudy.video
      : undefined;

  const frameClassName =
    heroImage.fit === "contain"
      ? caseStudy.slug === "royale-touche-stay-curious"
        ? "aspect-video w-full bg-[#1a1410]"
        : "aspect-[1024/724] w-full bg-[#0a3d5c]"
      : "aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]";

  const playHeroVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

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
        caseStudy.hashtag &&
        caseStudy.hashtag.toLowerCase() !== caseStudy.campaign.toLowerCase() ? (
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

          {caseStudy.clientLogo ? (
            <div data-animate="hero-copy" className="mt-6 sm:mt-7">
              <Image
                src={caseStudy.clientLogo}
                alt={caseStudy.client}
                width={200}
                height={200}
                className={
                  ["royale-touche-stay-curious", "fedex-csk"].includes(caseStudy.slug)
                    ? "h-16 w-auto object-contain sm:h-20"
                    : "h-9 w-auto object-contain sm:h-10"
                }
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
      gridClassName={
        heroImage.fit === "contain" || heroClip
          ? "grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-0"
          : "grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-0"
      }
      copyColumnClassName="relative z-[1] flex min-w-0 flex-col justify-center lg:pr-20 xl:pr-24"
      mediaColumnClassName="relative z-[1] min-w-0 overflow-hidden"
      media={
        <div aria-busy={flipEntrance || undefined} className="h-full">
          <div
            ref={flipTargetRef}
            data-work-flip-target={caseStudy.slug}
            className="relative h-full min-h-0 overflow-hidden"
          >
            {heroClip?.src ? (
              <div className={`relative overflow-hidden ${frameClassName}`}>
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  playsInline
                  preload="metadata"
                  poster={heroClip.poster ?? heroImage.src}
                  controls={playing}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                  aria-label={heroClip.title}
                >
                  <source src={heroClip.src} type="video/mp4" />
                </video>

                {!playing ? (
                  <button
                    type="button"
                    onClick={playHeroVideo}
                    className="absolute inset-0 flex items-center justify-center bg-ink/25 transition hover:bg-ink/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-red"
                    aria-label={`Play ${heroClip.title}`}
                  >
                    <span className="grid size-14 place-items-center rounded-full bg-red text-white shadow-[0_10px_28px_rgba(210,37,37,0.4)] sm:size-16 lg:size-[4.5rem]">
                      <Play
                        size={28}
                        fill="currentColor"
                        className="translate-x-0.5 sm:size-8"
                        aria-hidden
                      />
                    </span>
                  </button>
                ) : null}
              </div>
            ) : (
              <ImageSlot
                asset={{
                  ...heroImage,
                  // Match frame to the banner so cover fills without cropping type/logos.
                  fit: heroImage.fit === "contain" ? "cover" : heroImage.fit,
                }}
                priority
                className={frameClassName}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      }
      burstSrc={workHero.burst}
      showMediaRule={false}
      seam={{
        onClick: () => scrollToElement(firstSectionId),
        ariaLabel: "Continue to case study",
        arrowSrc: workHero.arrow,
      }}
    />
  );
}
