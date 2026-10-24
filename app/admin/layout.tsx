import type { Metadata, Viewport } from "next";

import "../globals.css";
import { fontVariables } from "../fonts";

/**
 * Root layout dell'area riservata: è a parte rispetto al sito perché
 * il sito ha le lingue (`app/[locale]`) e questa resta solo in
 * italiano, per chi gestisce le conferme.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#fcfbf8",
  width: "device-width",
  initialScale: 1,
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
