/**
 * Careers page content and media slots.
 * Assets live in /public/images/careers/.
 */

import type { MediaSlot } from "@/content/about";

export type CareerRole = {
  slug: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  href: string;
};

export const careersHero = {
  headlineBefore: "Build your career.",
  headlineAccent: "Engineer impact.",
  headlineAfter: "Grow with us.",
  body: "At First Economy, we don't just create campaigns — we engineer growth systems that create real impact. Join a team where strategy, creative, media, technology and data work as one.",
  cta: { label: "Explore openings", href: "#open-positions" },
  image: {
    src: "/images/careers/team.png",
    alt: "First Economy teammates collaborating around a long office table",
    label: "Careers hero team photo",
    grayscale: true,
  } satisfies MediaSlot,
  verticalMark: "STRATEGY  CREATIVE  MEDIA  TECHNOLOGY  DATA  =  GROWTH",
  burst: "/images/careers/hero/radial-burst.svg",
  arrow: "/images/careers/hero/arrow-circle.svg",
};

export const careersCulture = {
  eyebrow: "Our Culture",
  titleBefore: "A culture built on",
  titleAccent: "curiosity and collaboration.",
  body: "We are a collective of thinkers, makers and innovators who believe the best work happens when sharp minds come together — across roles, cities and disciplines.",
};

export const careersValues = [
  {
    title: "Ownership",
    body: "We take ownership, act with accountability and deliver results.",
    icon: {
      src: "/images/careers/culture/ownership.svg",
      alt: "",
      label: "Ownership",
    } satisfies MediaSlot,
  },
  {
    title: "Collaboration",
    body: "We believe the best ideas are built together.",
    icon: {
      src: "/images/careers/culture/collaboration.svg",
      alt: "",
      label: "Collaboration",
    } satisfies MediaSlot,
  },
  {
    title: "Impact",
    body: "We focus on outcomes that create real impact for our clients.",
    icon: {
      src: "/images/careers/culture/impact.svg",
      alt: "",
      label: "Impact",
    } satisfies MediaSlot,
  },
  {
    title: "Integrity",
    body: "We operate with honesty, transparency and respect.",
    icon: {
      src: "/images/careers/culture/integrity.svg",
      alt: "",
      label: "Integrity",
    } satisfies MediaSlot,
  },
  {
    title: "Growth",
    body: "We invest in learning, encourage progress and celebrate wins.",
    icon: {
      src: "/images/careers/culture/growth.svg",
      alt: "",
      label: "Growth",
    } satisfies MediaSlot,
  },
  {
    title: "Passion",
    body: "We love what we do and it shows in the work we create.",
    icon: {
      src: "/images/careers/culture/passion.svg",
      alt: "",
      label: "Passion",
    } satisfies MediaSlot,
  },
];

export const careersWhyJoin = {
  eyebrow: "Why Join Us",
  titleBefore: "More than a job.",
  titleAccent: "A place to thrive.",
};

export const careersBenefits = [
  {
    title: "Meaningful Work",
    body: "Work on brands and problems that matter — with outcomes you can measure.",
    icon: {
      src: "/images/careers/why-join/meaningful-work.svg",
      alt: "",
      label: "Meaningful Work",
    } satisfies MediaSlot,
  },
  {
    title: "Career Growth",
    body: "Clear learning paths across craft, platforms and leadership.",
    icon: {
      src: "/images/careers/why-join/career-growth.svg",
      alt: "",
      label: "Career Growth",
    } satisfies MediaSlot,
  },
  {
    title: "Great People",
    body: "Learn alongside specialists across media, creative, tech and data.",
    icon: {
      src: "/images/careers/why-join/great-people.svg",
      alt: "",
      label: "Great People",
    } satisfies MediaSlot,
  },
  {
    title: "Recognition",
    body: "We celebrate wins — for teams, individuals and the work itself.",
    icon: {
      src: "/images/careers/why-join/recognition.svg",
      alt: "",
      label: "Recognition",
    } satisfies MediaSlot,
  },
  {
    title: "Work-Life Balance",
    body: "A flexible, people-first environment built for sustainable performance.",
    icon: {
      src: "/images/careers/why-join/work-life-balance.svg",
      alt: "",
      label: "Work-Life Balance",
    } satisfies MediaSlot,
  },
];

export const careersOpenings = {
  eyebrow: "Open Positions",
  title: "Find your next opportunity.",
  viewAll: { label: "View all openings", href: "#open-positions" },
  emptyNote: "Don't see the right role?",
  resumeCta: { label: "Send us your resume", href: "mailto:careers@firsteconomy.in" },
};

export const careersRoles: CareerRole[] = [
  {
    slug: "senior-performance-marketing-manager",
    title: "Senior Performance Marketing Manager",
    location: "Mumbai",
    type: "Full-time",
    experience: "5-8 Yrs",
    href: "mailto:careers@firsteconomy.in?subject=Application%20—%20Senior%20Performance%20Marketing%20Manager",
  },
  {
    slug: "creative-art-director",
    title: "Creative Art Director",
    location: "Bengaluru",
    type: "Full-time",
    experience: "6-10 Yrs",
    href: "mailto:careers@firsteconomy.in?subject=Application%20—%20Creative%20Art%20Director",
  },
  {
    slug: "video-editor",
    title: "Video Editor",
    location: "Pune",
    type: "Full-time",
    experience: "2-4 Yrs",
    href: "mailto:careers@firsteconomy.in?subject=Application%20—%20Video%20Editor",
  },
  {
    slug: "ai-data-analyst",
    title: "AI & Data Analyst",
    location: "Mumbai",
    type: "Full-time",
    experience: "3-5 Yrs",
    href: "mailto:careers@firsteconomy.in?subject=Application%20—%20AI%20%26%20Data%20Analyst",
  },
  {
    slug: "seo-specialist",
    title: "SEO Specialist",
    location: "Bengaluru",
    type: "Full-time",
    experience: "2-5 Yrs",
    href: "mailto:careers@firsteconomy.in?subject=Application%20—%20SEO%20Specialist",
  },
];

export const careersCta = {
  titleBefore: "Let's build what's next.",
  titleAccent: "Together.",
  email: {
    label: "Send your resume to",
    value: "careers@firsteconomy.in",
    href: "mailto:careers@firsteconomy.in",
    icon: {
      src: "/images/careers/cta/send-resume.svg",
      alt: "",
      label: "Send resume",
    } satisfies MediaSlot,
  },
  culture: {
    label: "Life at First Economy",
    value: "Explore our culture",
    href: "#our-culture",
    icon: {
      src: "/images/careers/cta/life-at-fe.svg",
      alt: "",
      label: "Life at FE",
    } satisfies MediaSlot,
  },
  button: { label: "Join our team", href: "mailto:careers@firsteconomy.in" },
};
