import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { aboutLocations } from "@/content/about";

export default function LocationsSection() {
  return (
    <section
      id="locations"
      data-animate-section
      className="section-shell section-pad bg-paper"
      aria-labelledby="locations-heading"
    >
      <div className="section-inner grid grid-cols-1 items-start gap-7 sm:gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.8fr)] lg:gap-10">
        <div data-animate="fade-up" className="min-w-0 lg:pt-1">
          <p className="text-eyebrow m-0">Our locations</p>
          <h2 id="locations-heading" className="text-display-md mt-4 mb-0 sm:mt-5">
            Where we build
            <br />
            what&rsquo;s next.
          </h2>
          <p className="text-body section-copy section-copy-on-light mt-4 mb-0 sm:mt-5">
            Strategic hubs. Local expertise. Global mindset.
          </p>
          <Link href="/contact" className="text-cta link-cta text-ink">
            View all locations
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <ul
          data-animate-stagger
          className="m-0 grid list-none grid-cols-1 gap-3 p-0 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
        >
          {aboutLocations.map((office) => (
            <li key={office.slug} className="min-w-0">
              <Link
                href={`/locations/${office.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow] duration-200 hover:border-ink focus-visible:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
                  <span
                    className="absolute top-3 left-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-red bg-white text-red sm:top-3.5 sm:left-3.5 sm:h-9 sm:w-9"
                    aria-hidden
                  >
                    <MapPin size={15} fill="currentColor" strokeWidth={0} />
                  </span>
                  <Image
                    src={office.image.src}
                    alt={office.image.alt}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 1024px) 45vw, (max-width: 1280px) 22vw, 280px"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex items-end justify-between gap-3 border-t border-line px-3.5 py-3.5 sm:px-4 sm:py-4 lg:px-5 lg:py-[18px]">
                  <div className="min-w-0 text-left">
                    <p className="m-0 font-display text-sm leading-[1.1] font-bold tracking-[0.04em] uppercase sm:text-[15px]">
                      {office.city}
                    </p>
                    <p className="text-body-sm mt-1.5 mb-0 text-muted">{office.description}</p>
                  </div>
                  <span
                    className="grid h-9 w-9 flex-none place-items-center rounded-full border border-line text-ink transition-[border-color,color,background-color] duration-200 group-hover:border-red group-hover:bg-red group-hover:text-white sm:h-10 sm:w-10"
                    aria-hidden
                  >
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
