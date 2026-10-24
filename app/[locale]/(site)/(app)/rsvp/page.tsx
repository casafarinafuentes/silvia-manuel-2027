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
import { initLocale } from "@/i18n/init-locale";
import { alternatesFor } from "@/i18n/metadata";
import { isLocale } from "@/i18n/locales";
import { resolve } from "@/i18n/pair";
import { getM } from "@/i18n/get-messages";
import { rsvpMessages } from "@/i18n/messages/rsvp";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const m = resolve(rsvpMessages.metadata, locale);
  const closed = isRsvpClosed(currentTemporalContext().phase);

  return {
    title: closed ? m.titleClosed : m.titleOpen,
    description: closed ? m.descriptionClosed : m.descriptionOpen,
    alternates: alternatesFor(locale, "/rsvp"),
  };
}

export default async function RSVPPage({ params }: PageProps) {
  await initLocale(params);

  const m = await getM(rsvpMessages);
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
              {after ? m.closedPage.titleAfter : m.closedPage.titleDay}
            </h2>

            <p className="mx-auto mt-6 max-w-md leading-8 text-secondary">
              {after ? m.closedPage.textAfter : m.closedPage.textDay}
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
        title={m.nextStep.title}
        description={m.nextStep.description}
        href="/sardegna"
        cta={m.nextStep.cta}
      />

      <Footer />
    </>
  );
}
