import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CareersTeaser() {
  return (
    <section
      id="careers"
      data-animate-section
      className="section-shell section-pad bg-mist"
      aria-labelledby="careers-heading"
    >
      <div className="section-inner">
        <p data-animate="fade-up" className="text-eyebrow m-0">
          Careers
        </p>
        <div className="section-intro">
          <h2 data-animate="fade-up" id="careers-heading" className="text-display-md m-0">
            Build your best work
            <br />
            with the best people.
          </h2>
          <div data-animate="fade-up" className="min-w-0 pt-0 md:pt-1">
            <p className="text-body section-copy section-copy-on-light m-0">
              250+ people across four cities, engineering growth systems for ambitious brands.
            </p>
            <Link href="/careers" className="text-cta link-cta text-ink">
              Explore careers
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
