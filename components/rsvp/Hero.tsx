import PageHero from "@/components/ui/PageHero";
import { rsvpDeadlineLabel } from "@/lib/rsvp/deadline";
import { isRsvpClosed, type WeddingPhase } from "@/lib/temporal";

export default function Hero({ phase }: { phase: WeddingPhase }) {
  // La scadenza si cita solo finché non è passata.
  const subtitle =
    phase === "rsvp"
      ? `Conferma entro il ${rsvpDeadlineLabel()}`
      : isRsvpClosed(phase)
        ? "Le conferme sono chiuse"
        : "Conferma la tua presenza";

  return (
    <PageHero
      title="RSVP"
      subtitle={subtitle}
      image="/rsvp/rsvp-hero.jpg"
      alt=""
      imageClassName="object-cover object-[center_28%]"
      overlayClassName="bg-black/30"
    />
  );
}
