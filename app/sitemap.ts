import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";
import { locales } from "@/i18n/locales";
import { localizedPath } from "@/i18n/metadata";

/**
 * Solo le pagine pubbliche, ognuna nelle due lingue con il rimando
 * alla sua traduzione. Restano fuori: /admin, la lista nozze (ha
 * coordinate bancarie) e la pagina dell'invito, che si raggiunge solo
 * da chi ha il link.
 */
const routes = ["/", "/matrimonio", "/rsvp", "/hotel", "/sardegna"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date();

  return routes.flatMap((route) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, `${base}${localizedPath(locale, route)}`]),
    );

    return locales.map((locale) => ({
      url: languages[locale],
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
