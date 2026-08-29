"use client";

import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";
import type { CSSProperties } from "react";
import WorkCaseCard from "@/components/work/WorkCaseCard";
import { SECTION_META } from "@/components/work/WorkDetailShared";
import type { WorkDetailModel, WorkDetailSectionId } from "@/content/workDetail";
import { workDetailHeadlines } from "@/content/workDetail";

type WorkDetailRelatedProps = {
  related: WorkDetailModel["related"];
  sectionNumber: (id: WorkDetailSectionId) => string;
  sectionScrollStyle: CSSProperties;
};

export default function WorkDetailRelated({
  related,
  sectionNumber,
  sectionScrollStyle,
}: WorkDetailRelatedProps) {
  return (
    <section
      id="related"
      data-animate-section
      className="section-shell section-pad bg-mist"
      style={sectionScrollStyle}
      aria-labelledby="work-related-heading"
    >
      <div className="section-inner">
        <p data-animate="fade-up" className="text-eyebrow m-0">
          {sectionNumber("related")} {SECTION_META.related.label}
        </p>
        <div className="section-intro">
          <h2
            data-animate="fade-up"
            id="work-related-heading"
            className="text-display-md m-0 text-balance"
          >
            {workDetailHeadlines.related}
          </h2>
          <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1 md:justify-self-end md:self-end">
            <Link
              href="/work"
              className="text-cta gsap-btn tap-target inline-flex min-h-12 items-center gap-3 border border-ink px-5 py-3.5 pl-6 text-ink transition hover:border-red hover:bg-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:gap-4 sm:py-4 sm:pl-7"
            >
              View all work
              <ArrowRightCircle size={24} strokeWidth={1.5} aria-hidden />
            </Link>
          </div>
        </div>

        <ul
          data-animate-stagger
          className="section-media m-0 grid list-none grid-cols-1 gap-5 p-0 xs:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {related.slice(0, 3).map((item) => (
            <li key={item.slug}>
              <WorkCaseCard caseStudy={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
