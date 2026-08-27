import type { Service } from "@/content/types";

export default function AiHero({ service }: { service: Service }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ink pb-20 pt-20 text-paper md:pt-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(224,19,42,0.35), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.12), transparent 40%), radial-gradient(circle at 60% 80%, rgba(224,19,42,0.2), transparent 45%)",
        }}
      />
      <div className="relative container-content">
        <p className="text-xs font-semibold uppercase tracking-widest text-red">{service.shortName}</p>
        <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
          {service.heroStatement}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-paper/70">{service.summary}</p>
      </div>

      <div className="relative mx-auto mt-16 flex max-w-5xl flex-wrap items-center justify-center gap-4">
        {["Prompt", "Script", "Storyboard", "Visual", "Motion", "Voice", "Music", "Output"].map((node, i, arr) => (
          <div key={node} className="flex items-center gap-4">
            <span className="rounded-full border border-paper/25 bg-paper/5 px-5 py-2 text-sm font-medium">
              {node}
            </span>
            {i < arr.length - 1 && <span className="text-red">&rarr;</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
