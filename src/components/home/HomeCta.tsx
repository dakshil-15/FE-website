import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeCta() {
  return (
    <section className="bg-ink px-[var(--gutter)] py-16 text-white sm:py-[88px]" aria-labelledby="home-cta-heading">
      <div className="mx-auto flex max-w-[var(--content)] flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
        <div className="min-w-0">
          <p className="text-eyebrow m-0">Start a project</p>
          <h2 id="home-cta-heading" className="text-display-lg mt-5 mb-0 text-balance">
            What are you
            <br />
            trying to <span className="text-red">grow?</span>
          </h2>
        </div>
        <Link
          href="/contact"
          className="text-cta inline-flex items-center gap-3.5 bg-red px-4 py-[15px] pl-[26px] text-white transition hover:bg-white hover:text-ink"
        >
          Let&rsquo;s talk
          <span className="grid h-[30px] w-[30px] place-items-center rounded-full border border-current" aria-hidden>
            <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </section>
  );
}
