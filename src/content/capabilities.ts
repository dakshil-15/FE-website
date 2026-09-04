/**
 * Capabilities landing page content.
 * Assets live in /public/images/capabilities/.
 * Icons/process SVGs from first_economy_capabilities_ALL_individual_assets.
 */

import type { MediaSlot } from "@/content/about";
import { caseStudies } from "@/content/caseStudies";
import { workShowcaseOrder } from "@/content/workPage";
import { workPhotos } from "@/content/workPhotos";

export const capabilitiesHero = {
  eyebrow: "Capabilities",
  headlineBefore: "Engineering Intelligent",
  headlineAccent: "Growth Systems",
  body: "Technology, AI, data, platforms and automation — engineered as one connected growth system, not isolated tools or vendor stacks.",
  visual: {
    src: "/images/capabilities/hero/team-collaboration.jpg",
    alt: "First Economy team collaborating in a modern office with data dashboards on screen",
    label: "Capabilities hero team photo",
    fit: "cover",
    grayscale: false,
  } satisfies MediaSlot,
  burst: "/images/services/hero/radial-burst.svg",
  arrow: "/images/services/hero/arrow-circle.svg",
};

export const capabilitiesGridSection = {
  eyebrow: "Our Capabilities",
  titleBefore: "Our Capabilities Power",
  titleAfter: "Your Growth",
  body: "Eight interconnected pillars — from technology and AI to strategy and ecosystem — designed to work as one growth system.",
};

export type CapabilityCard = {
  id: string;
  title: string;
  body: string;
  href: string;
  icon: MediaSlot;
};

export const capabilityCards: CapabilityCard[] = [
  {
    id: "technology",
    title: "Technology",
    body: "Platforms, ERPs and systems built for scale, compliance and long-term growth.",
    href: "/services/technology",
    icon: {
      src: "/images/capabilities/icons/capability-technology.svg",
      alt: "",
      label: "Technology icon",
    },
  },
  {
    id: "ai-innovation",
    title: "AI & Innovation",
    body: "Intelligence applied to creative, analytics, search and operations — built into the workflow.",
    href: "/services/ai-solutions",
    icon: {
      src: "/images/capabilities/icons/capability-ai-innovation.svg",
      alt: "",
      label: "AI & Innovation icon",
    },
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    body: "Audience, platform and performance data unified in one operating layer.",
    href: "#advantage",
    icon: {
      src: "/images/capabilities/icons/capability-data-analytics.svg",
      alt: "",
      label: "Data & Analytics icon",
    },
  },
  {
    id: "digital-platforms",
    title: "Digital Platforms",
    body: "Websites, apps, marketplaces and owned channels engineered across every touchpoint.",
    href: "/services/marketplace-management",
    icon: {
      src: "/images/capabilities/icons/capability-digital-platforms.svg",
      alt: "",
      label: "Digital Platforms icon",
    },
  },
  {
    id: "automation",
    title: "Automation",
    body: "Workflow automation and connected systems that remove friction and accelerate velocity.",
    href: "#growth-system",
    icon: {
      src: "/images/capabilities/icons/capability-automation.svg",
      alt: "",
      label: "Automation icon",
    },
  },
  {
    id: "enterprise",
    title: "Enterprise Solutions",
    body: "Enterprise-grade systems for complex, multi-market and multi-brand organisations.",
    href: "/services/technology",
    icon: {
      src: "/images/capabilities/icons/capability-enterprise-solutions.svg",
      alt: "",
      label: "Enterprise Solutions icon",
    },
  },
  {
    id: "ecosystem",
    title: "Ecosystem & Partners",
    body: "A connected stack of platforms, data infrastructure and partner networks.",
    href: "#ecosystem",
    icon: {
      src: "/images/capabilities/icons/capability-ecosystem-partners.svg",
      alt: "",
      label: "Ecosystem & Partners icon",
    },
  },
  {
    id: "strategy",
    title: "Strategy & Consulting",
    body: "The thinking that connects every capability into one measurable growth plan.",
    href: "/contact",
    icon: {
      src: "/images/capabilities/icons/capability-strategy-consulting.svg",
      alt: "",
      label: "Strategy & Consulting icon",
    },
  },
];

export const growthSystemSection = {
  eyebrow: "Our Growth System",
  title: "A Unified System. Infinite Impact.",
};

export const growthSystemSteps = [
  {
    number: "01",
    id: "discover",
    title: "Discover",
    body: "Uncover growth constraints, audience truths and market opportunities.",
    icon: {
      src: "/images/capabilities/process/process-discover.svg",
      alt: "",
      label: "Discover",
    } satisfies MediaSlot,
  },
  {
    number: "02",
    id: "strategize",
    title: "Strategize",
    body: "Define the system — channels, creative, technology and data as one plan.",
    icon: {
      src: "/images/capabilities/process/process-strategize.svg",
      alt: "",
      label: "Strategize",
    } satisfies MediaSlot,
  },
  {
    number: "03",
    id: "design",
    title: "Design",
    body: "Craft experiences, platforms and campaigns built for conversion and scale.",
    icon: {
      src: "/images/capabilities/process/process-design.svg",
      alt: "",
      label: "Design",
    } satisfies MediaSlot,
  },
  {
    number: "04",
    id: "activate",
    title: "Activate",
    body: "Launch with precision — media, creative and tech coordinated for impact.",
    icon: {
      src: "/images/capabilities/process/process-activate.svg",
      alt: "",
      label: "Activate",
    } satisfies MediaSlot,
  },
  {
    number: "05",
    id: "optimize",
    title: "Optimize",
    body: "Measure, learn and refine so performance compounds instead of resetting.",
    icon: {
      src: "/images/capabilities/process/process-optimize.svg",
      alt: "",
      label: "Optimize",
    } satisfies MediaSlot,
  },
  {
    number: "06",
    id: "scale",
    title: "Scale",
    body: "Expand what works — new markets, channels and capabilities without losing coherence.",
    icon: {
      src: "/images/capabilities/process/process-scale.svg",
      alt: "",
      label: "Scale icon",
    } satisfies MediaSlot,
  },
];

export const intelligenceSection = {
  eyebrow: "Technology & AI at the Core",
  titleBefore: "Intelligent Solutions.",
  titleAccent: "Smarter Growth.",
  body: "Proprietary dashboards, AI-led analysis and real-time decision support — layered on top of the platform ecosystem so teams execute on live intelligence.",
  stats: [
    { value: "50+", label: "AI Models" },
    { value: "100+", label: "Automations" },
    { value: "Real Time", label: "Insights" },
  ],
  image: {
    src: "/images/capabilities/intelligence/visual-ai-cube.jpg",
    alt: "Glowing AI cube with digital circuitry",
    label: "AI technology visual",
    fit: "contain",
  } satisfies MediaSlot
};

/** Deck slide 97 — The Infrastructure of Advantage */
export const advantageToolsSection = {
  eyebrow: "The Infrastructure of Advantage",
  titleBefore: "Data Tools.",
  titleAccent: "Built-in Edge.",
  body: "Best-in-class analytics and intelligence platforms — plus in-house proprietary tools — powering sharper decisions and continuous optimisation.",
};

export const ecosystemSection = {
  eyebrow: "Partners Who Help Us Deliver That Advantage",
  titleBefore: "Platform Partners.",
  titleAccent: "Built for Reach.",
  body: "Media and platform partnerships across search, social, OTT, commerce and publishing — the channels our growth systems run on.",
};

import type { PartnerLogo } from "@/content/partners";

export type { PartnerLogo };

/** Deck slide 98 — platform partners (full original PNGs via object-contain). */
export const platformPartnerLogos: PartnerLogo[] = [
  {
    slug: "google",
    name: "Google",
    src: "/images/capabilities/platforms/google.png",
    width: 360,
    height: 262,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "meta",
    name: "Meta",
    src: "/images/capabilities/platforms/meta.png",
    width: 360,
    height: 240,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "linkedin",
    name: "LinkedIn",
    src: "/images/capabilities/platforms/linkedin.png",
    width: 336,
    height: 126,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "reddit",
    name: "Reddit",
    src: "/images/capabilities/platforms/reddit.png",
    width: 900,
    height: 600,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "jiohotstar",
    name: "JioHotstar",
    src: "/images/capabilities/platforms/jiohotstar.png",
    width: 909,
    height: 240,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "spotify",
    name: "Spotify",
    src: "/images/capabilities/platforms/spotify.png",
    width: 480,
    height: 320,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "pinterest",
    name: "Pinterest",
    src: "/images/capabilities/platforms/pinterest.png",
    width: 410,
    height: 100,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "prime-video",
    name: "Prime Video",
    src: "/images/capabilities/platforms/prime-video.png",
    width: 384,
    height: 119,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "quora",
    name: "Quora",
    src: "/images/capabilities/platforms/quora.png",
    width: 384,
    height: 108,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "inshorts",
    name: "Inshorts",
    src: "/images/capabilities/platforms/inshorts.png",
    width: 331,
    height: 140,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "zepto",
    name: "Zepto",
    src: "/images/capabilities/platforms/zepto.png",
    width: 384,
    height: 129,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "paytm",
    name: "Paytm",
    src: "/images/capabilities/platforms/paytm.png",
    width: 365,
    height: 120,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "snapchat",
    name: "Snapchat",
    src: "/images/capabilities/platforms/snapchat.png",
    width: 600,
    height: 164,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "moneycontrol",
    name: "Moneycontrol",
    src: "/images/capabilities/platforms/moneycontrol.png",
    width: 434,
    height: 95,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "x-ads",
    name: "X Ads",
    src: "/images/capabilities/platforms/x-ads.png",
    width: 366,
    height: 113,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
  {
    slug: "indigo",
    name: "IndiGo",
    src: "/images/capabilities/platforms/indigo.png",
    width: 521,
    height: 163,
    sourceMedia: "deck-slide-98",
    sourceSlide: 98,
  },
];

export const techCaseStudiesSection = {
  eyebrow: "Capabilities in Action",
  titleBefore: "Solving Real Challenges.",
  titleAccent: "Delivering Real Results.",
  body: "Work where technology, AI and data were core to the growth system — not an afterthought.",
  exploreLabel: "Explore our work",
  exploreHref: "/work",
};

export type CapabilityCaseStudy = {
  slug: string;
  client: string;
  title: string;
  body: string;
  image: MediaSlot;
  href?: string;
};

/** Latest showcase case studies — same order as Work / home featured. */
export const capabilityCaseStudies: CapabilityCaseStudy[] = workShowcaseOrder
  .map((slug) => caseStudies.find((study) => study.slug === slug))
  .filter((study): study is (typeof caseStudies)[number] => Boolean(study))
  .map((study) => ({
    slug: study.slug,
    client: study.client,
    title: study.campaign,
    body: study.hero,
    image: {
      src: workPhotos[study.slug] ?? `/images/work/cases/${study.slug}.png`,
      alt: `${study.client} — ${study.campaign}`,
      label: study.client,
      fit: "cover" as const,
    },
  }));

export const capabilitiesCta = {
  titleBefore: "Let's build intelligent",
  titleAccent: "marketing systems.",
  body: "Ready to engineer technology, AI and data into your growth operations?",
  button: { label: "Let's talk", href: "/contact" },
};

/** @deprecated Use capabilityCards — kept for any external imports */
export type CapabilityPillar = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
  serviceHref?: string;
  serviceLabel?: string;
};

export const capabilityPillars: CapabilityPillar[] = capabilityCards.map((card) => ({
  id: card.id,
  eyebrow: card.title,
  title: card.title,
  body: card.body,
  items: [],
  serviceHref: card.href,
  serviceLabel: "Learn more",
}));

export const architectureSection = {
  eyebrow: growthSystemSection.eyebrow,
  titleBefore: "A Unified System.",
  titleAccent: "Infinite Impact.",
  body: "",
  networkNote: "",
};

export const ecosystemColumns: { title: string; items: string[] }[] = [];
export const techCaseStudySlugs = capabilityCaseStudies.map((s) => s.slug);
