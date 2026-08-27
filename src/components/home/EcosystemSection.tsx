import Link from "next/link";
import { ArrowRight } from "lucide-react";

const columns = [
  {
    title: "Databases",
    items: ["BigQuery", "Snowflake", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Ad Platforms",
    items: ["Google Ads", "Meta", "LinkedIn", "Programmatic", "OTT / CTV"],
  },
  {
    title: "CRM / ERP",
    items: ["Salesforce", "HubSpot", "Custom ERP", "Payment systems"],
  },
  {
    title: "Analytics",
    items: ["GA4", "Comscore", "GWI", "Brandwatch", "Similarweb"],
  },
  {
    title: "Dashboards",
    items: ["Looker Studio", "Power BI", "In-house BI", "Supermetrics"],
  },
  {
    title: "Cloud",
    items: ["AWS", "Azure", "GCP", "API layers"],
  },
  {
    title: "AI Layers",
    items: ["OpenAI", "Custom models", "AEO / GEO", "Creative AI"],
  },
];

export default function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="bg-mist px-[var(--gutter)] py-12 sm:py-[72px] sm:pb-[84px]"
      aria-labelledby="ecosystem-heading"
    >
      <div className="mx-auto max-w-[var(--content)]">
        <p className="text-eyebrow m-0">Infrastructure</p>
        <div className="mt-5 grid grid-cols-1 items-start gap-8 sm:mt-[22px] md:grid-cols-2 md:gap-[60px]">
          <h2 id="ecosystem-heading" className="text-display-md m-0">
            A connected
            <br />
            ecosystem built
            <br />
            for growth.
          </h2>
          <div className="pt-0 md:pt-1.5">
            <p className="text-body m-0 max-w-[400px] text-[#333]">
              Data, platforms and intelligence — the operating stack our teams work in every day.
            </p>
            <Link
              href="/our-advantage"
              className="text-cta mt-5 inline-flex items-center gap-3.5 border-b border-ink pb-[9px] transition hover:border-red hover:text-red sm:mt-6"
            >
              Our advantage
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 lg:grid-cols-7">
          {columns.map((column) => (
            <div key={column.title} className="bg-white px-4 py-5 sm:px-5 sm:py-6">
              <p className="m-0 text-[11px] font-bold tracking-[0.16em] text-red uppercase">{column.title}</p>
              <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                {column.items.map((item) => (
                  <li key={item} className="text-body-sm text-[#333]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
