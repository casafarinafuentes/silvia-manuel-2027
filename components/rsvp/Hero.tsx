import PageHero from "@/components/ui/PageHero";
import { rsvpDeadlineLabel } from "@/lib/rsvp/deadline";
import { isRsvpClosed, type WeddingPhase } from "@/lib/temporal";
import { useLocale } from "next-intl";
import { fill } from "@/i18n/pair";
import { useM } from "@/i18n/use-messages";
import { rsvpMessages } from "@/i18n/messages/rsvp";


export default function Hero({ phase }: { phase: WeddingPhase }) {
  const locale = useLocale();
  const { hero } = useM(rsvpMessages);

  // La scadenza si cita solo finché non è passata.
  const subtitle =
    phase === "rsvp"
      ? fill(hero.open, { date: rsvpDeadlineLabel(locale) })
      : isRsvpClosed(phase)
        ? hero.closed
        : hero.late;

  return (
    <PageHero
      title={hero.title}
      subtitle={subtitle}
      image="/rsvp/rsvp-hero.jpg"
      alt=""
      imageClassName="object-cover object-[center_28%]"
      overlayClassName="bg-black/30"
    />
  );
}
