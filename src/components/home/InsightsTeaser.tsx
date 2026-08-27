import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Film, MessagesSquare, type LucideIcon } from "lucide-react";
import type { InsightPost } from "@/content/insights";

const categoryIcons: Record<string, LucideIcon> = {
  "AI & Data": Sparkles,
  Media: Film,
  Social: MessagesSquare,
};

const postPhotos: Record<string, string> = {
  "future-of-performance-marketing-in-an-ai-powered-world": "/images/insights/ai-data.png",
  "why-influencer-marketing-needs-real-intelligence": "/images/insights/media-intelligence.png",
  "retail-media-networks-the-next-growth-engine": "/images/insights/retail-media.png",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function InsightsTeaser({ posts }: { posts: InsightPost[] }) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-[18px] p-0 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => {
        const Icon = categoryIcons[post.category] ?? Sparkles;
        const photo = postPhotos[post.slug];
        return (
          <li key={post.slug} className="min-w-0">
            <Link
              href="/insights"
              className="group flex h-full flex-col overflow-hidden border border-line bg-white transition-[border-color] duration-200 hover:border-ink focus-visible:border-ink"
              aria-label={`${post.title}. ${formatDate(post.date)}. ${post.readTime}`}
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-mist">
                {photo ? (
                  <Image
                    src={photo}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                <p className="m-0 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.16em] text-red uppercase">
                  <Icon size={11} aria-hidden />
                  {post.category}
                </p>
                <p className="m-0 font-display text-[15px] leading-[1.15] tracking-[0.005em] uppercase sm:text-base">
                  {post.title}
                </p>
                <div className="mt-auto flex items-end justify-between gap-3 pt-2">
                  <p className="text-body-sm m-0 text-[#4a4a4a]">
                    {formatDate(post.date)}
                    <span className="mx-1.5 text-ink/25" aria-hidden>
                      ·
                    </span>
                    {post.readTime}
                  </p>
                  <span
                    className="grid h-8 w-8 flex-none place-items-center rounded-full border border-red text-red transition group-hover:bg-red group-hover:text-white"
                    aria-hidden
                  >
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
