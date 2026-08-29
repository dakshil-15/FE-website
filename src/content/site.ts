import type { Office } from "@/content/types";

export const offices: Office[] = [
  { slug: "mumbai", city: "Mumbai", isHq: true },
  { slug: "bengaluru", city: "Bengaluru" },
  { slug: "pune", city: "Pune" },
  { slug: "aurangabad", city: "Chattrapati Sambhaji Nagar" },
];

export const contactInfo = {
  phone: "+91 22 4977 2200",
  phoneHref: "tel:+912249772200",
  email: "hello@firsteconomy.in",
  emailHref: "mailto:hello@firsteconomy.in",
};

export const footerCta = {
  headline: "Ready to engineer your growth system?",
  primaryLabel: "Let's talk",
  primaryHref: "/contact",
};

/** Official First Economy profiles (from firsteconomy.com). */
export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/first-economy/" },
  { label: "Instagram", href: "https://www.instagram.com/first_economy/" },
  { label: "YouTube", href: "https://www.youtube.com/@FirstEconomy" },
  { label: "Facebook", href: "https://www.facebook.com/FirstEconomy/" },
  { label: "X", href: "https://x.com/FirstEconomy" },
] as const;

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
  "IndiGo",
];
