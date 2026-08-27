import type { Service } from "@/content/types";

export default function VisualCreativeHero({ service }: { service: Service }) {
  return (
    <section className="border-b border-line pb-16 pt-20 md:pt-28">
      <div className="container-frame">
        <p className="text-xs font-semibold uppercase tracking-widest text-red">{service.shortName}</p>
        <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.95] tracking-wide md:text-8xl">
          {service.heroStatement}
        </h1>

        <div className="mt-12 grid grid-cols-6 gap-3">
          <div className="col-span-6 aspect-[21/9] bg-gradient-to-br from-ink via-ink/90 to-red/30 sm:col-span-4" />
          <div className="col-span-3 aspect-square bg-mist sm:col-span-2" />
          <div className="col-span-3 aspect-square bg-ink sm:col-span-2" />
        </div>

        <p className="mt-10 max-w-2xl text-lg text-muted">{service.summary}</p>
      </div>
    </section>
  );
}
