import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceOfferingIconBySlug } from "@/components/serviceOfferingIcons";
import { servicesLandingCards } from "@/content/servicesPage";

export default function ServicesLandingGrid() {
  return (
    <ul
      data-animate-stagger
      className="m-0 grid list-none grid-cols-1 gap-4 p-0 xs:grid-cols-2 xs:gap-5 lg:grid-cols-4 lg:gap-5 xl:gap-6"
    >
      {servicesLandingCards.map((service, index) => {
        const num = String(index + 1).padStart(2, "0");
        const titleId = `service-card-${service.slug}`;
        const Icon = serviceOfferingIconBySlug[service.slug];

        return (
          <li key={service.slug} className="min-w-0">
            <Link
              href={service.href}
              aria-labelledby={titleId}
              className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-[20px] border border-[#e6e6e6] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-red/35 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] focus-visible:border-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:min-h-[248px] sm:rounded-[22px] sm:p-5 md:min-h-[268px] md:p-6"
            >
              <div className="relative flex items-start justify-between gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-red text-white shadow-[0_8px_20px_rgba(210,37,37,0.3)] sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[4.75rem] lg:w-[4.75rem]">
                  {Icon ? (
                    <Icon
                      size={36}
                      aria-hidden
                      className="h-7 w-7 text-white sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10"
                    />
                  ) : null}
                </span>
                <span
                  className="font-display text-[2.5rem] leading-none font-light tracking-tight text-[#e4e4e4] select-none sm:text-[2.75rem]"
                  aria-hidden
                >
                  {num}
                </span>
              </div>

              <div className="relative mt-5 flex flex-1 flex-col sm:mt-6">
                <h3
                  id={titleId}
                  className="m-0 w-full font-display text-[1.05rem] leading-[1.2] font-bold tracking-[0.02em] text-ink uppercase sm:text-[1.125rem]"
                >
                  {service.title}
                </h3>
                <span className="mt-3 block h-[3px] w-8 rounded-full bg-red" aria-hidden />
                <p className="text-body-sm mt-3.5 mb-0 text-muted">{service.body}</p>
              </div>

              <div className="relative mt-5 flex min-h-11 items-center justify-between gap-3 sm:mt-6">
                <span className="text-cta text-ink transition group-hover:text-red">Learn More</span>
                <span
                  className="grid h-11 w-11 flex-none place-items-center rounded-full border border-red bg-white text-red transition duration-200 group-hover:bg-red group-hover:text-white"
                  aria-hidden
                >
                  <ArrowRight size={15} strokeWidth={2.25} />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
