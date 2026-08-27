import Image from "next/image";
import { ChartColumn } from "lucide-react";
import type { CaseStudy } from "@/content/types";
import { tokens } from "@/lib/tokens";
import { workPhotos } from "@/content/workPhotos";

export default function MediaPerformanceStory({ caseStudy }: { caseStudy: CaseStudy }) {
  const accent = caseStudy.accentColor ?? tokens.red;
  const topMetric = caseStudy.results[0];
  const photo = workPhotos[caseStudy.slug];

  return (
    <div style={{ ["--case-accent" as string]: accent }}>
      <section className="relative overflow-hidden border-b border-line bg-ink pb-16 pt-16 text-paper">
        {photo && (
          <Image
            src={photo}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {photo && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: "linear-gradient(0deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.55) 100%)" }}
          />
        )}
        <div className="relative container-content">
          <div className="flex items-center gap-2">
            <ChartColumn size={16} style={{ color: "var(--case-accent)" }} />
            <p className="text-xs font-semibold uppercase tracking-widest text-paper/60">{caseStudy.client}</p>
          </div>
          {topMetric && (
            <p
              className="mt-4 font-display text-7xl leading-none tracking-wide md:text-9xl"
              style={{ color: "var(--case-accent)" }}
            >
              {topMetric.value}
            </p>
          )}
          {topMetric && (
            <p className="mt-2 text-sm uppercase tracking-widest text-paper/60">{topMetric.label}</p>
          )}
          <h1 className="mt-6 font-display text-3xl leading-tight tracking-wide md:text-4xl">
            {caseStudy.campaign}
          </h1>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--case-accent)" }}>
            The challenge
          </p>
          <p className="mt-4 text-lg text-muted">{caseStudy.challenge}</p>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--case-accent)" }}>
            How
          </p>
          <ul className="mt-6 space-y-4">
            {caseStudy.execution.map((item) => (
              <li key={item} className="flex gap-4 border-b border-line pb-4 text-base text-ink/80">
                <span style={{ color: "var(--case-accent)" }}>&mdash;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
