import type { Service } from "@/content/types";
import PerformanceDataHero from "./PerformanceDataHero";
import VisualCreativeHero from "./VisualCreativeHero";
import SocialCreatorHero from "./SocialCreatorHero";
import ProductTechHero from "./ProductTechHero";
import AiHero from "./AiHero";

export default function ServiceHero({ service }: { service: Service }) {
  switch (service.family) {
    case "performance-data":
      return <PerformanceDataHero service={service} />;
    case "visual-creative":
      return <VisualCreativeHero service={service} />;
    case "social-creator":
      return <SocialCreatorHero service={service} />;
    case "product-tech":
      return <ProductTechHero service={service} />;
    case "ai":
      return <AiHero service={service} />;
  }
}
