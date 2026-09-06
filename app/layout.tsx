import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

import { wedding } from "@/config/wedding";
import { siteUrl } from "@/config/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const title = `${wedding.branding.title} — ${wedding.branding.subtitle}`;

const description = `${wedding.branding.title} si sposano il ${wedding.branding.subtitle} a ${wedding.location.venue}, ${wedding.location.address.locality} (${wedding.location.address.region}). Programma, informazioni pratiche e conferma di presenza.`;

export const metadata: Metadata = {
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

      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
