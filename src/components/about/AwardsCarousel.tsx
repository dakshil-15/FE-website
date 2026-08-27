"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { aboutAwards } from "@/content/about";

export default function AwardsCarousel() {
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
          aria-label="Awards and recognition"
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
          {aboutAwards.map((award) => (
            <Link
              key={`${award.client}-${award.title}`}
              href={award.href}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white transition duration-200 hover:border-red/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:rounded-[22px]"
              aria-label={`${award.client}: ${award.title}`}
            >
              <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-[#111]">
                {award.image.src ? (
                  <Image
                    src={award.image.src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-contain p-4 transition duration-500 group-hover:scale-[1.04] sm:p-5"
                  />
                ) : null}
              </div>

              <div className="flex min-h-[6.25rem] flex-1 flex-col justify-center px-5 py-4 sm:min-h-[6.75rem] sm:px-6 sm:py-5">
                <p className="m-0 font-display text-[1.05rem] leading-[1.12] font-bold tracking-[0.02em] text-ink uppercase sm:text-[1.15rem]">
                  {award.client}
                </p>
                <p className="mt-2 mb-0 text-[13px] leading-snug text-muted">{award.title}</p>
              </div>
            </Link>
          ))}
        </div>

        {canScroll ? (
          <>
            <button
              type="button"
              aria-label="Previous awards"
              aria-disabled={atStart}
              disabled={atStart}
              onClick={() => scrollByDir(-1)}
              className="tap-target absolute top-[42%] left-2 z-10 grid -translate-y-1/2 place-items-center rounded-full border border-line bg-paper text-ink shadow-lg transition hover:border-red hover:text-red disabled:pointer-events-none disabled:opacity-40 sm:left-3"
            >
              <ArrowLeft size={17} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next awards"
              aria-disabled={atEnd}
              disabled={atEnd}
              onClick={() => scrollByDir(1)}
              className="tap-target absolute top-[42%] right-2 z-10 grid -translate-y-1/2 place-items-center rounded-full border border-line bg-paper text-ink shadow-lg transition hover:border-red hover:text-red disabled:pointer-events-none disabled:opacity-40 sm:right-3"
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
          aria-label="Award slides"
        >
          <span className="sr-only" aria-live="polite">
            Showing {aboutAwards[active]?.client}
          </span>
          {aboutAwards.map((award, i) => (
            <button
              key={`${award.client}-${award.title}`}
              type="button"
              aria-label={`Go to ${award.client}: ${award.title}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => scrollToIndex(i)}
              className="tap-target grid place-items-center rounded-full"
            >
              <span
                className={`block h-2.5 w-2.5 rounded-full transition ${
                  i === active ? "bg-red" : "border border-line bg-transparent hover:border-ink"
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
