import { ArrowUpRight, Lightbulb, Plane, Ship } from "lucide-react";

import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { useM } from "@/i18n/use-messages";
import { travelMessages } from "@/i18n/messages/travel";

const CTA =
  "mt-8 inline-flex items-center gap-2 self-start border-b border-primary pb-1 text-xs uppercase tracking-[0.26em] text-primary transition hover:opacity-60";

/**
 * Come arrivare: nave (consigliata, si porta l'auto) e aereo (serve
 * il noleggio). Due schede affiancate, la nave in evidenza.
 */
export default function Arrivals() {
  const { arrive, ship, plane } = useM(travelMessages);

  return (
    <Section id="come-arrivare" className="anchor-offset">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            {arrive.eyebrow}
          </p>

          <h2 className="mt-4 font-heading text-4xl font-light text-primary md:text-5xl">
            {arrive.title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-secondary">{arrive.text}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Nave */}

          <Reveal className="h-full">
            <article className="flex h-full flex-col rounded-panel border border-primary/40 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] md:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border text-accent">
                  <Ship size={24} strokeWidth={1.5} aria-hidden="true" />
                </span>

                <span className="rounded-full bg-primary px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-white">
                  {ship.badge}
                </span>
              </div>

              <h3 className="mt-6 font-heading text-[38px] font-light leading-none text-primary">
                {ship.title}
              </h3>

              <p className="mt-4 leading-7 text-secondary">{ship.lead}</p>

              <ul className="mt-7 border-t border-border">
                {ship.routes.map((route) => (
                  <li
                    key={`${route.from}-${route.to}`}
                    className="border-b border-border py-4"
                  >
                    <p className="font-heading text-2xl font-light text-primary">
                      {route.from} <span className="text-accent">→</span> {route.to}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-secondary">
                      {route.when} · {route.duration}
                    </p>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 space-y-2">
                {ship.tips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-sm leading-6 text-secondary">
                    <Lightbulb
                      size={15}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-accent"
                    />
                    {tip}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs leading-6 text-secondary">{ship.companies}</p>

              <div className="flex-1" />

              <a href={ship.ctaUrl} target="_blank" rel="noopener noreferrer" className={CTA}>
                {ship.cta}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </article>
          </Reveal>

          {/* Aereo */}

          <Reveal delay={120} className="h-full">
            <article className="flex h-full flex-col rounded-panel border border-border bg-white p-8 md:p-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border text-accent">
                <Plane size={24} strokeWidth={1.5} aria-hidden="true" />
              </span>

              <h3 className="mt-6 font-heading text-[38px] font-light leading-none text-primary">
                {plane.title}
              </h3>

              <p className="mt-4 leading-7 text-secondary">{plane.lead}</p>

              <ul className="mt-7 border-t border-border">
                {plane.airports.map((airport) => (
                  <li key={airport.code} className="border-b border-border py-4">
                    <p className="font-heading text-2xl font-light text-primary">
                      {airport.name}{" "}
                      <span className="text-sm tracking-[0.2em] text-accent">
                        {airport.code}
                      </span>
                    </p>

                    <p className="mt-1 text-sm leading-6 text-secondary">{airport.note}</p>
                  </li>
                ))}
              </ul>

              <p className="mt-6 flex gap-3 text-sm leading-6 text-secondary">
                <Lightbulb
                  size={15}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-accent"
                />
                {plane.abroad}
              </p>

              <div className="flex-1" />

              <a href={plane.ctaUrl} target="_blank" rel="noopener noreferrer" className={CTA}>
                {plane.cta}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
