"use client";

import { useMemo, useState } from "react";
import { industries } from "@/content/industries";

type ClientEntry = { name: string; industrySlug: string; industryName: string };

export default function ClientsGrid() {
  const allClients = useMemo<ClientEntry[]>(() => {
    const seen = new Set<string>();
    const entries: ClientEntry[] = [];
    for (const industry of industries) {
      for (const name of industry.clients) {
        const key = `${name}-${industry.slug}`;
        if (seen.has(key)) continue;
        seen.add(key);
        entries.push({ name, industrySlug: industry.slug, industryName: industry.name });
      }
    }
    return entries;
  }, []);

  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? allClients : allClients.filter((c) => c.industrySlug === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-wide transition ${
            filter === "all" ? "border-red bg-red text-paper" : "border-line text-ink/70 hover:border-ink"
          }`}
        >
          All
        </button>
        {industries.map((industry) => (
          <button
            key={industry.slug}
            type="button"
            onClick={() => setFilter(industry.slug)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-wide transition ${
              filter === industry.slug ? "border-red bg-red text-paper" : "border-line text-ink/70 hover:border-ink"
            }`}
          >
            {industry.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((client) => (
          <div
            key={`${client.name}-${client.industrySlug}`}
            className="flex items-center justify-between border border-line p-6"
          >
            <span className="font-display text-xl tracking-wide">{client.name}</span>
            <span className="text-xs uppercase tracking-widest text-muted">{client.industryName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
