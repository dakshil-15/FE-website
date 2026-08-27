import type { Metadata } from "next";
import ClientsGrid from "@/components/ClientsGrid";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Clients",
  description: "Trusted across real estate, BFSI, consumer & retail, travel & hospitality and technology & manufacturing.",
};

export default function ClientsPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-20 md:pt-28">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-red">Clients</p>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
            Trusted across categories.
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container-frame">
          <ClientsGrid />
        </div>
      </section>

      <CTASection />
    </>
  );
}
