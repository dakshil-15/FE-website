"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  ArrowRight,
  ArrowRightCircle,
  Briefcase,
  Clock,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CareerApplyForm from "@/components/careers/CareerApplyForm";
import CareerShareJob from "@/components/careers/CareerShareJob";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import type { CareerRole, CareerRoleDetail } from "@/content/careers";
import type { CareerDetailSectionId, CareerDetailTab } from "@/lib/careers";
import { getCareerRoleHref, getFirstDetailSectionId } from "@/lib/careers";
import { careersBenefits, careersHero, careersOpenings, careersWhyJoin } from "@/content/careers";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type CareerDetailPageProps = {
  role: CareerRole;
  detail: CareerRoleDetail;
  sectionTabs: CareerDetailTab[];
  relatedRoles: CareerRole[];
  shareUrl: string;
};

export default function CareerDetailPage({
  role,
  detail,
  sectionTabs,
  relatedRoles,
  shareUrl,
}: CareerDetailPageProps) {
  const sectionTabIds = useMemo(
    () => sectionTabs.map((tab) => tab.id).join(","),
    [sectionTabs],
  );
  const firstContentTarget = useMemo(() => getFirstDetailSectionId(sectionTabs), [sectionTabIds, sectionTabs]);
  const roleMetaItems = useMemo(
    () =>
      [
        role.location ? { label: "Location", value: role.location, Icon: MapPin } : null,
        role.department ? { label: "Department", value: role.department, Icon: Briefcase } : null,
        role.type ? { label: "Job type", value: role.type, Icon: Clock } : null,
        role.experience ? { label: "Experience", value: role.experience, Icon: Briefcase } : null,
      ].filter(Boolean) as {
        label: string;
        value: string;
        Icon: typeof MapPin;
      }[],
    [role.department, role.experience, role.location, role.type],
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabNavRef = useRef<HTMLDivElement>(null);
  const scrollLockRef = useRef<CareerDetailSectionId | null>(null);
  const [activeTab, setActiveTab] = useState<CareerDetailSectionId | null>(
    sectionTabs[0]?.id ?? null,
  );
  const [stickyOffsets, setStickyOffsets] = useState({ header: 72, tabBar: 56, total: 136 });

  useEffect(() => {
    setActiveTab(sectionTabs[0]?.id ?? null);
  }, [sectionTabIds, sectionTabs]);

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
    const frame = requestAnimationFrame(updateOffsets);
    window.addEventListener("resize", updateOffsets);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateOffsets);
    };
  }, [sectionTabIds, sectionTabs.length]);

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
  }, [sectionTabIds, sectionTabs, stickyOffsets.total]);

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
    [sectionTabIds, sectionTabs, stickyOffsets.total],
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
      tabNavRef.current
        ?.querySelector<HTMLElement>(`[data-tab-id="${nextTab.id}"]`)
        ?.focus();
    },
    [scrollToElement, sectionTabIds, sectionTabs],
  );

  const hasRoleContent =
    Boolean(detail.aboutRole?.trim()) ||
    detail.responsibilities.length > 0 ||
    detail.workAreas.length > 0 ||
    detail.requirements.length > 0 ||
    detail.benefits.length > 0 ||
    Boolean(detail.aboutUs?.trim());

  const relatedSectionClass = "section-shell section-pad bg-mist";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
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
                { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.06, clearProps: "transform" },
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
    <div
      ref={rootRef}
      style={{ "--career-sticky-offset": `${stickyOffsets.total}px` } as CSSProperties}
    >
      {/* Hero */}
      <section
        className="section-shell bg-paper pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-16"
        aria-labelledby="role-hero-heading"
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
              <li>
                <Link
                  href="/careers"
                  className="rounded-sm transition hover:text-ink focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                >
                  Careers
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="max-w-full text-ink">
                <span className="line-clamp-2">{role.title}</span>
              </li>
            </ol>
          </nav>

          <div className="relative mt-8 lg:mt-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-0">
              <div className="relative z-[1] min-w-0 lg:pr-20 xl:pr-24">
                <p data-animate="hero-copy" className="text-eyebrow m-0">
                  {detail.eyebrow}
                </p>
                <h1
                  id="role-hero-heading"
                  data-animate="hero-copy"
                  className="text-display-xl mt-4 mb-0 text-balance"
                >
                  {detail.headlineBefore}{" "}
                  <span className="text-red">{detail.headlineAccent}</span>
                </h1>

                {roleMetaItems.length > 0 ? (
                <ul
                  data-animate="hero-copy"
                  className="m-0 mt-5 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 sm:mt-6 sm:gap-x-6"
                >
                  {roleMetaItems.map(({ label, value, Icon }) => (
                    <li key={label} className="flex items-center gap-2 text-body-sm text-muted">
                      <Icon size={16} className="flex-none text-red" aria-hidden />
                      <span>
                        <span className="sr-only">{label}: </span>
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>
                ) : null}

                {detail.summary?.trim() ? (
                <p
                  data-animate="hero-copy"
                  className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem] sm:mt-6"
                >
                  {detail.summary}
                </p>
                ) : null}

                <div data-animate="hero-copy">
                  <button
                    type="button"
                    onClick={() => scrollToElement("apply")}
                    className="text-cta tap-target mt-7 inline-flex min-h-12 items-center gap-3 bg-ink px-5 py-3.5 pl-6 text-white transition hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:mt-8 sm:gap-4 sm:py-4 sm:pl-7"
                  >
                    Apply now
                    <ArrowRightCircle size={28} strokeWidth={1.5} className="sm:size-8" aria-hidden />
                  </button>
                </div>
              </div>

              <div data-animate="hero-visual" className="relative z-[1] min-w-0 overflow-hidden">
                <ImageSlot
                  asset={detail.heroImage}
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
            <button
              type="button"
              onClick={() => scrollToElement(firstContentTarget)}
              data-animate="hero-seam"
              className="absolute top-1/2 left-1/2 z-20 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red max-lg:hidden"
              aria-label={
                firstContentTarget === "apply"
                  ? "Continue to application form"
                  : "Continue to role overview"
              }
            >
              <Image src={careersHero.arrow} alt="" aria-hidden width={56} height={56} unoptimized />
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
            role="region"
            aria-label="Section navigation"
            tabIndex={0}
            className="section-inner overflow-x-auto overscroll-x-contain scroll-px-4 [-webkit-overflow-scrolling:touch]"
          >
            <nav aria-label="On this page" className="flex min-w-max gap-0">
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
                      <span className="absolute right-4 bottom-0 left-4 h-0.5 bg-red sm:right-5 sm:left-5" aria-hidden />
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
      <section className="section-shell section-pad bg-mist" aria-label="Role details">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
            <div className="order-2 min-w-0 w-full lg:order-1">
              {!hasRoleContent ? (
                <p className="text-body section-copy-on-light m-0" role="status">
                  Role details will be published soon. You can still apply using the form
                  {sectionTabs.length === 0 ? " below" : " on this page"}.
                </p>
              ) : null}

              {detail.aboutRole?.trim() ? (
              <div id="overview" className="career-section-anchor w-full" aria-labelledby="overview-heading">
                <h2 id="overview-heading" className="text-eyebrow m-0">About the role</h2>
                <p className="text-body section-copy-on-light mt-4 mb-0 w-full max-w-none">
                  {detail.aboutRole}
                </p>
              </div>
              ) : null}

              {detail.responsibilities.length > 0 ? (
              <div
                id="responsibilities"
                className={`career-section-anchor w-full ${detail.aboutRole?.trim() ? "mt-12 sm:mt-14" : ""}`}
                aria-labelledby="responsibilities-heading"
              >
                <h2 id="responsibilities-heading" className="text-eyebrow m-0">Key responsibilities</h2>
                <ul className="m-0 mt-6 grid list-none gap-6 p-0 sm:mt-8 sm:gap-7">
                  {detail.responsibilities.map((item, index) => (
                    <li key={`${item.title}-${index}`} className="flex gap-4">
                      <IconSlot asset={item.icon} tone="accent" size={40} className="mt-0.5 flex-none" />
                      <div className="min-w-0">
                        <h3 className="m-0 font-display text-base tracking-[0.04em] uppercase sm:text-lg">
                          {item.title}
                        </h3>
                        <p className="text-body-sm mt-2 mb-0 text-muted">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              ) : null}

              {detail.workAreas.length > 0 ? (
              <div
                className="mt-12 w-full min-w-0 bg-paper px-4 py-8 sm:mt-14 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
                aria-labelledby="work-areas-heading"
              >
                <h2 id="work-areas-heading" className="text-eyebrow m-0">What you&apos;ll work on</h2>
                <ul
                  data-animate-stagger
                  className="m-0 mt-6 grid list-none grid-cols-1 gap-2.5 p-0 sm:mt-8 xs:grid-cols-2"
                >
                  {detail.workAreas.map((area, index) => (
                    <li
                      key={`${area.title}-${index}`}
                      className="cap-card flex min-h-[158px] min-w-0 flex-col justify-between border border-line bg-mist p-4 transition-[border-color] duration-200 hover:border-ink sm:p-5"
                    >
                      <IconSlot asset={area.icon} tone="accent" size={40} className="sm:h-11 sm:w-11" />
                      <div className="mt-5 min-w-0 sm:mt-6">
                        <h3 className="m-0 font-display text-sm font-bold leading-[1.12] tracking-[0.01em] uppercase sm:text-[15px]">
                          {area.title}
                        </h3>
                        <p className="text-body-sm mt-2 mb-0 text-muted">{area.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              ) : null}

              {detail.requirements.length > 0 ? (
              <div
                id="requirements"
                className="career-section-anchor mt-12 sm:mt-14"
                aria-labelledby="requirements-heading"
              >
                <h2 id="requirements-heading" className="text-eyebrow m-0">Requirements</h2>
                <ul className="m-0 mt-6 grid list-none gap-6 p-0 sm:mt-8 sm:gap-7">
                  {detail.requirements.map((item, index) => (
                    <li key={`${item.title}-${index}`} className="flex gap-4">
                      <IconSlot asset={item.icon} tone="accent" size={40} className="mt-0.5 flex-none" />
                      <div className="min-w-0">
                        <h3 className="m-0 font-display text-base tracking-[0.04em] uppercase sm:text-lg">
                          {item.title}
                        </h3>
                        <p className="text-body-sm mt-2 mb-0 text-muted">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              ) : null}

              {detail.benefits.length > 0 ? (
              <div
                id="benefits"
                className="career-section-anchor mt-12 sm:mt-14"
                aria-labelledby="benefits-heading"
              >
                <h2 id="benefits-heading" className="text-eyebrow m-0">Benefits</h2>
                <ul
                  className={`m-0 mt-6 grid list-none gap-2.5 p-0 sm:mt-8 ${
                    detail.benefits.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {detail.benefits.map((item, index) => (
                    <li
                      key={`${item.title}-${index}`}
                      className="cap-card flex min-h-[158px] gap-4 border border-line bg-white p-4 transition-[border-color] duration-200 hover:border-ink sm:p-5"
                    >
                      <IconSlot asset={item.icon} tone="accent" size={40} className="mt-0.5 flex-none sm:h-11 sm:w-11" />
                      <div className="min-w-0">
                        <h3 className="m-0 font-display text-sm font-bold leading-[1.12] tracking-[0.01em] uppercase sm:text-[15px]">
                          {item.title}
                        </h3>
                        <p className="text-body-sm mt-2 mb-0 text-muted">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              ) : null}

              {detail.aboutUs?.trim() ? (
              <div
                id="about-us"
                className="career-section-anchor mt-12 w-full sm:mt-14"
                aria-labelledby="about-us-heading"
              >
                <h2 id="about-us-heading" className="text-eyebrow m-0">About us</h2>
                <p className="text-body section-copy-on-light mt-4 mb-0 w-full max-w-none">
                  {detail.aboutUs}
                </p>
              </div>
              ) : null}
            </div>

            <aside
              id="apply"
              className="career-section-anchor order-1 min-w-0 lg:order-2 lg:sticky lg:self-start"
              style={{ top: stickyOffsets.total }}
              aria-labelledby="apply-heading"
            >
              <div className="border border-line bg-white p-5 sm:p-6">
                <h2 id="apply-heading" className="text-eyebrow m-0">
                  Apply for this role
                </h2>
                <div className="mt-5">
                  <CareerApplyForm roleTitle={role.title} roleSlug={role.slug} />
                </div>
              </div>

              <div className="mt-6 border border-line bg-white p-5 sm:mt-8 sm:p-6" aria-labelledby="share-job-heading">
                <h3 id="share-job-heading" className="text-eyebrow m-0">
                  Share this job
                </h3>
                <div className="mt-3">
                  <CareerShareJob title={role.title} shareUrl={shareUrl} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section
        data-animate-section
        className="section-shell section-pad bg-paper"
        aria-labelledby="why-join-detail-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {careersWhyJoin.eyebrow}
          </p>
          <h2
            data-animate="fade-up"
            id="why-join-detail-heading"
            className="text-display-md mt-4 mb-0 max-w-3xl"
          >
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

      {/* Related roles */}
      {relatedRoles.length > 0 ? (
        <section
          data-animate-section
          className={relatedSectionClass}
          aria-labelledby="related-roles-heading"
        >
          <div className="section-inner">
            <div className="section-intro">
              <h2 data-animate="fade-up" id="related-roles-heading" className="text-display-md m-0">
                More roles <span className="text-red">you might like</span>
              </h2>
              <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
                <Link
                  href="/careers#open-positions"
                  className="text-cta link-cta mt-0 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
                >
                  {careersOpenings.viewAll.label}
                  <ArrowRight size={16} strokeWidth={2} aria-hidden />
                </Link>
              </div>
            </div>

            <ul
              data-animate-stagger
              className={`section-media m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2 lg:gap-4 ${
                relatedRoles.length >= 4 ? "lg:grid-cols-4" : relatedRoles.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
              }`}
            >
              {relatedRoles.map((related) => (
                <li key={related.slug} className="min-w-0">
                  <Link
                    href={related.href ?? getCareerRoleHref(related.slug)}
                    className="cap-card group flex h-full min-h-[11rem] flex-col justify-between border border-line bg-white p-4 transition-[border-color] duration-200 hover:border-ink focus-visible:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:p-5"
                    aria-label={`${related.title}, ${related.location}, ${related.department}, ${related.type}`}
                  >
                    <div className="min-w-0">
                      {related.department ? (
                      <p className="m-0 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.14em] text-red uppercase">
                        <Briefcase size={12} aria-hidden />
                        {related.department}
                      </p>
                      ) : null}
                      <h3 className="mt-2.5 mb-0 font-display text-sm font-bold leading-[1.12] tracking-[0.01em] text-ink uppercase transition group-hover:text-red sm:text-[15px]">
                        {related.title}
                      </h3>
                      <div className="mt-2.5 flex flex-col gap-1">
                        {related.location ? (
                        <p className="text-body-sm m-0 flex items-center gap-1.5 text-muted">
                          <MapPin size={13} className="flex-none text-red" aria-hidden />
                          <span>{related.location}</span>
                        </p>
                        ) : null}
                        {related.type ? (
                        <p className="text-body-sm m-0 flex items-center gap-1.5 text-muted">
                          <Clock size={13} className="flex-none text-red" aria-hidden />
                          <span>{related.type}</span>
                        </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end sm:mt-5">
                      <span
                        className="grid h-8 w-8 flex-none place-items-center rounded-full border border-red text-red transition group-hover:bg-red group-hover:text-white"
                        aria-hidden
                      >
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </div>
  );
}
