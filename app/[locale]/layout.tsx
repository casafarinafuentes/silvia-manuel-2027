import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/next";

import "../globals.css";
import { fontVariables } from "../fonts";

import { siteUrl } from "@/config/site";
import CustomCursor from "@/components/ui/CustomCursor";
import { PhaseProvider } from "@/components/layout/PhaseProvider";
import PreviewBar from "@/components/layout/PreviewBar";
import { initLocale } from "@/i18n/init-locale";
import { locales, localeTags } from "@/i18n/locales";
import { alternatesFor, localizedPath } from "@/i18n/metadata";
import { resolve } from "@/i18n/pair";
import { siteMessages } from "@/i18n/messages/site";
import { isRsvpClosed } from "@/lib/temporal";
import { currentTemporalContext, getPreviewDate } from "@/lib/temporal-now";

/* Le pagine sono statiche ma dipendono dalla fase del matrimonio
   (lib/temporal.ts): rigenerarle ogni ora basta a farle cambiare da
   sole quando si passa da una fase all'altra. */
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/* Anche la descrizione che compare su Google e nelle anteprime dei
   link segue la fase: dopo il matrimonio non si può più dire "si
   sposano" né invitare a confermare. */
export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const locale = await initLocale(params);
  const m = resolve(siteMessages, locale);

  const { phase } = currentTemporalContext();

  const description =
    phase === "after"
      ? m.description.after
      : isRsvpClosed(phase)
        ? m.description.rsvpClosed
        : m.description.rsvpOpen;

  const title = `${m.title} — ${m.date}`;

  return {
    metadataBase: new URL(siteUrl()),

    title: {
      default: title,
      // Le pagine interne aggiungono solo il proprio nome.
      template: `%s — ${m.title}`,
    },

    description,

    applicationName: m.title,

    alternates: alternatesFor(locale, "/"),

    openGraph: {
      type: "website",
      locale: localeTags[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeTags[l]),
      url: localizedPath(locale, "/"),
      siteName: m.title,
      title,
      description,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#fcfbf8",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const locale = await initLocale(params);
  const m = resolve(siteMessages, locale);

  const temporal = currentTemporalContext();

  return (
    <html
      lang={locale}
      // Lo script inline qui sotto aggiunge `js` a <html> prima del paint:
      // React vedrebbe un className diverso da quello renderizzato sul server.
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <head>
        {/*
          Marca il documento come "JavaScript attivo" prima del primo
          paint. Gli stati iniziali delle animazioni di comparsa sono
          agganciati a `html.js`, così senza JS il contenuto resta
          visibile invece di rimanere trasparente per sempre.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        {/* Primo elemento raggiungibile da tastiera: salta menu e hero. */}
        <a href="#main" className="skip-link">
          {m.skipLink}
        </a>

        <NextIntlClientProvider>
          <PhaseProvider phase={temporal.phase}>{children}</PhaseProvider>

          {process.env.NODE_ENV !== "production" && (
            <PreviewBar context={temporal} previewDate={getPreviewDate()} />
          )}

          <CustomCursor />
        </NextIntlClientProvider>

        {/* Statistiche di visita senza cookie. Si attivano dalla dashboard
            Vercel (Analytics → Enable); finché non sono attive non fanno nulla. */}
        <Analytics />
      </body>
    </html>
  );
}
