import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/ui/Countdown";
import Logo from "@/components/ui/Logo";
import { googleCalendarUrl } from "@/lib/calendar";
import { currentTemporalContext } from "@/lib/temporal-now";

export default function Footer() {
  const { phase } = currentTemporalContext();
  const after = phase === "after";
  const weddingDay = phase === "wedding";

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-12 lg:grid lg:grid-cols-[120px_2.2fr_1fr_1fr] lg:items-start lg:gap-10 lg:px-10">
        {/* Logo */}

        <div className="flex w-full justify-center lg:w-auto lg:justify-start">
          <Logo className="h-32 w-auto text-primary" />
        </div>

        {/* Countdown */}

        <div className="w-full text-center lg:border-l lg:border-border lg:pl-10 lg:text-left">
          {after ? (
            <>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-secondary">
                12 giugno 2027
              </p>

              <p className="font-heading text-3xl font-light text-primary sm:text-4xl">
                Grazie per aver festeggiato con noi.
              </p>
            </>
          ) : (
            <>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-secondary">
                {weddingDay ? "12 giugno 2027" : "Countdown"}
              </p>

              <div className="flex justify-center lg:justify-start">
                <Countdown />
              </div>
            </>
          )}
        </div>

        {/* FAQ */}

        <div className="w-full text-center lg:border-l lg:border-border lg:pl-10 lg:text-left">
          {/* A matrimonio passato le FAQ non ci sono più: al loro posto
              l'invio delle foto. */}
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            {after ? "Le vostre foto" : "Domande frequenti"}
          </p>

          {after ? (
            <p className="mt-5 text-sm leading-7 text-secondary">
              Avete foto e video
              <br />
              della giornata?
              <br />
              Inviateceli da qui.
            </p>
          ) : (
            <p className="mt-5 text-sm leading-7 text-secondary">
              Hai qualche dubbio?
              <br />
              Trova qui le risposte
              <br />
              alle domande più comuni.
            </p>
          )}

          <Link
            href={after ? "/matrimonio#foto" : "/matrimonio#faq"}
            className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary transition hover:text-accent"
          >
            {after ? "Invia le tue foto →" : "Scopri di più →"}
          </Link>
        </div>

        {/* Contatti */}

        <div className="w-full text-center lg:border-l lg:border-border lg:pl-10 lg:text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            Contatti
          </p>

          <p className="mt-5 text-sm leading-7 text-secondary">
            Per qualsiasi necessità
            <br />
            siamo a vostra disposizione.
          </p>

          <Link
            href="/rsvp#contatti"
            className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary transition hover:text-accent"
          >
            Scrivici →
          </Link>

          <Image
            src="/decorations/branch.webp"
            alt=""
            width={120}
            height={120}
            className="object-contain pointer-events-none absolute bottom-0 right-0 hidden opacity-15 lg:block"
          />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 py-5">
          <p className="text-center text-xs text-secondary">
            Con amore,{" "}
            <span className="text-primary">
              Silvia &amp; Manuel
            </span>{" "}
            ♡
          </p>

          {/* Dal giorno del matrimonio non serve più segnarselo. */}
          {!after && !weddingDay && (
            <>
              <span
                aria-hidden="true"
                className="hidden h-3 w-px bg-border sm:block"
              />

              <a
                href="/calendario"
                className="text-xs text-secondary transition hover:text-primary"
              >
                Aggiungi al calendario
              </a>

              <span
                aria-hidden="true"
                className="hidden h-3 w-px bg-border sm:block"
              />

              {/* Per Android: apre l'evento già compilato, senza file. */}
              <a
                href={googleCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-secondary transition hover:text-primary"
              >
                Google Calendar
              </a>
            </>
          )}

          <span
            aria-hidden="true"
            className="hidden h-3 w-px bg-border sm:block"
          />

          <Link
            href="/lista-nozze"
            className="text-xs text-secondary transition hover:text-primary"
          >
            Per tutto ciò che verrà
          </Link>
        </div>
      </div>
    </footer>
  );
}