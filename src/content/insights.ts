/**
 * Insights listing and article detail content.
 * Detail assets live in /public/images/insights/detail/.
 */

import type { MediaSlot } from "@/content/about";

const detailIcon = (file: string, label: string): MediaSlot => ({
  src: `/images/insights/detail/${file}`,
  alt: "",
  label,
});

const detailImage = (file: string, label: string): MediaSlot => ({
  src: `/images/insights/detail/${file}`,
  alt: label,
  label,
});

export const insightDetailIcons = {
  dataExplosion: detailIcon("data-explosion.png", "Data Explosion"),
  changingExpectations: detailIcon("changing-expectations.png", "Changing Expectations"),
  growthPressure: detailIcon("growth-pressure.png", "Growth Pressure"),
  humanAi: detailIcon("human-ai.png", "Human + AI Collaboration"),
  dataDecisions: detailIcon("data-decisions.png", "Data to Decisions"),
  automation: detailIcon("automation.png", "Automation at Scale"),
  continuousLearning: detailIcon("continuous-learning.png", "Continuous Learning"),
} as const;

export type InsightFilterKey =
  | "all"
  | "trends"
  | "perspectives"
  | "case-studies"
  | "technology"
  | "media"
  | "creative";

export type InsightPost = {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  /** Primary filter bucket for the listing page. */
  filterKey?: InsightFilterKey;
  /** Display tags shown on cards, e.g. Trends and Media. */
  categories?: string[];
  excerpt?: string;
  thumbnail?: MediaSlot;
  featured?: boolean;
  /** Optional override; defaults to `/insights/[slug]` when omitted. */
  href?: string;
};

export const insightsHero = {
  eyebrow: "Insights",
  headlineBefore: "Ideas that drive",
  headlineAccent: "growth.",
  body: "Perspectives, trends and strategies from the intersection of media, technology, creativity and data.",
  verticalMark: "ENGINEER GROWTH SYSTEMS.",
  imagePrimary: {
    alt: "Architectural detail with a red accent stripe",
    label: "Insights hero photo — architectural detail",
    grayscale: true,
  } satisfies MediaSlot,
  imageSecondary: {
    alt: "Team meeting in a glass conference room",
    label: "Insights hero photo — team meeting",
    grayscale: true,
  } satisfies MediaSlot,
  burst: "/images/about/hero/radial-burst.svg",
  arrow: "/images/about/ui/arrow-right-circle.svg",
};

export const insightsFilters: { key: InsightFilterKey; label: string }[] = [
  { key: "all", label: "All insights" },
  { key: "trends", label: "Trends" },
  { key: "perspectives", label: "Perspectives" },
  { key: "case-studies", label: "Case studies" },
  { key: "technology", label: "Technology" },
  { key: "media", label: "Media" },
  { key: "creative", label: "Creative" },
];

export const insightsSidebarCategories: { label: string; filterKey: Exclude<InsightFilterKey, "all"> }[] = [
  { label: "Trends", filterKey: "trends" },
  { label: "Perspectives", filterKey: "perspectives" },
  { label: "Case studies", filterKey: "case-studies" },
  { label: "Technology", filterKey: "technology" },
  { label: "Media", filterKey: "media" },
  { label: "Creative", filterKey: "creative" },
];

export const insightsFeaturedCard = {
  eyebrow: "Featured insight",
  tag: "Case study",
  title: "Turning Visibility into Visits: The VIP Industries Story",
  slug: "turning-visibility-into-visits-vip-industries",
  image: {
    alt: "Red VIP-branded suitcases in a retail display",
    label: "VIP Industries case study thumbnail",
  } satisfies MediaSlot,
};

export const insightsCta = {
  titleBefore: "Let's engineer growth,",
  titleAccent: "together.",
  body: "Have a challenge or an idea? Let's build what's next.",
  button: { label: "Let's talk", href: "/contact" },
};

const listingThumb = (file: string | undefined, label: string): MediaSlot =>
  file
    ? { src: `/images/insights/${file}`, alt: label, label, grayscale: true }
    : { alt: label, label, grayscale: true };

export type InsightDetailSectionId =
  | "overview"
  | "opportunity"
  | "perspective"
  | "pillars"
  | "examples"
  | "impact"
  | "whats-next";

export type InsightDetailTab = {
  id: InsightDetailSectionId;
  label: string;
};

export type InsightListItem = {
  title: string;
  body: string;
  icon: MediaSlot;
};

export type InsightPillar = {
  number: string;
  title: string;
  body: string;
};

export type InsightExample = {
  category: string;
  title: string;
  body: string;
  image: MediaSlot;
};

export type InsightStat = {
  value: string;
  label: string;
};

export type InsightArticle = InsightPost & {
  categoryParent: string;
  headlineBefore: string;
  headlineAccent: string;
  excerpt: string;
  author: string;
  heroImage: MediaSlot;
  overview: {
    headline: string;
    body: string;
    quote: string;
  };
  opportunity: {
    headline: string;
    subheadline: string;
    items: InsightListItem[];
  };
  perspective: {
    headline: string;
    subheadline: string;
    items: InsightListItem[];
  };
  pillars: InsightPillar[];
  examples: {
    headline: string;
    subheadline: string;
    items: InsightExample[];
    cta: { label: string; href: string };
  };
  impact: {
    headline: string;
    subheadline: string;
    stats: InsightStat[];
  };
  whatsNext: string;
};

export const insightPosts: InsightPost[] = [
  {
    slug: "when-attention-becomes-the-battleground",
    category: "Trends",
    filterKey: "trends",
    categories: ["Trends", "Media"],
    title: "When Attention Becomes the Battleground",
    date: "2024-05-08",
    readTime: "6 min read",
    excerpt:
      "Attention is scarce, fragmented and expensive. Brands that win aren't just buying reach — they're engineering relevance across every touchpoint.",
    thumbnail: listingThumb(undefined, "When Attention Becomes the Battleground thumbnail"),
  },
  {
    slug: "future-of-performance-marketing-in-an-ai-powered-world",
    category: "Trends",
    filterKey: "trends",
    categories: ["Trends", "Technology"],
    title: "The Future of Performance Marketing in an AI-Powered World",
    date: "2026-05-12",
    readTime: "6 min read",
    excerpt:
      "AI is reshaping how brands allocate budget, personalize experiences and measure outcomes — but only when it's built into the system, not bolted on.",
    thumbnail: listingThumb("ai-data.png", "Performance marketing in an AI-powered world thumbnail"),
  },
  {
    slug: "why-influencer-marketing-needs-real-intelligence",
    category: "Perspectives",
    filterKey: "perspectives",
    categories: ["Perspectives", "Creative"],
    title: "Why Influencer Marketing Needs Real Intelligence",
    date: "2026-05-08",
    readTime: "5 min read",
    excerpt:
      "Influencer partnerships fail when they're treated as media buys. The brands that scale them treat creators as strategic growth channels.",
    thumbnail: listingThumb("media-intelligence.png", "Influencer marketing intelligence thumbnail"),
  },
  {
    slug: "retail-media-networks-the-next-growth-engine",
    category: "Perspectives",
    filterKey: "perspectives",
    categories: ["Perspectives", "Technology"],
    title: "Why Retail Media Networks Are the Next Growth Engine",
    date: "2026-05-05",
    readTime: "7 min read",
    excerpt:
      "Retail media is no longer a side channel — it's a full-funnel growth system that connects product discovery, consideration and conversion.",
    thumbnail: listingThumb("retail-media.png", "Retail media networks thumbnail"),
  },
  {
    slug: "building-growth-systems-not-service-silos",
    category: "Case studies",
    filterKey: "case-studies",
    categories: ["Case studies", "Technology"],
    title: "Building Growth Systems, Not Service Silos",
    date: "2026-05-01",
    readTime: "4 min read",
    excerpt:
      "When media, creative, technology and data operate as one system, brands move faster, spend smarter and compound results over time.",
    thumbnail: listingThumb("growth-systems.png", "Building growth systems thumbnail"),
  },
  {
    slug: "ai-at-the-core-building-smarter-marketing-systems",
    category: "Technology",
    filterKey: "technology",
    categories: ["Technology", "Creative"],
    title: "The Role of AI in Modern Marketing Systems",
    date: "2024-04-24",
    readTime: "8 min read",
    excerpt:
      "AI is transforming how brands connect, convert and grow. The opportunity isn't in isolated tools — it's in building intelligent systems that learn and adapt.",
    thumbnail: listingThumb(undefined, "AI in modern marketing systems thumbnail"),
  },
  {
    slug: "turning-visibility-into-visits-vip-industries",
    category: "Case studies",
    filterKey: "case-studies",
    categories: ["Case studies", "Media"],
    title: "Turning Visibility into Visits: The VIP Industries Story",
    date: "2024-03-15",
    readTime: "9 min read",
    featured: true,
    excerpt:
      "How a unified media and commerce strategy turned brand visibility into measurable store visits and sales lift for one of India's leading luggage brands.",
    thumbnail: listingThumb(undefined, "VIP Industries case study thumbnail"),
  },
  {
    slug: "media-mix-modeling-for-modern-brands",
    category: "Media",
    filterKey: "media",
    categories: ["Media", "Trends"],
    title: "Media Mix Modeling for Modern Brands",
    date: "2024-02-20",
    readTime: "7 min read",
    excerpt:
      "MMM is back — but smarter. New data sources and AI-powered modeling are helping brands understand true incrementality across channels.",
    thumbnail: listingThumb(undefined, "Media mix modeling thumbnail"),
  },
  {
    slug: "creative-that-converts-beyond-the-banner",
    category: "Creative",
    filterKey: "creative",
    categories: ["Creative", "Perspectives"],
    title: "Creative That Converts: Beyond the Banner",
    date: "2024-01-18",
    readTime: "5 min read",
    excerpt:
      "Performance creative isn't about more variants — it's about systematic testing, brand consistency and data-informed iteration at scale.",
    thumbnail: listingThumb(undefined, "Creative that converts thumbnail"),
  },
];

const aiArticleHero: MediaSlot = {
  alt: "Human profile overlaid with a glowing red neural network",
  label: "AI marketing systems hero banner",
};

const exampleImage = (label: string): MediaSlot => ({
  alt: label,
  label,
});

export const insightArticles: Record<string, InsightArticle> = {
  "ai-at-the-core-building-smarter-marketing-systems": {
    slug: "ai-at-the-core-building-smarter-marketing-systems",
    category: "AI",
    categoryParent: "Technology",
    title: "AI at the Core: Building Smarter Marketing Systems",
    date: "2024-04-24",
    readTime: "8 min read",
    headlineBefore: "AI at the Core:",
    headlineAccent: "Building Smarter Marketing Systems.",
    excerpt:
      "AI is transforming how brands connect, convert and grow. The opportunity isn't in isolated tools — it's in building intelligent systems that learn, adapt and compound value over time.",
    author: "First Economy Team",
    heroImage: aiArticleHero,
    overview: {
      headline: "The brands that win won't just use AI tools. They'll build AI-powered systems.",
      body: "Marketing has always been about connecting the right message to the right audience at the right moment. What's changed is the scale, speed and precision now possible — and the expectation that every interaction feels personal, relevant and timely.",
      quote:
        "The brands that win won't just use AI tools. They'll build AI-powered systems.",
    },
    opportunity: {
      headline: "A seismic shift in how marketing creates value.",
      subheadline: "Three forces are reshaping the landscape for growth-focused brands.",
      items: [
        {
          title: "Data Explosion",
          body: "First-party data, behavioral signals and platform insights are multiplying — but most teams struggle to turn volume into velocity.",
          icon: insightDetailIcons.dataExplosion,
        },
        {
          title: "Changing Expectations",
          body: "Audiences expect relevance in real time. Generic campaigns and batch personalization no longer cut through.",
          icon: insightDetailIcons.changingExpectations,
        },
        {
          title: "Growth Pressure",
          body: "Leaders need measurable ROI, faster decisioning and systems that scale without adding proportional headcount.",
          icon: insightDetailIcons.growthPressure,
        },
      ],
    },
    perspective: {
      headline: "We see AI as an enabler, not a replacement.",
      subheadline: "Intelligent marketing systems amplify human judgment — they don't eliminate it.",
      items: [
        {
          title: "Human + AI Collaboration",
          body: "Strategists set direction; AI handles pattern recognition, optimization and execution at scale.",
          icon: insightDetailIcons.humanAi,
        },
        {
          title: "Data to Decisions",
          body: "Unified data layers turn fragmented signals into actionable insights across channels.",
          icon: insightDetailIcons.dataDecisions,
        },
        {
          title: "Automation at Scale",
          body: "Workflows, triggers and orchestration free teams to focus on creative and strategic work.",
          icon: insightDetailIcons.automation,
        },
        {
          title: "Continuous Learning",
          body: "Models improve with every campaign — compounding performance over time.",
          icon: insightDetailIcons.continuousLearning,
        },
      ],
    },
    pillars: [
      {
        number: "01",
        title: "Data Intelligence",
        body: "Unified, clean and actionable data layers that power every decision.",
      },
      {
        number: "02",
        title: "Predictive Insights",
        body: "Forecasting models that anticipate performance before spend is committed.",
      },
      {
        number: "03",
        title: "Intelligent Activation",
        body: "Real-time personalization and channel orchestration at scale.",
      },
      {
        number: "04",
        title: "Automation & Orchestration",
        body: "Workflows that connect teams, tools and triggers without manual handoffs.",
      },
      {
        number: "05",
        title: "Measurement & Optimization",
        body: "Closed-loop learning that compounds performance over time.",
      },
    ],
    examples: {
      headline: "AI in action across marketing.",
      subheadline: "Real applications we're building and deploying for growth-focused brands.",
      items: [
        {
          category: "Media",
          title: "Predictive Media Optimization",
          body: "ML models forecast channel performance and allocate budget dynamically — improving ROI while reducing manual bid management.",
          image: exampleImage("Predictive media optimization thumbnail"),
        },
        {
          category: "CRM",
          title: "AI-Powered Personalization",
          body: "Real-time content and offer selection based on behavioral signals, context and predicted intent.",
          image: exampleImage("AI-powered personalization thumbnail"),
        },
        {
          category: "Creative",
          title: "Generative Creativity at Scale",
          body: "AI-assisted creative production that maintains brand voice while accelerating variant testing across formats.",
          image: exampleImage("Generative creativity thumbnail"),
        },
      ],
      cta: { label: "View more case studies", href: "/work" },
    },
    impact: {
      headline: "Smarter systems. Stronger growth.",
      subheadline: "Outcomes we're seeing with AI-powered marketing systems.",
      stats: [
        { value: "35%+", label: "Improvement in ROI" },
        { value: "50%+", label: "Faster Decisioning" },
        { value: "40%+", label: "Reduction in Manual Work" },
        { value: "25%+", label: "Lift in Engagement" },
      ],
    },
    whatsNext:
      "The brands that treat AI as a strategic capability — not a tactical add-on — will build durable advantages in how they acquire, engage and retain customers. The question isn't whether to adopt AI. It's how quickly you can move from experiments to systems that compound value over time.",
  },
};

function buildStubArticle(post: InsightPost): InsightArticle {
  return {
    ...post,
    categoryParent: post.category,
    headlineBefore: post.title.split(":")[0] ?? post.title,
    headlineAccent: post.title.includes(":") ? `${post.title.split(":").slice(1).join(":").trim()}.` : "",
    excerpt: "A perspective from the First Economy team on what's changing — and what it means for brands building for growth.",
    author: "First Economy Team",
    heroImage: {
      alt: `${post.title} hero image`,
      label: `${post.title} hero banner`,
    },
    overview: {
      headline: post.title,
      body: "This article is in development. Check back soon for the full perspective from our team.",
      quote: "Growth systems built for what's next — not just what's now.",
    },
    opportunity: { headline: "The opportunity", subheadline: "", items: [] },
    perspective: { headline: "Our perspective", subheadline: "", items: [] },
    pillars: [],
    examples: {
      headline: "In practice",
      subheadline: "",
      items: [],
      cta: { label: "View our work", href: "/work" },
    },
    impact: { headline: "Impact", subheadline: "", stats: [] },
    whatsNext: "",
  };
}

for (const post of insightPosts) {
  if (!insightArticles[post.slug]) {
    insightArticles[post.slug] = buildStubArticle(post);
  }
}
