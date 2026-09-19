import Section from "@/components/ui/Section";

import HotelCard from "./HotelCard";
import { hotels } from "@/data/hotels";

export default function Hotels() {
  return (
    <Section className="pt-4">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </Section>
  );
}
