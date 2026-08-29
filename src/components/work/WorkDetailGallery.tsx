"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import { ImageSlot } from "@/components/media/AssetPlaceholder";
import type { MediaSlot } from "@/content/about";

type WorkDetailGalleryProps = {
  items: MediaSlot[];
  title: string;
};

export default function WorkDetailGallery({ items, title }: WorkDetailGalleryProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const lightboxOpen = lightboxIndex !== null;
  const lightboxItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = useCallback((index: number) => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    requestAnimationFrame(() => lastFocusRef.current?.focus());
  }, []);

  const stepLightbox = useCallback(
    (dir: number) => {
      if (lightboxIndex === null || items.length === 0) return;
      const next = (lightboxIndex + dir + items.length) % items.length;
      setLightboxIndex(next);
    },
    [items.length, lightboxIndex],
  );

  useEffect(() => {
    if (!lightboxOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => closeBtnRef.current?.focus());

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepLightbox(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        stepLightbox(1);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeLightbox, lightboxOpen, stepLightbox]);

  if (items.length === 0) return null;

  const lightbox =
    mounted && lightboxOpen && lightboxItem
      ? createPortal(
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <button
              type="button"
              className="absolute inset-0 bg-ink/85 backdrop-blur-[2px]"
              aria-label="Close gallery viewer"
              onClick={closeLightbox}
            />

            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative z-[1] flex w-full max-w-[min(96vw,72rem)] flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-4 text-white">
                <p id={titleId} className="text-body-sm m-0 min-w-0 truncate text-white/80">
                  {lightboxItem.alt || lightboxItem.label || `${title} creative`}
                  <span className="text-white/45">
                    {" "}
                    · {lightboxIndex! + 1} / {items.length}
                  </span>
                </p>
                <button
                  ref={closeBtnRef}
                  type="button"
                  aria-label="Close gallery viewer"
                  onClick={closeLightbox}
                  className="tap-target grid size-11 flex-none place-items-center rounded-full border border-white/30 text-white transition hover:border-red hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <X size={20} aria-hidden />
                </button>
              </div>

              <div className="relative overflow-hidden border border-white/15 bg-ink">
                <div className="relative mx-auto aspect-[4/3] w-full max-h-[min(72vh,40rem)] sm:aspect-[16/10]">
                  {lightboxItem.src ? (
                    <Image
                      src={lightboxItem.src}
                      alt={lightboxItem.alt || lightboxItem.label || ""}
                      fill
                      sizes="96vw"
                      className="object-contain"
                      priority
                    />
                  ) : (
                    <div className="grid h-full place-items-center px-6 text-center text-white/60">
                      <span>{lightboxItem.label}</span>
                    </div>
                  )}
                </div>

                {items.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() => stepLightbox(-1)}
                      className="tap-target absolute top-1/2 left-3 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-ink/70 text-white backdrop-blur-sm transition hover:border-red hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-4"
                    >
                      <ArrowLeft size={18} aria-hidden />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() => stepLightbox(1)}
                      className="tap-target absolute top-1/2 right-3 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-ink/70 text-white backdrop-blur-sm transition hover:border-red hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4"
                    >
                      <ArrowRight size={18} aria-hidden />
                    </button>
                  </>
                ) : null}
              </div>

              {items.length > 1 ? (
                <div className="flex justify-center gap-1" role="group" aria-label="Lightbox slides">
                  <span className="sr-only" aria-live="polite" aria-atomic="true">
                    Image {lightboxIndex! + 1} of {items.length}
                  </span>
                  {items.map((item, i) => (
                    <button
                      key={`${item.src ?? item.label}-lb-${i}`}
                      type="button"
                      aria-label={`View image ${i + 1} of ${items.length}`}
                      aria-current={i === lightboxIndex ? "true" : undefined}
                      onClick={() => setLightboxIndex(i)}
                      className="tap-target-sm grid place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition ${
                          i === lightboxIndex ? "w-6 bg-red" : "w-1.5 bg-white/35"
                        }`}
                        aria-hidden
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <HorizontalCarousel
        itemCount={items.length}
        ariaLabel={`${title} creative gallery`}
        slidesGroupLabel="Gallery slides"
        liveRegion={(active, count) => `Showing slide ${active + 1} of ${count}`}
        getSlideLabel={(index) => `slide ${index + 1} of ${items.length}`}
        controls="light"
        dotsClassName="mt-5 flex justify-center gap-1"
        prevLabel="Previous creative"
        nextLabel="Next creative"
      >
        {items.map((item, i) => (
          <button
            key={`${item.src ?? item.label}-${i}`}
            type="button"
            onClick={() => openLightbox(i)}
            className="group relative m-0 min-w-0 cursor-zoom-in overflow-hidden border border-line bg-mist text-left transition hover:border-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            aria-label={`Open ${item.alt || item.label || `creative ${i + 1}`}`}
          >
            <ImageSlot
              asset={{ ...item, fit: item.fit ?? "contain" }}
              className="aspect-[4/3] w-full border-0 bg-[#f3f3f3] transition duration-500 group-hover:[&_img]:scale-[1.02]"
              sizes="(max-width: 640px) 86vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            <span
              className="pointer-events-none absolute right-3 bottom-3 grid size-9 place-items-center rounded-full border border-white/80 bg-ink/55 text-white opacity-100 backdrop-blur-[2px] transition duration-200 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
              aria-hidden
            >
              <Expand size={15} strokeWidth={2.25} />
            </span>
          </button>
        ))}
      </HorizontalCarousel>

      {lightbox}
    </>
  );
}
