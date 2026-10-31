import { Bus } from "lucide-react";

import Section from "@/components/ui/Section";
import { useM } from "@/i18n/use-messages";
import { hotelMessages } from "@/i18n/messages/hotel";

export default function Navetta() {
  const { navetta } = useM(hotelMessages);

  return (
    <Section className="py-6">
      <div
        className="
          mx-auto
          max-w-5xl
          rounded-photo
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
            {navetta.title}
          </h2>

          {/* Testo */}

          <div className="mt-5 space-y-1 text-lg leading-8 text-secondary">
            {navetta.text.split("\n").map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          {/* Nota */}

          <p className="mt-8 text-sm italic text-secondary">
            {navetta.note}
          </p>
        </div>
        
      </div>

     
    </Section>
  );
}