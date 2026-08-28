import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CareerDetailPage from "@/components/careers/CareerDetailPage";
import {
  getCareerDetailTabs,
  getCareerRoleBySlug,
  getCareerRoleDetail,
  getCareerRoles,
  getFirstDetailSectionId,
  getRelatedCareerRoles,
} from "@/lib/careers";
import { getSiteUrl } from "@/lib/site-url";

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const roles = await getCareerRoles();
  return roles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = await getCareerRoleBySlug(slug);
  if (!role) return {};

  const experience = role.experience ? ` ${role.experience}.` : "";

  return {
    title: `${role.title} — Careers`,
    description: `Apply for the ${role.title} role at First Economy in ${role.location}. ${role.type} · ${role.department}.${experience}`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [role, detail, relatedRoles, siteUrl] = await Promise.all([
    getCareerRoleBySlug(slug),
    getCareerRoleDetail(slug),
    getRelatedCareerRoles(slug),
    getSiteUrl(),
  ]);

  if (!role || !detail) notFound();

  const sectionTabs = getCareerDetailTabs(detail);
  const shareUrl = `${siteUrl}/careers/${slug}`;

  return (
    <CareerDetailPage
      role={role}
      detail={detail}
      sectionTabs={sectionTabs}
      relatedRoles={relatedRoles}
      shareUrl={shareUrl}
    />
  );
}
