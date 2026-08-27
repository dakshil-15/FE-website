import Link from "next/link";
import type { Service } from "@/content/types";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex items-start justify-between gap-6 border-b border-line py-6 transition hover:bg-mist md:px-4"
    >
      <div className="flex items-start gap-6">
        <span className="font-display text-lg text-muted">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3 className="font-display text-2xl tracking-wide md:text-3xl">{service.name}</h3>
          <p className="mt-2 max-w-xl text-sm text-muted">{service.summary}</p>
        </div>
      </div>
      <span className="mt-2 shrink-0 text-2xl text-muted transition group-hover:translate-x-1 group-hover:text-red">
        &rarr;
      </span>
    </Link>
  );
}
