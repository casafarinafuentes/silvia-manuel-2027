import { BedDouble } from "lucide-react";

/** Ricerche già impostate sulla zona della location. */
const links = [
  {
    label: "Cerca su Airbnb",
    href: "https://www.airbnb.it/s/Cannigione--Sardegna/homes",
  },
  {
    label: "Cerca su Booking",
    href: "https://www.booking.com/searchresults.it.html?ss=Cannigione",
  },
];

/**
 * Barra con un consiglio sull'alloggio: non gestiamo noi gli hotel,
 * quindi indirizziamo gli ospiti a cercare per conto proprio.
 */
export default function StayTip() {
  return (
    <section id="dove-dormire" className="anchor-offset px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 bg-primary px-8 py-8 text-center text-white lg:flex-row lg:gap-10 lg:px-12 lg:text-left">
        <BedDouble
          size={26}
          strokeWidth={1.4}
          aria-hidden="true"
          className="shrink-0 text-white"
        />

        <div className="flex-1">
          <h2 className="font-heading text-2xl font-light text-white sm:text-3xl">
            Hai bisogno di un consiglio su dove dormire?
          </h2>

          <p className="mt-3 leading-7 text-white/90">
            Ti suggeriamo di cercare su Airbnb o Booking nelle zone
            limitrofe: Cannigione, Arzachena, Baja Sardinia e Palau sono
            tutte a pochi minuti dalla location.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap justify-center gap-x-8 gap-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="border-b border-white/60 pb-1 text-xs uppercase tracking-[0.24em] text-white transition hover:border-white hover:text-[#e6d3b3]"
            >
              {link.label} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
