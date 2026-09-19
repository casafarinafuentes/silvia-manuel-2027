import Section from "@/components/ui/Section";

import HotelCard from "./HotelCard";
import { hotels } from "@/data/hotels";

export default function Hotels() {
  return (
    <Section className="pt-4">
      <div className="mx-auto max-w-7xl space-y-5">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}

        <p className="pt-2 text-center text-xs text-secondary">
          Fotografie dai siti ufficiali degli hotel.
        </p>
      </div>
    </Section>
  );
}
