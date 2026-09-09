"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { MediaSlot } from "@/content/about";
import type { CaseStudy } from "@/content/types";
import { workCardImage } from "@/content/workPage";

type WorkHeroCarouselProps = {
  caseStudies: CaseStudy[];
  className?: string;
  sizes?: string;
  interval?: number;
  priority?: boolean;
};

type Slide = { slug: string; asset: MediaSlot & { src: string } };

/** Cycles through case-study thumbnails, one at a time, filling the hero media slot. */
export default function WorkHeroCarousel({
  caseStudies,
  className = "",
  sizes = "100vw",
  interval = 1600,
  priority = false,
}: WorkHeroCarouselProps) {
  const slides: Slide[] = caseStudies
    .map((caseStudy) => ({ slug: caseStudy.slug, asset: workCardImage(caseStudy) }))
    .filter((slide): slide is Slide => Boolean(slide.asset.src));

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [interval, slides.length]);

  if (slides.length === 0) return null;

  const current = slides[index % slides.length]!;
  const fit = current.asset.fit === "contain" ? "object-contain" : "object-cover";
  const grayscale = current.asset.grayscale ?? false;

  return (
    <div className={`relative overflow-hidden bg-mist ${className}`.trim()}>
      <div key={current.slug} className="work-hero-carousel__slide absolute inset-0">
        <Image
          src={current.asset.src}
          alt={current.asset.alt}
          fill
          sizes={sizes}
          priority={priority && index === 0}
          className={`${fit} ${grayscale ? "grayscale" : ""}`.trim()}
        />
      </div>
    </div>
  );
}
