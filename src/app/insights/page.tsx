import type { Metadata } from "next";
import {
  Film,
  ChartColumn,
  Sparkles,
  Search,
  MessagesSquare,
  Globe,
  Cpu,
  Users,
  Palette,
  Radar,
  ChartPie,
  type LucideIcon,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import InsightsTeaser from "@/components/home/InsightsTeaser";
import { insightPosts } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description: "Perspectives on media, performance marketing, AI, SEO, AEO, GEO, technology, social and consumer intelligence.",
};

const categories: { label: string; icon: LucideIcon }[] = [
  { label: "Media", icon: Film },
  { label: "Performance Marketing", icon: ChartColumn },
  { label: "AI", icon: Sparkles },
  { label: "SEO", icon: Search },
  { label: "AEO", icon: MessagesSquare },
  { label: "GEO", icon: Globe },
  { label: "Technology", icon: Cpu },
  { label: "Social", icon: MessagesSquare },
  { label: "Influencer", icon: Users },
  { label: "Brand", icon: Palette },
  { label: "Consumer Intelligence", icon: Radar },
  { label: "Analytics", icon: ChartPie },
];

export default function InsightsPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-20 md:pt-28">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-red">Insights</p>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
            Perspectives on growth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            A first look at what we&rsquo;re publishing, with more articles in production across the categories
            below.
          </p>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-frame">
          <InsightsTeaser posts={insightPosts} />
        </div>
      </section>

      <section className="py-16">
        <div className="container-frame">
          <SectionHeading eyebrow="Categories" title="What we'll be covering" />
          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category.label}
                className="inline-flex items-center gap-2 border border-line px-5 py-3 text-sm font-medium"
              >
                <category.icon size={15} className="text-red" />
                {category.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
