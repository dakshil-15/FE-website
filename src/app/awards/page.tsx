import type { Metadata } from "next";
import Link from "next/link";
import { Trophy, Award } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description: "225+ media awards across the network, including a Guinness World Record achievement for Godrej Properties.",
};

export default function AwardsPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-20 md:pt-28">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-red">Awards & Recognition</p>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
            Work recognised for impact.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Across the First Economy network, our work has earned 225+ media awards. A full, campaign-by-campaign
            awards archive is in development.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-ink py-16 text-paper">
        <div className="container-content">
          <Trophy size={40} className="text-red" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-red">Featured achievement</p>
          <h2 className="mt-4 font-display text-4xl leading-tight tracking-wide md:text-6xl">
            Guinness World Record
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-paper/70">
            For Godrej Properties&rsquo; Godrej Blue launch in Kolkata, First Economy activated 1,000+ influencers
            live within one hour &mdash; setting a Guinness World Record for the campaign.
          </p>
          <Link
            href="/work/godrej-blue"
            className="gsap-btn mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red"
          >
            See the case study <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container-content">
          <Award size={32} className="mb-4 text-red" />
          <SectionHeading eyebrow="225+" title="Media awards across the network" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
