"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Section from "@/components/ui/Section";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import RadioCard from "@/components/ui/RadioCard";
import GuestCounter from "@/components/ui/GuestCounter";
import SubmitButton from "@/components/ui/SubmitButton";

export default function Form() {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);

  return (
    <Section>
      <div className="mx-auto max-w-5xl">

        {/* Titolo */}

        <div className="text-center">

          <p className="text-[11px] uppercase tracking-[0.35em] text-secondary">
            Conferma
          </p>

          <h2 className="mt-3 font-heading text-5xl font-light text-primary">
            RSVP
          </h2>

          <div className="mx-auto mt-6 h-px w-14 bg-border" />

        </div>

        {/* Box */}

        <div className="mt-14 border border-border bg-white px-10 py-12 md:px-16 md:py-16">

          {/* Riga 1 */}

          <div className="grid gap-10 md:grid-cols-2">

            <Input
              label="Nome e Cognome"
              placeholder="Mario Rossi"
            />

            <Input
              label="Email"
              placeholder="nome@email.com"
              type="email"
            />

          </div>

          {/* Presenza */}

          <div className="mt-14">

            <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-secondary">
              Parteciperai?
            </p>

            <div className="grid gap-5 md:grid-cols-2">

              <RadioCard
                selected={attending === true}
                title="Saremo presenti"
                subtitle="Non vediamo l'ora!"
                onClick={() => setAttending(true)}
              />

              <RadioCard
                selected={attending === false}
                title="Non potremo esserci"
                subtitle="Ci mancherete."
                onClick={() => setAttending(false)}
              />

            </div>

          </div>

          {/* Campi dinamici */}

          <AnimatePresence>

            {attending === true && (

              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="overflow-hidden"
              >

                <div className="mt-14 grid gap-10 md:grid-cols-2">

                  <GuestCounter
                    value={guests}
                    onChange={setGuests}
                  />

                  <Input
                    label="Allergie o intolleranze"
                    placeholder="Facoltativo"
                  />

                </div>

              </motion.div>

            )}

          </AnimatePresence>

          {/* Messaggio */}

          <div className="mt-14">

            <Textarea
              label="Messaggio"
              placeholder="Lasciaci un pensiero..."
            />

          </div>

          {/* Bottone */}

          <div className="mt-16 flex justify-center">

            <SubmitButton>
              Invia conferma
            </SubmitButton>

          </div>

        </div>

      </div>
    </Section>
  );
}