import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Section from "@/components/ui/Section";
import Magnetic from "@/components/ui/Magnetic";

type NextStepProps = {
  /** Frase breve sopra il titolo, es. "Prossimo passo". */
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

/**
 * Invito a proseguire alla pagina successiva del percorso
 * (Matrimonio → RSVP → Hotel → Sardegna): a fine pagina l'invitato
 * sa sempre dove andare, senza dover riaprire il menu.
 */
export default function NextStep({
  eyebrow = "Prossimo passo",
  title,
  description,
  href,
  cta,
}: NextStepProps) {
  return (
    <Section>
      <div className="mx-auto max-w-2xl border-y border-border py-14 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-secondary">
          {eyebrow}
        </p>

        <h2 className="mt-4 font-heading text-3xl font-light text-primary md:text-4xl">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-md leading-7 text-secondary">
          {description}
        </p>

        <Magnetic className="mt-8">
          <Link href={href}
          className="group inline-flex items-center gap-3 bg-[#3F5643] px-8 py-3.5 text-xs uppercase tracking-[0.28em] text-white transition hover:bg-[#334637]"
        >
          {cta}
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
        </Magnetic>
      </div>
    </Section>
  );
}
