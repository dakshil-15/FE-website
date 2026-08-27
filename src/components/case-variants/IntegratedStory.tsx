import Image from "next/image";
import { Layers } from "lucide-react";
import type { CaseStudy } from "@/content/types";
import { tokens } from "@/lib/tokens";
import { workPhotos } from "@/content/workPhotos";

export default function IntegratedStory({ caseStudy }: { caseStudy: CaseStudy }) {
  const accent = caseStudy.accentColor ?? tokens.black;
  const photo = workPhotos[caseStudy.slug];

  return (
    <div style={{ ["--case-accent" as string]: accent }}>
      <section
        className="relative overflow-hidden border-b border-line pb-16 pt-16 text-paper"
        style={{ backgroundColor: photo ? undefined : "var(--case-accent)" }}
      >
        {photo && (
          <>
            <Image src={photo} alt="" aria-hidden fill priority sizes="100vw" className="object-cover" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(0deg, var(--case-accent) 0%, color-mix(in srgb, var(--case-accent) 70%, transparent) 45%, color-mix(in srgb, var(--case-accent) 35%, transparent) 100%)`,
              }}
            />
          </>
        )}
        <div className="relative container-content">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-paper/70" />
            <p className="text-xs font-semibold uppercase tracking-widest text-paper/70">{caseStudy.client}</p>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-paper/50">Big idea</p>
          <h1 className="mt-3 font-display text-5xl leading-tight tracking-wide md:text-7xl">
            {caseStudy.campaign}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/85">{caseStudy.hero}</p>
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

      <section className="border-b border-line bg-mist py-16">
        <div className="container-frame">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--case-accent)" }}>
            Touchpoint map
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudy.execution.map((item) => (
              <div key={item} className="border-l-4 bg-paper p-5" style={{ borderColor: "var(--case-accent)" }}>
                <p className="text-sm text-ink/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
