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

const caseItems = caseStudiesForService("branding");
const impactStats = impactStatsForService("branding");

export const brandingPage: ServicePageContent = {
  slug: "branding",
  name: "Project Innovation & Branding",
  summary:
    "Brand strategy and identity carried all the way through to physical, on-ground experience — not just a logo and a deck.",
  hero: {
    eyebrow: "Service",
    headlineBefore: "Project Innovation &",
    headlineAccent: "Branding.",
    body: "Brand strategy and identity systems that hold up on a screen and on a storefront — carried through to physical, on-ground experience.",
    visual: {
      alt: "Brand identity and environmental design",
      label: "Branding hero",
      fit: "cover",
    } satisfies MediaSlot,
    burst: SERVICE_HERO_BURST,
    arrow: SERVICE_HERO_ARROW,
    highlights: [
      { id: "strategy", label: "Brand Strategy", icon: placeholderIcon("Brand strategy icon") },
      { id: "identity", label: "Identity Systems", icon: placeholderIcon("Identity systems icon") },
      { id: "experience", label: "Experience Design", icon: placeholderIcon("Experience design icon") },
      { id: "launch", label: "Launch Campaigns", icon: placeholderIcon("Launch campaigns icon") },
    ],
  },
  process: {
    eyebrow: "Our Capabilities",
    title: "End-to-End Brand Excellence.",
    body: "From discovery to launch — identity built to work across digital, retail and on-ground environments.",
    steps: [
      {
        number: "01",
        id: "discover",
        title: "Discover",
        body: "Uncover audience truth, category space and brand opportunity.",
        icon: { ...processIcons.discover, label: "Discover" },
      },
      {
        number: "02",
        id: "position",
        title: "Position",
        body: "Define the platform, promise and narrative that set you apart.",
        icon: { ...processIcons.strategize, label: "Position" },
      },
      {
        number: "03",
        id: "identity",
        title: "Identity",
        body: "Visual systems, language and assets built for consistency at scale.",
        icon: { ...processIcons.build, label: "Identity" },
      },
      {
        number: "04",
        id: "experience",
        title: "Experience",
        body: "Extend the brand into retail, packaging, signage and environments.",
        icon: { ...processIcons.launch, label: "Experience" },
      },
      {
        number: "05",
        id: "launch",
        title: "Launch",
        body: "Bring the brand to market with integrated launch campaigns.",
        icon: { ...processIcons.optimize, label: "Launch" },
      },
    ],
  },
  why: {
    eyebrow: "Why First Economy",
    titleBefore: "Identity That Holds",
    titleAccent: "Everywhere",
    body: "We don't stop at the logo deck — branding is engineered through every touchpoint where people meet the brand.",
    button: { label: "Let's talk", href: "/contact" },
    valueCards: [
      {
        id: "strategy-led",
        title: "Strategy Led",
        body: "Positioning and platforms grounded in audience and category insight.",
        icon: placeholderIcon("Strategy led icon"),
      },
      {
        id: "system-thinking",
        title: "System Thinking",
        body: "Identity systems that stay coherent across campaigns and channels.",
        icon: placeholderIcon("System thinking icon"),
      },
      {
        id: "physical-digital",
        title: "Physical + Digital",
        body: "From screens to storefronts, packaging and on-ground activations.",
        icon: placeholderIcon("Physical digital icon"),
      },
      {
        id: "launch-ready",
        title: "Launch Ready",
        body: "Brand work wired into media, creative and experience from day one.",
        icon: placeholderIcon("Launch ready icon"),
      },
      {
        id: "innovation",
        title: "Project Innovation",
        body: "Integrated innovation that turns brand ideas into lived experiences.",
        icon: placeholderIcon("Innovation icon"),
      },
      {
        id: "proven",
        title: "Proven Work",
        body: "Citywide launches and identity systems that created lasting recall.",
        icon: placeholderIcon("Proven work icon"),
      },
    ],
  },
  framework: {
    eyebrow: "Our Process",
    title: "A Full Brand System",
    body: "Every layer of the brand — from strategy to activation — connected as one system.",
    stages: [
      { id: "strategy", title: "Strategy", body: "Define where the brand wins.", icon: placeholderIcon("Strategy icon") },
      { id: "identity", title: "Identity", body: "Make it distinctive and ownable.", icon: placeholderIcon("Identity icon") },
      { id: "expression", title: "Expression", body: "Bring it to life across formats.", icon: placeholderIcon("Expression icon") },
      { id: "activation", title: "Activation", body: "Launch it into the market.", icon: placeholderIcon("Activation icon") },
    ],
  },
  ...(caseItems.length
    ? {
        caseStudies: {
          eyebrow: "Featured Case Studies",
          titleBefore: "Brands Built to",
          titleAccent: "Last.",
          body: "Identity and launch work that held up on screen, on street and in culture.",
          exploreLabel: "View all cases",
          exploreHref: "/work?service=branding",
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
    titleBefore: "Ready to build a brand that",
    titleAccent: "holds everywhere?",
    body: "Let's shape identity systems that work on screen and on the storefront.",
    button: { label: "Let's talk", href: "/contact" },
  },
};
