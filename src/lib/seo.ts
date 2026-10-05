import { officeLocations } from "@/content/offices";
import { contactInfo, socialLinks } from "@/content/site";

export const SITE_NAME = "First Economy";

/**
 * One source of truth for the public origin. Canonical, og:url, sitemap and
 * JSON-LD all derive from this — set NEXT_PUBLIC_SITE_URL per environment.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://firsteconomy.in").replace(/\/$/, "");

export const DEFAULT_OG_IMAGE = "/og-default.png";

export function absoluteUrl(path = "/") {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Staging/preview deploys set SITE_NOINDEX=true; production leaves it unset. */
export const isNoIndex = () => process.env.SITE_NOINDEX === "true";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: `${SITE_URL}/icons/icon-512.png`,
    email: contactInfo.email,
    telephone: contactInfo.phone,
    sameAs: socialLinks.map((link) => link.href),
  };
}

export function localBusinessJsonLd() {
  return officeLocations.map((office) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/contact#${office.slug}`,
    name: `${SITE_NAME} — ${office.city}`,
    url: absoluteUrl("/contact"),
    image: absoluteUrl(office.image.src),
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    telephone: office.contact?.phone ?? contactInfo.phone,
    email: office.contact?.email ?? contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.address,
      addressLocality: office.city,
      addressCountry: "IN",
    },
  }));
}

export type BreadcrumbEntry = { label: string; href?: string };

/** The current (last) page has no href, so it is emitted without `item`, which Google allows. */
export function breadcrumbJsonLd(items: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function jobPostingJsonLd({
  title,
  description,
  path,
  location,
  employmentType,
  datePosted,
  validThrough,
}: {
  title: string;
  description: string;
  path: string;
  location: string;
  employmentType: string;
  datePosted?: string;
  validThrough?: string;
}) {
  const type = employmentType.toLowerCase().includes("part")
    ? "PART_TIME"
    : employmentType.toLowerCase().includes("intern")
      ? "INTERN"
      : employmentType.toLowerCase().includes("contract")
        ? "CONTRACTOR"
        : "FULL_TIME";

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    url: absoluteUrl(path),
    employmentType: type,
    ...(datePosted ? { datePosted } : {}),
    ...(validThrough ? { validThrough } : {}),
    hiringOrganization: { "@type": "Organization", name: SITE_NAME, sameAs: absoluteUrl("/") },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: location, addressCountry: "IN" },
    },
  };
}
