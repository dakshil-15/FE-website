"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowRight, ArrowRightCircle, Calendar, Clock, User } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import InsightShareArticle from "@/components/insights/InsightShareArticle";
import {
  insightsCta,
  insightsFeaturedCard,
  insightsHero,
  type InsightArticle,
  type InsightPost,
} from "@/content/insights";
import type { InsightDetailSectionId, InsightDetailTab } from "@/lib/insights";
import { getFeaturedInsightCardHref, getInsightHref } from "@/lib/insights";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type InsightDetailPageProps = {
  article: InsightArticle;
  sectionTabs: InsightDetailTab[];
  relatedInsights: InsightPost[];
  featuredInsight: InsightPost | null;
  shareUrl: string;
};

const SECTION_NUMBERS: Record<InsightDetailSectionId, string> = {
  overview: "01",
  opportunity: "02",
  perspective: "03",
  pillars: "04",
  examples: "05",
  impact: "06",
  "whats-next": "07",
};

const SECTION_LABELS: Record<InsightDetailSectionId, string> = {
  overview: "Overview",
  opportunity: "The Opportunity",
  perspective: "Our Perspective",
  pillars: "Key Pillars",
  examples: "Real-World Examples",
  impact: "Impact",
  "whats-next": "What's Next",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function SectionLabel({
  id,
  onDark = false,
  headingId,
}: {
  id: InsightDetailSectionId;
  onDark?: boolean;
  headingId?: string;
}) {
  if (onDark) {
    return (
      <p id={headingId} className="text-eyebrow-on-dark m-0">
        {SECTION_NUMBERS[id]} {SECTION_LABELS[id]}
      </p>
    );
  }

  return (
    <p id={headingId} className="insight-section-label m-0">
      <span>{SECTION_NUMBERS[id]}</span>
      <span> {SECTION_LABELS[id]}</span>
    </p>
  );
}

function InsightNewsletterForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-0 border border-line bg-white" noValidate>
      <label htmlFor="insight-newsletter-email" className="sr-only">
        Email address for newsletter
      </label>
      <input
        id="insight-newsletter-email"
        type="email"
        name="email"
        placeholder="Enter your email"
        autoComplete="email"
        required
        className="field-control min-h-12 min-w-0 flex-1 border-0 bg-transparent px-4 py-3"
      />
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        className="tap-target grid w-12 flex-none place-items-center bg-ink text-white transition hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
      >
        <ArrowRight size={18} aria-hidden />
      </button>
    </form>
  );
}

export default function InsightDetailPage({
  article,
  sectionTabs,
  relatedInsights,
  featuredInsight,
  shareUrl,
}: InsightDetailPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabNavRef = useRef<HTMLDivElement>(null);
  const scrollLockRef = useRef<InsightDetailSectionId | null>(null);
  const [activeTab, setActiveTab] = useState<InsightDetailSectionId | null>(sectionTabs[0]?.id ?? null);
  const [stickyOffsets, setStickyOffsets] = useState({ header: 72, tabBar: 56, total: 136 });

  const showFeaturedCard = article.slug !== insightsFeaturedCard.slug;
  const featuredHref = getFeaturedInsightCardHref();

  useEffect(() => {
    setActiveTab(sectionTabs[0]?.id ?? null);
  }, [sectionTabs]);

  useEffect(() => {
    const header = document.querySelector("header");

    function updateOffsets() {
      const headerHeight = header?.getBoundingClientRect().height ?? 72;
      const tabBarHeight =
        sectionTabs.length > 0 ? tabBarRef.current?.getBoundingClientRect().height ?? 0 : 0;
      setStickyOffsets({
        header: headerHeight,
        tabBar: tabBarHeight,
        total: headerHeight + tabBarHeight + 12,
      });
    }

    updateOffsets();
    window.addEventListener("resize", updateOffsets);
    return () => window.removeEventListener("resize", updateOffsets);
  }, [sectionTabs.length]);

  useEffect(() => {
    if (sectionTabs.length === 0) return;

    let ticking = false;

    function resolveActiveTab() {
      ticking = false;

      if (scrollLockRef.current) {
        setActiveTab(scrollLockRef.current);
        return;
      }

      const offset = stickyOffsets.total + 8;
      let nextActive = sectionTabs[0]?.id ?? null;

      for (const tab of sectionTabs) {
        const section = document.getElementById(tab.id);
        if (!section) continue;
        if (section.getBoundingClientRect().top - offset <= 0) {
          nextActive = tab.id;
        }
      }

      setActiveTab((current) => (current === nextActive ? current : nextActive));
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(resolveActiveTab);
      }
    }

    resolveActiveTab();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionTabs, stickyOffsets.total]);

  useEffect(() => {
    if (!activeTab) return;

    const nav = tabNavRef.current;
    if (!nav) return;

    const activeButton = nav.querySelector<HTMLElement>(`[data-tab-id="${activeTab}"]`);
    if (!activeButton) return;

    const navRect = nav.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    if (buttonRect.left < navRect.left + 8 || buttonRect.right > navRect.right - 8) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      activeButton.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }
  }, [activeTab]);

  const scrollToElement = useCallback(
    (elementId: string) => {
      const target = document.getElementById(elementId);
      if (!target) return;

      const tab = sectionTabs.find((item) => item.id === elementId);
      if (tab) {
        scrollLockRef.current = tab.id;
        setActiveTab(tab.id);
      }

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = target.getBoundingClientRect().top + window.scrollY - stickyOffsets.total;
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });

      if (tab) {
        window.setTimeout(() => {
          scrollLockRef.current = null;
        }, 700);
      }
    },
    [sectionTabs, stickyOffsets.total],
  );

  const handleTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
      if (sectionTabs.length === 0) return;

      let nextIndex: number | null = null;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % sectionTabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + sectionTabs.length) % sectionTabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = sectionTabs.length - 1;
      }

      if (nextIndex === null) return;

      event.preventDefault();
      const nextTab = sectionTabs[nextIndex];
      scrollToElement(nextTab.id);
      tabNavRef.current?.querySelector<HTMLElement>(`[data-tab-id="${nextTab.id}"]`)?.focus();
    },
    [scrollToElement, sectionTabs],
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ reduceMotion: "(prefers-reduced-motion: reduce)" }, (context) => {
        const { reduceMotion } = context.conditions ?? {};

        if (reduceMotion) {
          gsap.set("[data-animate], [data-animate-stagger] > *", {
            clearProps: "all",
            autoAlpha: 1,
            y: 0,
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
            { autoAlpha: 1, scale: 1, duration: 0.55, clearProps: "scale" },
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
              { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.06, clearProps: "transform" },
            );
          }
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const eyebrow =
    article.categoryParent && article.categoryParent !== article.category
      ? `${article.categoryParent} → ${article.category}`
      : article.category;

  return (
    <div
      ref={rootRef}
      style={{ "--insight-sticky-offset": `${stickyOffsets.total}px` } as CSSProperties}
    >
      {/* Hero */}
      <section
        className="section-shell bg-paper pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-16"
        aria-labelledby="insight-hero-heading"
      >
        <div className="section-inner">
          <nav aria-label="Breadcrumb" data-animate="hero-copy" className="text-body-sm">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-muted">
              <li>
                <Link
                  href="/"
                  className="text-red transition hover:text-ink focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-line">
                /
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-red transition hover:text-ink focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                >
                  Insights
                </Link>
              </li>
              <li aria-hidden className="text-line">
                /
              </li>
              <li aria-current="page" className="max-w-full min-w-0 text-ink">
                <span className="line-clamp-2 sm:line-clamp-none" title={article.title}>
                  {article.title}
                </span>
              </li>
            </ol>
          </nav>

          <div className="relative mt-8 lg:mt-10">
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-0">
              <div className="relative z-[1] flex min-w-0 flex-col justify-center lg:pr-16 xl:pr-20">
                <p data-animate="hero-copy" className="text-eyebrow m-0">
                  {eyebrow}
                </p>
                <h1
                  id="insight-hero-heading"
                  data-animate="hero-copy"
                  className="text-display-xl mt-4 mb-0 text-balance"
                >
                  {article.headlineBefore}{" "}
                  <span className="text-red">{article.headlineAccent}</span>
                </h1>
                <p
                  data-animate="hero-copy"
                  className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[32rem] sm:mt-6"
                >
                  {article.excerpt}
                </p>

                <div
                  data-animate="hero-copy"
                  className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6"
                >
                  <ul
                    className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-2 p-0 sm:gap-x-6"
                    aria-label="Article details"
                  >
                    <li className="flex items-center gap-2 text-body-sm text-muted">
                      <Calendar size={15} className="flex-none text-red" aria-hidden />
                      <time dateTime={article.date}>{formatDate(article.date)}</time>
                    </li>
                    <li className="flex items-center gap-2 text-body-sm text-muted">
                      <Clock size={15} className="flex-none text-red" aria-hidden />
                      <span>
                        <span className="sr-only">Estimated reading time: </span>
                        {article.readTime}
                      </span>
                    </li>
                    <li className="flex items-center gap-2 text-body-sm text-muted">
                      <User size={15} className="flex-none text-red" aria-hidden />
                      <span>
                        <span className="sr-only">Author: </span>
                        {article.author}
                      </span>
                    </li>
                  </ul>
                  <InsightShareArticle title={article.title} shareUrl={shareUrl} />
                </div>
              </div>

              <div data-animate="hero-visual" className="relative z-[1] min-w-0 overflow-hidden">
                <ImageSlot
                  asset={article.heroImage}
                  priority
                  className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:min-h-[420px] lg:h-full"
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
                  {insightsHero.verticalMark}
                </p>
              </div>
            </div>

            <div
              data-animate="hero-seam"
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden size-[min(68%,20rem)] -translate-x-1/2 -translate-y-1/2 lg:block"
              aria-hidden
            >
              <Image
                src={insightsHero.burst}
                alt=""
                fill
                sizes="320px"
                unoptimized
                className="object-contain opacity-45"
              />
            </div>
            <button
              type="button"
              onClick={() => scrollToElement("overview")}
              data-animate="hero-seam"
              className="absolute top-1/2 left-1/2 z-20 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red max-lg:hidden"
              aria-label="Continue to article overview"
            >
              <Image src={insightsHero.arrow} alt="" aria-hidden width={56} height={56} unoptimized />
            </button>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      {sectionTabs.length > 0 ? (
        <div
          ref={tabBarRef}
          className="sticky z-40 border-b border-line bg-white/95 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-white/90"
          style={{ top: stickyOffsets.header }}
        >
          <div className="section-shell">
            <div
              ref={tabNavRef}
              className="section-inner overflow-x-auto overscroll-x-contain scroll-px-4 [-webkit-overflow-scrolling:touch] insight-detail-tab-nav"
            >
              <nav aria-label="Article sections" className="flex min-w-max gap-0">
                {sectionTabs.map((tab, index) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <a
                      key={tab.id}
                      href={`#${tab.id}`}
                      data-tab-id={tab.id}
                      aria-current={isActive ? "location" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToElement(tab.id);
                      }}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                      className={`text-cta tap-target-sm relative inline-flex min-h-11 items-center px-4 py-3 whitespace-nowrap transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:min-h-12 sm:px-5 sm:py-4 ${
                        isActive ? "text-red" : "text-muted hover:text-ink"
                      }`}
                    >
                      {tab.label}
                      {isActive ? (
                        <span
                          className="absolute right-4 bottom-0 left-4 h-0.5 bg-red sm:right-5 sm:left-5"
                          aria-hidden
                        />
                      ) : null}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main content + sidebar */}
      <section className="section-shell section-pad bg-white" aria-label="Article content">
        <div className="section-inner">
          <div className="insight-detail-grid">
            <div className="min-w-0">
              {article.overview ? (
                <section id="overview" aria-labelledby="overview-label" className="insight-section-anchor w-full">
                  <SectionLabel id="overview" headingId="overview-label" />
                  <h2 className="text-display-sm mt-4 mb-0 max-w-[42rem] text-balance">
                    {article.overview.headline}
                  </h2>
                  <p className="text-body section-copy-on-light mt-5 mb-0 max-w-none sm:mt-6">
                    {article.overview.body}
                  </p>
                  {article.overview.quote ? (
                    <blockquote className="insight-quote mt-8 sm:mt-10">
                      <span className="insight-quote-mark" aria-hidden>
                        &ldquo;
                      </span>
                      <p className="text-body relative z-[1] m-0 pt-4 font-medium text-ink sm:text-lg">
                        {article.overview.quote}
                      </p>
                    </blockquote>
                  ) : null}
                </section>
              ) : null}

              {article.opportunity.items.length > 0 ? (
                <section
                  id="opportunity"
                  aria-labelledby="opportunity-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <SectionLabel id="opportunity" headingId="opportunity-label" />
                  <h2 className="text-display-sm mt-4 mb-0">{article.opportunity.headline}</h2>
                  {article.opportunity.subheadline ? (
                    <p className="text-body section-copy-on-light mt-4 mb-0 max-w-[42rem]">
                      {article.opportunity.subheadline}
                    </p>
                  ) : null}
                  <ul
                    data-animate-stagger
                    className="m-0 mt-8 grid list-none grid-cols-1 gap-2.5 p-0 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {article.opportunity.items.map((item, index) => (
                      <li
                        key={`${item.title}-${index}`}
                        className="cap-card flex min-h-[200px] flex-col border border-line bg-mist p-5 text-center transition-[border-color] duration-200 hover:border-ink sm:p-6"
                      >
                        <div className="flex justify-center">
                          <IconSlot asset={item.icon} tone="accent" size={44} />
                        </div>
                        <h3 className="mt-5 mb-0 font-display text-sm font-bold tracking-[0.04em] uppercase sm:text-[15px]">
                          {item.title}
                        </h3>
                        <p className="text-body-sm mt-2 mb-0 text-muted">{item.body}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {article.perspective.items.length > 0 ? (
                <section
                  id="perspective"
                  aria-labelledby="perspective-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <SectionLabel id="perspective" headingId="perspective-label" />
                  <h2 className="text-display-sm mt-4 mb-0">{article.perspective.headline}</h2>
                  {article.perspective.subheadline ? (
                    <p className="text-body section-copy-on-light mt-4 mb-0 max-w-[42rem]">
                      {article.perspective.subheadline}
                    </p>
                  ) : null}
                  <ul
                    data-animate-stagger
                    className="m-0 mt-8 grid list-none grid-cols-1 gap-2.5 p-0 sm:mt-10 xs:grid-cols-2 xl:grid-cols-4"
                  >
                    {article.perspective.items.map((item, index) => (
                      <li
                        key={`${item.title}-${index}`}
                        className="cap-card flex min-h-[200px] flex-col border border-line bg-mist p-5 transition-[border-color] duration-200 hover:border-ink sm:p-6"
                      >
                        <IconSlot asset={item.icon} tone="accent" size={40} />
                        <h3 className="mt-5 mb-0 font-display text-sm font-bold tracking-[0.04em] uppercase sm:text-[15px]">
                          {item.title}
                        </h3>
                        <p className="text-body-sm mt-2 mb-0 text-muted">{item.body}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {article.pillars.some((pillar) => pillar.title?.trim() || pillar.body?.trim()) ? (
                <section
                  id="pillars"
                  aria-labelledby="pillars-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <SectionLabel id="pillars" headingId="pillars-label" />
                  <ul
                    className="insight-pillars-grid m-0 mt-8 list-none p-0 sm:mt-10"
                    aria-label="Key pillars"
                  >
                    {article.pillars
                      .filter((pillar) => pillar.title?.trim() || pillar.body?.trim())
                      .map((pillar) => (
                        <li
                          key={pillar.number}
                          className="relative min-h-[11rem] min-w-0 p-5 sm:min-h-[12rem] sm:p-6"
                        >
                          <span
                            className="pointer-events-none absolute top-3 right-3 font-display text-4xl leading-none font-bold text-line/70 select-none sm:top-4 sm:right-4 sm:text-5xl"
                            aria-hidden
                          >
                            {pillar.number}
                          </span>
                          <h3 className="relative z-[1] m-0 max-w-[85%] font-display text-sm font-bold tracking-[0.04em] uppercase sm:text-[15px]">
                            {pillar.title}
                          </h3>
                          <p className="text-body-sm relative z-[1] mt-3 mb-0 text-muted">{pillar.body}</p>
                        </li>
                      ))}
                  </ul>
                </section>
              ) : null}

              {article.examples.items.length > 0 ? (
                <section
                  id="examples"
                  aria-labelledby="examples-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <SectionLabel id="examples" headingId="examples-label" />
                  <h2 className="text-display-sm mt-4 mb-0">{article.examples.headline}</h2>
                  {article.examples.subheadline ? (
                    <p className="text-body section-copy-on-light mt-4 mb-0 max-w-[42rem]">
                      {article.examples.subheadline}
                    </p>
                  ) : null}
                  <ul
                    data-animate-stagger
                    className="m-0 mt-8 grid list-none grid-cols-1 gap-2.5 p-0 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {article.examples.items.map((item, index) => (
                      <li
                        key={`${item.title}-${index}`}
                        className="cap-card flex min-w-0 flex-col overflow-hidden border border-line bg-white transition-[border-color] duration-200 hover:border-ink"
                      >
                        <ImageSlot
                          asset={item.image}
                          className="aspect-[16/10] w-full"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="flex flex-1 flex-col p-5">
                          <p className="insight-tag m-0 text-red">{item.category}</p>
                          <h3 className="mt-2 mb-0 font-display text-sm font-bold tracking-[0.04em] uppercase sm:text-[15px]">
                            {item.title}
                          </h3>
                          <p className="text-body-sm mt-2 mb-0 text-muted">{item.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 sm:mt-10">
                    <Link
                      href={article.examples.cta.href}
                      className="text-cta gsap-btn inline-flex min-h-12 w-full items-center justify-center gap-3 border border-red px-6 py-3 text-red transition hover:bg-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:w-auto"
                    >
                      {article.examples.cta.label}
                      <ArrowRightCircle size={24} strokeWidth={1.5} aria-hidden />
                    </Link>
                  </div>
                </section>
              ) : null}

              {article.impact.stats.length > 0 ? (
                <section
                  id="impact"
                  aria-labelledby="impact-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <div className="insight-impact-banner px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
                    <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between xl:gap-12">
                      <div className="min-w-0 xl:max-w-[20rem]">
                        <SectionLabel id="impact" onDark headingId="impact-label" />
                        <h2 className="text-display-sm mt-3 mb-0 text-white">{article.impact.headline}</h2>
                        {article.impact.subheadline ? (
                          <p className="text-body mt-3 mb-0 text-muted-on-dark">{article.impact.subheadline}</p>
                        ) : null}
                      </div>
                      <dl className="m-0 grid w-full min-w-0 grid-cols-2 gap-x-4 gap-y-6 p-0 sm:gap-x-6 sm:gap-y-8 xl:flex-1">
                        {article.impact.stats.map((stat) => (
                          <div key={stat.label} className="min-w-0 text-center sm:text-left">
                            <dt className="sr-only">{stat.label}</dt>
                            <dd className="insight-impact-stat m-0 text-red">{stat.value}</dd>
                            <dd className="text-body-sm mt-1 mb-0 font-normal text-muted-on-dark" aria-hidden>
                              {stat.label}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </section>
              ) : null}

              {article.whatsNext?.trim() ? (
                <section
                  id="whats-next"
                  aria-labelledby="whats-next-label"
                  className="insight-section-anchor mt-12 w-full sm:mt-16"
                >
                  <SectionLabel id="whats-next" headingId="whats-next-label" />
                  <div className="mt-5 grid grid-cols-1 gap-6 sm:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-start lg:gap-8">
                    <p className="text-body section-copy-on-light m-0 max-w-none">{article.whatsNext}</p>
                    <aside className="border border-line bg-mist p-5 sm:p-6" aria-label="Get in touch">
                      <p className="m-0 font-display text-lg leading-snug font-bold tracking-[0.01em] uppercase text-balance sm:text-xl">
                        {insightsCta.titleBefore}{" "}
                        <span className="text-red">{insightsCta.titleAccent}</span>
                      </p>
                      <p className="text-body-sm mt-3 mb-0 text-muted">{insightsCta.body}</p>
                      <Link
                        href={insightsCta.button.href}
                        className="text-cta gsap-btn tap-target mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-red px-6 py-3 text-white transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:w-auto"
                      >
                        {insightsCta.button.label}
                        <ArrowRightCircle size={22} strokeWidth={1.5} aria-hidden />
                      </Link>
                    </aside>
                  </div>
                </section>
              ) : null}
            </div>

            <aside
              className="min-w-0 lg:sticky lg:max-h-[calc(100dvh-var(--insight-sticky-offset,8.5rem)-1rem)] lg:self-start lg:overflow-y-auto"
              style={{ top: stickyOffsets.total }}
              aria-label="Article sidebar"
            >
              {showFeaturedCard ? (
                <div className="overflow-hidden border border-line bg-ink text-white">
                  <div className="p-5 sm:p-6">
                    <p className="text-eyebrow-on-dark m-0">{insightsFeaturedCard.eyebrow}</p>
                    <span className="insight-tag mt-4 inline-block border border-white/40 px-3 py-1 text-white">
                      {insightsFeaturedCard.tag}
                    </span>
                    <h3 className="mt-4 mb-0 font-display text-lg leading-snug font-bold tracking-[0.01em] text-balance sm:text-xl">
                      {insightsFeaturedCard.title}
                    </h3>
                    <Link
                      href={featuredHref}
                      className="text-cta link-cta mt-5 inline-flex items-center gap-2 text-white"
                    >
                      Read more
                      <ArrowRight size={14} aria-hidden />
                    </Link>
                  </div>
                  <ImageSlot
                    asset={insightsFeaturedCard.image}
                    className="aspect-[16/10] w-full"
                    sizes="360px"
                  />
                </div>
              ) : featuredInsight ? (
                <div className="border border-line bg-white p-5 sm:p-6">
                  <h2 className="text-eyebrow m-0 text-ink">Featured insight</h2>
                  <Link
                    href={featuredInsight.href ?? getInsightHref(featuredInsight.slug)}
                    className="group mt-4 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                  >
                    <ImageSlot
                      asset={
                        featuredInsight.thumbnail ?? {
                          alt: featuredInsight.title,
                          label: `${featuredInsight.title} thumbnail`,
                        }
                      }
                      className="aspect-[16/10] w-full"
                      sizes="360px"
                    />
                    <h3 className="mt-4 mb-0 font-display text-sm font-bold tracking-[0.02em] uppercase transition group-hover:text-red sm:text-[15px]">
                      {featuredInsight.title}
                    </h3>
                    <span className="text-cta link-cta mt-3 inline-flex items-center gap-2 text-ink">
                      Read more
                      <ArrowRight size={14} aria-hidden />
                    </span>
                  </Link>
                </div>
              ) : null}

              {relatedInsights.length > 0 ? (
                <div className="mt-6 border border-line bg-white p-5 sm:mt-8 sm:p-6">
                  <h2 className="text-eyebrow m-0 text-ink">Related insights</h2>
                  <ul className="m-0 mt-4 grid list-none gap-5 p-0">
                    {relatedInsights.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={post.href ?? getInsightHref(post.slug)}
                          className="group flex gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                        >
                          <ImageSlot
                            asset={
                              post.thumbnail ?? {
                                alt: post.title,
                                label: `${post.title} thumbnail`,
                              }
                            }
                            className="aspect-square w-16 shrink-0 sm:w-20"
                            sizes="80px"
                          />
                          <div className="min-w-0">
                            <p className="insight-tag m-0 text-red">{post.category}</p>
                            <p className="mt-1 mb-0 font-display text-xs font-bold leading-snug tracking-[0.01em] uppercase transition group-hover:text-red sm:text-sm">
                              {post.title}
                            </p>
                            <span className="text-cta link-cta mt-2 inline-flex items-center gap-1.5 text-ink">
                              Read more
                              <ArrowRight size={12} aria-hidden />
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-6 border border-line bg-white p-5 sm:mt-8 sm:p-6">
                <h2 className="text-eyebrow m-0 text-ink">Stay updated</h2>
                <p className="text-body-sm mt-3 mb-0 text-muted">
                  Get perspectives on growth, media and technology delivered to your inbox.
                </p>
                <InsightNewsletterForm />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
