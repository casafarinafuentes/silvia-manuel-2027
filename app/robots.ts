import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // L'area riservata contiene i dati personali degli invitati.
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
