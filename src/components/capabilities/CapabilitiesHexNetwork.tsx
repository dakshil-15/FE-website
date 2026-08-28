"use client";

import { ImageSlot } from "@/components/media/AssetPlaceholder";
import type { MediaSlot } from "@/content/about";

const nodes = [
  { label: "Technology", angle: -90 },
  { label: "AI & Innovation", angle: -30 },
  { label: "Digital Platforms", angle: 30 },
  { label: "Data & Analytics", angle: 90 },
  { label: "Ecosystem", angle: 150 },
  { label: "Automation", angle: 210 },
];

const SIZE = 480;
const CENTER = SIZE / 2;
const HUB_R = 52;
const NODE_R = 36;
const ORBIT_R = 168;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((60 * i - 30) * Math.PI) / 180;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

export default function CapabilitiesHexNetwork({ asset }: { asset: MediaSlot }) {
  if (asset.src) {
    return (
      <ImageSlot
        asset={asset}
        className="aspect-square w-full max-w-[28rem] lg:max-w-none"
        sizes="(max-width: 1024px) 90vw, 45vw"
        priority
      />
    );
  }

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[28rem] lg:max-w-none"
      role="img"
      aria-label={asset.alt || asset.label}
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full overflow-visible">
        <defs>
          <filter id="cap-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {nodes.map((node) => {
          const tip = polar(node.angle, ORBIT_R);
          return (
            <line
              key={`line-${node.label}`}
              x1={CENTER}
              y1={CENTER}
              x2={tip.x}
              y2={tip.y}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={1}
            />
          );
        })}

        {nodes.map((node) => {
          const tip = polar(node.angle, ORBIT_R);
          const labelPos = polar(node.angle, ORBIT_R + 52);
          return (
            <g key={node.label}>
              <polygon
                points={hexPoints(tip.x, tip.y, NODE_R)}
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth={1.2}
              />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.55)"
                style={{
                  fontFamily: "var(--font-barlow), sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        <polygon
          points={hexPoints(CENTER, CENTER, HUB_R)}
          fill="#D22525"
          filter="url(#cap-glow)"
        />
        <text
          x={CENTER}
          y={CENTER}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "0.04em",
          }}
        >
          fe
        </text>
      </svg>

      <span className="sr-only">{asset.label} (placeholder)</span>
    </div>
  );
}
