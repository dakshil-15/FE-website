import CaseStudyCard from "@/components/CaseStudyCard";
import type { CaseStudy } from "@/content/types";

// Repeating asymmetric pattern: [wide, narrow], [narrow, wide], [wide, narrow] ...
const spanPattern = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4"];

export default function WorkGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
      {caseStudies.map((caseStudy, i) => (
        <div key={caseStudy.slug} className={spanPattern[i % spanPattern.length]}>
          <CaseStudyCard caseStudy={caseStudy} />
        </div>
      ))}
    </div>
  );
}
