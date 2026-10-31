import Section from "@/components/ui/Section";

import HotelCard from "./HotelCard";
import { hotels, type Hotel } from "@/data/hotels";
import { useM } from "@/i18n/use-messages";
import { hotelMessages } from "@/i18n/messages/hotel";

/** Come l'elenco dell'agenzia: dalle cinque stelle al residence. */
const groups = [
  { key: "five", match: (h: Hotel) => h.category === "hotel" && h.stars === 5 },
  { key: "four", match: (h: Hotel) => h.category === "hotel" && h.stars === 4 },
  { key: "three", match: (h: Hotel) => h.category === "hotel" && h.stars === 3 },
  { key: "residence", match: (h: Hotel) => h.category === "residence" },
] as const;

export default function Hotels() {
  const { groups: titles, priceNote } = useM(hotelMessages);

  return (
    <Section className="pt-4">
      <div className="mx-auto max-w-7xl space-y-14">
        {groups.map((group) => {
          const items = hotels.filter(group.match);

          if (items.length === 0) return null;

          return (
            <div key={group.key} className="space-y-5">
              <div className="flex items-center gap-5">
                <span className="h-px w-9 bg-border" />

                <h2 className="text-xs uppercase tracking-[0.38em] text-secondary">
                  {titles[group.key]}
                </h2>
              </div>

              {items.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          );
        })}

        <div className="mx-auto max-w-3xl space-y-2 pt-2 text-center text-xs leading-6 text-secondary">
          <p>{priceNote.text}</p>

          <p>{priceNote.photos}</p>
        </div>
      </div>
    </Section>
  );
}
