"use client";

import { useMemo, useState } from "react";
import WorkGrid from "@/components/WorkGrid";
import type { CaseStudy } from "@/content/types";

const filters = [
  { key: "all", label: "All" },
  { key: "integrated", label: "Integrated" },
  { key: "media-buying", label: "Media" },
  { key: "technology", label: "Technology" },
  { key: "seo", label: "SEO" },
  { key: "video-production", label: "Video" },
  { key: "branding", label: "Branding" },
  { key: "influencer-marketing", label: "Influencer" },
  { key: "social-media", label: "Social" },
  { key: "ai-solutions", label: "AI" },
];

export default function WorkBrowser({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return caseStudies;
    if (active === "integrated") return caseStudies.filter((c) => c.family === "integrated");
    return caseStudies.filter((c) => c.services.includes(active));
  }, [active, caseStudies]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f.key)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-wide transition ${
              active === f.key ? "border-red bg-red text-paper" : "border-line text-ink/70 hover:border-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <WorkGrid caseStudies={filtered} />
      </div>
    </div>
  );
}
