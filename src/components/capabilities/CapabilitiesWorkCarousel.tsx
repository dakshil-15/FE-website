"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import type { CapabilityCaseStudy } from "@/content/capabilities";

export default function CapabilitiesWorkCarousel({ cases }: { cases: CapabilityCaseStudy[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const overflow = el.scrollWidth - el.clientWidth > 2;
    setCanScroll(overflow);

    if (!overflow) {
      setActive(0);
      setAtStart(true);
      setAtEnd(true);
      return;
    }

    const card = el.firstElementChild as HTMLElement | null;
    const styles = window.getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "20") || 20;
    const step = card ? card.offsetWidth + gap : el.clientWidth;
    setActive(Math.round(el.scrollLeft / step));
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    syncScrollState();
    const observer = new ResizeObserver(syncScrollState);
    observer.observe(el);
    window.addEventListener("resize", syncScrollState);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncScrollState);
    };
  }, [syncScrollState]);

  function scrollByDir(dir: number) {
    const el = trackRef.current;
    if (!el || !canScroll) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const styles = window.getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "20") || 20;
    const step = card.offsetWidth + gap;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({
      left: Math.max(0, Math.min(max, el.scrollLeft + dir * step)),
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={syncScrollState}
        className="work-rail w-full"
        role="region"
        aria-roledescription={canScroll ? "carousel" : undefined}
        aria-label="Capabilities case studies"
        tabIndex={canScroll ? 0 : undefined}
        onKeyDown={
          canScroll
            ? (e) => {
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  scrollByDir(-1);
                }
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  scrollByDir(1);
                }
              }
            : undefined
        }
      >
        {cases.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="group flex min-h-[22rem] flex-col justify-between overflow-hidden border border-line bg-ink p-6 text-paper transition hover:border-red sm:min-h-[24rem]"
          >
            <div className="relative mb-6 aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#111]">
              {item.image.src ? (
                <ImageSlot
                  asset={item.image}
                  className="absolute inset-0 h-full w-full border-0"
                  sizes="(max-width: 640px) 86vw, 32vw"
                />
              ) : (
                <ImageSlot
                  asset={item.image}
                  className="h-full w-full border-0 bg-[#161616]"
                  sizes="(max-width: 640px) 86vw, 32vw"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.12em] text-paper/50 uppercase">{item.client}</p>
                  <h3 className="mt-2 mb-0 font-display text-2xl leading-none tracking-wide md:text-3xl">
                    {item.title}
                  </h3>
                </div>
                <span
                  className="mt-1 shrink-0 text-2xl text-paper/40 transition group-hover:translate-x-1 group-hover:text-red"
                  aria-hidden
                >
                  &rarr;
                </span>
              </div>
              <p className="text-body-sm mt-4 mb-0 line-clamp-2 text-paper/70">{item.body}</p>
            </div>
          </Link>
        ))}
      </div>

      {canScroll ? (
        <>
          <button
            type="button"
            aria-label="Previous case study"
            disabled={atStart}
            onClick={() => scrollByDir(-1)}
            className="absolute top-1/2 left-0 z-10 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-ink shadow-sm transition hover:border-red hover:text-red disabled:opacity-40 sm:size-11"
          >
            <ArrowLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next case study"
            disabled={atEnd}
            onClick={() => scrollByDir(1)}
            className="absolute top-1/2 right-0 z-10 grid size-10 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-ink shadow-sm transition hover:border-red hover:text-red disabled:opacity-40 sm:size-11"
          >
            <ArrowRight size={18} aria-hidden />
          </button>

          <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Case study slides">
            {cases.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to ${item.client}`}
                onClick={() => {
                  const el = trackRef.current;
                  const card = el?.children[i] as HTMLElement | undefined;
                  if (el && card) el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
                }}
                className={`h-1.5 rounded-full transition ${
                  i === active ? "w-6 bg-red" : "w-1.5 bg-line hover:bg-muted"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
