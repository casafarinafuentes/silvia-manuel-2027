import Reveal from "@/components/ui/Reveal";

/**
 * Itinerari indicativi, composti solo con luoghi già presenti in
 * questa pagina. Da confermare prima della pubblicazione definitiva.
 */
const itineraries = [
  {
    duration: "1 giorno",
    lead: "Il minimo indispensabile",
    places: ["Spiaggia del Principe", "San Pantaleo", "Aperitivo", "Cena"],
  },
  {
    duration: "3 giorni",
    lead: "Il tempo di respirare",
    places: [
      "Tour della Maddalena",
      "Cala Moresca",
      "San Pantaleo",
      "Porto Cervo",
    ],
  },
  {
    duration: "5+ giorni",
    lead: "Fino in fondo",
    places: ["Golfo di Orosei", "Cala Moresca", "Stintino", "Alghero"],
  },
];

export default function QuickGuide() {
  return (
    // Il beige chiude la pagina e la stacca dal bianco delle sezioni
    // precedenti: è la gerarchia cromatica chiesta dal brief.
    <section className="bg-panel px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 max-w-2xl md:mb-20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-secondary">
            Piccoli itinerari
          </p>

          {/* Un gradino sotto ai titoli delle sezioni principali:
              questa è una chiusura, non un capitolo. */}
          <h2 className="mt-4 font-heading text-4xl font-light text-primary md:text-5xl">
            Se avete qualche giorno in più
          </h2>

          <p className="mt-6 text-[17px] leading-8 text-secondary">
            Qualche idea per organizzare il vostro tempo in Sardegna
            senza dover pensare troppo.
          </p>
        </Reveal>

        {/* Righe editoriali separate da filetti sottili, invece di tre
            riquadri identici: la durata fa da ancora tipografica e i
            luoghi scorrono come testo. */}
        <div className="border-t border-border/70">
          {itineraries.map((itinerary, index) => (
            <Reveal key={itinerary.duration} delay={index * 80}>
              <div className="grid gap-5 border-b border-border/70 py-10 md:grid-cols-[230px_1fr] md:gap-12 md:py-12">
                <div>
                  <p className="font-heading text-3xl font-light leading-none text-primary md:text-4xl">
                    {itinerary.duration}
                  </p>

                  <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-secondary">
                    {itinerary.lead}
                  </p>
                </div>

                <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-2 md:gap-x-4">
                  {itinerary.places.map((place, placeIndex) => (
                    <li
                      key={place}
                      className="flex items-baseline gap-3 md:gap-4"
                    >
                      {placeIndex > 0 && (
                        <span aria-hidden="true" className="text-secondary/35">
                          ·
                        </span>
                      )}

                      <span className="font-heading text-xl font-light text-primary md:text-2xl">
                        {place}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
