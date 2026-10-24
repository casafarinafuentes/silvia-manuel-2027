"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale } from "next-intl";

import { Link } from "@/i18n/navigation";
import Section from "@/components/ui/Section";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import RadioCard from "@/components/ui/RadioCard";
import GuestCounter from "@/components/ui/GuestCounter";
import SubmitButton from "@/components/ui/SubmitButton";
import Magnetic from "@/components/ui/Magnetic";
import { usePhase } from "@/components/layout/PhaseProvider";
import { useM } from "@/i18n/use-messages";
import { rsvpMessages } from "@/i18n/messages/rsvp";
import { fill } from "@/i18n/pair";

import { submitRsvp, type RsvpState } from "@/lib/rsvp/actions";
import { isPastRsvpDeadline, rsvpDeadlineLabel } from "@/lib/rsvp/deadline";
import {
  HOTEL_SECTION_ENABLED,
  HOTEL_SELF_ARRANGED,
  hotels,
} from "@/data/hotels";

const INITIAL: RsvpState = { status: "idle" };

function Success({
  firstName,
  attending,
}: {
  firstName: string;
  attending: boolean;
}) {
  const { success } = useM(rsvpMessages);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-10 text-center"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
        <Check size={24} />
      </div>

      <h2 className="mt-8 font-heading text-4xl font-light text-primary md:text-5xl">
        {fill(success.title, { name: firstName })}
      </h2>

      <p className="mx-auto mt-6 max-w-md leading-8 text-secondary">
        {attending ? success.yes : success.no}
      </p>
    </motion.div>
  );
}

export default function Form() {
  const [state, formAction] = useActionState(submitRsvp, INITIAL);
  const locale = useLocale();
  const { form: t } = useM(rsvpMessages);
  const date = rsvpDeadlineLabel(locale);

  // Scadenza passata ma matrimonio non ancora arrivato: il modulo
  // resta aperto, con un invito a fare presto.
  const late = usePhase() !== "rsvp";

  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [hotel, setHotel] = useState<string>("");

  // Calcolato lato client: chi apre la pagina dopo la scadenza non vede
  // la scelta dell'hotel (il server la ignora comunque).
  const [pastDeadline] = useState(() => isPastRsvpDeadline());

  const errorRef = useRef<HTMLParagraphElement>(null);

  const errors = state.status === "error" ? state.errors : {};

  // Un errore generale può finire fuori dallo schermo su mobile:
  // lo portiamo in vista e lo annunciamo agli screen reader.
  useEffect(() => {
    if (errors.form) {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [errors.form]);

  return (
    <Section>
      <div className="mx-auto max-w-5xl">
        <div className="rounded-panel border border-border bg-white px-6 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:px-10 md:px-16 md:py-18">
          <div className="mx-auto max-w-3xl">
            {state.status === "success" ? (
              <Success
                firstName={state.firstName}
                attending={state.attending}
              />
            ) : (
              <form action={formAction} noValidate>
                <input type="hidden" name="locale" value={locale} />

                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.34em] text-secondary">
                    {t.eyebrow}
                  </p>

                  <h2 className="mt-3 font-heading text-4xl font-light text-primary sm:text-5xl">
                    {t.title}
                  </h2>

                  <p className="mx-auto mt-6 max-w-xl text-secondary">
                    {t.lead}
                  </p>

                  {late && (
                    <p className="mx-auto mt-8 max-w-xl border border-border bg-panel-photo px-6 py-4 text-sm leading-7 text-secondary">
                      {fill(t.late, { date })}
                    </p>
                  )}
                </div>

                {/* Anagrafica */}

                <div className="mt-14 grid gap-10 md:grid-cols-2">
                  <Input
                    label={t.firstName}
                    name="firstName"
                    placeholder={t.firstNamePlaceholder}
                    autoComplete="given-name"
                    maxLength={80}
                    required
                    error={errors.firstName}
                  />

                  <Input
                    label={t.lastName}
                    name="lastName"
                    placeholder={t.lastNamePlaceholder}
                    autoComplete="family-name"
                    maxLength={80}
                    required
                    error={errors.lastName}
                  />
                </div>

                {/* Email a tutta larghezza: affiancarla al contatore
                    ospiti, che compare solo confermando la presenza,
                    lasciava mezza riga vuota. Il contatore è ora nel
                    blocco condizionale più sotto, dove ha senso. */}
                <div className="mt-10">
                  <Input
                    label={t.email}
                    name="email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    autoComplete="email"
                    maxLength={160}
                    error={errors.email}
                  />
                </div>

                {/* Il contatore è un controllo custom: il valore viaggia qui. */}
                <input
                  type="hidden"
                  name="partySize"
                  value={attending ? guests : 1}
                />

                <input
                  type="hidden"
                  name="attending"
                  value={attending === null ? "" : String(attending)}
                />

                {/* Presenza */}

                <fieldset className="mt-14 border-0 p-0">
                  <legend className="mb-6 text-xs uppercase tracking-[0.34em] text-secondary">
                    {t.attendingLegend}
                  </legend>

                  <div role="radiogroup" className="grid gap-5 md:grid-cols-2">
                    <RadioCard
                      selected={attending === true}
                      title={t.yes}
                      subtitle={t.yesSub}
                      onClick={() => setAttending(true)}
                    />

                    <RadioCard
                      selected={attending === false}
                      title={t.no}
                      subtitle={t.noSub}
                      onClick={() => setAttending(false)}
                    />
                  </div>

                  {errors.attending && (
                    <p role="alert" className="mt-4 text-[13px] text-[#a4553f]">
                      {errors.attending}
                    </p>
                  )}
                </fieldset>

                {/* Solo per chi partecipa */}

                <AnimatePresence initial={false}>
                  {attending === true && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
                        <GuestCounter value={guests} onChange={setGuests} />

                        <Input
                          label={t.dietary}
                          name="dietary"
                          placeholder={t.optional}
                          maxLength={500}
                          error={errors.dietary}
                        />
                      </div>

                      {/* Alloggio: nascosto finché la sezione hotel è spenta. */}

                      {HOTEL_SECTION_ENABLED && (
                      <fieldset className="mt-12 border-0 p-0">
                        <legend className="mb-2 text-xs uppercase tracking-[0.34em] text-secondary">
                          {t.lodging.legend}
                        </legend>

                        {pastDeadline ? (
                          <p className="mt-4 border border-border bg-panel-photo px-6 py-5 text-sm leading-7 text-secondary">
                            {fill(t.lodging.pastDeadline, { date })}
                          </p>
                        ) : (
                          <>
                            <input type="hidden" name="hotel" value={hotel} />

                            <p className="mb-6 text-[13px] leading-6 text-secondary">
                              {fill(t.lodging.note, { date })}{" "}
                              <Link
                                href="/hotel"
                                className="underline underline-offset-4"
                              >
                                {t.lodging.seeHotels}
                              </Link>
                              .
                            </p>

                            <div
                              role="radiogroup"
                              aria-label={t.lodging.label}
                              className="grid gap-3"
                            >
                              {[
                                ...hotels.map((h) => ({
                                  id: h.id,
                                  title: h.name,
                                  subtitle: [`${"★".repeat(h.stars)}`, h.priceRange]
                                    .filter(Boolean)
                                    .join(" · "),
                                })),
                                {
                                  id: HOTEL_SELF_ARRANGED,
                                  title: t.lodging.selfArranged,
                                  subtitle: t.lodging.selfArrangedSub,
                                },
                              ].map((option) => (
                                <button
                                  key={option.id}
                                  type="button"
                                  role="radio"
                                  aria-checked={hotel === option.id}
                                  onClick={() => setHotel(option.id)}
                                  className={`flex items-center justify-between gap-4 rounded-tile border px-6 py-4 text-left transition-colors duration-300 ${
                                    hotel === option.id
                                      ? "border-primary bg-[#faf8f3]"
                                      : "border-border bg-white hover:border-primary/50"
                                  }`}
                                >
                                  <span>
                                    <span className="block font-heading text-xl text-primary">
                                      {option.title}
                                    </span>
                                    <span className="mt-1 block text-[13px] text-secondary">
                                      {option.subtitle}
                                    </span>
                                  </span>

                                  <span
                                    aria-hidden="true"
                                    className={`h-4 w-4 shrink-0 rounded-full border ${
                                      hotel === option.id
                                        ? "border-primary bg-primary"
                                        : "border-border"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>

                            {errors.hotel && (
                              <p
                                role="alert"
                                className="mt-4 text-[13px] text-[#a4553f]"
                              >
                                {errors.hotel}
                              </p>
                            )}
                          </>
                        )}
                      </fieldset>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-12">
                  <Textarea
                    label={t.message}
                    name="message"
                    placeholder={t.messagePlaceholder}
                    maxLength={2000}
                    error={errors.message}
                  />
                </div>

                {errors.form && (
                  <p
                    ref={errorRef}
                    role="alert"
                    className="mt-10 border border-[#e2c4ba] bg-[#fbf3f0] px-6 py-4 text-center text-sm leading-6 text-[#a4553f]"
                  >
                    {errors.form}
                  </p>
                )}

                <div className="mt-16 flex justify-center">
                  <Magnetic>
                    <SubmitButton>{t.submit}</SubmitButton>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
