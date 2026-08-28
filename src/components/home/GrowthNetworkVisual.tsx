"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Tight canvas: diagram fills ~78% of the frame.
 * Labels sit in the remaining margin so nothing crops.
 */
const SIZE = 840;
const CENTER = SIZE / 2;

const rings = [
  { id: "r1", radius: 128, count: 42, length: 16, duration: 48, direction: 1 },
  { id: "r2", radius: 172, count: 54, length: 20, duration: 56, direction: -1 },
  { id: "r3", radius: 222, count: 66, length: 24, duration: 64, direction: 1 },
  { id: "r4", radius: 278, count: 78, length: 28, duration: 72, direction: -1 },
] as const;

const nodes = [
  {
    label: "MEDIA",
    angle: -90,
    textAnchor: "middle" as const,
    labelOffset: { x: 0, y: -26 },
  },
  {
    label: "TECHNOLOGY",
    angle: 0,
    textAnchor: "middle" as const,
    labelOffset: { x: 44, y: 0 },
  },
  {
    label: "AI",
    angle: 90,
    textAnchor: "middle" as const,
    labelOffset: { x: 0, y: 30 },
  },
  {
    label: "CREATIVE",
    angle: 180,
    textAnchor: "middle" as const,
    labelOffset: { x: -44, y: 0 },
  },
];

const RAY_INNER = 92;
const RAY_OUTER = 328;
const HUB_R = 88;

/**
 * Serialize floats identically on Node + browser.
 * Raw Math.cos/sin values differ slightly across runtimes and break hydration.
 */
function coord(n: number) {
  return Number(n.toFixed(2));
}

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: coord(CENTER + radius * Math.cos(rad)),
    y: coord(CENTER + radius * Math.sin(rad)),
  };
}

function tickLine(angleDeg: number, radius: number, length: number) {
  const outer = polar(angleDeg, radius);
  const inner = polar(angleDeg, radius - length);
  return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
}

export default function GrowthNetworkVisual() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(
        "[data-gs-hub], [data-gs-ring], [data-gs-spoke], [data-gs-node], [data-gs-label], [data-gs-packet]",
        { autoAlpha: 1 },
      );

      if (reduce) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set("[data-gs-ring]", { autoAlpha: 0, scale: 0.86, transformOrigin: "50% 50%" });
      gsap.set("[data-gs-hub]", { autoAlpha: 0, scale: 0.7, transformOrigin: "50% 50%" });
      gsap.set("[data-gs-spoke]", { autoAlpha: 0 });
      gsap.set("[data-gs-node]", { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.set("[data-gs-label]", { autoAlpha: 0, y: 6 });
      gsap.set("[data-gs-packet]", { autoAlpha: 0 });

      tl.to("[data-gs-ring]", {
        autoAlpha: 1,
        scale: 1,
        duration: 1.1,
        stagger: 0.08,
      })
        .to("[data-gs-hub]", { autoAlpha: 1, scale: 1, duration: 0.85 }, "-=0.75")
        .to("[data-gs-spoke]", { autoAlpha: 1, duration: 0.55, stagger: 0.08 }, "-=0.45")
        .to(
          "[data-gs-node]",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.45,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          "-=0.25",
        )
        .to("[data-gs-label]", { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 }, "-=0.2");

      rings.forEach((ring) => {
        gsap.to(`[data-gs-ring="${ring.id}"]`, {
          rotation: 360 * ring.direction,
          duration: ring.duration,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      });

      gsap.to("[data-gs-hub-pulse]", {
        scale: 1.045,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      gsap.to("[data-gs-node]", {
        scale: 1.14,
        duration: 1.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.35, repeat: -1 },
        transformOrigin: "50% 50%",
      });

      nodes.forEach((node, i) => {
        const start = polar(node.angle, RAY_INNER + 12);
        const end = polar(node.angle, RAY_OUTER - 14);
        const packet = `[data-gs-packet="${i}"]`;

        gsap.set(packet, {
          attr: { cx: start.x, cy: start.y },
          autoAlpha: 0,
        });

        gsap
          .timeline({ repeat: -1, delay: 0.9 + i * 0.55 })
          .to(packet, { autoAlpha: 0.95, duration: 0.2 })
          .to(
            packet,
            {
              attr: { cx: end.x, cy: end.y },
              duration: 1.6,
              ease: "power1.inOut",
            },
            0,
          )
          .to(packet, { autoAlpha: 0, duration: 0.25 }, "-=0.25")
          .to({}, { duration: 2.2 });
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative mx-auto aspect-square w-full">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="block h-auto w-full overflow-visible"
        role="img"
        aria-label="Diagram of First Economy growth system connecting Media, Technology, AI, and Creative"
        suppressHydrationWarning
      >
        <defs>
          <filter id="gs-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {rings.map((ring) => (
          <g key={ring.id} data-gs-ring={ring.id}>
            {Array.from({ length: ring.count }, (_, i) => {
              const angle = (360 / ring.count) * i - 90;
              const nearAxis = [0, 90, 180, 270].some((a) => {
                const diff = Math.abs((((angle + 90) % 360) + 360) % 360 - a);
                return Math.min(diff, 360 - diff) < 3.2;
              });
              if (nearAxis) return null;
              const line = tickLine(angle, ring.radius, ring.length);
              return (
                <line
                  key={`${ring.id}-${i}`}
                  x1={line.x1.toFixed(2)}
                  y1={line.y1.toFixed(2)}
                  x2={line.x2.toFixed(2)}
                  y2={line.y2.toFixed(2)}
                  stroke="#1a1a1a"
                  strokeWidth={1.55}
                  strokeLinecap="round"
                  opacity={coord(0.48 + ring.radius / 900).toFixed(2)}
                  suppressHydrationWarning
                />
              );
            })}
          </g>
        ))}

        {nodes.map((node) => {
          const inner = polar(node.angle, RAY_INNER);
          const outer = polar(node.angle, RAY_OUTER);
          return (
            <line
              key={`spoke-${node.label}`}
              data-gs-spoke
              x1={inner.x.toFixed(2)}
              y1={inner.y.toFixed(2)}
              x2={outer.x.toFixed(2)}
              y2={outer.y.toFixed(2)}
              stroke="#2a2a2a"
              strokeWidth={1.45}
              suppressHydrationWarning
            />
          );
        })}

        {nodes.map((_, i) => (
          <circle
            key={`packet-${i}`}
            data-gs-packet={i}
            r={3.8}
            fill="#D22525"
            filter="url(#gs-soft-glow)"
          />
        ))}

        <g data-gs-hub>
          <circle data-gs-hub-pulse cx={CENTER} cy={CENTER} r={HUB_R} fill="#0A0A0A" />
          <text
            textAnchor="middle"
            fill="#ffffff"
            style={{
              fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif",
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: "0.08em",
            }}
          >
            <tspan x={CENTER} y={CENTER - 13} dominantBaseline="central">
              GROWTH
            </tspan>
            <tspan x={CENTER} y={CENTER + 13} dominantBaseline="central">
              SYSTEM
            </tspan>
          </text>
        </g>

        {nodes.map((node) => {
          const tip = polar(node.angle, RAY_OUTER);
          return (
            <g key={node.label}>
              <circle
                data-gs-node
                cx={tip.x.toFixed(2)}
                cy={tip.y.toFixed(2)}
                r={7}
                fill="#D22525"
                filter="url(#gs-soft-glow)"
                suppressHydrationWarning
              />
              <text
                data-gs-label
                x={(tip.x + node.labelOffset.x).toFixed(2)}
                y={(tip.y + node.labelOffset.y).toFixed(2)}
                textAnchor={node.textAnchor}
                dominantBaseline="middle"
                fill="#3a3a3a"
                style={{
                  fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.08em",
                }}
                suppressHydrationWarning
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
