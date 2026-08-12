import Image from "next/image";

import Section from "@/components/ui/Section";

export default function Intro() {
  return (
    <Section className="pb-0">
      <div className="relative">
        {/* Decorazione */}

        <Image
          src="/decorations/branch.svg"
          alt=""
          width={470}
          height={470}
          className="
            pointer-events-none
            absolute
            -left-28
            -top-8
            z-0
            hidden
            scale-x-[-1]
            opacity-20
            lg:block
          "
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-[48px] font-light leading-[1.15] text-primary md:text-[40px]">
            Per un soggiorno
            
            indimenticabile
          </h2>

          <div className="mt-8 flex items-center justify-center">
            <div className="h-px w-16 bg-border" />

            <span className="mx-5 text-sm text-accent">
              ❦
            </span>

            <div className="h-px w-16 bg-border" />
          </div>

          <div className="mt-8 space-y-0 text-lg leading-8 text-secondary">
            <p>
              Per rendere il vostro soggiorno il più piacevole possibile, abbiamo raccolto alcune strutture
            </p>

            <p>
              selezionate
              nelle vicinanze della location.
            
              Alcune potrebbero offrire condizioni dedicate
              ai nostri ospiti.
            </p>
          </div>

        

      
        </div>
      </div>
    </Section>
  );
}