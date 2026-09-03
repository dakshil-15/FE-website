/**
 * Work (case studies) landing page content and media slots.
 * Case thumbnails and icons: drop files in /public/images/work/ then set `src`.
 */

import type { MediaSlot } from "@/content/about";
import { industries } from "@/content/industries";
import type { CaseStudy, CaseStudyFamily, Metric } from "@/content/types";
import { workPhotos } from "@/content/workPhotos";

export const workHero = {
  headlineBefore: "Case studies.",
  headlineAccent: "Real impact.",
  body: "Explore how we engineer growth systems that solve real business challenges and deliver measurable results.",
  image: {
    src: "/images/work/hero/work-banner.jpg",
    alt: "First Economy team in a strategy meeting reviewing growth analytics on a boardroom display",
    label: "Work hero banner",
    grayscale: false,
  } satisfies MediaSlot,
  burst: "/images/work/hero/radial-burst.svg",
  arrow: "/images/work/hero/arrow-circle.svg",
};

export const workFilters = [
  { key: "all", label: "All Cases" },
  { key: "media", label: "Media" },
  { key: "creative", label: "Creative" },
  { key: "branding", label: "Branding" },
  { key: "technology", label: "Technology" },
  { key: "social", label: "Social" },
  { key: "seo", label: "SEO" },
  { key: "ai", label: "AI" },
  { key: "performance", label: "Performance" },
] as const;

export type WorkFilterKey = (typeof workFilters)[number]["key"];

const filterServices: Record<Exclude<WorkFilterKey, "all" | "performance">, string[]> = {
  media: ["media-buying"],
  creative: ["video-production", "creative"],
  branding: ["branding"],
  technology: ["technology"],
  social: ["social-media", "influencer-marketing"],
  seo: ["seo"],
  ai: ["ai-solutions"],
};

export function matchesWorkFilter(caseStudy: CaseStudy, key: WorkFilterKey) {
  if (key === "all") return true;
  if (key === "performance") return caseStudy.family === "media-performance";
  return caseStudy.services.some((service) => filterServices[key].includes(service));
}

/** Mockup order first, then remaining studies. */
export const workShowcaseOrder = [
  "godrej-blue",
  "fedex-csk",
  "royale-touche-stay-curious",
  "poonawalla-fraud-awareness",
  "mahindra-manulife",
  "orpat-erp",
  "ajanta-ai-creatives",
  "waaree",
];

const familyTags: Record<CaseStudyFamily, string> = {
  integrated: "360° Campaign",
  "media-performance": "360° Campaign",
  technology: "Brand Campaign",
  "content-social": "Brand Campaign",
  ai: "Brand Campaign",
};

const titleOverrides: Record<string, string> = {
  "godrej-blue": "Godrej Blue",
  "godrej-greenfront": "Godrej Greenfront",
  "fedex-csk": "FedEx × CSK",
  "ajanta-ai-creatives": "Ajanta Jewellery",
  waaree: "Waaree Energies",
  "poonawalla-ai-creatives": "Poonawalla AI",
  "royale-touche-stay-curious": "Royale Touché",
};

/** Home carousel — curated headline metrics (deck highlights not always first in `results`). */
const homeFeaturedSpotlight: Partial<Record<string, Metric>> = {
  "godrej-blue": { value: "1,000+", label: "Influencers live in one hour" },
  "royale-touche-stay-curious": { value: "120K+", label: "Reddit impressions" },
};

const homeFeaturedEyebrowOverrides: Partial<Record<string, string>> = {
  "fedex-csk": "Brand Recall",
  "royale-touche-stay-curious": "Integrated Campaign",
  "poonawalla-fraud-awareness": "Fraud Awareness",
  "poonawalla-ai-creatives": "AI Creative",
};

export const homeFeaturedWorkLimit = 4;

export function workCardTitle(caseStudy: CaseStudy) {
  return titleOverrides[caseStudy.slug] ?? caseStudy.client;
}

export function workCardTag(caseStudy: CaseStudy) {
  return familyTags[caseStudy.family];
}

export function caseStudyIndustryName(caseStudy: CaseStudy) {
  return industries.find((industry) => industry.slug === caseStudy.industry)?.name ?? caseStudy.industry;
}

export function homeFeaturedWorkStudies(studies: CaseStudy[]) {
  return workShowcaseOrder
    .map((slug) => studies.find((study) => study.slug === slug))
    .filter((study): study is CaseStudy => Boolean(study?.featured))
    .slice(0, homeFeaturedWorkLimit);
}

export function homeFeaturedEyebrow(caseStudy: CaseStudy) {
  return (
    homeFeaturedEyebrowOverrides[caseStudy.slug] ??
    caseStudy.tags?.[0] ??
    workCardTag(caseStudy)
  );
}

export function homeFeaturedSpotlightMetric(caseStudy: CaseStudy): Metric {
  return (
    homeFeaturedSpotlight[caseStudy.slug] ??
    caseStudy.results[0] ?? { value: "—", label: "Impact" }
  );
}

/** Case thumbnails — shared with home / detail story covers via workPhotos. */
export function workCardImage(caseStudy: CaseStudy): MediaSlot {
  return {
    src: workPhotos[caseStudy.slug],
    alt: `${caseStudy.client} — ${caseStudy.campaign}`,
    label: workCardTitle(caseStudy),
    grayscale: false,
  };
}

export function orderedWorkStudies(studies: CaseStudy[]) {
  const featured = workShowcaseOrder
    .map((slug) => studies.find((study) => study.slug === slug))
    .filter((study): study is CaseStudy => Boolean(study));
  const rest = studies.filter((study) => !workShowcaseOrder.includes(study.slug));
  return [...featured, ...rest];
}

export const workStats = {
  icon: {
    src: "/images/work/stats/results-target.svg",
    alt: "",
    label: "Results",
  } satisfies MediaSlot,
  items: [
    { value: 1.204, decimals: 3, unit: "B", plus: true, label: "Impressions generated" },
    { value: 175, decimals: 0, unit: "M", plus: true, label: "People reached" },
    { value: 54, decimals: 0, unit: "M", plus: true, label: "Engagements" },
    { value: 85, decimals: 0, unit: "M", plus: true, label: "Video views" },
  ],
  tagline: "Results that reflect strategy. Execution that delivers.",
};

export const workCta = {
  titleBefore: "Have a challenge",
  titleAccent: "worth solving?",
  body: "Let's engineer a growth system custom-built for your brand.",
  button: { label: "Start a Conversation", href: "/contact" },
  burst: "/images/work/cta-burst.svg",
};
