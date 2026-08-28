/**
 * Capabilities landing page content.
 * Assets reuse existing hero patterns from /public/images/services/hero/.
 */

import type { MediaSlot } from "@/content/about";

export const capabilitiesHero = {
  eyebrow: "Capabilities",
  headlineBefore: "The operating system",
  headlineAccent: "behind growth.",
  body: "Technology, AI, data, platforms and automation — engineered as one connected growth system, not isolated tools or vendor stacks.",
  image: {
    src: "/images/services/hero/meeting.png",
    alt: "First Economy team reviewing growth system architecture on a strategy wall",
    label: "Capabilities hero photo",
    grayscale: false,
  } satisfies MediaSlot,
  burst: "/images/services/hero/radial-burst.svg",
  arrow: "/images/services/hero/arrow-circle.svg",
};

export const architectureSection = {
  eyebrow: "Growth-system architecture",
  titleBefore: "One system.",
  titleAccent: "Every capability connected.",
  body: "Strategy sits at the centre. Media, creative, technology, AI, data and analytics plug into the same operating layer — so decisions, execution and measurement stay aligned to one growth objective.",
  networkNote:
    "Through Local Planet, we connect to 62+ agencies across 85+ markets and $17.2B+ in network billings — global capability with local execution.",
};

export type CapabilityPillar = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
  serviceHref?: string;
  serviceLabel?: string;
};

export const capabilityPillars: CapabilityPillar[] = [
  {
    id: "technology",
    eyebrow: "Technology",
    title: "Platforms and systems built for scale",
    body: "Ground-up digital platforms, ERP builds and integrations for businesses that have outgrown off-the-shelf software — engineered to connect with media, creative and data.",
    items: [
      "Web and mobile platforms",
      "Custom software and ERP",
      "Payment, KYC and compliance systems",
      "APIs, dashboards and workflow tools",
      "System integration",
    ],
    serviceHref: "/services/technology",
    serviceLabel: "Tech Solutions",
  },
  {
    id: "ai-innovation",
    eyebrow: "AI & Innovation",
    title: "Intelligence built into the workflow",
    body: "AI applied where it accelerates outcomes — creative production, analytics, search discoverability and operations — as a practical layer inside the growth system, not a standalone experiment.",
    items: [
      "AI-assisted creative production",
      "Real-time analytics and decision support",
      "AEO, GEO and LLM visibility",
      "Operational automation",
      "Innovation sprints and prototyping",
    ],
    serviceHref: "/services/ai-solutions",
    serviceLabel: "AI Solutions",
  },
  {
    id: "data-analytics",
    eyebrow: "Data & Analytics",
    title: "Data that drives decisions, not decks",
    body: "Audience, platform and performance data unified in one operating layer — with the tools and dashboards our teams use every day to optimise live campaigns and platforms.",
    items: [
      "Audience and market intelligence",
      "Cross-channel attribution",
      "Brand lift and conversion analytics",
      "Custom reporting and BI",
      "Always-on optimisation loops",
    ],
  },
  {
    id: "digital-platforms",
    eyebrow: "Digital Platforms",
    title: "Presence engineered across every touchpoint",
    body: "Websites, apps, marketplaces and owned channels designed to work with media, CRM and measurement — so digital infrastructure supports growth rather than sitting in a silo.",
    items: [
      "Websites and landing ecosystems",
      "Mobile experiences",
      "Marketplace store architecture",
      "CMS and content platforms",
      "Martech and CRM integration",
    ],
    serviceHref: "/services/marketplace-management",
    serviceLabel: "Marketplace Management",
  },
  {
    id: "automation",
    eyebrow: "Automation",
    title: "Less manual work. More growth velocity.",
    body: "Workflow automation, API layers and connected systems that remove friction between teams, platforms and reporting — so the growth system runs faster with fewer handoffs.",
    items: [
      "Campaign and ops automation",
      "Data pipeline automation",
      "Lead routing and CRM workflows",
      "Reporting automation",
      "Integration middleware",
    ],
  },
  {
    id: "enterprise",
    eyebrow: "Enterprise / Tech Solutions",
    title: "Enterprise-grade systems for complex businesses",
    body: "For organisations with compliance, multi-market or multi-brand complexity — we build and integrate the technology layer that marketing and operations depend on.",
    items: [
      "Digital transformation programmes",
      "Multi-brand platform architecture",
      "Registrar and compliance integrations",
      "Enterprise ERP and finance systems",
      "Long-term platform roadmaps",
    ],
    serviceHref: "/services/technology",
    serviceLabel: "Explore Tech Solutions",
  },
];

export const ecosystemSection = {
  eyebrow: "Ecosystem / Partners",
  titleBefore: "A connected stack",
  titleAccent: "we work in every day.",
  body: "Data infrastructure, ad platforms, CRM, analytics, cloud and AI layers — connected so teams execute on live intelligence rather than static reports.",
};

export const ecosystemColumns = [
  { title: "Databases", items: ["BigQuery", "Snowflake", "PostgreSQL", "MongoDB"] },
  { title: "Ad Platforms", items: ["Google Ads", "Meta", "LinkedIn", "Programmatic", "OTT / CTV"] },
  { title: "CRM / ERP", items: ["Salesforce", "HubSpot", "Custom ERP", "Payment systems"] },
  { title: "Analytics", items: ["GA4", "Comscore", "GWI", "Brandwatch", "Similarweb"] },
  { title: "Dashboards", items: ["Looker Studio", "Power BI", "In-house BI", "Supermetrics"] },
  { title: "Cloud", items: ["AWS", "Azure", "GCP", "API layers"] },
  { title: "AI Layers", items: ["OpenAI", "Custom models", "AEO / GEO", "Creative AI"] },
];

export const intelligenceSection = {
  eyebrow: "In-house intelligence",
  title: "Proprietary dashboards and AI-led analysis",
  body: "Real-time reporting and custom systems built in-house, layered on top of the platform and tooling ecosystem, so decisions are made on live data rather than static reports.",
};

export const techCaseStudiesSection = {
  eyebrow: "Proof",
  titleBefore: "Technology-enabled",
  titleAccent: "case studies.",
  body: "Work where technology, AI and data were core to the growth system — not an afterthought.",
};

/** Case studies where technology or AI is a primary capability. */
export const techCaseStudySlugs = [
  "mahindra-manulife",
  "orpat-erp",
  "ajanta-ai-creatives",
  "poonawalla-ai-creatives",
  "royale-touche-stay-curious",
];

export const capabilitiesCta = {
  titleBefore: "Ready to engineer",
  titleAccent: "your growth system?",
  body: "Talk to us about how technology, AI and data can connect with your media, creative and marketing operations.",
  button: { label: "Start a conversation", href: "/contact" },
};
