import type { Metadata } from "next";

import Hero from "@/components/rsvp/Hero";
import Intro from "@/components/rsvp/Intro";
import Form from "@/components/rsvp/Form";
import Contact from "@/components/rsvp/Contact";
import NextStep from "@/components/ui/NextStep";
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
      <Contact />

      <NextStep
        title="Dove dormire"
        description="Strutture consigliate vicino alla location e informazioni sulla navetta."
        href="/hotel"
        cta="Scopri gli hotel"
      />

      <Footer />
    </>
  );
}