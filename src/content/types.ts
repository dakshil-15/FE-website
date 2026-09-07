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

export type CaseStudyPillar = {
  title: string;
  description?: string;
};

export type CaseStudyVideo = {
  title: string;
  description: string;
  /** Poster / still frame path under /public */
  poster?: string;
  /** Direct video file or YouTube/Vimeo embed URL */
  src?: string;
};

/** Gallery images grouped by deck touchpoint / slide theme for a campaign. */
export type CaseStudyGalleryImage =
  | string
  | {
      src: string;
      /** Live URL aligned to this creative (Instagram, article, etc.). */
      href?: string;
    };

export type CaseStudyGalleryGroup = {
  title: string;
  /** Deck caption shown under the group images */
  description?: string;
  images: CaseStudyGalleryImage[];
  /**
   * Gallery presentation:
   * - compact → logo mark grid (own Platforms section)
   * - solo → one image at a time in the carousel
   */
  density?: "default" | "compact" | "solo";
  /** Groups sharing a row key render side-by-side in a single row. */
  pairRow?: string;
  /** Optional heading shown once above a paired row (set on the first group). */
  pairRowHeading?: string;
};

/** External proof / activation link (Instagram, articles, live URLs). CMS-ready. */
export type CaseStudyLink = {
  label: string;
  href: string;
  description?: string;
  /** Optional explicit thumb; otherwise Instagram post/reel OG image is resolved at build. */
  thumbnail?: string;
};

/** Grouped links for a campaign phase or channel. Shown only when present. */
export type CaseStudyLinkGroup = {
  title: string;
  description?: string;
  links: CaseStudyLink[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  campaign: string;
  industry: string;
  services: string[];
  hero: string;
  challenge: string;
  execution: string[];
  /** Outcome metrics. Empty / omitted hides The Result section. */
  results?: Metric[];
  flagship?: boolean;
  featured?: boolean;
  family: CaseStudyFamily;
  /** Optional campaign-specific accent, scoped only to the story area of the case study page. */
  accentColor?: string;
  /** Campaign year shown in the overview strip */
  year?: number;
  /** Capability / channel tags under the hero (defaults from services) */
  tags?: string[];
  /** Optional hashtag appended to the hero title */
  hashtag?: string;
  /** Success criteria for The Mandate (defaults from execution) */
  mandate?: string[];
  /** Business goal copy for The Objective (defaults to challenge) */
  objective?: string;
  /** Short intro above execution pillars */
  executionSummary?: string;
  /** Named strategy pillars; defaults from execution lines. Pass [] to omit pillar cards. */
  executionPillars?: CaseStudyPillar[];
  /** Creative gallery image paths under /public (flat list; used when galleryGroups omitted) */
  gallery?: string[];
  /** Gallery images grouped by campaign touchpoint from the deck */
  galleryGroups?: CaseStudyGalleryGroup[];
  /** Qualitative result narratives from the deck (shown with metrics) */
  resultHighlights?: string[];
  /** Live URLs / influencer / community links — section renders only when populated */
  linkGroups?: CaseStudyLinkGroup[];
  /** When true, hero media shows `video` (or first of `videos`) instead of the still. */
  heroVideo?: boolean;
  /** Brand film / reel block; omitted when absent. Prefer `videos` when a case has multiple films. */
  video?: CaseStudyVideo;
  /** Campaign-specific Video section heading (defaults to "Video"). */
  videoLabel?: string;
  /** Insert the video block after this gallery group title (deck order). Defaults to after all groups. */
  videoAfterGalleryTitle?: string;
  /** Optional intro under the Video section heading (deck caption for the film block). */
  videoIntro?: string;
  /** All campaign films from the deck (primary + cutdowns). Falls back to `video` when omitted. */
  videos?: CaseStudyVideo[];
  /** Optional client logo path under /public */
  clientLogo?: string;
  /**
   * Service slugs listed in Built With.
   * Defaults to `services`. Pass [] to omit the Built With section.
   */
  builtWithServices?: string[];
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
