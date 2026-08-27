export type InsightPost = {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
};

export const insightPosts: InsightPost[] = [
  {
    slug: "future-of-performance-marketing-in-an-ai-powered-world",
    category: "AI & Data",
    title: "The Future of Performance Marketing in an AI-Powered World",
    date: "2026-05-12",
    readTime: "6 min read",
  },
  {
    slug: "why-influencer-marketing-needs-real-intelligence",
    category: "Media",
    title: "Why Influencer Marketing Needs Real Intelligence",
    date: "2026-05-08",
    readTime: "5 min read",
  },
  {
    slug: "retail-media-networks-the-next-growth-engine",
    category: "Social",
    title: "Retail Media Networks: The Next Growth Engine",
    date: "2026-05-05",
    readTime: "7 min read",
  },
];
