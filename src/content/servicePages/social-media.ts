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

const caseItems = caseStudiesForService("social-media");
const impactStats = impactStatsForService("social-media");

export const socialMediaPage: ServicePageContent = {
  slug: "social-media",
  name: "Social Media Management",
  summary:
    "Always-on social strategy, content and community management for both B2B and B2C audiences.",
  hero: {
    eyebrow: "Service",
    headlineBefore: "Social Media",
    headlineAccent: "Management.",
    body: "Always-on social strategy, content and community management for B2B and B2C — social that compounds, not campaigns in isolation.",
    visual: {
      alt: "Social media content and community",
      label: "Social media hero",
      fit: "cover",
    } satisfies MediaSlot,
    burst: SERVICE_HERO_BURST,
    arrow: SERVICE_HERO_ARROW,
    highlights: [
      { id: "strategy", label: "Social Strategy", icon: placeholderIcon("Social strategy icon") },
      { id: "always-on", label: "Always-On Content", icon: placeholderIcon("Always-on content icon") },
      { id: "community", label: "Community", icon: placeholderIcon("Community icon") },
      { id: "listening", label: "Social Listening", icon: placeholderIcon("Social listening icon") },
    ],
  },
  process: {
    eyebrow: "Our Capabilities",
    title: "End-to-End Social Excellence.",
    body: "From strategy to reporting — always-on social engineered to compound brand presence over time.",
    steps: [
      {
        number: "01",
        id: "strategy",
        title: "Strategy",
        body: "Define platform roles, audience and the narrative that compounds.",
        icon: { ...processIcons.strategize, label: "Strategy" },
      },
      {
        number: "02",
        id: "calendar",
        title: "Calendar",
        body: "Plan always-on and campaign content with clear pacing.",
        icon: { ...processIcons.discover, label: "Calendar" },
      },
      {
        number: "03",
        id: "create",
        title: "Create",
        body: "Produce social-first creative that fits each platform's culture.",
        icon: { ...processIcons.build, label: "Create" },
      },
      {
        number: "04",
        id: "community",
        title: "Community",
        body: "Manage conversation, care and engagement with brand voice.",
        icon: { ...processIcons.launch, label: "Community" },
      },
      {
        number: "05",
        id: "report",
        title: "Report",
        body: "Listen, measure and refine what the audience responds to.",
        icon: { ...processIcons.optimize, label: "Report" },
      },
    ],
  },
  why: {
    eyebrow: "Why First Economy",
    titleBefore: "Social That",
    titleAccent: "Compounds",
    body: "We run social as a continuous system — strategy, content and community working together for B2B and B2C brands.",
    button: { label: "Let's talk", href: "/contact" },
    valueCards: [
      {
        id: "always-on",
        title: "Always-On",
        body: "Calendars and content that build equity between campaigns.",
        icon: placeholderIcon("Always-on icon"),
      },
      {
        id: "social-first",
        title: "Social-First Craft",
        body: "Creative made for feeds — not resized print ads.",
        icon: placeholderIcon("Social-first craft icon"),
      },
      {
        id: "b2b-b2c",
        title: "B2B + B2C",
        body: "Voice and formats tuned for professional and consumer audiences.",
        icon: placeholderIcon("B2B B2C icon"),
      },
      {
        id: "community",
        title: "Community Care",
        body: "Listening and response that protect trust and deepen relationships.",
        icon: placeholderIcon("Community care icon"),
      },
      {
        id: "campaign-bridge",
        title: "Campaign Bridge",
        body: "Always-on systems that amplify launches when it counts.",
        icon: placeholderIcon("Campaign bridge icon"),
      },
      {
        id: "insight",
        title: "Insight Led",
        body: "Reporting and listening that feed the next creative decision.",
        icon: placeholderIcon("Insight led icon"),
      },
    ],
  },
  framework: {
    eyebrow: "Our Process",
    title: "A Full Social System",
    body: "Always-on, campaigns, listening and growth — connected as one social operating model.",
    stages: [
      { id: "always-on", title: "Always-On", body: "Steady presence that compounds.", icon: placeholderIcon("Always-on icon") },
      { id: "campaign", title: "Campaign", body: "Peaks that amplify big moments.", icon: placeholderIcon("Campaign icon") },
      { id: "listening", title: "Listening", body: "Signal from culture and community.", icon: placeholderIcon("Listening icon") },
      { id: "growth", title: "Growth", body: "Learning that improves the next cycle.", icon: placeholderIcon("Growth icon") },
    ],
  },
  ...(caseItems.length
    ? {
        caseStudies: {
          eyebrow: "Featured Case Studies",
          titleBefore: "Social That",
          titleAccent: "Sticks.",
          body: "Always-on and campaign social work that built presence and trust.",
          exploreLabel: "View all cases",
          exploreHref: "/work?service=social-media",
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
    titleBefore: "Ready for social that",
    titleAccent: "compounds over time?",
    body: "Let's build always-on strategy, content and community that grow brand equity.",
    button: { label: "Let's talk", href: "/contact" },
  },
};
