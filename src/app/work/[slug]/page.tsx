import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import CaseStudyCard from "@/components/CaseStudyCard";
import SectionHeading from "@/components/SectionHeading";
import CaseStory from "@/components/case-variants/CaseStory";
import { caseStudies } from "@/content/caseStudies";
import { services } from "@/content/services";
import { industries } from "@/content/industries";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((c) => c.slug === slug);
  if (!caseStudy) return {};
  return { title: `${caseStudy.client} — ${caseStudy.campaign}`, description: caseStudy.hero };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((c) => c.slug === slug);
  if (!caseStudy) notFound();

  const relatedServices = services.filter((s) => caseStudy.services.includes(s.slug));
  const industry = industries.find((i) => i.slug === caseStudy.industry);
  const relatedWork = caseStudies
    .filter((c) => c.slug !== caseStudy.slug && c.industry === caseStudy.industry)
    .slice(0, 3);

  return (
    <>
      <div className="border-b border-line py-3">
        <div className="container-frame">
          <Link href="/work" className="text-xs font-semibold uppercase tracking-widest text-muted hover:text-red">
            &larr; All Work
          </Link>
        </div>
      </div>

      <CaseStory caseStudy={caseStudy} />

      <section className="border-b border-line py-16">
        <div className="container-frame">
          <SectionHeading eyebrow="Results" title="What it delivered" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudy.results.map((metric) => (
              <div key={metric.label} className="border border-line p-6">
                <p className="font-display text-4xl text-red md:text-5xl">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-frame">
          <SectionHeading eyebrow="Capabilities involved" title="Built with" />
          <div className="mt-8 flex flex-wrap gap-4">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="border border-line px-5 py-3 text-sm font-medium transition hover:border-red hover:text-red"
              >
                {s.name}
              </Link>
            ))}
            {industry && (
              <Link
                href={`/industries/${industry.slug}`}
                className="border border-line px-5 py-3 text-sm font-medium transition hover:border-red hover:text-red"
              >
                {industry.name}
              </Link>
            )}
          </div>
        </div>
      </section>

      {relatedWork.length > 0 && (
        <section className="border-b border-line bg-mist py-16">
          <div className="container-frame">
            <SectionHeading eyebrow="More work" title="Related case studies" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedWork.map((c) => (
                <CaseStudyCard key={c.slug} caseStudy={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection headline="Have a similar challenge? Start a project." />
    </>
  );
}
