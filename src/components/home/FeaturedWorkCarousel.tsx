"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** Featured work — metrics pulled from real case study results only */
const cases = [
  {
    href: "/work/godrej-blue",
    src: "/assets/case-1.png",
    tag: "360° Campaign",
    title: "Godrej Blue",
    industry: "Real Estate",
    metric: "1,000+",
    metricLabel: "Influencers live in one hour",
  },
  {
    href: "/work/fedex-csk",
    src: "/assets/case-2.png",
    tag: "Brand Recall",
    title: "FedEx",
    industry: "Consumer & Retail",
    metric: "1.2B+",
    metricLabel: "Impressions",
  },
  {
    href: "/work/royale-touche-stay-curious",
    src: "/assets/case-3.png",
    tag: "Integrated Campaign",
    title: "Royale Touché",
    industry: "Consumer & Retail",
    metric: "120K",
    metricLabel: "Reddit impressions",
  },
  {
    href: "/work/poonawalla-ai-creatives",
    src: "/assets/case-4.png",
    tag: "AI Creative",
    title: "Poonawalla Fincorp",
    industry: "BFSI",
    metric: "30s",
    metricLabel: "AI-crafted festive story reels",
  },
];

export default function FeaturedWorkCarousel() {
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

  function scrollToIndex(index: number) {
    const el = trackRef.current;
    if (!el || !canScroll) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }

  return (
    <div>
      <div className="relative w-full">
        <div
          ref={trackRef}
          onScroll={syncScrollState}
          className="work-rail w-full"
          role="region"
          aria-roledescription={canScroll ? "carousel" : undefined}
          aria-label="Featured case studies"
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
              key={item.title}
              href={item.href}
              className="group flex h-full min-h-[360px] flex-col overflow-hidden rounded-[20px] border border-white/15 bg-white shadow-[0_14px_44px_rgba(0,0,0,0.45)] transition duration-200 hover:border-red/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:min-h-[380px]"
              aria-label={`${item.title}: ${item.metric} ${item.metricLabel}. ${item.tag} · ${item.industry}`}
            >
              <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-[#111]">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 900px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                />
                <span
                  className="absolute top-3.5 right-3.5 grid h-9 w-9 place-items-center rounded-full border border-white/85 bg-black/40 text-white backdrop-blur-[2px] transition duration-200 group-hover:border-red group-hover:bg-red"
                  aria-hidden
                >
                  <ArrowRight size={15} strokeWidth={2.25} />
                </span>
              </div>

              <div className="flex min-h-[8.5rem] flex-1 items-stretch bg-white px-5 py-5 sm:min-h-[9rem] sm:px-6 sm:py-6">
                <div className="min-w-0 flex-[1.2] pr-4 sm:pr-5">
                  <p className="m-0 text-[11px] font-bold tracking-[0.08em] text-red uppercase">
                    {item.tag}
                  </p>
                  <p className="mt-2 mb-0 font-display text-[1.1rem] leading-[1.12] font-bold tracking-[0.02em] text-ink uppercase sm:text-[1.2rem]">
                    {item.title}
                  </p>
                  <p className="mt-2 mb-0 text-[13px] leading-snug text-muted">{item.industry}</p>
                </div>

                <div className="w-px shrink-0 self-stretch bg-[#e8e8e8]" aria-hidden />

                <div className="flex min-w-0 flex-1 flex-col justify-center pl-4 sm:pl-5">
                  <p className="m-0 font-display text-[1.5rem] leading-none font-bold tracking-tight text-red sm:text-[1.65rem]">
                    {item.metric}
                  </p>
                  <p className="mt-2 mb-0 text-[13px] leading-snug text-muted">{item.metricLabel}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {canScroll ? (
          <>
            <button
              type="button"
              aria-label="Previous case study"
              aria-disabled={atStart}
              disabled={atStart}
              onClick={() => scrollByDir(-1)}
              className="tap-target absolute top-[42%] left-2 z-10 grid -translate-y-1/2 place-items-center rounded-full border border-white/55 bg-ink/70 text-white shadow-lg backdrop-blur-sm transition hover:border-red hover:text-red disabled:pointer-events-none disabled:opacity-40 sm:left-3"
            >
              <ArrowLeft size={17} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next case study"
              aria-disabled={atEnd}
              disabled={atEnd}
              onClick={() => scrollByDir(1)}
              className="tap-target absolute top-[42%] right-2 z-10 grid -translate-y-1/2 place-items-center rounded-full border border-white/55 bg-ink/70 text-white shadow-lg backdrop-blur-sm transition hover:border-red hover:text-red disabled:pointer-events-none disabled:opacity-40 sm:right-3"
            >
              <ArrowRight size={17} aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {canScroll ? (
        <div
          className="mt-6 flex items-center justify-center gap-1 sm:mt-7"
          role="group"
          aria-label="Case study slides"
        >
          <span className="sr-only" aria-live="polite">
            Showing {cases[active]?.title}
          </span>
          {cases.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Go to ${item.title}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => scrollToIndex(i)}
              className="tap-target grid place-items-center rounded-full"
            >
              <span
                className={`block h-2.5 w-2.5 rounded-full transition ${
                  i === active ? "bg-red" : "border border-[#8a8a8a] bg-transparent hover:border-white"
                }`}
                aria-hidden
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
