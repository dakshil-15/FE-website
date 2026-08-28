"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const partners = [
  {
    name: "Godrej",
    mono: "/assets/logo-godrej.png",
    color: "/assets/logos-color/logo-godrej-color.png",
    w: 972,
    h: 479,
  },
  {
    name: "FedEx",
    mono: "/assets/logo-fedex.png",
    color: "/assets/logos-color/logo-fedex-color.png",
    w: 806,
    h: 245,
  },
  {
    name: "Mahindra",
    mono: "/assets/logo-mahindra.png",
    color: "/assets/logos-color/logo-mahindra-color.png",
    w: 954,
    h: 142,
  },
  {
    name: "Adani",
    mono: "/assets/logo-adani.png",
    color: "/assets/logos-color/logo-adani-color.png",
    w: 839,
    h: 295,
  },
  {
    name: "Ajanta Pharma",
    mono: "/assets/logo-ajanta.png",
    color: "/assets/logos-color/logo-ajanta-color.png",
    w: 905,
    h: 273,
  },
  {
    name: "VIP",
    mono: "/assets/logo-vip.png",
    color: "/assets/logos-color/logo-vip-color.png",
    w: 868,
    h: 308,
  },
  {
    name: "Waaree",
    mono: "/assets/logo-waaree.png",
    color: "/assets/logos-color/logo-waaree-color.png",
    w: 952,
    h: 287,
  },
  {
    name: "Orpat",
    mono: "/assets/logo-orpat.png",
    color: "/assets/logos-color/logo-orpat-color.png",
    w: 937,
    h: 276,
  },
  {
    name: "Piramal",
    mono: "/assets/logo-piramal.png",
    color: "/assets/logos-color/logo-piramal-color.png",
    w: 906,
    h: 445,
  },
  {
    name: "Danone",
    mono: "/assets/logo-danone.png",
    color: "/assets/logos-color/logo-danone-color.png",
    w: 886,
    h: 249,
  },
  {
    name: "Amrita",
    mono: "/assets/logo-amrita.png",
    color: "/assets/logos-color/logo-amrita-color.png",
    w: 1016,
    h: 283,
  },
];

const mid = Math.ceil(partners.length / 2);
const rowLeft = partners.slice(0, mid);
const rowRight = partners.slice(mid);

type Partner = (typeof partners)[number];

function LogoItem({ partner, duplicate }: { partner: Partner; duplicate?: boolean }) {
  return (
    <li
      className="group flex h-16 shrink-0 items-center justify-center px-6 sm:h-20 sm:px-8 md:h-[5.5rem] md:px-10"
      aria-hidden={duplicate || undefined}
    >
      <span className="relative inline-flex h-10 w-[140px] items-center justify-center sm:h-12 sm:w-[160px] md:h-14 md:w-[180px]">
        <Image
          src={partner.mono}
          alt={duplicate ? "" : `${partner.name} logo`}
          width={partner.w}
          height={partner.h}
          quality={100}
          unoptimized
          sizes="180px"
          className="h-full w-auto max-w-full object-contain opacity-80 transition duration-300 group-hover:opacity-0"
        />
        <Image
          src={partner.color}
          alt=""
          aria-hidden
          width={partner.w}
          height={partner.h}
          quality={100}
          unoptimized
          sizes="180px"
          className="pointer-events-none absolute inset-0 m-auto h-full w-auto max-w-full object-contain opacity-0 transition duration-300 group-hover:opacity-100"
        />
      </span>
    </li>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: Partner[];
  direction: "left" | "right";
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  // Triple the set so short rows still cover wide viewports
  const copies = 3;

  useGSAP(
    () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(track, { x: 0, clearProps: "transform" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let tween: gsap.core.Tween | undefined;

        const start = () => {
          tween?.kill();

          // Animate by one logo set (track holds `copies` identical sets)
          const setWidth = track.scrollWidth / copies;
          const viewportWidth = viewport.clientWidth;
          if (setWidth < 40 || viewportWidth < 40) return;

          const fromX = direction === "right" ? -setWidth : 0;
          const toX = direction === "right" ? 0 : -setWidth;

          gsap.set(track, { x: fromX });
          tween = gsap.to(track, {
            x: toX,
            duration: Math.max(setWidth / 45, 24),
            ease: "none",
            repeat: -1,
          });
        };

        start();

        const ro = new ResizeObserver(() => start());
        ro.observe(viewport);
        ro.observe(track);

        const images = track.querySelectorAll("img");
        images.forEach((img) => {
          if (!img.complete) img.addEventListener("load", start, { once: true });
        });

        const pause = () => tween?.pause();
        const play = () => tween?.play();
        viewport.addEventListener("pointerenter", pause);
        viewport.addEventListener("pointerleave", play);

        return () => {
          ro.disconnect();
          viewport.removeEventListener("pointerenter", pause);
          viewport.removeEventListener("pointerleave", play);
          tween?.kill();
        };
      });

      return () => mm.revert();
    },
    { dependencies: [direction, items], scope: viewportRef },
  );

  return (
    <div ref={viewportRef} className="w-full overflow-hidden">
      <ul
        ref={trackRef}
        className="flex w-max list-none items-center p-0 will-change-transform"
      >
        {Array.from({ length: copies }, (_, setIndex) =>
          items.map((partner) => (
            <LogoItem
              key={`${setIndex}-${partner.name}`}
              partner={partner}
              duplicate={setIndex > 0}
            />
          )),
        )}
      </ul>
    </div>
  );
}

export default function PartnerLogos({ sectionId = "partners" }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="section-shell section-pad-sm scroll-mt-[5.5rem] bg-mist"
      aria-labelledby="partners-heading"
    >
      <div className="section-inner">
        <h2 id="partners-heading" className="text-eyebrow m-0">
          Trusted by visionaries
        </h2>

        <div className="section-media flex flex-col gap-2 sm:gap-3" aria-label="Partner logos">
          <ul className="sr-only">
            {partners.map((partner) => (
              <li key={partner.name}>{partner.name}</li>
            ))}
            <li>And more</li>
          </ul>
          <div aria-hidden="true">
            <MarqueeRow items={rowLeft} direction="left" />
            <MarqueeRow items={rowRight} direction="right" />
          </div>
          <div className="flex justify-end pt-1 sm:pt-2" aria-hidden="true">
            <p className="m-0 text-sm font-medium text-muted sm:text-base md:text-lg">&amp; More</p>
          </div>
        </div>
      </div>
    </section>
  );
}
