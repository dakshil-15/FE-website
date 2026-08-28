import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const nodes = [
  {
    label: "Media",
    description: "Integrated buying across search, social, programmatic and OOH.",
    icon: "/assets/ic-media.png",
    href: "/services/media-buying",
  },
  {
    label: "Creative",
    description: "Campaign and performance creative across every format.",
    icon: "/assets/ic-creative.png",
    href: "/services/creative",
  },
  {
    label: "Technology",
    description: "Platforms, ERPs and systems built for scale and compliance.",
    icon: "/assets/ic-tech.png",
    href: "/services/technology",
  },
  {
    label: "AI",
    description: "Intelligence applied to creative, analytics and operations.",
    icon: "/assets/ic-ai.png",
    href: "/services/ai-solutions",
  },
  {
    label: "Data",
    description: "Audience, platform and performance data in one operating layer.",
    icon: "/assets/ic-ai-analytics.png",
    href: "/capabilities#data-analytics",
  },
  {
    label: "Analytics",
    description: "Live reporting and decision support built into the system.",
    icon: "/assets/ic-ai-optimization.png",
    href: "/capabilities#data-analytics",
  },
];

export default function GrowthSystemSection() {
  return (
    <section
      id="growth-system"
      className="bg-paper px-[var(--gutter)] py-12 sm:py-[72px] sm:pb-[84px]"
      aria-labelledby="growth-heading"
    >
      <div className="mx-auto max-w-[var(--content)]">
        <p className="text-eyebrow m-0">The Growth System</p>
        <div className="mt-5 grid grid-cols-1 items-start gap-8 sm:mt-[22px] md:grid-cols-2 md:gap-[60px]">
          <h2 id="growth-heading" className="text-display-lg m-0">
            One system.
            <br />
            Infinite possibilities.
          </h2>
          <div className="pt-0 md:pt-1.5">
            <p className="text-body m-0 max-w-[400px] text-[#333]">
              Media, creative, technology, AI, data and analytics designed to work as one connected growth system.
            </p>
            <Link
              href="/about"
              className="text-cta mt-5 inline-flex items-center gap-3.5 border-b border-ink pb-[9px] transition hover:border-red hover:text-red sm:mt-6"
            >
              How we work
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>

        <ul className="mt-11 grid list-none grid-cols-1 gap-2.5 p-0 xs:grid-cols-2 lg:grid-cols-3">
          {nodes.map((node) => (
            <li key={node.label} className="min-w-0">
              <Link
                href={node.href}
                className="cap-card group relative flex min-h-[158px] flex-col justify-between border border-line bg-white p-4 transition-[border-color] duration-200 hover:border-ink focus-visible:border-ink sm:p-5"
              >
                <Image
                  src={node.icon}
                  alt=""
                  aria-hidden
                  width={40}
                  height={40}
                  className="block h-9 w-9 object-contain object-left sm:h-10 sm:w-10"
                />
                <div className="mt-5 flex items-end justify-between gap-2.5 sm:mt-6">
                  <div className="min-w-0">
                    <span className="font-display text-sm leading-[1.12] font-bold tracking-[0.01em] uppercase sm:text-[15px]">
                      {node.label}
                    </span>
                    <p className="text-body-sm mt-2 mb-0 text-[#4a4a4a]">{node.description}</p>
                  </div>
                  <span
                    className="grid h-8 w-8 flex-none place-items-center rounded-full border border-red text-red transition group-hover:bg-red group-hover:text-white"
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
