import { Bus } from "lucide-react";

import Section from "@/components/ui/Section";

export default function Navetta() {
  return (
    <Section className="py-6">
      <div
        className="
          mx-auto
          max-w-5xl
          rounded-[32px]
          border
          border-border
          bg-white
          px-8
          py-10
          shadow-[0_12px_40px_rgba(0,0,0,0.04)]
          lg:px-14
        "
      >
        <div className="text-center">
          {/* Icona */}

          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-border
              text-accent
            "
          >
            <Bus
              size={24}
              strokeWidth={1.5}
            />
          </div>

          {/* Titolo */}

          <h2 className="mt-6 font-heading text-[38px] font-light text-primary">
            Servizio navetta
          </h2>

          {/* Testo */}

          <div className="mt-5 space-y-1 text-lg leading-8 text-secondary">
            <p>
              Per gli ospiti che soggiorneranno negli hotel
              convenzionati,
            </p>

            <p>
              sarà disponibile una navetta dedicata
              da e per la location del matrimonio.
            </p>
          </div>

          {/* Nota */}

          <p className="mt-8 text-sm italic text-secondary">
            Gli orari saranno comunicati nei giorni
            precedenti all&apos;evento.
          </p>
        </div>
        
      </div>

     
    </Section>
  );
}