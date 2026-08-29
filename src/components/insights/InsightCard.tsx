import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import type { InsightPost } from "@/content/insights";
import { getInsightDisplayCategories, getInsightHref, formatInsightDate } from "@/lib/insights";

export default function InsightCard({ post }: { post: InsightPost }) {
  const href = post.href ?? getInsightHref(post.slug);
  const tags = getInsightDisplayCategories(post);
  const titleId = `insight-title-${post.slug}`;
  const thumbnail = post.thumbnail ?? {
    alt: post.title,
    label: `${post.title} thumbnail`,
    grayscale: true,
  };

  return (
    <article className="h-full">
      <Link
        href={href}
        aria-labelledby={titleId}
        className="insight-card group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white text-ink shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow] duration-200 hover:border-red/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:rounded-[22px]"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-mist">
          {thumbnail.src ? (
            <Image
              src={thumbnail.src}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 42vw, 33vw"
              className={`object-cover object-center ${thumbnail.grayscale ? "grayscale" : ""}`}
            />
          ) : (
            <ImageSlot
              asset={thumbnail}
              className="aspect-[16/10] w-full"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 42vw, 33vw"
            />
          )}
          <span
            className="absolute top-0 right-4 z-10 flex h-11 w-8 items-start justify-center bg-red pt-2.5 text-white shadow-[0_4px_10px_rgba(210,37,37,0.35)]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)",
            }}
            aria-hidden
          >
            <Bookmark size={15} strokeWidth={2.25} fill="currentColor" />
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-6">
          <p className="m-0 font-display text-[12px] font-bold tracking-[0.14em] text-red uppercase">
            {tags.join(" • ")}
          </p>
          <h3
            id={titleId}
            className="mt-3 mb-0 line-clamp-3 min-h-[3.6em] font-display text-[1.05rem] leading-[1.2] font-bold tracking-[0.01em] text-ink sm:text-[1.125rem]"
          >
            {post.title}
          </h3>
          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            <p className="m-0 text-[13px] leading-snug text-muted">
              <time dateTime={post.date}>{formatInsightDate(post.date)}</time>
              <span className="mx-1.5 text-muted" aria-hidden>
                •
              </span>
              <span>{post.readTime}</span>
            </p>
            <span
              className="grid h-9 w-9 flex-none place-items-center rounded-full border-[1.5px] border-[#e8a0a0] text-ink transition-[border-color,background-color,color] duration-200 group-hover:border-red group-hover:bg-red group-hover:text-white"
              aria-hidden
            >
              <ArrowRight size={15} strokeWidth={2.25} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
