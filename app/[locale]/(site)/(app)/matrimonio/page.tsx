import type { Metadata } from "next";

import Hero from "@/components/matrimonio/Hero";
import Intro from "@/components/matrimonio/Intro";
import Timeline from "@/components/matrimonio/Timeline";
import Location from "@/components/matrimonio/Location";
import DressCode from "@/components/matrimonio/DressCode";
import PhotoSharing from "@/components/matrimonio/PhotoSharing";
import PracticalInfo from "@/components/matrimonio/PracticalInfo";
import Inspirations from "@/components/matrimonio/Inspirations";
import CTA from "@/components/matrimonio/CTA";
import Footer from "@/components/matrimonio/Footer";
import StayTip from "@/components/ui/StayTip";
import { currentTemporalContext } from "@/lib/temporal-now";
import { initLocale } from "@/i18n/init-locale";
import { alternatesFor } from "@/i18n/metadata";
import { isLocale } from "@/i18n/locales";
import { resolve } from "@/i18n/pair";
import { matrimonioMessages } from "@/i18n/messages/matrimonio";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const m = resolve(matrimonioMessages.metadata, locale);
  const after = currentTemporalContext().phase === "after";

  return {
    title: m.title,
    description: after ? m.after : m.before,
    alternates: alternatesFor(locale, "/matrimonio"),
  };
}

export default async function MatrimonioPage({ params }: PageProps) {
  await initLocale(params);

  const { phase } = currentTemporalContext();

  /* L'ordine delle sezioni segue la fase:
     - nelle ultime settimane e nel giorno del matrimonio salgono in
       cima le informazioni pratiche;
     - dopo, la pagina diventa un ricordo: grazie, foto, il luogo. */
  let sections: React.ReactNode;

  if (phase === "after") {
    sections = (
      <>
        <Intro after />
        <PhotoSharing after />
        <Location />
      </>
    );
  } else if (phase === "wedding") {
    sections = (
      <>
        <Timeline />
        <Location />
        <PracticalInfo />
        <PhotoSharing started />
        <DressCode />
      </>
    );
  } else if (phase === "final-weeks") {
    sections = (
      <>
        <Timeline />
        <Location />
        <PracticalInfo />
        <DressCode />
        <StayTip />
        <PhotoSharing />
        <Inspirations />
      </>
    );
  } else {
    sections = (
      <>
        <Intro />
        <Timeline />
        <Location />
        <StayTip />
        <DressCode />
        <PhotoSharing />
        <PracticalInfo />
        <Inspirations />
      </>
    );
  }

  return (
    <div className="bg-background">
      <Hero after={phase === "after"} />

      {sections}

      <CTA phase={phase} />

      <Footer />
    </div>
  );
}
