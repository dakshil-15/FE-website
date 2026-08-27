import type { GrowthNode, Office } from "@/content/types";

export const offices: Office[] = [
  { slug: "mumbai", city: "Mumbai", isHq: true },
  { slug: "bengaluru", city: "Bengaluru" },
  { slug: "pune", city: "Pune" },
  { slug: "aurangabad", city: "Aurangabad" },
];

export const contactInfo = {
  phone: "+91 22 4977 2200",
  phoneHref: "tel:+912249772200",
  email: "hello@firsteconomy.in",
  emailHref: "mailto:hello@firsteconomy.in",
};

export const growthNodes: GrowthNode[] = [
  { id: "strategy", label: "Strategy", description: "The thinking that connects every capability into one plan.", relatedServiceSlug: undefined },
  { id: "creative", label: "Creative", description: "Campaign and performance creative across every format.", relatedServiceSlug: "creative" },
  { id: "media", label: "Media", description: "Integrated media buying across search, social, programmatic and OOH.", relatedServiceSlug: "media-buying" },
  { id: "technology", label: "Technology", description: "Platforms, ERPs and systems built for scale and compliance.", relatedServiceSlug: "technology" },
  { id: "social", label: "Social", description: "Always-on content and community across B2B and B2C audiences.", relatedServiceSlug: "social-media" },
  { id: "search", label: "Search", description: "SEO built for search engines and AI — AEO, GEO and AI Overviews.", relatedServiceSlug: "seo" },
  { id: "ai", label: "AI", description: "AI applied to creative, analytics, search and operations.", relatedServiceSlug: "ai-solutions" },
  { id: "influencer", label: "Influencer", description: "Creator networks from celebrity collaborations to micro-creators.", relatedServiceSlug: "influencer-marketing" },
  { id: "video", label: "Video", description: "Brand and social video production, increasingly AI-accelerated.", relatedServiceSlug: "video-production" },
  { id: "marketplace", label: "Marketplace", description: "Marketplace listing, catalogue and store management.", relatedServiceSlug: "marketplace-management" },
];

type Stat = { label: string; value: string; sublabel?: string };

export const companyStats: Stat[] = [
  { label: "People", value: "250+" },
  { label: "Cities", value: "4" },
  { label: "Agencies", value: "62+", sublabel: "Local Planet Network" },
  { label: "Markets", value: "85+" },
  { label: "Media Billings", value: "$17.2B+" },
  { label: "Media Awards", value: "225+" },
];

export const dataTools = [
  "Google Trends",
  "Comscore",
  "SEMrush",
  "GWI",
  "Power BI",
  "Brandwatch",
  "Brand24",
  "Supermetrics",
  "Konnect Insights",
  "Looker Studio",
  "Similarweb",
];

export const platformPartners = [
  "Google",
  "Meta",
  "LinkedIn",
  "Reddit",
  "JioHotstar",
  "Spotify",
  "Pinterest",
  "Prime Video",
  "Quora",
  "Inshorts",
  "Zepto",
  "Paytm",
  "Snapchat",
  "Moneycontrol",
  "X Ads",
];
