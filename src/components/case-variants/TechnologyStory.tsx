import { Cpu } from "lucide-react";
import type { CaseStudy } from "@/content/types";
import { tokens } from "@/lib/tokens";

const stages = ["The complexity", "System architecture", "Experience", "Integrations", "Platform", "Outcome"];

export default function TechnologyStory({ caseStudy }: { caseStudy: CaseStudy }) {
  const accent = caseStudy.accentColor ?? tokens.black;

  return (
    <div style={{ ["--case-accent" as string]: accent }}>
      <section className="border-b border-line pb-16 pt-16">
        <div className="container-content">
          <div className="flex items-center gap-2">
            <Cpu size={16} style={{ color: "var(--case-accent)" }} />
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--case-accent)" }}>
              {caseStudy.client}
            </p>
          </div>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
            {caseStudy.campaign}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{caseStudy.hero}</p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl border border-line">
          <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-4 text-xs text-muted">{caseStudy.client.toLowerCase().replace(/\s+/g, "")}.platform</span>
          </div>
          <div className="grid gap-px bg-line sm:grid-cols-2">
            {stages.map((stage, i) => {
              const body = i === 0 ? caseStudy.challenge : caseStudy.execution[i - 1];
              if (!body) return null;
              return (
                <div key={stage} className="bg-paper p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-display text-xl tracking-wide">{stage}</p>
                  <p className="mt-2 text-sm text-muted">{body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
