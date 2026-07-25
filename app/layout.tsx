import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

import { wedding } from "@/config/wedding";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: wedding.branding.title,
  description: `${wedding.location.venue} • ${wedding.location.address.locality}, ${wedding.location.address.region}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}