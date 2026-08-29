import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

type RouteStatusProps = {
  eyebrow: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  onPrimaryClick?: () => void;
  headingId?: string;
};

export default function RouteStatus({
  eyebrow,
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  onPrimaryClick,
  headingId = "route-status-heading",
}: RouteStatusProps) {
  const primaryClassName =
    "text-cta tap-target inline-flex min-h-12 w-full max-w-full items-center justify-center gap-3 bg-red px-5 py-3.5 pl-6 text-white transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-auto sm:justify-start";

  return (
    <section
      className="section-shell section-pad bg-paper"
      aria-labelledby={headingId}
    >
      <div className="section-inner max-w-2xl">
        <p className="text-eyebrow m-0 text-red">{eyebrow}</p>
        <h1 id={headingId} className="text-display-md mt-4 m-0 text-balance">
          {title}
        </h1>
        <p className="text-body mt-5 m-0 max-w-lg text-muted">{body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {onPrimaryClick ? (
            <button type="button" onClick={onPrimaryClick} className={primaryClassName}>
              {primaryLabel}
              <ArrowRightCircle size={28} strokeWidth={1.5} className="shrink-0 sm:size-8" aria-hidden />
            </button>
          ) : (
            <Link href={primaryHref} className={primaryClassName}>
              {primaryLabel}
              <ArrowRightCircle size={28} strokeWidth={1.5} className="shrink-0 sm:size-8" aria-hidden />
            </Link>
          )}
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="text-cta tap-target inline-flex min-h-12 w-full items-center justify-center border border-ink/25 px-5 py-3.5 text-ink transition hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-auto"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
