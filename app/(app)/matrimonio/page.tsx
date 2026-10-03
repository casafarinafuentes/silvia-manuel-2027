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

export function generateMetadata(): Metadata {
  const after = currentTemporalContext().phase === "after";

  return {
    title: "Il matrimonio",
    description: after
      ? "Il 12 giugno 2027 a Li Capanni: il luogo, le foto e i ricordi della giornata."
      : "Programma della giornata, location, dress code e informazioni pratiche per il 12 giugno 2027.",
    alternates: { canonical: "/matrimonio" },
  };
}

export default function MatrimonioPage() {
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
