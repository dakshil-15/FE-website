"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bookmark } from "lucide-react";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import { homeFeaturedInsightPosts } from "@/content/insights";
import {
  formatInsightDate,
  getInsightDisplayCategories,
  getInsightHref,
} from "@/lib/insights";

const featuredPosts = homeFeaturedInsightPosts();

export default function InsightsSection() {
  return (
    <section
      id="insights"
      data-animate-section
      className="section-shell section-pad bg-ink text-white"
      aria-labelledby="insights-heading"
    >
      <div className="section-inner">
        <p data-animate="fade-up" className="text-eyebrow m-0">
          Intelligence
        </p>
        <div className="section-intro">
          <h2 data-animate="fade-up" id="insights-heading" className="text-display-md m-0">
            Intelligence that
            <br />
            drives growth.
          </h2>
          <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
            <p className="text-body section-copy section-copy-on-dark m-0">
              Perspectives on media, strategy, performance and technology — the systems that turn attention into
              outcomes.
            </p>
            <Link href="/insights" className="text-cta link-cta text-white">
              All insights
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>

        <div data-animate="fade-up" className="section-media w-full">
          <HorizontalCarousel
            itemCount={featuredPosts.length}
            ariaLabel="Featured insights"
            slidesGroupLabel="Insight slides"
            getSlideLabel={(index) => featuredPosts[index]?.title ?? ""}
            controls="dark-inset"
            arrowIconSize={17}
            prevLabel="Previous insight"
            nextLabel="Next insight"
          >
            {featuredPosts.map((post) => {
              const href = post.href ?? getInsightHref(post.slug);
              const categoryLabel = getInsightDisplayCategories(post)[0] ?? post.category;
              const thumbnail = post.thumbnail ?? {
                alt: post.title,
                label: `${post.title} thumbnail`,
              };
              const formattedDate = formatInsightDate(post.date);

              return (
                <Link
                  key={post.slug}
                  href={href}
                  className="group flex h-full min-h-[340px] flex-col overflow-hidden rounded-[20px] border border-white/15 bg-white text-ink shadow-[0_14px_44px_rgba(0,0,0,0.45)] transition duration-200 hover:border-red/50 hover:shadow-[0_18px_48px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:min-h-[360px] sm:rounded-[22px] lg:min-h-[380px]"
                  aria-label={`${post.title}. ${formattedDate}. ${post.readTime}`}
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-mist">
                    {thumbnail.src ? (
                      <Image
                        src={thumbnail.src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 82vw, (max-width: 900px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <ImageSlot
                        asset={thumbnail}
                        className="aspect-[16/10] w-full border-0 bg-mist"
                        sizes="(max-width: 640px) 82vw, (max-width: 900px) 50vw, (max-width: 1280px) 33vw, 25vw"
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
                      {categoryLabel}
                    </p>
                    <p className="mt-3 mb-0 line-clamp-3 min-h-[3.6em] font-display text-[1.05rem] leading-[1.2] font-bold tracking-[0.01em] text-ink sm:text-[1.125rem]">
                      {post.title}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <p className="m-0 text-[13px] leading-snug text-muted">
                        <time dateTime={post.date}>{formattedDate}</time>
                        <span className="mx-1.5 text-[#8a8a8a]" aria-hidden>
                          •
                        </span>
                        {post.readTime}
                      </p>
                      <span
                        className="grid h-9 w-9 flex-none place-items-center rounded-full border-[1.5px] border-[#e8a0a0] text-ink transition duration-200 group-hover:border-red group-hover:bg-red group-hover:text-white"
                        aria-hidden
                      >
                        <ArrowRight size={15} strokeWidth={2.25} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </HorizontalCarousel>
        </div>
      </div>
    </section>
  );
}
