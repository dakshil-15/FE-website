import Link from "next/link";
import { Boxes } from "lucide-react";
import type { Industry } from "@/content/types";
import { toneStyles, toneLabels } from "@/components/industryTone";
import { industryIcons } from "@/components/industryIcons";

export default function IndustryBlock({ industry }: { industry: Industry }) {
  const style = toneStyles[industry.tone];
  const Icon = industryIcons[industry.slug] ?? Boxes;

  return (
    <Link
      href="/work"
      className={`group block py-12 transition md:py-16 ${style.wrapper}`}
    >
      <div className="grid container-frame gap-6 md:grid-cols-[minmax(0,1fr)_minmax(16rem,24rem)] md:items-end md:gap-10">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon size={16} className={style.label} />
            <p className={`text-xs font-semibold uppercase tracking-widest ${style.label}`}>
              {toneLabels[industry.tone]}
            </p>
          </div>
          <h2 className={`mt-3 font-display text-5xl leading-[0.95] tracking-wide md:text-8xl ${style.title}`}>
            {industry.name.toUpperCase()}
          </h2>
        </div>
        <div className="flex min-w-0 items-end justify-between gap-6 md:flex-col md:items-end md:text-right">
          <p className="text-sm leading-relaxed opacity-70">{industry.overview}</p>
          <span className="shrink-0 text-2xl opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100">
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
