import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { wedding } from "@/config/wedding";
import { siteUrl } from "@/config/site";
import CustomCursor from "@/components/ui/CustomCursor";
import { PhaseProvider } from "@/components/layout/PhaseProvider";
import PreviewBar from "@/components/layout/PreviewBar";
import { isRsvpClosed } from "@/lib/temporal";
import { currentTemporalContext, getPreviewDate } from "@/lib/temporal-now";

/* Le pagine sono statiche ma dipendono dalla fase del matrimonio
   (lib/temporal.ts): rigenerarle ogni ora basta a farle cambiare da
   sole quando si passa da una fase all'altra. */
export const revalidate = 3600;

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const title = `${wedding.branding.title} — ${wedding.branding.subtitle}`;

const place = `${wedding.location.venue}, ${wedding.location.address.locality} (${wedding.location.address.region})`;

/* Anche la descrizione che compare su Google e nelle anteprime dei
   link segue la fase: dopo il matrimonio non si può più dire "si
   sposano" né invitare a confermare. */
export function generateMetadata(): Metadata {
  const { phase } = currentTemporalContext();

  const description =
    phase === "after"
      ? `${wedding.branding.title} si sono sposati il ${wedding.branding.subtitle} a ${place}. Il luogo, le foto e i ricordi della giornata.`
      : isRsvpClosed(phase)
        ? `${wedding.branding.title} si sposano il ${wedding.branding.subtitle} a ${place}. Programma e informazioni pratiche.`
        : `${wedding.branding.title} si sposano il ${wedding.branding.subtitle} a ${place}. Programma, informazioni pratiche e conferma di presenza.`;

  return {
    metadataBase: new URL(siteUrl()),

    title: {
      default: title,
      // Le pagine interne aggiungono solo il proprio nome.
      template: `%s — ${wedding.branding.title}`,
    },

    description,

    applicationName: wedding.branding.title,

    alternates: {
      canonical: "/",
    },

    openGraph: {
      type: "website",
      locale: "it_IT",
      url: "/",
      siteName: wedding.branding.title,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const temporal = currentTemporalContext();

  return (
    <html
      lang="it"
      // Lo script inline qui sotto aggiunge `js` a <html> prima del paint:
      // React vedrebbe un className diverso da quello renderizzato sul server.
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
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
          Vai al contenuto
        </a>

        <PhaseProvider phase={temporal.phase}>{children}</PhaseProvider>

        {process.env.NODE_ENV !== "production" && (
          <PreviewBar context={temporal} previewDate={getPreviewDate()} />
        )}

        <CustomCursor />

        {/* Statistiche di visita senza cookie. Si attivano dalla dashboard
            Vercel (Analytics → Enable); finché non sono attive non fanno nulla. */}
        <Analytics />
      </body>
    </html>
  );
}
