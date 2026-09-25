import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceOfferingIconBySlug } from "@/components/serviceOfferingIcons";
import { serviceOfferings, type ServiceOffering } from "@/content/serviceOfferings";

export const ACCENTS = [
  { bg: "bg-red/10", text: "text-red" },
  { bg: "bg-violet-100", text: "text-violet-600" },
  { bg: "bg-emerald-100", text: "text-emerald-600" },
  { bg: "bg-rose-100", text: "text-rose-600" },
  { bg: "bg-amber-100", text: "text-amber-600" },
  { bg: "bg-sky-100", text: "text-sky-600" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-600" },
  { bg: "bg-purple-100", text: "text-purple-600" },
] as const;

export const spokes = serviceOfferings.filter((service) => service.slug !== "ai-solutions");

function AiHub() {
  return (
    <div className="flex items-center justify-center py-4 lg:py-0">
      <div className="relative grid aspect-square w-full max-w-[200px] place-items-center rounded-full bg-gradient-to-br from-[#ef3a3a] via-red to-[#7a0e0e] text-center text-white shadow-[0_20px_50px_rgba(210,37,37,0.4)] sm:max-w-[220px]">
        <div className="absolute inset-3 rounded-full border border-white/25" aria-hidden />
        <div>
          <p className="m-0 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI</p>
          <p className="mt-1 mb-0 text-[10px] font-bold uppercase tracking-[0.25em] text-white/85 sm:text-xs">
            At the core
          </p>
          <p className="mt-2 mb-0 text-2xl font-light leading-none" aria-hidden>
            &#8734;
          </p>
        </div>
      </div>
    </div>
  );
}

function ServiceHubCard({
  service,
  accent,
}: {
  service: ServiceOffering;
  accent: (typeof ACCENTS)[number];
}) {
  const Icon = serviceOfferingIconBySlug[service.slug];

  return (
    <Link
      href={service.href}
      className="group relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-[20px] border border-[#e6e6e6] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-red/35 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] focus-visible:border-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:min-h-[210px] sm:rounded-[22px] sm:p-5"
    >
      <div className="relative flex items-start gap-3">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full sm:h-14 sm:w-14 ${accent.bg} ${accent.text}`}
        >
          {Icon ? <Icon size={26} aria-hidden className="h-6 w-6 sm:h-7 sm:w-7" /> : null}
        </span>
      </div>

      <div className="relative mt-4 flex flex-1 flex-col sm:mt-5">
        <h3 className="m-0 font-display text-[1.05rem] leading-[1.15] font-bold tracking-[0.02em] text-ink uppercase sm:text-[1.125rem]">
          {service.name}
        </h3>
        <p className="text-body-sm mt-2.5 mb-0 text-muted">{service.description}</p>
      </div>

      <div className="relative mt-4 flex justify-end">
        <span
          className="grid h-11 w-11 place-items-center rounded-full border border-red bg-white text-red transition duration-200 group-hover:bg-red group-hover:text-white"
          aria-hidden
        >
          <ArrowRight size={15} strokeWidth={2.25} />
        </span>
      </div>
    </Link>
  );
}

export default function AiServicesHub() {
  const left = spokes.slice(0, 4);
  const right = spokes.slice(4);

  return (
    <ul
      data-animate-stagger
      className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
    >
      {left.map((service, i) => (
        <li key={service.slug} className="min-w-0">
          <ServiceHubCard service={service} accent={ACCENTS[i % ACCENTS.length]!} />
        </li>
      ))}
      <li className="min-w-0 sm:col-span-2 lg:col-span-1">
        <AiHub />
      </li>
      {right.map((service, i) => (
        <li key={service.slug} className="min-w-0">
          <ServiceHubCard service={service} accent={ACCENTS[(i + 4) % ACCENTS.length]!} />
        </li>
      ))}
    </ul>
  );
}
