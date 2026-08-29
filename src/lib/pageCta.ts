/**
 * Routes that already render a page-end CTASection.
 * Footer hides its embedded CTA on these to avoid stacking two CTAs.
 */
const EXACT_PATHS = new Set([
  "/",
  "/work",
  "/services",
  "/about",
  "/careers",
  "/insights",
  "/awards",
  "/capabilities",
]);

export function pageHasEndCta(pathname: string): boolean {
  if (EXACT_PATHS.has(pathname)) return true;
  if (pathname.startsWith("/work/")) return true;
  if (pathname.startsWith("/insights/")) return true;
  // Service detail pages use CTASection; media-buying is a separate template without one.
  if (pathname.startsWith("/services/") && pathname !== "/services/media-buying") return true;
  return false;
}
