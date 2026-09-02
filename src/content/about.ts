/**
 * About page content and media slots.
 * Files live in /public/images/about/.
 */

import { networkStats } from "@/content/stats";

export type MediaSlot = {
  src?: string;
  /** Lucide icon when no `src` (e.g. service page feature icons). */
  icon?: string;
  alt: string;
  label: string;
  fit?: "cover" | "contain";
  grayscale?: boolean;
};

export const aboutHero = {
  eyebrow: "About Us",
  headlineBefore: "We engineer",
  headlineAccent: "growth systems",
  headlineAfter: "that drive real impact",
  body: "First Economy is a growth partner for brands that want to go beyond marketing and build a sustainable advantage in today's digital world.",
  image: {
    src: "/images/about/hero/meeting-room.jpg",
    alt: "First Economy team in a glass meeting room",
    label: "Hero meeting photo",
    grayscale: true,
  } satisfies MediaSlot,
  burst: "/images/about/hero/radial-burst.svg",
  arrow: "/images/about/ui/arrow-right-circle.svg",
};

const aboutStatIcons: Record<string, MediaSlot> = {
  "Marketing Agencies": {
    src: "/images/about/stats/globe.svg",
    alt: "",
    label: "Marketing Agencies",
  },
  Markets: { src: "/images/about/stats/cities.svg", alt: "", label: "Markets" },
  "Media Awards": { src: "/images/about/stats/awards.svg", alt: "", label: "Media Awards" },
  Billings: { src: "/images/about/stats/growth-system.svg", alt: "", label: "Billings" },
};

export const aboutStats = networkStats.map((stat) => ({
  ...stat,
  icon: aboutStatIcons[stat.label],
}));

export const aboutStory = {
  eyebrow: "Our Story",
  title: "A partner. A team. A system that works.",
  body: "First Economy began as a digital-first partner for ambitious brands. Over a decade we have grown into 250+ minds across four cities — building one connected growth system instead of a collection of disconnected services.",
};

export const aboutTimeline = [
  {
    year: "2014",
    title: "The Beginning",
    body: "Founded in Mumbai to help brands grow with digital-first thinking.",
    icon: { src: "/images/about/story/rocket.svg", alt: "", label: "Beginning" } satisfies MediaSlot,
  },
  {
    year: "2017",
    title: "Building the Team",
    body: "Specialist teams across media, creative and technology come together.",
    icon: { src: "/images/about/story/team.svg", alt: "", label: "Team" } satisfies MediaSlot,
  },
  {
    year: "2020",
    title: "Expanding Horizons",
    body: "New cities, new capabilities, and a wider network of partners.",
    icon: { src: "/images/about/story/globe.svg", alt: "", label: "Expansion" } satisfies MediaSlot,
  },
  {
    year: "Today",
    title: "Engineering Growth Systems",
    body: "Strategy, creative, media, technology and data working as one.",
    icon: { src: "/images/about/story/target.svg", alt: "", label: "Growth systems" } satisfies MediaSlot,
  },
];

export const aboutWhatWeDo = {
  eyebrow: "What We Do",
  titleBefore: "We don't offer services in silos. We",
  titleAccent: "engineer growth systems.",
  body: "Instead of presenting capabilities as disconnected departments, we design strategy, creative, media, technology and data to work together — built around a single growth outcome.",
  cta: { label: "Explore our services", href: "/services" },
  image: {
    src: "/images/about/what-we-do/office-growth-wall.jpg",
    alt: "Office hallway with STRATEGY, CREATIVE, MEDIA, TECHNOLOGY, DATA = GROWTH on the wall",
    label: "Office hallway photo",
    grayscale: false,
  } satisfies MediaSlot,
};

export type TeamMember = {
  name: string;
  title: string;
  linkedin?: string;
  image: MediaSlot;
};

/** Core leadership — aligned to creds deck (slide 3). */
export const aboutTeamTagline = "Fueled by 250+ passionate minds";

/** Slide 3 order: Jigar & Jeffrey first, then top row L→R, bottom row L→R. */
export const aboutTeam: TeamMember[] = [
  {
    name: "Jigar Zatakia",
    title: "Founder & Joint CEO",
    linkedin: "https://www.linkedin.com/in/jigarzatakia",
    image: {
      src: "/images/about/leadership/jigar-zatakia.jpg",
      alt: "Portrait of Jigar Zatakia",
      label: "Jigar Zatakia",
      grayscale: true,
    },
  },
  {
    name: "Jeffrey Crasto",
    title: "Partner & Joint CEO",
    image: {
      src: "/images/about/leadership/jeffrey-crasto.jpg",
      alt: "Portrait of Jeffrey Crasto",
      label: "Jeffrey Crasto",
      grayscale: true,
    },
  },
  {
    name: "Parth Gandhi",
    title: "Head — Media Planning",
    image: {
      src: "/images/about/leadership/parth-gandhi.jpg",
      alt: "Portrait of Parth Gandhi",
      label: "Parth Gandhi",
      grayscale: true,
    },
  },
  {
    name: "Vaibhav Jain",
    title: "Chief Technology Officer",
    image: {
      src: "/images/about/leadership/vaibhav-jain.jpg",
      alt: "Portrait of Vaibhav Jain",
      label: "Vaibhav Jain",
      grayscale: true,
    },
  },
  {
    name: "Jamshid Doctor",
    title: "Head — Business Solutions",
    image: {
      src: "/images/about/leadership/jamshid-doctor.jpg",
      alt: "Portrait of Jamshid Doctor",
      label: "Jamshid Doctor",
      grayscale: true,
    },
  },
  {
    name: "Rushabh Ashar",
    title: "Head — Video Production",
    image: {
      src: "/images/about/leadership/rushabh-ashar.jpg",
      alt: "Portrait of Rushabh Ashar",
      label: "Rushabh Ashar",
      grayscale: true,
    },
  },
  {
    name: "Pratik Panvalkar",
    title: "Head — Branding & Design",
    image: {
      src: "/images/about/leadership/pratik-panvalkar.jpg",
      alt: "Portrait of Pratik Panvalkar",
      label: "Pratik Panvalkar",
      grayscale: true,
    },
  },
  {
    name: "Chirag Kaku",
    title: "Head — Strategy",
    image: {
      src: "/images/about/leadership/chirag-kaku.jpg",
      alt: "Portrait of Chirag Kaku",
      label: "Chirag Kaku",
      grayscale: true,
    },
  },
  {
    name: "Herat Panchal",
    title: "Chief Growth Officer",
    image: {
      src: "/images/about/leadership/herat-panchal.jpg",
      alt: "Portrait of Herat Panchal",
      label: "Herat Panchal",
      grayscale: true,
    },
  },
  {
    name: "Bilal Shaikh",
    title: "Head — New Business, Mumbai",
    image: {
      src: "/images/about/leadership/bilal-shaikh.jpg",
      alt: "Portrait of Bilal Shaikh",
      label: "Bilal Shaikh",
      grayscale: true,
    },
  },
  {
    name: "Megha Mathur",
    title: "Head — New Business, Bengaluru",
    image: {
      src: "/images/about/leadership/megha-mathur.jpg",
      alt: "Portrait of Megha Mathur",
      label: "Megha Mathur",
      grayscale: true,
    },
  },
  {
    name: "Deep Ajmera",
    title: "Head — New Business, Pune",
    image: {
      src: "/images/about/leadership/deep-ajmera.jpg",
      alt: "Portrait of Deep Ajmera",
      label: "Deep Ajmera",
      grayscale: true,
    },
  },
  {
    name: "Arab Iqbal",
    title: "Head — Creative & Branding Solution",
    image: {
      src: "/images/about/leadership/iqbal-arab.jpg",
      alt: "Portrait of Arab Iqbal",
      label: "Arab Iqbal",
      grayscale: true,
    },
  },
  {
    name: "Pramod Vishwakarma",
    title: "Head — Social Media",
    image: {
      src: "/images/about/leadership/pramod-vishwakarma.jpg",
      alt: "Portrait of Pramod Vishwakarma",
      label: "Pramod Vishwakarma",
      grayscale: true,
    },
  },
];

export const aboutTeamUi = {
  linkedin: "/images/about/leadership/linkedin.svg",
};

export const aboutUi = {
  arrow: "/images/about/ui/arrow-right.svg",
  arrowWhite: "/images/about/ui/arrow-right-white.svg",
  arrowCircle: "/images/about/ui/arrow-right-circle.svg",
};

export const aboutValues = [
  {
    title: "Innovation",
    body: "We look for better ways to grow, not just more ways to spend.",
    icon: { src: "/images/about/values/innovation.svg", alt: "", label: "Innovation" } satisfies MediaSlot,
  },
  {
    title: "Collaboration",
    body: "Media, creative, technology and data work as one team.",
    icon: { src: "/images/about/values/collaboration.svg", alt: "", label: "Collaboration" } satisfies MediaSlot,
  },
  {
    title: "Impact",
    body: "Every system is built around a measurable growth outcome.",
    icon: { src: "/images/about/values/impact.svg", alt: "", label: "Impact" } satisfies MediaSlot,
  },
  {
    title: "Integrity",
    body: "We own the work, the numbers, and the partnership.",
    icon: { src: "/images/about/values/integrity.svg", alt: "", label: "Integrity" } satisfies MediaSlot,
  },
  {
    title: "Passion",
    body: "Ambitious people, ambitious brands, ambitious results.",
    icon: { src: "/images/about/values/passion.svg", alt: "", label: "Passion" } satisfies MediaSlot,
  },
];

export type CampaignAward = {
  client: string;
  organization: string;
  accolade: string;
  category: string;
  image: MediaSlot;
};

/** Campaign awards — creds deck slides 10–11. */
export const campaignAwards: CampaignAward[] = [
  {
    client: "Godrej Properties",
    organization: "Guinness World Records",
    accolade: "One of our biggest achievements",
    category: "1,000+ influencers went live within one hour — an official Guinness World Record.",
    image: {
      src: "/images/about/awards/godrej-guinness-record.png",
      alt: "Godrej Properties Guinness World Record campaign",
      label: "Godrej Properties",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "Piramal Pharma",
    organization: "Afaqs",
    accolade: "Marketers Xcellence Award",
    category: "Best Storytelling : I-Know - Are You Trying On Your Best Days?",
    image: {
      src: "/images/about/awards/piramal-afaqs-trophy.png",
      alt: "Piramal Pharma Afaqs Marketers Xcellence Award",
      label: "Piramal Pharma",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "Nicobar",
    organization: "FLOXGLOVE Awards",
    accolade: "Best Performance Marketing",
    category: "Best Performance Marketing",
    image: {
      src: "/images/about/awards/nicobar-floxglove-trophy.png",
      alt: "Nicobar FLOXGLOVE Awards recognition",
      label: "Nicobar",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "Samco Securities",
    organization: "afaqs Startup Brands Awards",
    accolade: "Outstanding Personal Branding",
    category: "Outstanding personal branding by founder(s).",
    image: {
      src: "/images/about/awards/samco-startup-brands-trophy.png",
      alt: "Samco Securities afaqs Startup Brands Award",
      label: "Samco Securities",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "Society Tea",
    organization: "MOBEXX Awards",
    accolade: "Mobile Advertising Excellence",
    category: "Mobile Advertising Excellence in Cross-Screen campaign",
    image: {
      src: "/images/about/awards/society-tea-mobexx-trophy.png",
      alt: "Society Tea MOBEXX Award",
      label: "Society Tea",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "VIP",
    organization: "e4m Mobile Awards",
    accolade: "Best Use of UGC",
    category: "Best use of user-generated content.",
    image: {
      src: "/images/about/awards/vip-e4m-mobile-trophy.png",
      alt: "VIP e4m Mobile Award",
      label: "VIP",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "House of Abhinandan Lodha",
    organization: "DIGIXX Awards",
    accolade: "Brand Awareness Campaign",
    category: "Brand Awareness Campaign (Real Estate)",
    image: {
      src: "/images/about/awards/house-of-abhinandan-digixx-trophy.png",
      alt: "House of Abhinandan Lodha DIGIXX Award",
      label: "House of Abhinandan Lodha",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "FedEx",
    organization: "MOBEXX Awards",
    accolade: "Best Integrated Multi-Channel Campaign",
    category: "Best Integrated Multi-Channel Campaign",
    image: {
      src: "/images/about/awards/fedex-mobexx-trophy.png",
      alt: "FedEx MOBEX 2021 Gold Winner — Best Integrated Multi-Channel Campaign",
      label: "FedEx",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "Glutone",
    organization: "e4m Awards",
    accolade: "Best Audio / Video Campaign",
    category: "Best Audio/ Video Campaign #GlowWithGlutone",
    image: {
      src: "/images/about/awards/glutone-e4m-trophy.png",
      alt: "Glutone e4m Award",
      label: "Glutone",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
];

export const aboutFeaturedAchievement = {
  client: "Godrej Properties",
  eyebrow: "One of our biggest achievements",
  title: "Guinness World Record — 1,000+ influencers live in one hour",
  body: "1,000+ influencers went live within one hour, earning Godrej Properties an official Guinness World Record.",
  href: "/work/godrej-blue",
  sectionCta: { label: "View all awards", href: "/awards" },
};

export const aboutCta = {
  titleBefore: "Ready to engineer",
  titleAccent: "your growth system?",
  body: "Partner with a team built around strategy, creative, media, technology and data — working as one growth system.",
  button: { label: "Let's talk", href: "/contact" },
  secondary: { label: "View awards", href: "/awards" },
  tertiary: { label: "Our offices", href: "/contact#offices" },
  burst: "/images/about/hero/radial-burst.svg",
};

export { officeLocations as aboutLocations } from "@/content/offices";
export type { OfficeLocation as AboutLocation } from "@/content/offices";

export const featuredCampaignAward = campaignAwards[0];
