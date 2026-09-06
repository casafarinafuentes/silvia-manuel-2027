import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";

/** Solo le pagine pubbliche: /admin resta fuori dall'indice. */
const routes = ["", "/matrimonio", "/rsvp", "/hotel", "/sardegna"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
