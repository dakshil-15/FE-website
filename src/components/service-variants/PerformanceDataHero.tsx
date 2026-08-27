import type { Service } from "@/content/types";

const signals = ["CTR", "VTR", "CPA", "ROAS", "Reach", "Frequency", "Impressions", "Conversions"];

export default function PerformanceDataHero({ service }: { service: Service }) {
  return (
    <section className="border-b border-line bg-ink pb-16 pt-20 text-paper md:pt-28">
      <div className="container-frame">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red">{service.shortName}</p>
            <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
              {service.heroStatement}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-paper/70">{service.summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden border border-paper/15 bg-paper/15 font-mono">
            {signals.map((signal) => (
              <div key={signal} className="bg-ink p-4">
                <p className="text-[10px] uppercase tracking-widest text-paper/40">{signal}</p>
                <p className="mt-1 h-2 w-full bg-gradient-to-r from-red/70 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
