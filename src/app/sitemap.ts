import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/caseStudies";
import { servicePageSlugs } from "@/content/servicePages";
import { getCareerRoles } from "@/lib/careers";
import { absoluteUrl, isNoIndex } from "@/lib/seo";

const STATIC_PATHS = ["/", "/about", "/services", "/work", "/careers", "/awards", "/contact", "/privacy-policy"];

/** Filter URLs (e.g. /work?service=seo) are intentionally excluded — only canonical pages are listed. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isNoIndex()) return [];

  const roles = await getCareerRoles();

  const paths = [
    ...STATIC_PATHS,
    ...servicePageSlugs.map((slug) => `/services/${slug}`),
    ...caseStudies.map((study) => `/work/${study.slug}`),
    ...roles.map((role) => `/careers/${role.slug}`),
  ];

  return paths.map((path) => ({
    url: absoluteUrl(path),
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
