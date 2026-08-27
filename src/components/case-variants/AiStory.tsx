import { Sparkles, ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/types";
import { tokens } from "@/lib/tokens";

const pipeline = ["Prompt / Idea", "Script", "Storyboard", "Visual", "Motion", "Voice / Music", "Final Output"];

export default function AiStory({ caseStudy }: { caseStudy: CaseStudy }) {
  const accent = caseStudy.accentColor ?? tokens.red;

  return (
    <div style={{ ["--case-accent" as string]: accent }}>
      <section className="relative overflow-hidden border-b border-line bg-ink pb-16 pt-16 text-paper">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 15%, color-mix(in srgb, var(--case-accent) 35%, transparent), transparent 35%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.12), transparent 40%)`,
          }}
        />
        <div className="relative container-content">
          <div className="flex items-center gap-2">
            <Sparkles size={16} style={{ color: "var(--case-accent)" }} />
            <p className="text-xs font-semibold uppercase tracking-widest text-paper/60">{caseStudy.client}</p>
          </div>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
            {caseStudy.campaign}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/80">{caseStudy.hero}</p>
        </div>

        <div className="relative mx-auto mt-16 flex max-w-5xl flex-wrap items-center justify-center gap-3">
          {pipeline.map((stage, i) => (
            <div key={stage} className="flex items-center gap-3">
              <span
                className="rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide"
                style={{ borderColor: "color-mix(in srgb, var(--case-accent) 60%, white 10%)" }}
              >
                {stage}
              </span>
              {i < pipeline.length - 1 && <ArrowRight size={14} style={{ color: "var(--case-accent)" }} />}
            </div>
          ))}
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
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--case-accent)" }}>
            Where AI was applied
          </p>
          <ul className="mt-6 space-y-4">
            {caseStudy.execution.map((item) => (
              <li key={item} className="flex gap-4 border-b border-line pb-4 text-base text-ink/80">
                <span style={{ color: "var(--case-accent)" }}>&#10022;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
