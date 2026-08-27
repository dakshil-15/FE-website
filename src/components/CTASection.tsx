import Link from "next/link";

export default function CTASection({
  headline = "What are you trying to grow?",
  primaryLabel = "Start a Project",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: {
  headline?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="border-t border-line bg-ink py-24 text-paper">
      <div className="container-content flex flex-col items-center gap-8 text-center">
        <h2 className="font-display text-4xl leading-tight tracking-wide md:text-6xl">{headline}</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="gsap-btn inline-flex items-center border border-paper bg-red px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-paper hover:text-ink"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="gsap-btn inline-flex items-center border border-paper/40 px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-paper"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
