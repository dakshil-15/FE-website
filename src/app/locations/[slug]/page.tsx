import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import CTASection from "@/components/CTASection";
import { offices } from "@/content/site";
import { caseStudies } from "@/content/caseStudies";

export function generateStaticParams() {
  return offices.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const office = offices.find((o) => o.slug === slug);
  if (!office) return {};
  return { title: `First Economy ${office.city}`, description: `First Economy's ${office.city} office.` };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const office = offices.find((o) => o.slug === slug);
  if (!office) notFound();

  const otherOffices = offices.filter((o) => o.slug !== office.slug);

  return (
    <>
      <section className="border-b border-line pb-16 pt-20 md:pt-28">
        <div className="container-content">
          <Link href="/contact" className="text-xs font-semibold uppercase tracking-widest text-muted hover:text-red">
            &larr; All Locations
          </Link>
          <div className="mt-6 flex items-center gap-2">
            <MapPin size={16} className="text-red" />
            <p className="text-xs font-semibold uppercase tracking-widest text-red">
              {office.isHq ? "Head Office" : "Office"}
            </p>
          </div>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl">
            First Economy {office.city}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Address, contact details and office hours for our {office.city} team are being finalised. In the
            meantime, reach us through the project form and we&rsquo;ll route it to the {office.city} team.
          </p>
          <Link
            href="/contact"
            className="gsap-btn mt-8 inline-flex items-center border border-ink px-7 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-red hover:bg-red hover:text-paper"
          >
            Contact This Office
          </Link>
        </div>
      </section>

      {caseStudies.length > 0 && (
        <section className="border-b border-line bg-mist py-16">
          <div className="container-frame">
            <p className="text-xs font-semibold uppercase tracking-widest text-red">Other locations</p>
            <div className="mt-6 flex flex-wrap gap-4">
              {otherOffices.map((o) => (
                <Link
                  key={o.slug}
                  href={`/locations/${o.slug}`}
                  className="inline-flex items-center gap-2 border border-line bg-paper px-5 py-3 text-sm font-medium transition hover:border-red hover:text-red"
                >
                  <MapPin size={14} />
                  {o.city}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
