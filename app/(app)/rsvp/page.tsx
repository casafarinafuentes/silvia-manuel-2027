import type { Metadata } from "next";

import Hero from "@/components/rsvp/Hero";
import Intro from "@/components/rsvp/Intro";
import Form from "@/components/rsvp/Form";
import Contact from "@/components/rsvp/Contact";
import NextStep from "@/components/ui/NextStep";
import Section from "@/components/ui/Section";
import StayTip from "@/components/ui/StayTip";
import { isRsvpClosed } from "@/lib/temporal";
import { currentTemporalContext } from "@/lib/temporal-now";
import Footer from "@/components/matrimonio/Footer";

export function generateMetadata(): Metadata {
  const closed = isRsvpClosed(currentTemporalContext().phase);

  return {
    title: closed ? "RSVP" : "Conferma la tua presenza",
    description: closed
      ? "Le conferme di presenza sono chiuse."
      : "Fateci sapere se ci sarete: bastano un minuto e qualche informazione.",
    alternates: { canonical: "/rsvp" },
  };
}

export default function RSVPPage() {
  const { phase } = currentTemporalContext();

  // Dal giorno del matrimonio le conferme sono chiuse: niente modulo,
  // solo un saluto (al presente quel giorno, al passato dopo).
  if (isRsvpClosed(phase)) {
    const after = phase === "after";

    return (
      <>
        <Hero phase={phase} />

        <Section>
          <div className="mx-auto max-w-2xl py-10 text-center">
            <h2 className="font-heading text-4xl font-light text-primary sm:text-5xl">
              {after ? "Grazie a tutti." : "Ci siamo."}
            </h2>

            <p className="mx-auto mt-6 max-w-md leading-8 text-secondary">
              {after
                ? "Il matrimonio è passato e le conferme sono chiuse. Grazie a chi ha festeggiato con noi e a chi ci ha pensato da lontano."
                : "Oggi è il giorno del matrimonio e le conferme sono chiuse. Per qualsiasi cosa dell'ultimo minuto, scriveteci."}
            </p>
          </div>
        </Section>

        <Contact closed />

        <Footer />
      </>
    );
  }

  return (
    <>
      <Hero phase={phase} />
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
