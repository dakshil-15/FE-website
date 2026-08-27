import Link from "next/link";
import type { CaseStudy } from "@/content/types";

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const topMetric = caseStudy.results[0];

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group relative flex min-h-[22rem] flex-col justify-between overflow-hidden border border-line bg-ink p-6 text-paper transition hover:border-red"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-paper/50">{caseStudy.client}</p>
          <h3 className="mt-2 font-display text-2xl leading-none tracking-wide md:text-3xl">
            {caseStudy.campaign}
          </h3>
        </div>
        <span className="mt-1 shrink-0 text-2xl text-paper/40 transition group-hover:translate-x-1 group-hover:text-red">
          &rarr;
        </span>
      </div>

      <div>
        {topMetric && (
          <div className="mb-4">
            <p className="font-display text-4xl text-red md:text-5xl">{topMetric.value}</p>
            <p className="text-xs uppercase tracking-widest text-paper/60">{topMetric.label}</p>
          </div>
        )}
        <p className="line-clamp-2 text-sm text-paper/70">{caseStudy.hero}</p>
      </div>
    </Link>
  );
}
