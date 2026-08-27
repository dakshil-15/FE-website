"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconSlot, ImageSlot } from "@/components/media/AssetPlaceholder";
import TeamCarousel from "@/components/about/TeamCarousel";
import AwardsCarousel from "@/components/about/AwardsCarousel";
import {
  aboutHero,
  aboutLocations,
  aboutStats,
  aboutStory,
  aboutTimeline,
  aboutUi,
  aboutValues,
  aboutWhatWeDo,
} from "@/content/about";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          canAnimate: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {};

          if (reduceMotion) {
            gsap.set(
              "[data-animate], [data-animate-stagger] > *, [data-timeline-icon], [data-timeline-copy], [data-timeline-line]",
              {
                clearProps: "all",
                autoAlpha: 1,
                y: 0,
                scale: 1,
                scaleX: 1,
                scaleY: 1,
              },
            );
            return;
          }

          const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
          heroTl
            .from("[data-animate='hero-copy']", {
              y: 28,
              autoAlpha: 0,
              duration: 0.9,
              stagger: 0.12,
            })
            .from(
              "[data-animate='hero-visual']",
              {
                autoAlpha: 0,
                duration: 0.4,
              },
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

          const statsSection = gsap.utils.toArray<HTMLElement>("[data-stats-section]")[0];
          const counters = gsap.utils.toArray<HTMLElement>("[data-counter]");

          const formatCounter = (el: HTMLElement, val: number) => {
            const suffix = el.dataset.suffix ?? "";
            el.textContent = `${Math.round(val)}${suffix}`;
          };

          const runCounters = () => {
            counters.forEach((el, index) => {
              const target = Number(el.dataset.target ?? 0);
              const state = ((el as HTMLElement & { __count?: { val: number } }).__count ??= {
                val: 0,
              });
              gsap.killTweensOf(state);
              state.val = 0;
              formatCounter(el, 0);
              gsap.to(state, {
                val: target,
                duration: 1.8,
                delay: index * 0.08,
                ease: "power2.out",
                onUpdate: () => formatCounter(el, state.val),
              });
            });
          };

          if (statsSection && counters.length) {
            ScrollTrigger.create({
              trigger: statsSection,
              start: "top 78%",
              onEnter: runCounters,
              onEnterBack: runCounters,
            });
          }

          /* Our Story — draw connector, then reveal milestones in order */
          const storyWrap = gsap.utils.toArray<HTMLElement>(".about-timeline-wrap")[0];
          const storyTimeline = storyWrap?.querySelector<HTMLElement>("[data-story-timeline]");
          if (storyWrap && storyTimeline) {
            const line = storyWrap.querySelector<HTMLElement>("[data-timeline-line]");
            const icons = storyTimeline.querySelectorAll("[data-timeline-icon]");
            const copies = storyTimeline.querySelectorAll("[data-timeline-copy]");
            const isDesktop = window.matchMedia("(min-width: 768px)").matches;

            if (line) {
              gsap.set(line, isDesktop ? { scaleX: 0 } : { scaleY: 0 });
            }
            gsap.set(icons, { scale: 0.55, autoAlpha: 0 });
            gsap.set(copies, { y: 18, autoAlpha: 0 });

            const storyTl = gsap.timeline({
              scrollTrigger: {
                trigger: storyWrap,
                start: "top 78%",
                toggleActions: "play none none none",
              },
              defaults: { ease: "power3.out" },
            });

            if (line) {
              storyTl.to(line, {
                ...(isDesktop ? { scaleX: 1 } : { scaleY: 1 }),
                duration: 0.9,
                ease: "power2.inOut",
              });
            }

            icons.forEach((icon, i) => {
              const at = line ? (i === 0 ? "-=0.35" : "-=0.45") : i === 0 ? 0 : "-=0.45";
              storyTl.to(
                icon,
                {
                  scale: 1,
                  autoAlpha: 1,
                  duration: 0.45,
                  ease: "back.out(1.6)",
                },
                at,
              );
              storyTl.to(
                copies[i],
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.5,
                },
                "-=0.28",
              );
            });
          }

          gsap.utils.toArray<HTMLElement>("[data-animate-section]").forEach((section) => {
            const intro = section.querySelectorAll("[data-animate='fade-up']");
            const staggerRoots = section.querySelectorAll("[data-animate-stagger]");
            const staggerItems = staggerRoots.length
              ? gsap.utils.toArray<Element>(
                  Array.from(staggerRoots).flatMap((root) => Array.from(root.querySelectorAll(":scope > *"))),
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
              tl.from(intro, {
                y: 32,
                autoAlpha: 0,
                duration: 0.75,
                stagger: 0.1,
              });
            }

            if (staggerItems.length) {
              tl.from(
                staggerItems,
                {
                  y: 24,
                  autoAlpha: 0,
                  duration: 0.55,
                  stagger: 0.06,
                },
                intro.length ? "-=0.35" : 0,
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
    <div ref={rootRef}>
      <section
        className="section-shell bg-paper pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-16"
        aria-labelledby="about-hero-heading"
      >
        <div className="section-inner">
          <nav aria-label="Breadcrumb" data-animate="hero-copy" className="text-body-sm text-muted">
            <ol className="m-0 flex list-none items-center gap-2 p-0">
              <li>
                <Link href="/" className="transition hover:text-red focus-visible:text-red">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-line">
                &gt;
              </li>
              <li className="text-ink" aria-current="page">
                About Us
              </li>
            </ol>
          </nav>

          <div className="relative mt-8 lg:mt-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-0 lg:items-stretch">
              {/* Copy stays in the left half; padding keeps type clear of the seam watermark */}
              <div className="relative z-[1] min-w-0 lg:pr-20 xl:pr-24">
                <p data-animate="hero-copy" className="text-eyebrow m-0">
                  {aboutHero.eyebrow}
                </p>
                <h1
                  id="about-hero-heading"
                  data-animate="hero-copy"
                  className="text-display-xl mt-4 mb-0 text-balance"
                >
                  {aboutHero.headlineBefore}{" "}
                  <span className="text-red">{aboutHero.headlineAccent}</span>{" "}
                  {aboutHero.headlineAfter}
                  <span className="ml-[0.12em] inline-block h-[0.22em] w-[0.22em] translate-y-[-0.08em] bg-red align-middle" aria-hidden />
                </h1>
                <p
                  data-animate="hero-copy"
                  className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem] sm:mt-6"
                >
                  {aboutHero.body}
                </p>
              </div>

              <div data-animate="hero-visual" className="relative z-[1] min-w-0 overflow-hidden">
                <ImageSlot
                  asset={aboutHero.image}
                  priority
                  className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[420px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Red accent line across the photo, from the seam arrow */}
                <div
                  className="pointer-events-none absolute top-1/2 right-0 left-0 z-[2] hidden h-px -translate-y-1/2 bg-red lg:block"
                  aria-hidden
                />
              </div>
            </div>

            {/* Soft radial watermark behind copy/image; only the arrow sits on the divide */}
            <div
              data-animate="hero-seam"
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden size-[min(68%,20rem)] -translate-x-1/2 -translate-y-1/2 lg:block"
              aria-hidden
            >
              <Image
                src={aboutHero.burst}
                alt=""
                fill
                sizes="320px"
                unoptimized
                className="object-contain opacity-45"
              />
            </div>
            <Link
              href="#our-story"
              data-animate="hero-seam"
              className="absolute top-1/2 left-1/2 z-20 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center transition hover:opacity-80 max-lg:hidden"
              aria-label="Continue to our story"
            >
              <Image src={aboutHero.arrow} alt="" aria-hidden width={56} height={56} unoptimized />
            </Link>
          </div>
        </div>
      </section>

      <section
        data-animate-section
        data-stats-section
        className="section-shell section-pad-sm bg-ink text-white"
        aria-label="Company scale"
      >
        <div
          data-animate-stagger
          className="section-inner grid grid-cols-1 gap-y-8 xs:grid-cols-2 xs:gap-y-10 lg:grid-cols-4 lg:gap-y-0"
        >
          {aboutStats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <IconSlot asset={stat.icon} tone="dark" size={44} className="mb-4 sm:mb-5" />
              <p className="text-stat m-0 text-red">
                <span data-counter data-target={stat.value} data-suffix={stat.suffix}>
                  {stat.value}
                  {stat.suffix}
                </span>
              </p>
              <p className="mt-2 text-xs font-bold tracking-[0.14em] text-white uppercase sm:mt-2.5 sm:text-sm">
                {stat.label}
              </p>
              <p className="text-body-sm mt-2.5 mb-0 max-w-[220px] text-muted-on-dark sm:mt-3">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="our-story"
        data-animate-section
        className="section-shell section-pad bg-paper"
        aria-labelledby="story-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            {aboutStory.eyebrow}
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="story-heading" className="text-display-md m-0">
              {aboutStory.title}
            </h2>
            <p data-animate="fade-up" className="text-body section-copy section-copy-on-light m-0 pt-0 md:pt-1">
              {aboutStory.body}
            </p>
          </div>

          <div className="about-timeline-wrap section-media relative">
            <div data-timeline-line className="about-timeline-line" aria-hidden />
            <ol data-story-timeline className="about-timeline m-0 list-none p-0">
              {aboutTimeline.map((item) => (
                <li key={item.year} className="about-timeline-item relative min-w-0">
                  <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                    <span
                      data-timeline-icon
                      className="about-timeline-icon grid h-14 w-14 flex-none place-items-center rounded-full border border-red bg-paper text-red md:h-16 md:w-16"
                    >
                      <IconSlot asset={item.icon} size={28} className="text-red" />
                    </span>
                    <div data-timeline-copy className="min-w-0 md:mt-6">
                      <p className="m-0 font-display text-xl tracking-[0.04em] text-red uppercase">{item.year}</p>
                      <p className="mt-1 mb-0 font-display text-[1.05rem] leading-tight tracking-[0.03em] uppercase sm:text-lg">
                        {item.title}
                      </p>
                      <p className="text-body-sm mt-2 mb-0 max-w-[16rem] text-muted">{item.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        data-animate-section
        className="section-shell section-pad bg-mist"
        aria-labelledby="what-we-do-heading"
      >
        <div className="section-inner grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-12">
          <div className="min-w-0">
            <p data-animate="fade-up" className="text-eyebrow m-0">
              {aboutWhatWeDo.eyebrow}
            </p>
            <h2 data-animate="fade-up" id="what-we-do-heading" className="text-display-md mt-4 mb-0">
              {aboutWhatWeDo.titleBefore} <span className="text-red">{aboutWhatWeDo.titleAccent}</span>
            </h2>
            <p
              data-animate="fade-up"
              className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem]"
            >
              {aboutWhatWeDo.body}
            </p>
            <div data-animate="fade-up">
              <Link
                href={aboutWhatWeDo.cta.href}
                className="text-cta mt-7 inline-flex min-h-12 items-center gap-4 bg-ink px-5 py-3.5 pl-6 text-white transition hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:mt-8 sm:py-4 sm:pl-7"
              >
                {aboutWhatWeDo.cta.label}
                <Image src={aboutUi.arrowCircle} alt="" aria-hidden width={32} height={32} unoptimized />
              </Link>
            </div>
          </div>

          <div data-animate="fade-up" className="min-w-0">
            <ImageSlot
              asset={aboutWhatWeDo.image}
              className="aspect-[4/3] w-full lg:aspect-[5/4] lg:min-h-[400px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section
        data-animate-section
        className="section-shell section-pad bg-ink text-white"
        aria-labelledby="team-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow text-eyebrow-on-dark m-0">
            Our Core Team
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="team-heading" className="text-display-md m-0">
              Leadership that builds <span className="text-red">what&rsquo;s next.</span>
            </h2>
            <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
              <p className="text-body section-copy section-copy-on-dark m-0">
                The people who design the system, lead the work, and stay accountable for growth.
              </p>
              <Link href="/leadership" className="text-cta link-cta text-white">
                Meet the team
                <Image src={aboutUi.arrowWhite} alt="" aria-hidden width={16} height={16} unoptimized />
              </Link>
            </div>
          </div>
          <div className="section-media">
            <TeamCarousel />
          </div>
        </div>
      </section>

      <section
        data-animate-section
        className="section-shell section-pad bg-mist"
        aria-labelledby="values-heading"
      >
        <div className="section-inner">
          <h2 data-animate="fade-up" id="values-heading" className="text-eyebrow m-0">
            Our Values
          </h2>
          <ul
            data-animate-stagger
            className="mt-8 grid list-none grid-cols-1 gap-8 p-0 xs:grid-cols-2 md:mt-10 lg:grid-cols-5 lg:gap-6"
          >
            {aboutValues.map((value) => (
              <li key={value.title} className="min-w-0">
                <IconSlot asset={value.icon} size={64} className="text-ink" />
                <h3 className="mt-5 mb-0 font-display text-lg tracking-[0.06em] uppercase">{value.title}</h3>
                <p className="text-body-sm mt-2.5 mb-0 max-w-[16rem] text-muted">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        data-animate-section
        className="section-shell section-pad bg-paper"
        aria-labelledby="awards-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            Awards &amp; Recognition
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="awards-heading" className="text-display-md m-0">
              A few of our many <span className="text-red">achievements.</span>
            </h2>
            <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
              <Link href="/awards" className="text-cta link-cta mt-0 text-ink">
                View all awards
                <Image src={aboutUi.arrow} alt="" aria-hidden width={16} height={16} unoptimized />
              </Link>
            </div>
          </div>

          <div data-animate="fade-up" className="section-media">
            <AwardsCarousel />
          </div>
        </div>
      </section>

      <section
        id="locations"
        data-animate-section
        className="section-shell section-pad bg-mist"
        aria-labelledby="about-locations-heading"
      >
        <div className="section-inner">
          <p data-animate="fade-up" className="text-eyebrow m-0">
            Our Locations
          </p>
          <div className="section-intro">
            <h2 data-animate="fade-up" id="about-locations-heading" className="text-display-md m-0">
              Where we <span className="text-red">operate.</span>
            </h2>
            <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
              <Link href="/contact" className="text-cta link-cta mt-0 text-ink">
                View all locations
                <Image src={aboutUi.arrow} alt="" aria-hidden width={16} height={16} unoptimized />
              </Link>
            </div>
          </div>
          <ul
            data-animate-stagger
            className="mt-8 grid list-none grid-cols-1 gap-3 p-0 xs:grid-cols-2 lg:grid-cols-4"
          >
            {aboutLocations.map((office) => (
              <li key={office.slug} className="min-w-0">
                <Link
                  href={`/locations/${office.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow] duration-200 hover:border-ink focus-visible:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
                    <span
                      className="absolute top-3 left-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-red bg-white text-red sm:top-3.5 sm:left-3.5 sm:h-9 sm:w-9"
                      aria-hidden
                    >
                      <MapPin size={15} fill="currentColor" strokeWidth={0} />
                    </span>
                    <Image
                      src={office.image.src}
                      alt=""
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 1024px) 45vw, (max-width: 1280px) 22vw, 280px"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex items-end justify-between gap-3 border-t border-line px-3.5 py-3.5 sm:px-4 sm:py-4 lg:px-5 lg:py-[18px]">
                    <div className="min-w-0 text-left">
                      <p className="m-0 font-display text-sm leading-[1.1] font-bold tracking-[0.04em] uppercase sm:text-[15px]">
                        {office.city}
                        {office.isHq ? (
                          <span className="ml-1.5 text-[10px] tracking-[0.12em] text-red">HQ</span>
                        ) : null}
                      </p>
                      <p className="text-body-sm mt-1.5 mb-0 text-muted">{office.description}</p>
                    </div>
                    <span
                      className="grid h-9 w-9 flex-none place-items-center rounded-full border border-line text-ink transition-[border-color,color,background-color] duration-200 group-hover:border-red group-hover:bg-red group-hover:text-white sm:h-10 sm:w-10"
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
    </div>
  );
}
