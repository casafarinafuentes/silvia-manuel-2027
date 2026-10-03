import PageHero from "@/components/ui/PageHero";
import { rsvpDeadlineLabel } from "@/lib/rsvp/deadline";

export default function Hero() {
  return (
    <PageHero
      title="RSVP"
      subtitle={`Conferma entro il ${rsvpDeadlineLabel()}`}
      image="/rsvp/rsvp-hero.jpg"
      alt=""
      imageClassName="object-cover object-[center_28%]"
      overlayClassName="bg-black/30"
    />
  );
}
