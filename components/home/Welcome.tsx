import Image from "next/image";

import Section from "@/components/ui/Section";
import FeatureCard from "./FeatureCard";

import { homeCards } from "@/data/homeCards";

export default function Welcome() {
  return (
    <Section>
      <div className="relative z-10 ">
        {/* Decorazione */}

        <Image
  src="/decorations/branch.svg"
  alt=""
  width={430}
  height={430}
  className="
    pointer-events-none
    absolute
    -left-24
    -top-15
    z-0
    hidden
    scale-x-[-1]
    opacity-12
    lg:block
  "
/>

        {/* Testo */}

        <div className="mx-auto max-w-4xl text-center">
          {/* Il ritorno a capo manuale spezza male le righe su schermi
              stretti: lo lasciamo solo da md in su. */}
          <p className="font-heading text-[26px] leading-[1.2] text-primary sm:text-[30px] md:text-[34px]">
            Siamo felici di condividere con voi
            <br className="hidden md:inline" />{" "}
            uno dei giorni più importanti della nostra vita.
          </p>

          <div className="mt-7 flex items-center justify-center">
            <div className="h-px w-16 bg-border" />

            <span className="mx-5 text-sm text-accent">
              ❦
            </span>

            <div className="h-px w-16 bg-border" />
          </div>
        </div>

        {/* Card */}

        {/* Griglia responsive: quattro card da 300px fisse su una riga
            sola facevano sbordare la pagina in orizzontale su mobile. */}
        <div className="relative z-20 mx-auto mt-10 grid max-w-[1280px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </Section>
  );
}