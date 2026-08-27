import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyCard from "@/components/CaseStudyCard";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import ServiceHero from "@/components/service-variants/ServiceHero";
import CapabilityDisplay from "@/components/service-variants/CapabilityDisplay";
import { services } from "@/content/services";
import { caseStudies } from "@/content/caseStudies";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: service.name, description: service.summary };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedCaseStudies = caseStudies.filter((c) => service.caseStudySlugs.includes(c.slug));
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <div className="border-b border-line py-3">
        <div className="container-frame">
          <Link href="/services" className="text-xs font-semibold uppercase tracking-widest text-muted hover:text-red">
            &larr; All Services
          </Link>
        </div>
      </div>

      <ServiceHero service={service} />

      <section className="border-b border-line py-8">
        <div className="container-frame">
          <Link
            href="/contact"
            className="gsap-btn inline-flex items-center border border-ink px-7 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-red hover:bg-red hover:text-paper"
          >
            Talk to the Team
          </Link>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-frame">
          <SectionHeading eyebrow="Capabilities" title="What this covers" />
          <div className="mt-10">
            <CapabilityDisplay capabilities={service.capabilities} family={service.family} />
          </div>
        </div>
      </section>

      {relatedCaseStudies.length > 0 && (
        <section className="border-b border-line bg-mist py-16">
          <div className="container-frame">
            <SectionHeading eyebrow="Proof" title="Selected work" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedCaseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container-frame">
          <SectionHeading eyebrow="Keep exploring" title="Other capabilities" />
          <div className="mt-8 flex flex-wrap gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="border border-line px-5 py-3 text-sm font-medium transition hover:border-red hover:text-red"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline={`Ready to talk ${service.shortName.toLowerCase()}?`} primaryLabel="Talk to Our Team" />
    </>
  );
}
