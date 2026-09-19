import Link from "next/link";

import Section from "@/components/ui/Section";

const steps = [
  {
    title: "Confermi la presenza",
    text: "Nel modulo RSVP indichi l'hotel che preferisci, oppure che ti organizzi da solo. Serve solo a farci un'idea: non è ancora una prenotazione.",
  },
  {
    title: "Il 31 gennaio contattiamo gli hotel",
    text: "Comunichiamo a ogni struttura il numero certo di persone, così possono riservare le camere e proporci la tariffa per il gruppo.",
  },
  {
    title: "Ricevi le indicazioni per prenotare",
    text: "Gli hotel ci diranno come procedere (per esempio un link personale per prenotare e pagare). Te lo giriamo non appena disponibile.",
  },
];

export default function HowItWorks() {
  return (
    <Section className="pt-6 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-panel bg-panel px-8 py-12 md:px-14">
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            Come funziona
          </p>

          <h2 className="mt-4 max-w-2xl font-heading text-4xl font-light text-primary md:text-5xl">
            Dormire a Cannigione, in tre passi
          </h2>

          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="font-heading text-5xl font-light text-accent">
                  {index + 1}
                </span>

                <h3 className="mt-3 font-heading text-2xl text-primary">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-secondary">{step.text}</p>
              </li>
            ))}
          </ol>

          <p className="mt-12 max-w-3xl border-t border-border pt-6 text-sm leading-7 text-secondary">
            <strong className="font-medium text-primary">
              Confermi dopo il 31 gennaio?
            </strong>{" "}
            Puoi farlo comunque, ma gli hotel saranno già stati contattati:
            <Link
              href="/rsvp#contatti"
              className="ml-1 underline underline-offset-4"
            >
              scrivici
            </Link>{" "}
            e cerchiamo insieme una soluzione, compatibilmente con le
            disponibilità.
          </p>
        </div>
      </div>
    </Section>
  );
}
