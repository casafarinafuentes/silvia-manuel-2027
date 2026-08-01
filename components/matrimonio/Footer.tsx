import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/ui/Countdown";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-12 lg:grid lg:grid-cols-[120px_2.2fr_1fr_1fr] lg:items-start lg:gap-10 lg:px-10">
        {/* Logo */}

        <div className="flex w-full justify-center lg:w-auto lg:justify-start">
          <div className="relative h-16 w-16">
            <span className="absolute left-0 top-0 font-heading text-5xl font-light text-primary">
              S
            </span>

            <span className="absolute bottom-0 right-0 font-heading text-5xl font-light text-primary">
              M
            </span>

            <div className="absolute left-1/2 top-1/2 h-[72px] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-border" />
          </div>
        </div>

        {/* Countdown */}

        <div className="w-full text-center lg:border-l lg:border-border lg:pl-10 lg:text-left">
          <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-secondary">
            Countdown
          </p>

          <div className="flex justify-center lg:justify-start">
            <Countdown />
          </div>
        </div>

        {/* FAQ */}

        <div className="w-full text-center lg:border-l lg:border-border lg:pl-10 lg:text-left">
          <p className="text-[11px] uppercase tracking-[0.35em] text-secondary">
            Domande frequenti
          </p>

          <p className="mt-5 text-sm leading-7 text-secondary">
            Hai qualche dubbio?
            <br />
            Trova qui le risposte
            <br />
            alle domande più comuni.
          </p>

          <Link
            href="#faq"
            className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary transition hover:text-accent"
          >
            Scopri di più →
          </Link>
        </div>

        {/* Contatti */}

        <div className="w-full text-center lg:border-l lg:border-border lg:pl-10 lg:text-left">
          <p className="text-[11px] uppercase tracking-[0.35em] text-secondary">
            Contatti
          </p>

          <p className="mt-5 text-sm leading-7 text-secondary">
            Per qualsiasi necessità
            <br />
            siamo a vostra disposizione.
          </p>

          <Link
            href="/contatti"
            className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary transition hover:text-accent"
          >
            Scrivici →
          </Link>

          <Image
            src="/decorations/branch.svg"
            alt=""
            width={120}
            height={120}
            className="pointer-events-none absolute bottom-0 right-0 hidden opacity-15 lg:block"
          />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl justify-center px-6 py-5">
          <p className="text-center text-xs text-secondary">
            Con amore,{" "}
            <span className="text-primary">
              Silvia &amp; Manuel
            </span>{" "}
            ♡
          </p>
        </div>
      </div>
    </footer>
  );
}