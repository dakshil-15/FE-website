/**
 * Services landing page content and media slots.
 * Assets live in /public/images/services/.
 */

import type { MediaSlot } from "@/content/about";

export const servicesHero = {
  headlineBefore: "Solutions that",
  headlineAccent: "drive growth.",
  headlineAfter: "Impact that lasts.",
  body: "From strategy to execution, we engineer growth systems that help brands scale, perform and lead with purpose.",
  image: {
    src: "/images/services/hero/meeting.jpg",
    alt: "First Economy team in a glass meeting room with wall graphic Strategy Creative Media Technology Data equals Growth",
    label: "Services hero photo",
    grayscale: false,
  } satisfies MediaSlot,
  burst: "/images/services/hero/radial-burst.svg",
  arrow: "/images/services/hero/arrow-circle.svg",
};

export const servicesGrid = {
  eyebrow: "What we do",
  titleBefore: "Capabilities that",
  titleAfter: "drive growth",
  body: "An integrated suite of solutions across the entire marketing and technology ecosystem — one growth system, not disconnected departments.",
};

import { serviceOfferings } from "@/content/serviceOfferings";

export type ServiceLandingCard = {
  slug: string;
  title: string;
  body: string;
  href: string;
  icon: MediaSlot;
};

const serviceOfferingIcons: Record<string, MediaSlot> = {
  "media-buying": {
    src: "/images/services/icons/performance_marketing_growth_chart.svg",
    alt: "",
    label: "360° Media Buying",
  },
  "video-production": {
    src: "/images/services/icons/content_creative_play.svg",
    alt: "",
    label: "Video Production",
  },
  branding: {
    src: "/images/services/icons/branding_positioning_people.svg",
    alt: "",
    label: "Project Innovation & Branding",
  },
  "influencer-marketing": {
    src: "/images/services/icons/social_media_megaphone.svg",
    alt: "",
    label: "Influencer Marketing",
  },
  "marketplace-management": {
    src: "/images/services/icons/ecommerce_cart.svg",
    alt: "",
    label: "Marketplace Management",
  },
  technology: {
    src: "/images/services/icons/digital_experience_monitor.svg",
    alt: "",
    label: "Tech Solutions",
  },
  creative: {
    src: "/images/services/icons/creative_lightbulb.svg",
    alt: "",
    label: "Creative Solutions",
  },
  "social-media": {
    src: "/images/services/icons/social_chat.svg",
    alt: "",
    label: "Social Media",
  },
  seo: {
    src: "/images/services/icons/data_analytics_pie.svg",
    alt: "",
    label: "SEO Solutions",
  },
  "ai-solutions": {
    src: "/images/services/icons/strategy_consulting_target.svg",
    alt: "",
    label: "AI Solutions",
  },
};

export const servicesLandingCards: ServiceLandingCard[] = serviceOfferings.map((offering) => ({
  slug: offering.slug,
  title: offering.name,
  body: offering.description,
  href: offering.href,
  icon: serviceOfferingIcons[offering.slug],
}));

export const servicesProcess = {
  eyebrow: "Our Process",
  title: "How We Engineer Growth",
};

export const servicesProcessSteps = [
  {
    number: "01",
    title: "Discover",
    body: "We dig into your brand, audience and market to uncover the real growth constraints.",
    icon: {
      src: "/images/services/process/discover_magnifier.svg",
      alt: "",
      label: "Discover",
    } satisfies MediaSlot,
  },
  {
    number: "02",
    title: "Strategize",
    body: "We define the system — channels, creative, technology and data working as one plan.",
    icon: {
      src: "/images/services/process/strategize_nodes.svg",
      alt: "",
      label: "Strategize",
    } satisfies MediaSlot,
  },
  {
    number: "03",
    title: "Build",
    body: "We produce the assets, platforms and campaigns that turn strategy into execution.",
    icon: {
      src: "/images/services/process/build_gear.svg",
      alt: "",
      label: "Build",
    } satisfies MediaSlot,
  },
  {
    number: "04",
    title: "Launch",
    body: "We go live with precision — media, creative and tech coordinated for day-one impact.",
    icon: {
      src: "/images/services/process/launch_rocket.svg",
      alt: "",
      label: "Launch",
    } satisfies MediaSlot,
  },
  {
    number: "05",
    title: "Optimize",
    body: "We measure, learn and refine so performance compounds instead of resetting.",
    icon: {
      src: "/images/services/process/optimize_chart.svg",
      alt: "",
      label: "Optimize",
    } satisfies MediaSlot,
  },
];

export const servicesTrusted = {
  title: "Trusted by forward-thinking brands",
  logos: [
    {
      name: "Godrej",
      src: "/assets/logo-godrej.png",
      w: 972,
      h: 479,
    },
    {
      name: "FedEx",
      src: "/assets/logo-fedex.png",
      w: 806,
      h: 245,
    },
    {
      name: "Mahindra",
      src: "/assets/logo-mahindra.png",
      w: 954,
      h: 142,
    },
    {
      name: "Ajanta",
      src: "/assets/logo-ajanta.png",
      w: 905,
      h: 273,
    },
    {
      name: "Waaree",
      src: "/assets/logo-waaree.png",
      w: 952,
      h: 287,
    },
    {
      name: "Orpat",
      src: "/assets/logo-orpat.png",
      w: 937,
      h: 276,
    },
  ],
};

export const servicesCta = {
  titleBefore: "Let's build your next",
  titleAccent: "growth system.",
  body: "Ready to scale your brand with strategy, creativity and technology?",
  button: { label: "Start a Project", href: "/contact" },
};
