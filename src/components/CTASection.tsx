import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

type CTASectionProps = {
  /** Full headline when titleBefore/titleAccent aren't used */
  headline?: string;
  titleBefore?: string;
  titleAccent?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  headingId?: string;
};

export default function CTASection({
  headline = "What are you trying to grow?",
  titleBefore,
  titleAccent,
  body,
  primaryLabel = "Start a Project",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  headingId = "page-cta-heading",
}: CTASectionProps) {
  const hasSplitTitle = Boolean(titleBefore?.trim() || titleAccent?.trim());
  const hasSecondary = Boolean(secondaryLabel && secondaryHref);

  return (
    <section
      className="section-shell section-pad bg-ink text-white"
      aria-labelledby={headingId}
    >
      <div
        className={`section-inner grid grid-cols-1 items-start gap-8 sm:gap-10 ${
          body
            ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16"
            : "lg:grid-cols-[minmax(0,1.15fr)_auto] lg:items-center lg:gap-12"
        }`}
      >
        <h2 id={headingId} className="text-display-md m-0 min-w-0 text-balance">
          {hasSplitTitle ? (
            <>
              {titleBefore}{" "}
              {titleAccent ? <span className="text-eyebrow-on-dark">{titleAccent}</span> : null}
            </>
          ) : (
            headline
          )}
        </h2>

        <div className="min-w-0">
          {body ? <p className="text-body m-0 max-w-md text-muted-on-dark">{body}</p> : null}
          <div
            className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${
              body ? "mt-6 sm:mt-7" : ""
            }`}
          >
            <Link
              href={primaryHref}
              className="text-cta tap-target inline-flex min-h-12 w-full max-w-full items-center justify-center gap-3 bg-red px-5 py-3.5 pl-6 text-white transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:justify-start sm:gap-4 sm:py-4 sm:pl-7"
            >
              {primaryLabel}
              <ArrowRightCircle size={28} strokeWidth={1.5} className="shrink-0 sm:size-8" aria-hidden />
            </Link>
            {hasSecondary ? (
              <Link
                href={secondaryHref!}
                className="text-cta tap-target inline-flex min-h-12 w-full items-center justify-center border border-white/40 px-5 py-3.5 text-white transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
