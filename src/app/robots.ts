import type { MetadataRoute } from "next";
import { SITE_URL, isNoIndex } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Staging/preview deploys (SITE_NOINDEX=true) block everything; production leaves the var unset.
  if (isNoIndex()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /cdn-cgi/ hosts Cloudflare's email-protection links, which appear on every page.
      disallow: ["/admin", "/api/", "/cdn-cgi/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
