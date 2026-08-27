export type Metric = {
  label: string;
  value: string;
};

export type ServiceFamily =
  | "performance-data"
  | "visual-creative"
  | "social-creator"
  | "product-tech"
  | "ai";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  heroStatement: string;
  capabilities: string[];
  caseStudySlugs: string[];
  family: ServiceFamily;
};

export type CaseStudyFamily =
  | "integrated"
  | "media-performance"
  | "technology"
  | "content-social"
  | "ai";

export type CaseStudy = {
  slug: string;
  client: string;
  campaign: string;
  industry: string;
  services: string[];
  hero: string;
  challenge: string;
  execution: string[];
  results: Metric[];
  flagship?: boolean;
  featured?: boolean;
  family: CaseStudyFamily;
  /** Optional campaign-specific accent, scoped only to the story area of the case study page. */
  accentColor?: string;
};

export type IndustryTone = "campaign" | "restrained" | "fast" | "cinematic" | "premium" | "technical";

export type Industry = {
  slug: string;
  name: string;
  overview: string;
  clients: string[];
  caseStudySlugs: string[];
  tone: IndustryTone;
};

export type Office = {
  slug: string;
  city: string;
  isHq?: boolean;
};

export type GrowthNode = {
  id: string;
  label: string;
  description: string;
  relatedServiceSlug?: string;
};
