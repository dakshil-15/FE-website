/**
 * Capabilities landing page content.
 * Image/icon slots are placeholders until final assets are provided.
 */

import type { MediaSlot } from "@/content/about";

export const capabilitiesHero = {
  eyebrow: "Capabilities",
  headlineBefore: "Engineering Intelligent",
  headlineAccent: "Growth Systems",
  body: "Technology, AI, data, platforms and automation — engineered as one connected growth system, not isolated tools or vendor stacks.",
  visual: {
    src: "",
    alt: "Hexagonal capability network with First Economy at the centre",
    label: "Capabilities hero network visual",
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
    icon: { src: "", alt: "", label: "Technology icon" },
  },
  {
    id: "ai-innovation",
    title: "AI & Innovation",
    body: "Intelligence applied to creative, analytics, search and operations — built into the workflow.",
    href: "/services/ai-solutions",
    icon: { src: "", alt: "", label: "AI & Innovation icon" },
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    body: "Audience, platform and performance data unified in one operating layer.",
    href: "#intelligence",
    icon: { src: "", alt: "", label: "Data & Analytics icon" },
  },
  {
    id: "digital-platforms",
    title: "Digital Platforms",
    body: "Websites, apps, marketplaces and owned channels engineered across every touchpoint.",
    href: "/services/marketplace-management",
    icon: { src: "", alt: "", label: "Digital Platforms icon" },
  },
  {
    id: "automation",
    title: "Automation",
    body: "Workflow automation and connected systems that remove friction and accelerate velocity.",
    href: "#growth-system",
    icon: { src: "", alt: "", label: "Automation icon" },
  },
  {
    id: "enterprise",
    title: "Enterprise Solutions",
    body: "Enterprise-grade systems for complex, multi-market and multi-brand organisations.",
    href: "/services/technology",
    icon: { src: "", alt: "", label: "Enterprise Solutions icon" },
  },
  {
    id: "ecosystem",
    title: "Ecosystem & Partners",
    body: "A connected stack of platforms, data infrastructure and partner networks.",
    href: "#ecosystem",
    icon: { src: "", alt: "", label: "Ecosystem & Partners icon" },
  },
  {
    id: "strategy",
    title: "Strategy & Consulting",
    body: "The thinking that connects every capability into one measurable growth plan.",
    href: "/contact",
    icon: { src: "", alt: "", label: "Strategy & Consulting icon" },
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
    icon: { src: "/images/services/process/discover_magnifier.svg", alt: "", label: "Discover" } satisfies MediaSlot,
  },
  {
    number: "02",
    id: "strategize",
    title: "Strategize",
    body: "Define the system — channels, creative, technology and data as one plan.",
    icon: { src: "/images/services/process/strategize_nodes.svg", alt: "", label: "Strategize" } satisfies MediaSlot,
  },
  {
    number: "03",
    id: "design",
    title: "Design",
    body: "Craft experiences, platforms and campaigns built for conversion and scale.",
    icon: { src: "/images/services/process/build_gear.svg", alt: "", label: "Design" } satisfies MediaSlot,
  },
  {
    number: "04",
    id: "activate",
    title: "Activate",
    body: "Launch with precision — media, creative and tech coordinated for impact.",
    icon: { src: "/images/services/process/launch_rocket.svg", alt: "", label: "Activate" } satisfies MediaSlot,
  },
  {
    number: "05",
    id: "optimize",
    title: "Optimize",
    body: "Measure, learn and refine so performance compounds instead of resetting.",
    icon: { src: "/images/services/process/optimize_chart.svg", alt: "", label: "Optimize" } satisfies MediaSlot,
  },
  {
    number: "06",
    id: "scale",
    title: "Scale",
    body: "Expand what works — new markets, channels and capabilities without losing coherence.",
    icon: { src: "", alt: "", label: "Scale icon" } satisfies MediaSlot,
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
    src: "",
    alt: "Glowing AI cube with digital circuitry",
    label: "AI technology visual",
  } satisfies MediaSlot,
};

export const ecosystemSection = {
  eyebrow: "Powered by a Strong Ecosystem",
  titleBefore: "Built Together.",
  titleAccent: "Built for Growth.",
  body: "Certified partnerships and platform expertise across the marketing and technology stack.",
};

export type PartnerLogo = {
  name: string;
  src?: string;
  w?: number;
  h?: number;
};

export const ecosystemPartnerLogos: PartnerLogo[] = [
  { name: "Google Marketing Platform" },
  { name: "Meta Business Partner" },
  { name: "Amazon Ads" },
  { name: "Microsoft Advertising" },
  { name: "Salesforce" },
  { name: "Adobe" },
  { name: "Nielsen" },
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
};

export const capabilityCaseStudies: CapabilityCaseStudy[] = [
  {
    slug: "godrej-blue",
    client: "Godrej Properties",
    title: "Citywide launch at scale",
    body: "1,000+ influencers live in one hour — a launch engineered for maximum recall.",
    image: { src: "", alt: "Godrej Properties case study", label: "Godrej Properties" },
  },
  {
    slug: "orpat-erp",
    client: "Orpat",
    title: "ERP built for growth",
    body: "Custom enterprise systems that connected operations, sales and marketing.",
    image: { src: "", alt: "Orpat case study", label: "Orpat" },
  },
  {
    slug: "poonawalla-ai-creatives",
    client: "Poonawalla Fincorp",
    title: "AI-crafted festive reels",
    body: "30-second story reels produced with AI — faster, smarter creative at scale.",
    image: { src: "", alt: "Poonawalla Fincorp case study", label: "Poonawalla Fincorp" },
  },
];

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
