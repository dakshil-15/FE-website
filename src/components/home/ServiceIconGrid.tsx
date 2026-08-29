import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import {
  MediaBuyingIcon,
  VideoProductionIcon,
  BrandingIcon,
  InfluencerMarketingIcon,
  MarketplaceManagementIcon,
  TechSolutionsIcon,
  CreativeSolutionsIcon,
  SocialMediaIcon,
  SeoIcon,
  AiSolutionsIcon,
} from "@/components/brandIcons";
import { serviceOfferings } from "@/content/serviceOfferings";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const iconBySlug: Record<string, IconComponent> = {
  "media-buying": MediaBuyingIcon,
  "video-production": VideoProductionIcon,
  branding: BrandingIcon,
  "influencer-marketing": InfluencerMarketingIcon,
  "marketplace-management": MarketplaceManagementIcon,
  technology: TechSolutionsIcon,
  creative: CreativeSolutionsIcon,
  "social-media": SocialMediaIcon,
  seo: SeoIcon,
  "ai-solutions": AiSolutionsIcon,
};

export default function ServiceIconGrid() {
  return (
    <ul data-animate-stagger className="caps list-none p-0">
      {serviceOfferings.map((service, index) => {
        const num = String(index + 1).padStart(2, "0");
        const Icon = iconBySlug[service.slug];

        return (
          <li key={service.slug} className="min-w-0">
            <Link
              href={service.href}
              className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-[20px] border border-[#e6e6e6] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-red/35 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] focus-visible:border-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:min-h-[268px] sm:rounded-[22px] sm:p-5 md:min-h-[292px] md:p-6"
            >
              <svg
                className="pointer-events-none absolute -bottom-6 -left-8 h-[140px] w-[140px] text-red/[0.12]"
                viewBox="0 0 140 140"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 128C12 64 64 12 128 12"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
              </svg>

              <div className="relative flex items-start justify-between gap-3">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-red text-white shadow-[0_8px_20px_rgba(210,37,37,0.3)] sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]">
                  <Icon size={34} aria-hidden className="h-7 w-7 text-white sm:h-8 sm:w-8 md:h-9 md:w-9" />
                </span>
                <span
                  className="font-display text-[2.75rem] leading-none font-light tracking-tight text-[#e4e4e4] select-none sm:text-[3rem]"
                  aria-hidden
                >
                  {num}
                </span>
              </div>

              <div className="relative mt-7 flex flex-1 flex-col sm:mt-8">
                <h3 className="m-0 w-full font-display text-[1.05rem] leading-[1.15] font-bold tracking-[0.02em] text-ink uppercase sm:text-[1.125rem]">
                  {service.name}
                </h3>
                <span className="mt-3 block h-[3px] w-8 rounded-full bg-red" aria-hidden />
                <p className="mt-3.5 mb-0 text-[13px] leading-snug text-muted sm:text-sm">
                  {service.description}
                </p>
              </div>

              <div className="relative mt-6 flex justify-end">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full border border-red bg-white text-red transition duration-200 group-hover:bg-red group-hover:text-white"
                  aria-hidden
                >
                  <ArrowRight size={15} strokeWidth={2.25} />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
