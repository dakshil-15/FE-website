import type { Service } from "@/content/types";

export default function ProductTechHero({ service }: { service: Service }) {
  return (
    <section className="border-b border-line pb-16 pt-20 md:pt-28">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-widest text-red">{service.shortName}</p>
        <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
          {service.heroStatement}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{service.summary}</p>
      </div>

      <div className="mx-auto mt-14 max-w-5xl border border-line">
        <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-4 text-xs text-muted">system.first-economy.com</span>
        </div>
        <div className="grid gap-px bg-line sm:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-paper p-5">
              <div className="h-2 w-1/3 bg-red/70" />
              <div className="mt-4 h-16 bg-mist" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
