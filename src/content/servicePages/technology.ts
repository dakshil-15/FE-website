import type { MediaSlot } from "@/content/about";
import {
  SERVICE_HERO_ARROW,
  SERVICE_HERO_BURST,
  caseStudiesForService,
  impactStatsForService,
  placeholderIcon,
  processIcons,
} from "@/content/servicePages/shared";
import type { ServicePageContent } from "@/content/servicePages/types";

const caseItems = caseStudiesForService("technology");
const impactStats = impactStatsForService("technology");

export const technologyPage: ServicePageContent = {
  slug: "technology",
  name: "Tech Solutions",
  summary:
    "Ground-up digital platforms, ERP builds and system integrations for businesses that have outgrown off-the-shelf software.",
  hero: {
    eyebrow: "Service",
    headlineBefore: "Tech",
    headlineAccent: "Solutions.",
    body: "Ground-up digital platforms, ERP builds and system integrations for businesses that have outgrown off-the-shelf software — systems growth runs on.",
    visual: {
      alt: "Technology platforms and digital systems",
      label: "Technology hero",
      fit: "cover",
    } satisfies MediaSlot,
    burst: SERVICE_HERO_BURST,
    arrow: SERVICE_HERO_ARROW,
    highlights: [
      { id: "platforms", label: "Digital Platforms", icon: placeholderIcon("Digital platforms icon") },
      { id: "erp", label: "ERP & Workflows", icon: placeholderIcon("ERP workflows icon") },
      { id: "integrations", label: "Integrations", icon: placeholderIcon("Integrations icon") },
      { id: "scale", label: "Built to Scale", icon: placeholderIcon("Built to scale icon") },
    ],
  },
  process: {
    eyebrow: "Our Capabilities",
    title: "End-to-End Technology Excellence.",
    body: "From discovery to scale — platforms and systems engineered for compliance, operations and long-term growth.",
    steps: [
      {
        number: "01",
        id: "discover",
        title: "Discover",
        body: "Map processes, constraints and the outcomes the system must unlock.",
        icon: { ...processIcons.discover, label: "Discover" },
      },
      {
        number: "02",
        id: "architect",
        title: "Architect",
        body: "Design platforms, data models and integrations for resilience.",
        icon: { ...processIcons.strategize, label: "Architect" },
      },
      {
        number: "03",
        id: "build",
        title: "Build",
        body: "Ship web, mobile and custom software with production-grade quality.",
        icon: { ...processIcons.build, label: "Build" },
      },
      {
        number: "04",
        id: "integrate",
        title: "Integrate",
        body: "Connect payments, KYC, registrars, ERPs and partner stacks.",
        icon: { ...processIcons.launch, label: "Integrate" },
      },
      {
        number: "05",
        id: "scale",
        title: "Scale",
        body: "Operate, automate and extend systems as the business grows.",
        icon: { ...processIcons.optimize, label: "Scale" },
      },
    ],
  },
  why: {
    eyebrow: "Why First Economy",
    titleBefore: "Systems Growth",
    titleAccent: "Runs On",
    body: "We build the infrastructure behind campaigns and operations — not just the interfaces people see.",
    button: { label: "Let's talk", href: "/contact" },
    valueCards: [
      {
        id: "ground-up",
        title: "Ground-Up Builds",
        body: "Custom platforms when off-the-shelf software no longer fits.",
        icon: placeholderIcon("Ground-up builds icon"),
      },
      {
        id: "enterprise",
        title: "Enterprise Ready",
        body: "Compliance, workflows and multi-brand complexity handled by design.",
        icon: placeholderIcon("Enterprise ready icon"),
      },
      {
        id: "integrations",
        title: "Deep Integrations",
        body: "Payments, KYC, registrars and partner APIs wired into one stack.",
        icon: placeholderIcon("Deep integrations icon"),
      },
      {
        id: "automation",
        title: "Automation",
        body: "Workflows that remove friction and accelerate operational velocity.",
        icon: placeholderIcon("Automation icon"),
      },
      {
        id: "dashboards",
        title: "Dashboards & Insight",
        body: "Operational visibility that supports real-time decisions.",
        icon: placeholderIcon("Dashboards icon"),
      },
      {
        id: "growth-aligned",
        title: "Growth Aligned",
        body: "Technology connected to media, creative and commercial outcomes.",
        icon: placeholderIcon("Growth aligned icon"),
      },
    ],
  },
  framework: {
    eyebrow: "Our Process",
    title: "A Full Technology Stack",
    body: "Platforms, workflows, integrations and insights — engineered as one connected system.",
    stages: [
      { id: "platforms", title: "Platforms", body: "Web, mobile and custom software.", icon: placeholderIcon("Platforms icon") },
      { id: "workflows", title: "Workflows", body: "ERP and process automation.", icon: placeholderIcon("Workflows icon") },
      {
        id: "integrations",
        title: "Integrations",
        body: "APIs and partner connections.",
        icon: placeholderIcon("Integrations icon"),
      },
      { id: "insights", title: "Insights", body: "Dashboards that drive decisions.", icon: placeholderIcon("Insights icon") },
    ],
  },
  ...(caseItems.length
    ? {
        caseStudies: {
          eyebrow: "Featured Case Studies",
          titleBefore: "Systems That",
          titleAccent: "Scale.",
          body: "Platform and ERP work built for compliance, operations and growth.",
          exploreLabel: "View all cases",
          exploreHref: "/work?service=technology",
          items: caseItems,
        },
      }
    : {}),
  ...(impactStats.length
    ? {
        impact: {
          eyebrow: "Impact That Matters",
          titleBefore: "Real Numbers.",
          titleAccent: "Real Impact.",
          stats: impactStats,
        },
      }
    : {}),
  cta: {
    titleBefore: "Ready to build systems",
    titleAccent: "growth can run on?",
    body: "Let's engineer platforms and integrations that outgrow off-the-shelf limits.",
    button: { label: "Let's talk", href: "/contact" },
  },
};
