import type { CaseStudy } from "@/content/types";
import IntegratedStory from "./IntegratedStory";
import MediaPerformanceStory from "./MediaPerformanceStory";
import TechnologyStory from "./TechnologyStory";
import ContentSocialStory from "./ContentSocialStory";
import AiStory from "./AiStory";

export default function CaseStory({ caseStudy }: { caseStudy: CaseStudy }) {
  switch (caseStudy.family) {
    case "integrated":
      return <IntegratedStory caseStudy={caseStudy} />;
    case "media-performance":
      return <MediaPerformanceStory caseStudy={caseStudy} />;
    case "technology":
      return <TechnologyStory caseStudy={caseStudy} />;
    case "content-social":
      return <ContentSocialStory caseStudy={caseStudy} />;
    case "ai":
      return <AiStory caseStudy={caseStudy} />;
  }
}
