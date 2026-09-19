import Image from "next/image";
import {
  ArrowRight,
  Bus,
  Coffee,
  Flower2,
  MapPin,
  Palmtree,
  BedDouble,
  Utensils,
  Droplets,
  Waves,
} from "lucide-react";

import { hotelMapsUrl, type Hotel, type HotelFeature } from "@/data/hotels";

const featureIcons: Record<HotelFeature, typeof Waves> = {
  sea: Waves,
  pool: Droplets,
  beach: Palmtree,
  breakfast: Coffee,
  rooms: BedDouble,
  garden: Flower2,
  restaurant: Utensils,
};

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className="overflow-hidden rounded-panel border border-border bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.05)] motion-reduce:transition-none">
      <div className="grid lg:grid-cols-[46%_54%]">
        {/* FOTO */}

        <div className="group relative min-h-[320px] overflow-hidden" data-cursor="Hotel">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>

        {/* TESTO */}

        <div className="flex flex-col p-8">
          {/* Badge */}

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-accent">
              <Bus size={11} aria-hidden="true" />
              Navetta inclusa
            </span>
          </div>

          {/* Titolo */}

          <h3 className="mt-5 font-heading text-[38px] font-light leading-none text-primary md:text-[42px]">
            {hotel.name}
          </h3>

          {/* Stelle */}

          <div
            className="mt-3 flex gap-1 text-[17px] text-accent"
            role="img"
            aria-label={`${hotel.stars} stelle`}
          >
            {"★".repeat(hotel.stars)}
          </div>

          {/* Informazioni */}

          <div className="mt-5 grid gap-y-3 text-[15px] text-secondary sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <MapPin size={15} aria-hidden="true" />
              <span>Cannigione</span>
            </div>

            {hotel.features.map((feature) => {
              const Icon = featureIcons[feature.icon];

              return (
                <div key={feature.label} className="flex items-center gap-2">
                  <Icon size={15} aria-hidden="true" />
                  <span>{feature.label}</span>
                </div>
              );
            })}
          </div>

          {/* Descrizione */}

          <p className="mt-6 max-w-xl text-[16px] leading-7 text-secondary">
            {hotel.description}
          </p>

          {/* Prezzo */}

          <p className="mt-5 text-sm text-primary">
            <span className="mr-2 text-xs uppercase tracking-[0.24em] text-secondary">
              Prezzo indicativo
            </span>
            {hotel.priceRange ?? "Fascia in arrivo"}
          </p>

          {/* CTA */}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={hotel.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-3 text-xs uppercase tracking-[0.3em] text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              Scopri l&apos;hotel
              <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
            </a>

            <a
              href={hotelMapsUrl(hotel)}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-border pb-1 text-xs uppercase tracking-[0.24em] text-secondary transition hover:border-primary hover:text-primary"
            >
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
