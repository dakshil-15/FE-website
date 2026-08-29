"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { clientLogos, type PartnerLogo } from "@/content/partners";

gsap.registerPlugin(useGSAP);

const mid = Math.ceil(clientLogos.length / 2);
const rowLeft = clientLogos.slice(0, mid);
const rowRight = clientLogos.slice(mid);

type PartnerLogoFrameProps = {
  partner: PartnerLogo;
  alt: string;
  sizes: string;
  imageClassName?: string;
};

function PartnerLogoFrame({ partner, alt, sizes, imageClassName = "" }: PartnerLogoFrameProps) {
  const box = partner.contentBox;

  if (!box) {
    return (
      <Image
        src={partner.src}
        alt={alt}
        width={partner.width}
        height={partner.height}
        unoptimized
        sizes={sizes}
        className={`max-h-full max-w-full object-contain ${imageClassName}`.trim()}
      />
    );
  }

  const [x0, y0, cw, ch] = box;
  const { width: iw, height: ih, src } = partner;

  // SVG viewBox crops to contentBox optically; preserveAspectRatio fills the cell without overflow.
  // Original PNG bytes are unchanged — only display framing.
  return (
    <svg
      viewBox={`${x0} ${y0} ${cw} ${ch}`}
      className={`h-full w-full ${imageClassName}`.trim()}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={alt || undefined}
      aria-hidden={alt === "" ? true : undefined}
    >
      {alt ? <title>{alt}</title> : null}
      <image href={src} width={iw} height={ih} preserveAspectRatio="none" />
    </svg>
  );
}

function LogoItem({ partner, duplicate }: { partner: PartnerLogo; duplicate?: boolean }) {
  return (
    <li
      className="group flex h-16 shrink-0 items-center justify-center px-6 sm:h-20 sm:px-8 md:h-[5.5rem] md:px-10"
      aria-hidden={duplicate || undefined}
    >
      <span className="flex h-14 w-[168px] min-h-0 min-w-0 items-center justify-center sm:h-16 sm:w-[188px] md:h-[4.5rem] md:w-[210px]">
        <PartnerLogoFrame
          partner={partner}
          alt={duplicate ? "" : `${partner.name} logo`}
          sizes="210px"
          imageClassName="opacity-90 transition duration-300 group-hover:opacity-100"
        />
      </span>
    </li>
  );
}

function GridLogoItem({ partner }: { partner: PartnerLogo }) {
  return (
    <li className="flex min-h-[7.5rem] items-center justify-center rounded-xl border border-line bg-white px-3 py-5 sm:min-h-[8rem] sm:px-4 sm:py-6">
      <span className="flex h-16 w-full min-h-0 min-w-0 max-w-[200px] items-center justify-center sm:h-[4.5rem] sm:max-w-[220px]">
        <PartnerLogoFrame
          partner={partner}
          alt={`${partner.name} logo`}
          sizes="(max-width: 640px) 40vw, 220px"
        />
      </span>
    </li>
  );
}

/** About-style logo grid — reusable for client logos, platform partners, etc. */
export function LogoMarkGrid({
  logos,
  className = "m-0 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
}: {
  logos: PartnerLogo[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {logos.map((partner) => (
        <GridLogoItem key={partner.slug} partner={partner} />
      ))}
    </ul>
  );
}

function PartnerLogoGrid() {
  return <LogoMarkGrid logos={clientLogos} />;
}

function MarqueeRow({
  items,
  direction,
}: {
  items: PartnerLogo[];
  direction: "left" | "right";
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

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
      <ul ref={trackRef} className="flex w-max list-none items-center p-0 will-change-transform">
        {Array.from({ length: copies }, (_, setIndex) =>
          items.map((partner) => (
            <LogoItem
              key={`${setIndex}-${partner.slug}`}
              partner={partner}
              duplicate={setIndex > 0}
            />
          )),
        )}
      </ul>
    </div>
  );
}

type PartnerLogosProps = {
  sectionId?: string;
  layout?: "marquee" | "grid";
};

export default function PartnerLogos({ sectionId = "partners", layout = "marquee" }: PartnerLogosProps) {
  const isAboutGrid = layout === "grid";

  return (
    <section
      id={sectionId}
      className="section-shell section-pad-sm scroll-mt-[5.5rem] bg-mist"
      aria-labelledby="partners-heading"
    >
      <div className="section-inner">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
          <h2 id="partners-heading" className="text-eyebrow m-0">
            Trusted by visionaries
          </h2>
          {!isAboutGrid ? (
            <Link href="/about#trusted-by" className="text-cta link-cta text-ink">
              View all partners
              <ArrowRight size={16} aria-hidden />
            </Link>
          ) : null}
        </div>

        {isAboutGrid ? (
          <div className="section-media" aria-label="Partner logos">
            <PartnerLogoGrid />
          </div>
        ) : (
          <div className="section-media flex flex-col gap-2 sm:gap-3" aria-label="Partner logos">
            <ul className="sr-only">
              {clientLogos.map((partner) => (
                <li key={partner.slug}>{partner.name}</li>
              ))}
            </ul>
            <div aria-hidden="true">
              <MarqueeRow items={rowLeft} direction="left" />
              <MarqueeRow items={rowRight} direction="right" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
