import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import { workCardImage, workCardTag, workCardTitle } from "@/content/workPage";
import type { CaseStudy } from "@/content/types";

export default function WorkCaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const title = workCardTitle(caseStudy);
  const tag = workCardTag(caseStudy);
  const titleId = `work-card-${caseStudy.slug}`;

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      data-work-card
      aria-labelledby={titleId}
      className="work-card group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_10px_36px_rgba(0,0,0,0.08)] transition duration-200 hover:border-red/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-[#111]">
        <ImageSlot
          asset={workCardImage(caseStudy)}
          className="absolute inset-0 size-full border-0 bg-transparent"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 25vw, 320px"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-eyebrow m-0">{tag}</p>
        <h3
          id={titleId}
          className="mt-2 mb-0 font-display text-[1.35rem] leading-[1.08] tracking-[0.02em] uppercase sm:text-[1.5rem] lg:text-[1.65rem]"
        >
          {title}
        </h3>
        <p className="text-body-sm mt-2.5 mb-0 line-clamp-3 text-muted">{caseStudy.hero}</p>

        <span className="text-cta mt-auto inline-flex min-h-11 items-center gap-2.5 pt-4 text-ink transition group-hover:text-red sm:pt-5">
          View case study
          <span
            className="grid size-7 flex-none place-items-center rounded-full border border-current transition duration-200 group-hover:border-red group-hover:bg-red group-hover:text-white sm:size-8"
            aria-hidden
          >
            <ArrowRight size={13} strokeWidth={2.25} />
          </span>
        </span>
      </div>
    </Link>
  );
}
