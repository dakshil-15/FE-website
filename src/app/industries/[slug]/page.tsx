import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Boxes } from "lucide-react";
import CaseStudyCard from "@/components/CaseStudyCard";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/caseStudies";
import { toneStyles, toneLabels } from "@/components/industryTone";
import { industryIcons } from "@/components/industryIcons";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return { title: industry.name, description: industry.overview };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const relatedCaseStudies = caseStudies.filter((c) => industry.caseStudySlugs.includes(c.slug));
  const style = toneStyles[industry.tone];
  const Icon = industryIcons[industry.slug] ?? Boxes;

  return (
    <>
      <section className={`border-b border-line pb-16 pt-20 md:pt-28 ${style.wrapper}`}>
        <div className="container-content">
          <Link
            href="/industries"
            className={`text-xs font-semibold uppercase tracking-widest opacity-70 transition hover:opacity-100`}
          >
            &larr; All Industries
          </Link>
          <div className="mt-6 flex items-center gap-2">
            <Icon size={16} className={style.label} />
            <p className={`text-xs font-semibold uppercase tracking-widest ${style.label}`}>
              {toneLabels[industry.tone]}
            </p>
          </div>
          <h1 className={`mt-4 font-display text-5xl leading-tight tracking-wide md:text-7xl ${style.title}`}>
            {industry.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-80">{industry.overview}</p>
        </div>
      </section>

      {industry.clients.length > 0 && (
        <section className="border-b border-line bg-mist py-16">
          <div className="container-frame">
            <SectionHeading eyebrow="Clients" title="Brands we've worked with" />
            <div className="mt-8 flex flex-wrap gap-4">
              {industry.clients.map((client) => (
                <span key={client} className="border border-line bg-paper px-5 py-3 text-sm font-medium">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedCaseStudies.length > 0 ? (
        <section className="py-16">
          <div className="container-frame">
            <SectionHeading eyebrow="Proof" title="Relevant work" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedCaseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16">
          <div className="container-content">
            <p className="text-muted">
              Case studies for this sector are in development. In the meantime, explore our{" "}
              <Link href="/work" className="text-red underline">
                full body of work
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      <CTASection headline={`Have a ${industry.name.toLowerCase()} challenge?`} />
    </>
  );
}
