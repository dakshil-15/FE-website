"use client";

import { useEffect } from "react";
import gsap from "gsap";

const BTN_SELECTOR = "a.text-cta, a.gsap-btn, button:not(:disabled), input[type='submit']:not(:disabled)";

function resolveButton(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest(BTN_SELECTOR);
  if (!(el instanceof HTMLElement)) return null;
  if (el.closest(".skip-link")) return null;
  return el;
}

function isSolidButton(el: HTMLElement) {
  if (el.matches("button, input[type='submit']")) return true;
  if (
    el.classList.contains("bg-ink") ||
    el.classList.contains("bg-red") ||
    el.classList.contains("bg-white") ||
    el.classList.contains("bg-paper")
  ) {
    return true;
  }
  // Bordered CTA chips (not text links)
  return el.classList.contains("gsap-btn") && /\bborder\b/.test(el.className);
}

function arrowTargets(el: HTMLElement) {
  const wraps = el.querySelectorAll(
    ":scope > span.grid, :scope > span[aria-hidden], :scope span.rounded-full",
  );
  if (wraps.length) return wraps;
  return el.querySelectorAll(":scope > svg");
}

/** Site-wide GSAP hover / press motion for CTAs and buttons. */
export default function ButtonMotion() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cleanups: Array<() => void> = [];

      const bind = (el: HTMLElement) => {
        if (el.dataset.gsapBtnBound === "1") return;
        el.dataset.gsapBtnBound = "1";
        el.classList.add("gsap-btn-ready");

        const solid = isSolidButton(el);
        const arrows = arrowTargets(el);

        const enter = () => {
          gsap.killTweensOf(el);
          if (solid) {
            gsap.to(el, {
              scale: 1.04,
              y: -2,
              duration: 0.35,
              ease: "power3.out",
              overwrite: "auto",
            });
          } else {
            gsap.to(el, {
              x: 2,
              duration: 0.35,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
          if (arrows.length) {
            gsap.to(arrows, {
              x: 5,
              duration: 0.35,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        };

        const leave = () => {
          gsap.killTweensOf([el, ...arrows]);
          gsap.to(el, {
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
          if (arrows.length) {
            gsap.to(arrows, {
              x: 0,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        };

        const down = () => {
          gsap.to(el, {
            scale: solid ? 0.97 : 1,
            y: solid ? 0 : 0,
            duration: 0.15,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const up = () => {
          if (el.matches(":hover, :focus-visible")) enter();
          else leave();
        };

        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointerleave", leave);
        el.addEventListener("focus", enter);
        el.addEventListener("blur", leave);
        el.addEventListener("pointerdown", down);
        el.addEventListener("pointerup", up);
        el.addEventListener("pointercancel", leave);

        cleanups.push(() => {
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointerleave", leave);
          el.removeEventListener("focus", enter);
          el.removeEventListener("blur", leave);
          el.removeEventListener("pointerdown", down);
          el.removeEventListener("pointerup", up);
          el.removeEventListener("pointercancel", leave);
          delete el.dataset.gsapBtnBound;
          el.classList.remove("gsap-btn-ready");
          gsap.set(el, { clearProps: "transform" });
          if (arrows.length) gsap.set(arrows, { clearProps: "transform" });
        });
      };

      const scan = () => {
        document.querySelectorAll<HTMLElement>(BTN_SELECTOR).forEach(bind);
      };

      scan();

      const observer = new MutationObserver(() => scan());
      observer.observe(document.body, { childList: true, subtree: true });

      // Event delegation for dynamically inserted nodes that scan might race
      const onPointerOver = (e: PointerEvent) => {
        const el = resolveButton(e.target);
        if (el) bind(el);
      };
      document.addEventListener("pointerover", onPointerOver);

      return () => {
        observer.disconnect();
        document.removeEventListener("pointerover", onPointerOver);
        cleanups.forEach((fn) => fn());
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
