"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Bookmark } from "lucide-react";

const posts = [
  {
    slug: "future-of-performance-marketing-in-an-ai-powered-world",
    category: "Media",
    title: "The Future of Performance Marketing in an AI-Powered World",
    date: "May 12, 2026",
    readTime: "6 min read",
    photo: "/images/insights/ai-data.png",
  },
  {
    slug: "why-influencer-marketing-needs-real-intelligence",
    category: "Strategy",
    title: "Why Influencer Marketing Needs Real Intelligence",
    date: "May 8, 2026",
    readTime: "5 min read",
    photo: "/images/insights/media-intelligence.png",
  },
  {
    slug: "retail-media-networks-the-next-growth-engine",
    category: "Performance",
    title: "Retail Media Networks: The Next Growth Engine",
    date: "May 5, 2026",
    readTime: "7 min read",
    photo: "/images/insights/retail-media.png",
  },
  {
    slug: "building-growth-systems-not-service-silos",
    category: "Technology",
    title: "Building Growth Systems, Not Service Silos",
    date: "May 1, 2026",
    readTime: "4 min read",
    photo: "/images/insights/growth-systems.png",
  },
];

export default function InsightsSection() {
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
    <section
      id="insights"
      data-animate-section
      className="section-shell section-pad bg-ink text-white"
      aria-labelledby="insights-heading"
    >
      <div className="section-inner">
        <p data-animate="fade-up" className="text-eyebrow m-0">
          Intelligence
        </p>
        <div className="section-intro">
          <h2 data-animate="fade-up" id="insights-heading" className="text-display-md m-0">
            Intelligence that
            <br />
            drives growth.
          </h2>
          <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
            <p className="text-body section-copy section-copy-on-dark m-0">
              Perspectives on media, strategy, performance and technology — the systems that turn attention into
              outcomes.
            </p>
            <Link href="/insights" className="text-cta link-cta text-white">
              All insights
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>

        <div data-animate="fade-up" className="section-media relative w-full">
          <div
            ref={trackRef}
            onScroll={syncScrollState}
            className="work-rail w-full"
            role="region"
            aria-roledescription={canScroll ? "carousel" : undefined}
            aria-label="Featured insights"
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
            {posts.map((post) => (
              <Link
                key={post.slug}
                href="/insights"
                className="group flex h-full min-h-[340px] flex-col overflow-hidden rounded-[20px] border border-white/15 bg-white text-ink shadow-[0_14px_44px_rgba(0,0,0,0.45)] transition duration-200 hover:border-red/50 hover:shadow-[0_18px_48px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:min-h-[360px] sm:rounded-[22px] lg:min-h-[380px]"
                aria-label={`${post.title}. ${post.date}. ${post.readTime}`}
              >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-mist">
                  <Image
                    src={post.photo}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 900px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span
                    className="absolute top-0 right-4 z-10 flex h-11 w-8 items-start justify-center bg-red pt-2.5 text-white shadow-[0_4px_10px_rgba(210,37,37,0.35)]"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)",
                    }}
                    aria-hidden
                  >
                    <Bookmark size={15} strokeWidth={2.25} fill="currentColor" />
                  </span>
                </div>

                <div className="flex min-h-0 flex-1 flex-col px-5 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-6">
                  <p className="m-0 font-display text-[12px] font-bold tracking-[0.14em] text-red uppercase">
                    {post.category}
                  </p>
                  <p className="mt-3 mb-0 line-clamp-3 min-h-[3.6em] font-display text-[1.05rem] leading-[1.2] font-bold tracking-[0.01em] text-ink sm:text-[1.125rem]">
                    {post.title}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <p className="m-0 text-[13px] leading-snug text-muted">
                      {post.date}
                      <span className="mx-1.5 text-[#8a8a8a]" aria-hidden>
                        •
                      </span>
                      {post.readTime}
                    </p>
                    <span
                      className="grid h-9 w-9 flex-none place-items-center rounded-full border-[1.5px] border-[#e8a0a0] text-ink transition duration-200 group-hover:border-red group-hover:bg-red group-hover:text-white"
                      aria-hidden
                    >
                      <ArrowRight size={15} strokeWidth={2.25} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {canScroll ? (
            <>
              <button
                type="button"
                aria-label="Previous insight"
                aria-disabled={atStart}
                disabled={atStart}
                onClick={() => scrollByDir(-1)}
                className="tap-target absolute top-[42%] left-2 z-10 grid -translate-y-1/2 place-items-center rounded-full border border-white/55 bg-ink/70 text-white shadow-lg backdrop-blur-sm transition hover:border-red hover:text-red disabled:pointer-events-none disabled:opacity-40 sm:left-3"
              >
                <ArrowLeft size={17} aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next insight"
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
            aria-label="Insight slides"
          >
            <span className="sr-only" aria-live="polite">
              Showing {posts[active]?.title}
            </span>
            {posts.map((post, i) => (
              <button
                key={post.slug}
                type="button"
                aria-label={`Go to ${post.title}`}
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
    </section>
  );
}
