"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ArrowRightCircle, Clock, Mail, MapPin, Phone, Send, type LucideIcon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "@/components/contact/ContactForm";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import { aboutLocations } from "@/content/about";
import {
  contactFormCopy,
  contactHero,
  contactOffices,
  contactOfficesCopy,
  contactTouch,
} from "@/content/contact";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const touchIcons: Record<(typeof contactTouch.items)[number]["icon"], LucideIcon> = {
  phone: Phone,
  email: Mail,
  hours: Clock,
  response: Send,
};

export default function ContactPage() {
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
            gsap.set("[data-animate], [data-animate-stagger] > *", {
              clearProps: "all",
              autoAlpha: 1,
              y: 0,
              scale: 1,
            });
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
                duration: 0.45,
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
                immediateRender: false,
                clearProps: "transform",
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
                  immediateRender: false,
                  clearProps: "transform",
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
        aria-labelledby="contact-hero-heading"
      >
        <div className="section-inner">
          <nav aria-label="Breadcrumb" data-animate="hero-copy" className="text-body-sm text-muted">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
              <li>
                <Link href="/" className="transition hover:text-red focus-visible:text-red">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-line">
                /
              </li>
              <li className="text-ink" aria-current="page">
                Contact Us
              </li>
            </ol>
          </nav>

          <div className="relative mt-8 lg:mt-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-0">
              <div className="relative z-[1] min-w-0 lg:pr-20 xl:pr-24">
                <h1
                  id="contact-hero-heading"
                  data-animate="hero-copy"
                  className="text-display-xl mt-0 mb-0 text-balance"
                >
                  {contactHero.headlineBefore}
                  <br className="hidden xs:block" />
                  <span className="xs:hidden"> </span>
                  <span className="text-red">{contactHero.headlineAccent}</span>
                </h1>
                <p
                  data-animate="hero-copy"
                  className="text-body section-copy section-copy-on-light mt-5 mb-0 max-w-[28rem] sm:mt-6"
                >
                  {contactHero.body}
                </p>
                <div data-animate="hero-copy">
                  <Link
                    href={contactHero.cta.href}
                    className="text-cta tap-target mt-7 inline-flex min-h-12 w-full items-center justify-center gap-4 bg-ink px-5 py-3.5 pl-6 text-white transition hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red xs:w-auto sm:mt-8 sm:py-4 sm:pl-7"
                  >
                    {contactHero.cta.label}
                    <ArrowRightCircle size={32} strokeWidth={1.5} aria-hidden />
                  </Link>
                </div>
              </div>

              <div data-animate="hero-visual" className="relative z-[1] min-w-0 overflow-hidden">
                <ImageSlot
                  asset={contactHero.image}
                  priority
                  className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[min(420px,55vh)]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="pointer-events-none absolute top-1/2 right-0 left-0 z-[2] hidden h-px -translate-y-1/2 bg-red lg:block"
                  aria-hidden
                />
                <p
                  className="pointer-events-none absolute top-1/2 right-4 z-[3] hidden max-h-[85%] -translate-y-1/2 overflow-hidden font-display text-[10px] leading-none font-bold tracking-[0.42em] text-red uppercase [writing-mode:vertical-rl] rotate-180 lg:block xl:right-6 xl:text-[11px]"
                  aria-hidden
                >
                  {contactHero.verticalMark}
                </p>
              </div>
            </div>

            <div
              data-animate="hero-seam"
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden size-[min(68%,20rem)] -translate-x-1/2 -translate-y-1/2 lg:block"
              aria-hidden
            >
              <Image
                src={contactHero.burst}
                alt=""
                fill
                sizes="320px"
                unoptimized
                className="object-contain opacity-45"
              />
            </div>
            <Link
              href="#contact-form"
              data-animate="hero-seam"
              className="absolute top-1/2 left-1/2 z-20 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red max-lg:hidden"
              aria-label="Continue to the contact form"
            >
              <Image src={contactHero.arrow} alt="" aria-hidden width={56} height={56} unoptimized />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="contact-form"
        data-animate-section
        className="section-shell section-pad bg-white"
        aria-label="Send a message and get in touch"
      >
        <div className="section-inner grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-20">
          <div className="min-w-0" aria-labelledby="contact-form-heading">
            <SectionMark id="contact-form-heading" title={contactFormCopy.title} />
            <div data-animate="fade-up" className="mt-8 sm:mt-10">
              <ContactForm />
            </div>
          </div>

          <aside className="min-w-0" aria-labelledby="contact-touch-heading">
            <SectionMark id="contact-touch-heading" title={contactTouch.title} />
            <ul data-animate-stagger className="mt-8 m-0 flex list-none flex-col gap-7 p-0 sm:mt-10 sm:gap-8">
              {contactTouch.items.map((item) => {
                const Icon = touchIcons[item.icon];
                return (
                  <li key={item.label} className="flex items-start gap-4">
                    <span
                      className="grid h-12 w-12 flex-none place-items-center rounded-full bg-ink text-white"
                      aria-hidden
                    >
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="m-0 font-display text-xs font-bold tracking-[0.14em] text-muted uppercase">
                        {item.label}
                      </p>
                      {"href" in item && item.href ? (
                        <a
                          href={item.href}
                          className="text-body mt-1 inline-flex min-h-11 items-center break-words text-ink transition hover:text-red focus-visible:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-body mt-1 mb-0 text-ink">{item.value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </section>

      <section
        id="locations"
        data-animate-section
        className="section-shell section-pad bg-mist"
        aria-labelledby="contact-offices-heading"
      >
        <div className="section-inner">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <p data-animate="fade-up" className="text-eyebrow m-0">
              {contactOfficesCopy.eyebrow}
            </p>
            <p
              data-animate="fade-up"
              className="text-body-sm m-0 max-w-[28rem] text-muted sm:text-right"
            >
              {contactOfficesCopy.body}
            </p>
          </div>
          <h2
            data-animate="fade-up"
            id="contact-offices-heading"
            className="text-display-md mt-4 mb-0 sm:mt-5"
          >
            {contactOfficesCopy.title}
          </h2>

          <ul
            data-animate-stagger
            className="mt-8 grid list-none grid-cols-1 gap-3 p-0 xs:grid-cols-2 lg:mt-10 lg:grid-cols-4"
          >
            {contactOffices.map((office) => {
              const location = aboutLocations.find((item) => item.slug === office.slug);
              const photo = location?.image.src ?? `/images/about/locations/${office.slug}.jpg`;
              const photoAlt = location?.image.alt ?? `${office.city} office`;

              return (
                <li key={office.slug} className="min-w-0">
                  <Link
                    href={`/locations/${office.slug}`}
                    aria-label={`First Economy ${office.city}${"isHq" in office && office.isHq ? " headquarters" : " office"} — ${office.address}`}
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
                        src={photo}
                        alt={photoAlt}
                        fill
                        sizes="(max-width: 480px) 100vw, (max-width: 1024px) 45vw, (max-width: 1280px) 22vw, 280px"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex flex-1 items-start justify-between gap-3 border-t border-line px-3.5 py-3.5 sm:px-4 sm:py-4 lg:px-5 lg:py-[18px]">
                      <div className="min-w-0 text-left">
                        <p className="m-0 font-display text-sm leading-[1.1] font-bold tracking-[0.04em] uppercase sm:text-[15px]">
                          {office.city}
                          {"isHq" in office && office.isHq ? (
                            <span className="ml-1.5 text-[10px] tracking-[0.12em] text-red">HQ</span>
                          ) : null}
                        </p>
                        <p className="text-body-sm mt-1.5 mb-0 break-words leading-snug text-muted">
                          {office.address}
                        </p>
                      </div>
                      <span
                        className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line text-ink transition-[border-color,color,background-color] duration-200 group-hover:border-red group-hover:bg-red group-hover:text-white"
                        aria-hidden
                      >
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

function SectionMark({ id, title }: { id: string; title: string }) {
  return (
    <div data-animate="fade-up">
      <span className="mb-3 block h-[3px] w-10 bg-red" aria-hidden />
      <h2 id={id} className="m-0 font-display text-xl tracking-[0.06em] uppercase sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}
