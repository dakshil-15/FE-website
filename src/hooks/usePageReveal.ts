"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import {
  animateStoryTimeline,
  gsap,
  refreshScrollTriggers,
  resetReducedMotion,
  runHeroTimeline,
  runSectionReveals,
} from "@/lib/gsap/pageReveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type PageRevealContext = {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  reduceMotion: boolean;
  animateStoryTimeline: (wrapSelector: string) => void;
};

type UsePageRevealOptions = {
  scope: RefObject<HTMLElement | null>;
  dependencies?: unknown[];
  hero?: boolean;
  sections?: boolean;
  sectionStart?: string;
  reducedMotionSelectors?: string[];
  onReveal?: (context: PageRevealContext) => void;
};

export function usePageReveal({
  scope,
  dependencies = [],
  hero = true,
  sections = true,
  sectionStart,
  reducedMotionSelectors = [],
  onReveal,
}: UsePageRevealOptions) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          canAnimate: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {};

          if (reduceMotion) {
            resetReducedMotion(reducedMotionSelectors);
            return;
          }

          if (hero) {
            runHeroTimeline();
          }

          if (sections) {
            runSectionReveals({ start: sectionStart });
          }

          onReveal?.({
            gsap,
            ScrollTrigger,
            reduceMotion: false,
            animateStoryTimeline,
          });

          refreshScrollTriggers();
        },
      );

      return () => mm.revert();
    },
    { scope, dependencies },
  );
}
