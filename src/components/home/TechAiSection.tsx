import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    title: "AI for Creatives",
    description: "AI-powered scripting, storyboarding, visuals, voiceovers and more to create scroll-stopping content.",
    icon: "/assets/ic-ai-creatives.png",
  },
  {
    title: "AI-Powered Analytics",
    description: "Custom AI-enabled dashboards that turn data into real-time insights and better decisions.",
    icon: "/assets/ic-ai-analytics.png",
  },
  {
    title: "AI for Optimization",
    description: "Predictive models and automated optimization that maximize performance across every channel.",
    icon: "/assets/ic-ai-optimization.png",
  },
];

export default function TechAiSection() {
  return (
    <section
      className="relative overflow-hidden bg-paper px-[var(--gutter)] py-12 sm:py-[74px] sm:pb-[84px]"
      aria-labelledby="tech-ai-heading"
    >
      <Image
        src="/assets/burst-corner.png"
        alt=""
        aria-hidden
        width={420}
        height={420}
        className="pointer-events-none absolute top-[-6%] right-[-6%] hidden w-[min(420px,40%)] sm:block"
      />
      <div className="relative mx-auto max-w-[var(--content)]">
        <p className="text-eyebrow m-0">Technology &amp; AI</p>
        <div className="mt-5 grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-[60px]">
          <h2 id="tech-ai-heading" className="text-display-md m-0">
            Built for today.
            <br />
            Engineered for tomorrow.
          </h2>
          <p className="text-body mt-0 max-w-[420px] text-[#333] md:mt-1.5">
            From powerful technology solutions to AI-driven creatives and analytics, we build what drives smarter
            decision-making and bigger outcomes.
          </p>
        </div>

        <div className="ai3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="grid grid-cols-1 gap-4 border border-line bg-white px-5 py-6 transition-[border-color] duration-200 hover:border-ink sm:grid-cols-[auto_1fr] sm:gap-6 sm:px-7 sm:py-8"
            >
              <Image
                src={pillar.icon}
                alt=""
                aria-hidden
                width={128}
                height={128}
                quality={100}
                className="block h-14 w-14 object-contain object-left sm:h-[72px] sm:w-[72px]"
              />
              <div className="flex h-full min-w-0 flex-col">
                <h3 className="m-0 font-display text-[15px] font-bold tracking-[0.04em] uppercase sm:text-base">
                  {pillar.title}
                </h3>
                <p className="text-body-sm mt-3 text-[#4a4a4a]">{pillar.description}</p>
                <Link
                  href="/services/ai-solutions"
                  className="text-cta mt-auto inline-flex items-center gap-3.5 self-start border-b border-ink pt-[18px] pb-[7px] transition hover:text-red sm:pt-[22px]"
                >
                  Learn more
                  <span className="sr-only"> about {pillar.title}</span>
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
