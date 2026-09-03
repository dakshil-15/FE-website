"use client";

import type { CSSProperties } from "react";
import GrowthCta from "@/components/GrowthCta";
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
            <GrowthCta href="/work" variant="secondary">
              View all work
            </GrowthCta>
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
