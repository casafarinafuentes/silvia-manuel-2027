import { Car } from "lucide-react";

import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { useM } from "@/i18n/use-messages";
import { travelMessages } from "@/i18n/messages/travel";

/** Il messaggio chiave della pagina: serve l'auto. Con le distanze. */
export default function CarNotice() {
  const { car } = useM(travelMessages);

  return (
    <Section id="auto" className="anchor-offset py-6">
      <Reveal className="mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-panel bg-primary px-8 py-12 text-white md:px-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <Car size={28} strokeWidth={1.4} aria-hidden="true" />

            <p className="mt-6 text-xs uppercase tracking-[0.35em] text-white/80">
              {car.eyebrow}
            </p>

            <h2 className="mt-4 font-heading text-4xl font-light leading-tight md:text-5xl">
              {car.title}
            </h2>

            <p className="mt-6 leading-8 text-white/90">{car.text}</p>

            <p className="mt-6 border-t border-white/25 pt-5 text-sm leading-7 text-white/85">
              {car.wedding}
            </p>
          </div>

          <div className="rounded-photo bg-white/10 p-6 md:p-8">
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/80">
              {car.tableTitle}
            </h3>

            <dl className="mt-5">
              {car.rows.map((row) => (
                <div
                  key={row.place}
                  className="flex items-center justify-between gap-4 border-b border-white/20 py-4 last:border-b-0"
                >
                  <dt className="text-[15px]">{row.place}</dt>

                  <dd className="flex shrink-0 flex-col items-end text-right">
                    <span className="font-heading text-2xl font-light leading-none">
                      {row.time}
                    </span>
                    <span className="mt-1 text-xs text-white/75">{row.distance}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 text-xs text-white/70">{car.note}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
