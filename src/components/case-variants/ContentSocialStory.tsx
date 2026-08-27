import { MessagesSquare, Heart, MessageCircle, Repeat2 } from "lucide-react";
import type { CaseStudy } from "@/content/types";
import { tokens } from "@/lib/tokens";

export default function ContentSocialStory({ caseStudy }: { caseStudy: CaseStudy }) {
  const accent = caseStudy.accentColor ?? tokens.red;

  return (
    <div style={{ ["--case-accent" as string]: accent }}>
      <section className="border-b border-line pb-16 pt-16">
        <div className="container-content">
          <div className="flex items-center gap-2">
            <MessagesSquare size={16} style={{ color: "var(--case-accent)" }} />
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--case-accent)" }}>
              {caseStudy.client}
            </p>
          </div>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
            {caseStudy.campaign}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{caseStudy.hero}</p>
        </div>
      </section>

      <section className="border-b border-line bg-mist py-16">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--case-accent)" }}>
            The challenge
          </p>
          <p className="mt-4 text-lg text-muted">{caseStudy.challenge}</p>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-frame">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--case-accent)" }}>
            The content system
          </p>
          <div className="mt-8 flex gap-5 overflow-x-auto pb-4">
            {caseStudy.execution.map((item, i) => (
              <div
                key={item}
                className="flex h-80 w-52 shrink-0 flex-col justify-between border border-line bg-ink p-4 text-paper"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-paper"
                    style={{ backgroundColor: "var(--case-accent)" }}
                  >
                    {i + 1}
                  </span>
                  <div className="space-y-1">
                    <div className="h-1.5 w-16 bg-paper/40" />
                    <div className="h-1.5 w-10 bg-paper/25" />
                  </div>
                </div>
                <p className="text-sm font-medium leading-snug">{item}</p>
                <div className="flex items-center gap-3 text-paper/50">
                  <Heart size={13} />
                  <MessageCircle size={13} />
                  <Repeat2 size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
