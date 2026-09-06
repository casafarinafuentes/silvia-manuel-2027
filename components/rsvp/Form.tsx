"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

import Section from "@/components/ui/Section";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import RadioCard from "@/components/ui/RadioCard";
import GuestCounter from "@/components/ui/GuestCounter";
import SubmitButton from "@/components/ui/SubmitButton";

import { submitRsvp, type RsvpState } from "@/lib/rsvp/actions";

const INITIAL: RsvpState = { status: "idle" };

function Success({
  firstName,
  attending,
}: {
  firstName: string;
  attending: boolean;
}) {
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
        Grazie, {firstName}
      </h2>

      <p className="mx-auto mt-6 max-w-md leading-8 text-secondary">
        {attending
          ? "Abbiamo registrato la tua conferma. Non vediamo l'ora di festeggiare con te."
          : "Ci dispiace che non potrai esserci, ma grazie per avercelo fatto sapere."}
      </p>
    </motion.div>
  );
}

export default function Form() {
  const [state, formAction] = useActionState(submitRsvp, INITIAL);

  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);

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
        <div className="rounded-[40px] border border-border bg-white px-6 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:px-10 md:px-16 md:py-18">
          <div className="mx-auto max-w-3xl">
            {state.status === "success" ? (
              <Success
                firstName={state.firstName}
                attending={state.attending}
              />
            ) : (
              <form action={formAction} noValidate>
                <div className="text-center">
                  <p className="text-[11px] uppercase tracking-[0.34em] text-secondary">
                    RSVP
                  </p>

                  <h2 className="mt-3 font-heading text-4xl font-light text-primary sm:text-5xl">
                    Conferma la tua presenza
                  </h2>

                  <p className="mx-auto mt-6 max-w-xl text-secondary">
                    Compila il modulo qui sotto. Ti richiederà meno di un
                    minuto.
                  </p>
                </div>

                {/* Anagrafica */}

                <div className="mt-14 grid gap-10 md:grid-cols-2">
                  <Input
                    label="Nome"
                    name="firstName"
                    placeholder="Mario"
                    autoComplete="given-name"
                    maxLength={80}
                    required
                    error={errors.firstName}
                  />

                  <Input
                    label="Cognome"
                    name="lastName"
                    placeholder="Rossi"
                    autoComplete="family-name"
                    maxLength={80}
                    required
                    error={errors.lastName}
                  />
                </div>

                <div className="mt-10 grid gap-10 md:grid-cols-2">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="nome@email.com"
                    autoComplete="email"
                    maxLength={160}
                    error={errors.email}
                  />

                  {/* Ha senso solo per chi partecipa. */}
                  {attending === true && (
                    <GuestCounter value={guests} onChange={setGuests} />
                  )}
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
                  <legend className="mb-6 text-[11px] uppercase tracking-[0.34em] text-secondary">
                    Parteciperai?
                  </legend>

                  <div role="radiogroup" className="grid gap-5 md:grid-cols-2">
                    <RadioCard
                      selected={attending === true}
                      title="Ci saremo"
                      subtitle="Non vediamo l'ora!"
                      onClick={() => setAttending(true)}
                    />

                    <RadioCard
                      selected={attending === false}
                      title="Non potremo esserci"
                      subtitle="Vi penseremo quel giorno."
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
                      <div className="mt-12">
                        <Input
                          label="Allergie o intolleranze"
                          name="dietary"
                          placeholder="Facoltativo"
                          maxLength={500}
                          error={errors.dietary}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-12">
                  <Textarea
                    label="Messaggio"
                    name="message"
                    placeholder="Lasciaci un pensiero..."
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
                  <SubmitButton>Invia conferma</SubmitButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
