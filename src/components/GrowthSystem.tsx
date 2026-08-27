"use client";

import Link from "next/link";
import { useState } from "react";
import { growthNodes } from "@/content/site";

export default function GrowthSystem() {
  const [activeId, setActiveId] = useState(growthNodes[0].id);
  const active = growthNodes.find((n) => n.id === activeId) ?? growthNodes[0];

  return (
    <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
      <div className="flex flex-wrap gap-3">
        {growthNodes.map((node) => {
          const isActive = node.id === activeId;
          return (
            <button
              key={node.id}
              type="button"
              onMouseEnter={() => setActiveId(node.id)}
              onFocus={() => setActiveId(node.id)}
              onClick={() => setActiveId(node.id)}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition ${
                isActive
                  ? "border-red bg-red text-paper"
                  : "border-line text-ink/70 hover:border-ink hover:text-ink"
              }`}
            >
              {node.label}
            </button>
          );
        })}
      </div>

      <div className="border border-line bg-mist p-8 md:p-10">
        <p className="font-display text-3xl tracking-wide md:text-4xl">{active.label}</p>
        <p className="mt-4 text-base text-muted">{active.description}</p>
        {active.relatedServiceSlug && (
          <Link
            href={`/services/${active.relatedServiceSlug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red"
          >
            Explore {active.label} <span aria-hidden>&rarr;</span>
          </Link>
        )}
      </div>
    </div>
  );
}
