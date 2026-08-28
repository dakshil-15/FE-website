import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const awards = [
  {
    href: "/work/godrej-blue",
    src: "/assets/case-1.png",
    title: "Godrej Blue",
    sub: "Cannes Lions recognition · Kolkata launch",
  },
  {
    href: "/about#awards",
    src: "/assets/case-2.png",
    title: "Guinness World Record",
    sub: "1,000+ influencers activated live in one hour",
  },
];

export default function AwardsTeaser() {
  return (
    <section
      id="awards"
      className="bg-paper px-[var(--gutter)] py-12 sm:py-[72px] sm:pb-[84px]"
      aria-labelledby="awards-heading"
    >
      <div className="mx-auto max-w-[var(--content)]">
        <p className="text-eyebrow m-0">Awards &amp; recognition</p>
        <div className="mt-5 grid grid-cols-1 items-start gap-8 sm:mt-[22px] md:grid-cols-2 md:gap-[60px]">
          <h2 id="awards-heading" className="text-display-md m-0">
            Recognised for
            <br />
            ideas that deliver.
          </h2>
          <div className="pt-0 md:pt-1.5">
            <p className="text-body m-0 max-w-[400px] text-[#333]">
              225+ media awards across the network — including landmark recognition for work that moved markets.
            </p>
            <Link
              href="/about#awards"
              className="text-cta mt-5 inline-flex items-center gap-3.5 border-b border-ink pb-[9px] transition hover:border-red hover:text-red sm:mt-6"
            >
              All recognition
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-[18px] sm:mt-10 md:grid-cols-2">
          {awards.map((award) => (
            <Link
              key={award.title}
              href={award.href}
              className="work-card group relative block min-h-[240px] overflow-hidden border border-line bg-ink transition-[border-color] duration-200 hover:border-ink focus-visible:border-ink sm:min-h-[300px]"
              aria-label={`${award.title}: ${award.sub}`}
            >
              <Image
                src={award.src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-3 py-4 sm:px-5 sm:py-5">
                <div className="min-w-0">
                  <p className="font-display text-lg leading-[1.02] tracking-[0.005em] text-white uppercase sm:text-xl">
                    {award.title}
                  </p>
                  <p className="text-body-sm mt-2 text-[#d4d4d4] sm:mt-2.5">{award.sub}</p>
                </div>
                <span
                  className="grid h-8 w-8 flex-none place-items-center rounded-full border border-white/50 text-white transition group-hover:border-red group-hover:text-red"
                  aria-hidden
                >
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
