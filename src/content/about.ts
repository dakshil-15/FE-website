/**
 * About page content and media slots.
 * Files live in /public/images/about/.
 */

export type MediaSlot = {
  src?: string;
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

export const aboutStats = [
  {
    value: 250,
    suffix: "+",
    label: "Minds",
    description: "Specialists across media, creative, technology and data.",
    icon: { src: "/images/about/stats/minds.svg", alt: "", label: "Minds" } satisfies MediaSlot,
  },
  {
    value: 4,
    suffix: "",
    label: "Cities",
    description: "Mumbai, Bengaluru, Aurangabad and Pune.",
    icon: { src: "/images/about/stats/cities.svg", alt: "", label: "Cities" } satisfies MediaSlot,
  },
  {
    value: 225,
    suffix: "+",
    label: "Media Awards",
    description: "Recognitions for work that moved markets.",
    icon: { src: "/images/about/stats/awards.svg", alt: "", label: "Awards" } satisfies MediaSlot,
  },
  {
    value: 1,
    suffix: "",
    label: "Growth System",
    description: "One connected operating system, not isolated services.",
    icon: { src: "/images/about/stats/growth-system.svg", alt: "", label: "Growth system" } satisfies MediaSlot,
  },
];

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
    name: "Chirag Kaku",
    title: "Leadership",
    image: {
      src: "/images/about/leadership/chirag-kaku.jpg",
      alt: "Portrait of Chirag Kaku",
      label: "Chirag Kaku",
      grayscale: true,
    },
  },
  {
    name: "Iqbal Arab",
    title: "Head — Creative",
    image: {
      src: "/images/about/leadership/iqbal-arab.jpg",
      alt: "Portrait of Iqbal Arab",
      label: "Iqbal Arab",
      grayscale: true,
    },
  },
  {
    name: "Bilal Shaikh",
    title: "Head — New Business",
    image: {
      src: "/images/about/leadership/bilal-shaikh.jpg",
      alt: "Portrait of Bilal Shaikh",
      label: "Bilal Shaikh",
      grayscale: true,
    },
  },
  {
    name: "Deep Ajmera",
    title: "Leadership",
    image: {
      src: "/images/about/leadership/deep-ajmera.jpg",
      alt: "Portrait of Deep Ajmera",
      label: "Deep Ajmera",
      grayscale: true,
    },
  },
  {
    name: "Megha Mathur",
    title: "Leadership",
    image: {
      src: "/images/about/leadership/megha-mathur.jpg",
      alt: "Portrait of Megha Mathur",
      label: "Megha Mathur",
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

export const aboutAwards = [
  {
    client: "e4m",
    title: "Agency of the Year",
    href: "/awards",
    image: {
      src: "/images/about/awards/e4m-agency-of-the-year.jpg",
      alt: "e4m Indian Digital Marketing Awards trophy for Performance Marketing Agency of the Year",
      label: "e4m Agency of the Year",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "IPMA 2024",
    title: "Digital Agency of the Year",
    href: "/awards",
    image: {
      src: "/images/about/awards/ipma-digital-agency.jpg",
      alt: "India Performance Marketing Awards 2024 Digital Agency of the Year trophy",
      label: "IPMA Digital Agency of the Year",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "IPMA 2024",
    title: "Best Use of Performance Marketing",
    href: "/awards",
    image: {
      src: "/images/about/awards/ipma-best-use.jpg",
      alt: "India Performance Marketing Awards 2024 Best Use of Performance Marketing trophy",
      label: "IPMA Best Use of Performance Marketing",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "Indian Digital Awards",
    title: "Gold Winner",
    href: "/awards",
    image: {
      src: "/images/about/awards/indian-digital-awards-gold.jpg",
      alt: "Indian Digital Awards 2024 Gold Winner trophy for Best Performance Marketing Campaign",
      label: "Indian Digital Awards Gold",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "Excellence in Performance",
    title: "Award 2024",
    href: "/awards",
    image: {
      src: "/images/about/awards/excellence-in-performance.jpg",
      alt: "Excellence in Performance Award 2024 shooting-star trophy",
      label: "Excellence in Performance",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "Excellence in Performance Marketing",
    title: "2024",
    href: "/awards",
    image: {
      src: "/images/about/awards/excellence-in-performance-marketing.jpg",
      alt: "Excellence in Performance Marketing 2024 star trophy",
      label: "Excellence in Performance Marketing",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "India PR Awards",
    title: "Best PR Campaign of the Year",
    href: "/awards",
    image: {
      src: "/images/about/awards/india-pr-awards.jpg",
      alt: "India PR Awards 2024 Best PR Campaign of the Year trophy",
      label: "India PR Awards",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
  {
    client: "Excellence Award",
    title: "Outstanding Performance",
    href: "/awards",
    image: {
      src: "/images/about/awards/excellence-award.jpg",
      alt: "Excellence Award presented to First Economy for outstanding performance",
      label: "Excellence Award",
      fit: "contain",
      grayscale: false,
    } satisfies MediaSlot,
  },
];

export const aboutLocations = [
  {
    slug: "mumbai",
    city: "Mumbai",
    isHq: true,
    description: "The financial capital of India.",
    image: {
      src: "/images/about/locations/mumbai.jpg",
      alt: "Gateway of India and the Taj Mahal Palace, Mumbai",
    },
  },
  {
    slug: "bengaluru",
    city: "Bengaluru",
    description: "The Silicon Valley of India.",
    image: {
      src: "/images/about/locations/bengaluru.jpg",
      alt: "Bengaluru skyline above tree canopy",
    },
  },
  {
    slug: "aurangabad",
    city: "Aurangabad",
    description: "Heritage city. Emerging tomorrow.",
    image: {
      src: "/images/about/locations/aurangabad.jpg",
      alt: "Historic monument and gardens in Aurangabad",
    },
  },
  {
    slug: "pune",
    city: "Pune",
    description: "A hub for innovation and education.",
    image: {
      src: "/images/about/locations/pune.jpg",
      alt: "Shaniwar Wada gateway in Pune",
    },
  },
];
