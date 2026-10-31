import { useLocale } from "next-intl";

import { Link } from "@/i18n/navigation";
import { fill } from "@/i18n/pair";
import { rsvpDeadlineLabel } from "@/lib/rsvp/deadline";
import Section from "@/components/ui/Section";
import { useM } from "@/i18n/use-messages";
import { hotelMessages } from "@/i18n/messages/hotel";

export default function HowItWorks() {
  const { how } = useM(hotelMessages);
  const date = rsvpDeadlineLabel(useLocale());
  const steps = how.steps;

  return (
    <Section className="pt-6 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-panel bg-panel px-8 py-12 md:px-14">
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            {how.eyebrow}
          </p>

          <h2 className="mt-4 max-w-2xl font-heading text-4xl font-light text-primary md:text-5xl">
            {how.title}
          </h2>

          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="font-heading text-5xl font-light text-accent">
                  {index + 1}
                </span>

                <h3 className="mt-3 font-heading text-2xl text-primary">
                  {fill(step.title, { date })}
                </h3>

                <p className="mt-3 leading-7 text-secondary">{step.text}</p>
              </li>
            ))}
          </ol>

          <p className="mt-12 max-w-3xl border-t border-border pt-6 text-sm leading-7 text-secondary">
            <strong className="font-medium text-primary">
              {fill(how.lateTitle, { date })}
            </strong>{" "}
            {how.lateText}
            <Link
              href="/rsvp#contatti"
              className="mx-1 underline underline-offset-4"
            >
              {how.lateLink}
            </Link>{" "}
            {how.lateEnd}
          </p>
        </div>
      </div>
    </Section>
  );
}
