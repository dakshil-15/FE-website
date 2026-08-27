import Link from "next/link";
import Image from "next/image";
import { Layers, type LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  MediaBuyingIcon,
  SeoIcon,
  TechSolutionsIcon,
  BrandingIcon,
  InfluencerMarketingIcon,
  SocialMediaIcon,
  AiSolutionsIcon,
  VideoProductionIcon,
  CreativeSolutionsIcon,
  MarketplaceManagementIcon,
  ArrowUpRightIcon,
} from "@/components/brandIcons";
import type { CaseStudy } from "@/content/types";
import { tokens } from "@/lib/tokens";
import { workPhotos } from "@/content/workPhotos";
import { industries } from "@/content/industries";

type IconComponent = LucideIcon | ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const serviceTagLabels: Record<string, { label: string; icon: IconComponent }> = {
  "media-buying": { label: "Media", icon: MediaBuyingIcon },
  seo: { label: "SEO", icon: SeoIcon },
  technology: { label: "Tech", icon: TechSolutionsIcon },
  branding: { label: "Branding", icon: BrandingIcon },
  "influencer-marketing": { label: "Influencer", icon: InfluencerMarketingIcon },
  "social-media": { label: "Social", icon: SocialMediaIcon },
  "ai-solutions": { label: "AI", icon: AiSolutionsIcon },
  "video-production": { label: "Video", icon: VideoProductionIcon },
  creative: { label: "Creative", icon: CreativeSolutionsIcon },
  "marketplace-management": { label: "Marketplace", icon: MarketplaceManagementIcon },
};

function getTag(caseStudy: CaseStudy) {
  if (caseStudy.family === "integrated") return { label: "Integrated", icon: Layers as IconComponent };
  return serviceTagLabels[caseStudy.services[0]] ?? { label: "Work", icon: Layers as IconComponent };
}

export default function FeaturedWorkCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const accent = caseStudy.accentColor ?? tokens.red;
  const tag = getTag(caseStudy);
  const photo = workPhotos[caseStudy.slug];
  const industry = industries.find((i) => i.slug === caseStudy.industry);

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group relative flex h-[24rem] w-[19rem] shrink-0 flex-col justify-between overflow-hidden border border-white/20 bg-ink p-5 text-paper transition-[border-color] duration-200 hover:border-red focus-visible:border-red sm:w-[21rem]"
    >
      {photo && (
        <Image
          src={photo}
          alt={`${caseStudy.client} — ${caseStudy.campaign}`}
          fill
          sizes="21rem"
          className="object-cover object-top transition duration-500 group-hover:scale-105"
        />
      )}

      <span className="relative inline-flex w-fit items-center gap-1.5 bg-ink/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur">
        <tag.icon size={11} style={{ color: accent }} />
        {tag.label}
      </span>

      <div className="relative pr-10">
        <p className="font-heading text-lg leading-tight tracking-tight">{caseStudy.client}</p>
        <p className="mt-1 text-sm text-paper/70">{caseStudy.campaign}</p>
        {industry && <p className="mt-2 text-[11px] uppercase tracking-widest text-paper/40">{industry.name}</p>}
      </div>

      <span className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink transition group-hover:bg-red group-hover:text-paper">
        <ArrowUpRightIcon size={14} />
      </span>
    </Link>
  );
}
