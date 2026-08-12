import Section from "@/components/ui/Section";

import HotelCard from "./HotelCard";

const hotels = [
  {
    title: "Hotel Cala di Volpe",
    image: "/hotel/cala-volpe.jpg",
    distance: "8 minuti dalla location",
    description:
      "Un'icona della Costa Smeralda, immersa in un paesaggio unico tra mare cristallino e macchia mediterranea. Eleganza senza tempo e servizi di altissimo livello.",
    href: "#",
    badges: [
      "Convenzione ospiti",
      "Navetta inclusa",
    ],
  },
  {
    title: "Hotel Romazzino",
    image: "/hotel/romazzino.jpg",
    distance: "10 minuti dalla location",
    description:
      "Affacciato su una delle spiagge più belle della Sardegna, offre ambienti raffinati, camere luminose e un'atmosfera rilassata perfetta per il weekend del matrimonio.",
    href: "#",
    badges: [
      "Convenzione ospiti",
      "Navetta inclusa",
    ],
  },
  {
    title: "Hotel Pitrizza",
    image: "/hotel/pitrizza.jpg",
    distance: "12 minuti dalla location",
    description:
      "Un boutique hotel esclusivo con vista sul mare, piscina panoramica e un'esperienza intima, ideale per chi desidera il massimo del relax.",
    href: "#",
    badges: [
      "Convenzione ospiti",
      "Navetta inclusa",
    ],
  },
];

export default function Hotels() {
  return (
    <Section className="pt-4">
      <div className="mx-auto max-w-7xl space-y-5">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.title}
            {...hotel}
          />
        ))}
      </div>
    </Section>
  );
}