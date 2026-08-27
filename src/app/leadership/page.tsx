import type { Metadata } from "next";
import { Cpu, Target, Compass, Palette, MessagesSquare, Film, Handshake, Rocket, TrendingUp } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Leadership",
  description: "The leadership team behind First Economy's technology, media, strategy, creative, social, video and growth capabilities.",
};

const leadershipAreas = [
  { label: "Technology", icon: Cpu },
  { label: "Media Planning", icon: Target },
  { label: "Strategy", icon: Compass },
  { label: "Branding & Design", icon: Palette },
  { label: "Creative & Branding", icon: Palette },
  { label: "Social Media", icon: MessagesSquare },
  { label: "Video Production", icon: Film },
  { label: "Business Solutions", icon: Handshake },
  { label: "New Business", icon: Rocket },
  { label: "Growth", icon: TrendingUp },
];

export default function LeadershipPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-20 md:pt-28">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-red">Leadership</p>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
            The people behind the system.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Full leadership profiles &mdash; photos, bios and areas of expertise &mdash; are in development.
            Leadership spans the following areas.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-frame">
          <SectionHeading eyebrow="Areas of expertise" title="Leadership across the system" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipAreas.map((area) => (
              <div key={area.label} className="border border-line p-6">
                <area.icon size={20} className="text-red" />
                <p className="mt-3 font-display text-xl tracking-wide">{area.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
