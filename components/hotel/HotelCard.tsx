import { ArrowUpRight, MapPin } from "lucide-react";

import { hotelMapsUrl, type Hotel } from "@/data/hotels";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className="group flex h-full flex-col rounded-panel border border-border bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.05)] motion-reduce:transition-none">
      <p className="text-xs uppercase tracking-[0.3em] text-secondary">
        {hotel.category}
      </p>

      <h3 className="mt-4 font-heading text-3xl font-light leading-tight text-primary">
        {hotel.name}
      </h3>

      <p className="mt-4 flex items-center gap-2 text-[13px] text-secondary">
        <MapPin size={14} aria-hidden="true" />
        Cannigione
      </p>

      <p className="mt-5 flex-1 leading-7 text-secondary">
        {hotel.description}
      </p>

      <div className="mt-6 border-t border-border pt-5">
        <p className="text-xs uppercase tracking-[0.24em] text-secondary">
          Prezzo indicativo
        </p>

        <p className="mt-2 text-sm text-primary">
          {hotel.priceRange ?? "Fascia di prezzo in arrivo"}
        </p>
      </div>

      <a
        href={hotelMapsUrl(hotel)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-fit items-center gap-2 border-b border-border pb-1 text-xs uppercase tracking-[0.24em] text-primary transition hover:border-primary"
      >
        Vedi su Google Maps
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </article>
  );
}
