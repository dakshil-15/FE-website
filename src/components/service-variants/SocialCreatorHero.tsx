import type { Service } from "@/content/types";

export default function SocialCreatorHero({ service }: { service: Service }) {
  return (
    <section className="border-b border-line pb-16 pt-20 md:pt-28">
      <div className="container-frame">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red">{service.shortName}</p>
            <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
              {service.heroStatement}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{service.summary}</p>
          </div>

          <div className="flex gap-3 overflow-x-auto md:overflow-visible">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex h-64 w-36 shrink-0 flex-col justify-between border border-line bg-ink p-3 text-paper"
                style={{ transform: `rotate(${(i - 1) * 3}deg)` }}
              >
                <div className="h-3 w-3 rounded-full bg-red" />
                <div className="space-y-1.5">
                  <div className="h-2 w-3/4 bg-paper/30" />
                  <div className="h-2 w-1/2 bg-paper/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
