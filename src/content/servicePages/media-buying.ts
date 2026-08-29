/**
 * 360° Media Buying service page content.
 * Assets live in /public/images/services/media-buying/ (add when ready).
 */

import type { MediaSlot } from "@/content/about";
import {
  SERVICE_HERO_ARROW,
  SERVICE_HERO_BURST,
  placeholderIcon,
  processIcons,
} from "@/content/servicePages/shared";
import type { ServicePageContent } from "@/content/servicePages/types";

export const mediaBuyingPage: ServicePageContent = {
  slug: "media-buying",
  name: "360° Media Buying",
  summary:
    "Integrated media strategy across search, social, programmatic, OTT and hyperlocal OOH — planned as one system, not separate buys.",
  hero: {
    eyebrow: "Service",
    headlineBefore: "360° Media",
    headlineAccent: "Buying.",
    body: "Data-driven media planning and buying that connects your brand with the right audience at the right moment — across every channel that matters.",
    visual: {
      alt: "City billboards and digital out-of-home media at night",
      label: "Media buying hero — city billboards",
      fit: "cover",
    } satisfies MediaSlot,
    burst: SERVICE_HERO_BURST,
    arrow: SERVICE_HERO_ARROW,
    highlights: [
      { id: "full-funnel", label: "Full-Funnel Coverage", icon: placeholderIcon("Full-funnel coverage icon") },
      { id: "data-led", label: "Data-Led Decisions", icon: placeholderIcon("Data-led decisions icon") },
      { id: "performance", label: "Performance Optimized", icon: placeholderIcon("Performance optimized icon") },
      { id: "omnichannel", label: "Omnichannel Reach", icon: placeholderIcon("Omnichannel reach icon") },
    ],
  },
  process: {
    eyebrow: "Our Capabilities",
    title: "End-to-End Media Excellence.",
    body: "From audience intelligence to transparent reporting — every stage of media is planned, bought and optimized as one connected system.",
    steps: [
      {
        number: "01",
        id: "audience-insights",
        title: "Audience Insights",
        body: "Deep research to identify moments of attention.",
        icon: { ...processIcons.discover, label: "Audience Insights" },
      },
      {
        number: "02",
        id: "strategic-planning",
        title: "Strategic Planning",
        body: "Integrated media strategies aligned with business objectives.",
        icon: { ...processIcons.strategize, label: "Strategic Planning" },
      },
      {
        number: "03",
        id: "media-buying",
        title: "Media Buying",
        body: "Precision buying across channels for maximum impact.",
        icon: { ...processIcons.launch, label: "Media Buying" },
      },
      {
        number: "04",
        id: "performance-management",
        title: "Performance Management",
        body: "Real-time optimization to improve performance.",
        icon: { ...processIcons.optimize, label: "Performance Management" },
      },
      {
        number: "05",
        id: "reporting-insights",
        title: "Reporting & Insights",
        body: "Transparent reporting with actionable insights.",
        icon: { ...processIcons.build, label: "Reporting & Insights" },
      },
    ],
  },
  why: {
    eyebrow: "Why First Economy",
    titleBefore: "Media That Drives",
    titleAccent: "Measurable Growth",
    body: "We plan media as one connected system — not a stack of separate buys — so every channel compounds toward business outcomes.",
    button: { label: "Let's talk", href: "/contact" },
    valueCards: [
      {
        id: "data-first",
        title: "Data-First Approach",
        body: "Audience, platform and performance data unified in one operating layer.",
        icon: placeholderIcon("Data-first approach icon"),
      },
      {
        id: "integrated",
        title: "Integrated Expertise",
        body: "Search, social, programmatic, OTT and OOH planned as one system.",
        icon: placeholderIcon("Integrated expertise icon"),
      },
      {
        id: "partnerships",
        title: "Strong Partnerships",
        body: "Certified platform partnerships across the marketing and media stack.",
        icon: placeholderIcon("Strong partnerships icon"),
      },
      {
        id: "performance-obsessed",
        title: "Performance Obsessed",
        body: "Real-time optimization and attribution built into every campaign.",
        icon: placeholderIcon("Performance obsessed icon"),
      },
      {
        id: "transparency",
        title: "Transparency & Trust",
        body: "Clear reporting, honest recommendations and no hidden agendas.",
        icon: placeholderIcon("Transparency & trust icon"),
      },
      {
        id: "experienced-team",
        title: "Experienced Team",
        body: "Media specialists who have scaled brands across categories and markets.",
        icon: placeholderIcon("Experienced team icon"),
      },
    ],
  },
  framework: {
    eyebrow: "Our Process",
    title: "A Full-Funnel Media Ecosystem",
    body: "Every stage of the customer journey — from first impression to lasting loyalty — connected through integrated media.",
    stages: [
      { id: "awareness", title: "Awareness", body: "Reach the right audience.", icon: placeholderIcon("Awareness icon") },
      {
        id: "consideration",
        title: "Consideration",
        body: "Engage and build consideration.",
        icon: placeholderIcon("Consideration icon"),
      },
      {
        id: "conversion",
        title: "Conversion",
        body: "Drive action and acquire customers.",
        icon: placeholderIcon("Conversion icon"),
      },
      { id: "loyalty", title: "Loyalty", body: "Retain and grow customer value.", icon: placeholderIcon("Loyalty icon") },
    ],
  },
  caseStudies: {
    eyebrow: "Featured Case Studies",
    titleBefore: "Media That Delivers",
    titleAccent: "Results.",
    body: "Campaigns where integrated media planning drove measurable brand and business outcomes.",
    exploreLabel: "View all cases",
    exploreHref: "/work?service=media-buying",
    items: [
      {
        slug: "fedex-csk",
        client: "FedEx",
        title: "Building Brand Recall at Scale",
        body: "1.2B+ impressions from an IPL association built for more than logo placement.",
        image: {
          src: "/images/work/cases/fedex-csk.png",
          alt: "FedEx × Chennai Super Kings case study",
          label: "FedEx case study",
          fit: "cover",
        },
      },
      {
        slug: "vip-industries",
        client: "VIP Industries",
        title: "Turning Visibility Into Visits",
        body: "64M+ impressions converted into measured footfall across 180+ stores.",
        image: {
          src: "/images/work/vip-industries.png",
          alt: "VIP Industries case study",
          label: "VIP Industries case study",
          fit: "cover",
        },
      },
      {
        slug: "fedex-csk-programmatic",
        client: "FedEx",
        title: "Accelerating Consideration",
        body: "Programmatic and CTV formats that turned mass reach into brand consideration.",
        href: "/work/fedex-csk",
        image: {
          src: "/images/work/cases/fedex-csk.png",
          alt: "Out-of-home media case study",
          label: "OOH media case study",
          fit: "cover",
        },
      },
    ],
  },
  impact: {
    eyebrow: "Impact That Matters",
    titleBefore: "Real Numbers.",
    titleAccent: "Real Impact.",
    stats: [
      { value: "1.204B+", label: "Impressions Delivered" },
      { value: "175M+", label: "People Reached" },
      { value: "54M+", label: "Engagements" },
      { value: "85M+", label: "Video Views" },
      { value: "32%+", label: "Average ROI Improvement" },
    ],
  },
  cta: {
    titleBefore: "Ready to build high-impact",
    titleAccent: "media campaigns?",
    body: "Let's connect the right audience with the right message and drive measurable growth.",
    button: { label: "Let's talk", href: "/contact" },
  },
};
