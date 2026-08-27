import type { Metadata } from "next";
import { Network as NetworkIcon, Sparkles } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import AdvantageToolsGrid from "@/components/home/AdvantageToolsGrid";
import { platformIcons } from "@/components/toolIcons";
import { dataTools, platformPartners } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Advantage",
  description: "The network, data stack, platform partnerships and in-house intelligence behind every First Economy engagement.",
};

export default function OurAdvantagePage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-20 md:pt-28">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-red">Our Advantage</p>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
            What gives us an operating advantage.
          </h1>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-content">
          <NetworkIcon size={32} className="mb-4 text-red" />
          <SectionHeading
            eyebrow="01 — Global network"
            title="A global independent network"
            description="Through our Local Planet network association, we connect to 62+ marketing agencies across 85+ markets, backed by $17.2B+ in network billings — giving clients global capability with local, on-the-ground execution."
          />
        </div>
      </section>

      <section className="border-b border-line bg-mist py-16">
        <div className="container-frame">
          <SectionHeading eyebrow="02 — Data & intelligence stack" title="Tools our teams work in every day" />
          <div className="mt-10 border border-line">
            <AdvantageToolsGrid tools={dataTools} />
          </div>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-frame">
          <SectionHeading eyebrow="03 — Platform ecosystem" title="Partnerships across the platforms that matter" />
          <div className="mt-10 flex flex-wrap gap-3">
            {platformPartners.map((platform) => {
              const Icon = platformIcons[platform] ?? NetworkIcon;
              return (
                <span
                  key={platform}
                  className="inline-flex items-center gap-2 border border-line px-5 py-3 text-sm font-medium"
                >
                  <Icon size={15} className="text-red" />
                  {platform}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink py-16 text-paper">
        <div className="container-content">
          <Sparkles size={32} className="mb-4 text-red" />
          <SectionHeading
            eyebrow="04 — In-house intelligence"
            title="Proprietary dashboards and AI-led analysis"
            description="Real-time reporting and custom systems built in-house, layered on top of the platform and tooling ecosystem, so decisions are made on live data rather than static reports."
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
