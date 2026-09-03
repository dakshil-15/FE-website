import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconSlot } from "@/components/media/AssetPlaceholder";
import type { CapabilityCard } from "@/content/capabilities";

export default function CapabilitiesGrid({ cards }: { cards: CapabilityCard[] }) {
  return (
    <ul
      data-animate-stagger
      className="m-0 grid list-none grid-cols-1 gap-4 p-0 xs:grid-cols-2 xs:gap-5 lg:grid-cols-4 lg:gap-5 xl:gap-6"
    >
      {cards.map((card, index) => {
        const num = String(index + 1).padStart(2, "0");
        const titleId = `capability-card-${card.id}`;

        return (
          <li key={card.id} className="min-w-0">
            <Link
              href={card.href}
              aria-labelledby={titleId}
              className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-[20px] border border-[#e6e6e6] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-red/35 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] focus-visible:border-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:min-h-[248px] sm:rounded-[22px] sm:p-5 md:min-h-[268px] md:p-6"
            >
              <div className="relative flex items-start justify-between gap-3">
                <IconSlot
                  asset={card.icon}
                  size={80}
                  className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
                />
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
                  {card.title}
                </h3>
                <span className="mt-3 block h-[3px] w-8 rounded-full bg-red" aria-hidden />
                <p className="text-body-sm mt-3.5 mb-0 text-muted">{card.body}</p>
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
