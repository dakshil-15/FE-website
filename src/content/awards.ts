/**
 * Awards & Recognition page content.
 * Reuses media from /public/images/about/ where available.
 */

import type { MediaSlot } from "@/content/about";
import { aboutAwards, aboutStats, aboutUi } from "@/content/about";

export { aboutUi };

export const awardsHero = {
  eyebrow: "Awards & Recognition",
  headlineBefore: "Recognized for impact.",
  headlineAccent: "Driven by purpose.",
  body: "Our work has been honored by leading platforms for creative excellence, innovation and measurable business impact — proof that growth systems deliver when strategy, media, technology and data work as one.",
  image: {
    alt: "Collection of trophies and awards on display",
    label: "Awards hero — trophy collection photo",
    fit: "cover",
    grayscale: false,
  } satisfies MediaSlot,
  burst: "/images/about/hero/radial-burst.svg",
  arrow: "/images/about/ui/arrow-right-circle.svg",
};

export const awardsStatsBar = [
  {
    value: 225,
    suffix: "+",
    label: "Awards Won",
    description: "For creative excellence, innovation & impact.",
    icon: aboutStats.find((s) => s.label === "Media Awards")?.icon ?? {
      src: "/images/about/stats/awards.svg",
      alt: "",
      label: "Awards",
    },
  },
  {
    value: 50,
    suffix: "+",
    label: "Industry Recognitions",
    description: "Across media, technology, marketing & more.",
    icon: { src: "/images/about/stats/growth-system.svg", alt: "", label: "Recognitions" } satisfies MediaSlot,
  },
  {
    value: 10,
    suffix: "+",
    label: "Years of Excellence",
    description: "Consistent performance that sets us apart.",
    icon: { src: "/images/about/story/target.svg", alt: "", label: "Excellence" } satisfies MediaSlot,
  },
  {
    value: 10,
    suffix: "+",
    label: "Global Bodies",
    description: "Recognitions from national & international platforms.",
    icon: { src: "/images/about/story/globe.svg", alt: "", label: "Global bodies" } satisfies MediaSlot,
  },
  {
    value: 100,
    suffix: "+",
    label: "Campaigns Recognized",
    description: "Across industries and categories.",
    icon: { src: "/images/about/values/impact.svg", alt: "", label: "Campaigns" } satisfies MediaSlot,
  },
];

export type AwardGalleryItem = {
  organization: string;
  tier: string;
  category: string;
  year: string;
  image: MediaSlot;
};

export const awardsGallery: AwardGalleryItem[] = [
  {
    organization: "Cannes Lions India",
    tier: "Bronze",
    category: "Media Lions — Integrated Campaign",
    year: "2024",
    image: {
      alt: "Cannes Lions India trophy",
      label: "Cannes Lions India trophy photo",
      fit: "contain",
    } satisfies MediaSlot,
  },
  {
    organization: "e4m",
    tier: "Agency of the Year",
    category: "Performance Marketing",
    year: "2024",
    image: aboutAwards[0]!.image,
  },
  {
    organization: "IPMA",
    tier: "Digital Agency of the Year",
    category: "India Performance Marketing Awards",
    year: "2024",
    image: aboutAwards[1]!.image,
  },
  {
    organization: "Indian Digital Awards",
    tier: "Gold Winner",
    category: "Best Performance Marketing Campaign",
    year: "2024",
    image: aboutAwards[3]!.image,
  },
  {
    organization: "India PR Awards",
    tier: "Best PR Campaign",
    category: "Campaign of the Year",
    year: "2024",
    image: aboutAwards[6]!.image,
  },
  {
    organization: "IPMA",
    tier: "Best Use of Performance Marketing",
    category: "India Performance Marketing Awards",
    year: "2024",
    image: aboutAwards[2]!.image,
  },
  {
    organization: "Excellence in Performance",
    tier: "Award Winner",
    category: "Performance Marketing",
    year: "2024",
    image: aboutAwards[4]!.image,
  },
  {
    organization: "Excellence Award",
    tier: "Outstanding Performance",
    category: "Agency Recognition",
    year: "2024",
    image: aboutAwards[7]!.image,
  },
];

export const awardsGallerySection = {
  eyebrow: "Awards Gallery",
  title: "Celebrating excellence.",
  body: "Honored by leading platforms for our work in media, creative, technology, digital innovation and business transformation.",
};

export type IndustryRecognition = {
  organization: string;
  title: string;
  body: string;
  year: string;
  logo: MediaSlot;
};

export const industryRecognitions = {
  eyebrow: "Industry Recognitions",
  titleBefore: "Trusted. Respected.",
  titleAccent: "Admired.",
  body: "Recognitions that reflect our commitment to innovation, performance and building long-term partnerships.",
  items: [
    {
      organization: "Deloitte",
      title: "Technology Fast 50 India",
      body: "Recognized among India's fastest-growing technology companies.",
      year: "2024",
      logo: {
        alt: "Deloitte logo",
        label: "Deloitte logo",
      } as MediaSlot,
    },
    {
      organization: "Google Partners",
      title: "Premier Partner",
      body: "Top-tier certification for Google Ads and marketing technology.",
      year: "2024",
      logo: {
        alt: "Google Partners logo",
        label: "Google Partners logo",
      } as MediaSlot,
    },
    {
      organization: "Meta",
      title: "Business Partner",
      body: "Certified partner for Meta advertising and business solutions.",
      year: "2024",
      logo: {
        alt: "Meta Business Partner logo",
        label: "Meta Business Partner logo",
      } as MediaSlot,
    },
    {
      organization: "CRISIL",
      title: "Rated Agency",
      body: "Independent rating for operational and financial strength.",
      year: "2023",
      logo: {
        alt: "CRISIL logo",
        label: "CRISIL logo",
      } as MediaSlot,
    },
  ] satisfies IndustryRecognition[],
};

export const awardsCta = {
  titleBefore: "Recognition motivates us.",
  titleAccent: "Impact defines us.",
  body: "Let's engineer the next chapter of growth together.",
  button: { label: "Let's talk", href: "/contact" },
  burst: "/images/about/hero/radial-burst.svg",
};
