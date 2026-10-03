import type { Metadata } from "next";

import Hero from "@/components/rsvp/Hero";
import Intro from "@/components/rsvp/Intro";
import Form from "@/components/rsvp/Form";
import Contact from "@/components/rsvp/Contact";
import NextStep from "@/components/ui/NextStep";
import StayTip from "@/components/ui/StayTip";
import Footer from "@/components/matrimonio/Footer";

export const metadata: Metadata = {
  title: "Conferma la tua presenza",
  description:
    "Fateci sapere se ci sarete: bastano un minuto e qualche informazione.",
  alternates: { canonical: "/rsvp" },
};

export default function RSVPPage() {
  return (
    <>
      <Hero />
      <Intro />
      <Form />
      <StayTip />

      <Contact />

      <NextStep
        title="Se vi fermate qualche giorno in più"
        description="Spiagge, tavole e paesi della Gallura che vi consigliamo di scoprire."
        href="/sardegna"
        cta="Scopri la Sardegna"
      />

      <Footer />
    </>
  );
}