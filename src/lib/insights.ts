import {
  insightArticles,
  insightPosts,
  insightsFeaturedCard,
  type InsightArticle,
  type InsightDetailSectionId,
  type InsightDetailTab,
  type InsightFilterKey,
  type InsightPost,
} from "@/content/insights";

export type { InsightArticle, InsightDetailSectionId, InsightDetailTab, InsightFilterKey, InsightPost };

export const INSIGHTS_PAGE_SIZE = 6;

export function getInsightHref(slug: string): string {
  return `/insights/${slug}`;
}

export function normalizeInsightPost(post: InsightPost): InsightPost {
  return {
    ...post,
    href: post.href ?? getInsightHref(post.slug),
  };
}

const TAB_DEFINITIONS: {
  id: InsightDetailSectionId;
  label: string;
  hasContent: (article: InsightArticle) => boolean;
}[] = [
  { id: "overview", label: "Overview", hasContent: (article) => Boolean(article.overview) },
  { id: "opportunity", label: "The Opportunity", hasContent: (article) => article.opportunity.items.length > 0 },
  {
    id: "perspective",
    label: "Our Perspective",
    hasContent: (article) => article.perspective.items.length > 0,
  },
  { id: "pillars", label: "Key Pillars", hasContent: (article) => article.pillars.length > 0 },
  { id: "examples", label: "Real-World Examples", hasContent: (article) => article.examples.items.length > 0 },
  { id: "impact", label: "Impact", hasContent: (article) => article.impact.stats.length > 0 },
  { id: "whats-next", label: "What's Next", hasContent: (article) => Boolean(article.whatsNext?.trim()) },
];

export function getInsightDetailTabs(article: InsightArticle): InsightDetailTab[] {
  return TAB_DEFINITIONS.filter((tab) => tab.hasContent(article)).map(({ id, label }) => ({
    id,
    label,
  }));
}

export async function getInsightPosts(): Promise<InsightPost[]> {
  return insightPosts.map(normalizeInsightPost);
}

export async function getInsightBySlug(slug: string): Promise<InsightArticle | null> {
  return insightArticles[slug] ?? null;
}

export async function getRelatedInsights(slug: string, limit = 3): Promise<InsightPost[]> {
  const current = insightArticles[slug];
  if (!current) return insightPosts.filter((post) => post.slug !== slug).slice(0, limit).map(normalizeInsightPost);

  const sameCategory = insightPosts.filter(
    (post) => post.slug !== slug && post.category === current.category,
  );
  const others = insightPosts.filter(
    (post) => post.slug !== slug && post.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit).map(normalizeInsightPost);
}

export function getFeaturedInsight(currentSlug: string): InsightPost | null {
  if (insightsFeaturedCard.slug !== currentSlug) {
    const featured = insightPosts.find((post) => post.slug === insightsFeaturedCard.slug);
    if (featured) return normalizeInsightPost(featured);
  }

  const candidate = insightPosts.find((post) => post.slug !== currentSlug);
  return candidate ? normalizeInsightPost(candidate) : null;
}

export function getFeaturedListingInsight(): InsightPost {
  const featured = insightPosts.find((post) => post.featured);
  return normalizeInsightPost(featured ?? insightPosts[0]);
}

export function getInsightFilterKey(post: InsightPost): InsightFilterKey {
  if (post.filterKey && post.filterKey !== "all") return post.filterKey;

  const normalized = post.category.toLowerCase();
  if (normalized.includes("trend")) return "trends";
  if (normalized.includes("perspective")) return "perspectives";
  if (normalized.includes("case")) return "case-studies";
  if (normalized.includes("tech")) return "technology";
  if (normalized.includes("media")) return "media";
  if (normalized.includes("creative")) return "creative";
  return "perspectives";
}

export function getInsightDisplayCategories(post: InsightPost): string[] {
  if (post.categories?.length) return post.categories;
  return [post.category];
}

export function getInsightExcerpt(post: InsightPost): string {
  if (post.excerpt) return post.excerpt;
  const article = insightArticles[post.slug];
  return article?.excerpt ?? "A perspective from the First Economy team on what's changing — and what it means for brands building for growth.";
}

export function matchesInsightFilter(post: InsightPost, filter: InsightFilterKey): boolean {
  if (filter === "all") return true;
  return getInsightFilterKey(post) === filter;
}

export function matchesInsightSearch(post: InsightPost, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [
    post.title,
    post.category,
    ...(post.categories ?? []),
    getInsightExcerpt(post),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}

export function paginateInsights<T>(items: T[], page: number, pageSize = INSIGHTS_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    totalItems: items.length,
  };
}

export function getFeaturedInsightCardHref(): string {
  return getInsightHref(insightsFeaturedCard.slug);
}

export function getInsightCategoryCounts(): Record<Exclude<InsightFilterKey, "all">, number> {
  const counts: Record<Exclude<InsightFilterKey, "all">, number> = {
    trends: 0,
    perspectives: 0,
    "case-studies": 0,
    technology: 0,
    media: 0,
    creative: 0,
  };

  for (const post of insightPosts) {
    const key = getInsightFilterKey(post);
    if (key !== "all") counts[key]++;
  }

  return counts;
}

export function getInsightFilterLabel(filter: InsightFilterKey): string {
  if (filter === "all") return "All insights";
  return filter
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
