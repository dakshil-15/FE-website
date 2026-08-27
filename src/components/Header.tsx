"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const primaryNav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Capabilities", href: "/our-advantage" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const titleId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;

    function getFocusable() {
      if (!panel) return [] as HTMLElement[];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }

      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      getFocusable()[0]?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      buttonRef.current?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-paper px-[var(--gutter)] py-3.5 sm:py-[18px]">
      <div className="mx-auto flex max-w-[var(--content)] items-center justify-between gap-3 sm:gap-[clamp(16px,2.5vw,40px)]">
        <Link href="/" className="flex min-w-0 flex-none items-center" aria-label="First Economy home">
          <Image
            src="/assets/fe_logo_black.svg"
            alt="First Economy — Your Growth Partner"
            width={143}
            height={46}
            priority
            unoptimized
            className="h-9 w-auto max-w-[min(143px,42vw)] sm:h-[46px] sm:max-w-none"
          />
        </Link>

        <nav
          className="text-nav hidden min-w-0 flex-1 items-center justify-center gap-[clamp(12px,1.9vw,32px)] overflow-x-auto whitespace-nowrap xl:flex"
          aria-label="Primary"
        >
          {primaryNav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-sm border-b pb-0.5 transition hover:text-red focus-visible:outline-offset-4 ${
                active ? "border-red text-ink" : "border-transparent"
              }`}
            >
              {item.label}
            </Link>
            );
          })}
        </nav>

        <div className="flex flex-none items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="text-cta hidden min-h-11 items-center gap-3.5 bg-ink px-4 py-3 pl-5 text-white transition hover:bg-red focus-visible:outline-offset-2 md:inline-flex lg:px-5 lg:py-3.5 lg:pl-6"
          >
            Let&rsquo;s talk
            <span className="grid h-7 w-7 place-items-center rounded-full border border-white/80" aria-hidden>
              <ArrowRight size={14} />
            </span>
          </Link>

          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            aria-haspopup="dialog"
            onClick={() => setOpen((v) => !v)}
            className="tap-target flex items-center justify-center text-ink transition hover:text-red xl:hidden"
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id={menuId}
          ref={panelRef}
          className="border-t border-black/5 bg-paper py-8 xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <p id={titleId} className="sr-only">
            Site navigation
          </p>
          <nav className="mx-auto flex max-w-[var(--content)] flex-col gap-5 sm:gap-6" aria-label="Mobile">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-[clamp(1.75rem,6vw,2.25rem)] uppercase text-ink transition hover:text-red focus-visible:outline-offset-4"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="text-cta mt-2 inline-flex min-h-12 w-fit items-center gap-3.5 bg-ink px-6 py-3 text-white"
            >
              Let&rsquo;s talk
              <ArrowRight size={14} aria-hidden />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
