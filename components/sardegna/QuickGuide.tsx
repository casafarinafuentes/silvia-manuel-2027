const itineraries = [
  {
    duration: "1 giorno",
    places: [
      "Spiaggia del Principe",
      "San Pantaleo",
      "Aperitivo",
      "Cena",
    ],
  },
  {
    duration: "3 giorni",
    places: [
      "Tour della Maddalena",
      "Cala Moresca",
      "San Pantaleo",
      "Porto Cervo",
    ],
  },
  {
    duration: "5+ giorni",
    places: [
      "Golfo di Orosei",
      "Cala Moresca",
      "Stintino",
      "Alghero",
    ],
  },
];

export default function QuickGuide() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-secondary">
            Piccoli itinerari
          </p>

          <h2 className="mt-4 font-heading text-5xl font-light text-primary md:text-6xl">
            Se avete qualche giorno in più
          </h2>

          <p className="mt-6 text-[17px] leading-8 text-secondary">
            Qualche idea per organizzare il vostro tempo
            in Sardegna senza dover pensare troppo.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {itineraries.map((itinerary) => (
            <div
              key={itinerary.duration}
              className="
                rounded-[28px]
                border
                border-border
                bg-white
                p-8
              "
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-secondary">
                {itinerary.duration}
              </p>

              <div className="mt-8 space-y-4">
                {itinerary.places.map((place, index) => (
                  <div
                    key={place}
                    className="flex gap-4"
                  >
                    <span className="text-[10px] text-secondary">
                      0{index + 1}
                    </span>

                    <span className="font-heading text-xl font-light text-primary">
                      {place}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}