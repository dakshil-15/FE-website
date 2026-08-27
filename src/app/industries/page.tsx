import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import IndustryBlock from "@/components/IndustryBlock";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description: "Sector experience across real estate, BFSI, consumer & retail, travel & hospitality, healthcare and technology & manufacturing.",
};

export default function IndustriesPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-20 md:pt-28">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-red">Industries</p>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
            Sector depth, growth-system thinking.
          </h1>
        </div>
      </section>

      <div>
        {industries.map((industry) => (
          <IndustryBlock key={industry.slug} industry={industry} />
        ))}
      </div>

      <CTASection />
    </>
  );
}
