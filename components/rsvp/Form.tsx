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

        <div
  className="
    rounded-[40px]
    border
    border-border
    bg-white
    px-12
    py-14
    shadow-[0_20px_60px_rgba(0,0,0,0.06)]
    md:px-16
    md:py-18
  "
>

  <div className="mx-auto max-w-3xl">

    <div className="text-center">

      <p className="text-[11px] uppercase tracking-[0.34em] text-secondary">
        RSVP
      </p>

      <h2 className="mt-3 font-heading text-5xl font-light text-primary">
        Conferma la tua presenza
      </h2>

      <p className="mx-auto mt-6 max-w-xl text-secondary">
        Compila il modulo qui sotto.
        Ti richiederà meno di un minuto.
      </p>

    </div>

    {/* Prima riga */}

    <div className="mt-14 grid gap-10 md:grid-cols-2">

      <Input
        label="Nome"
        placeholder="Mario"
      />

      <Input
        label="Cognome"
        placeholder="Rossi"
      />

    </div>

    {/* Seconda riga */}

    <div className="mt-10 grid gap-10 md:grid-cols-2">

      <Input
        label="Email"
        placeholder="nome@email.com"
        type="email"
      />

      <GuestCounter
        value={guests}
        onChange={setGuests}
      />

    </div>

    {/* Presenza */}

    <div className="mt-14">

      <p className="mb-6 text-[11px] uppercase tracking-[0.34em] text-secondary">
        Parteciperai?
      </p>

      <div className="grid gap-5 md:grid-cols-2">

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

    </div>

    <AnimatePresence>

      {attending && (

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

          <div className="mt-12">

            <Input
              label="Allergie o intolleranze"
              placeholder="Facoltativo"
            />

          </div>

        </motion.div>

      )}

    </AnimatePresence>

    <div className="mt-12">

      <Textarea
        label="Messaggio"
        placeholder="Lasciaci un pensiero..."
      />

    </div>

    <div className="mt-16 flex justify-center">

      <SubmitButton>
        Invia conferma
      </SubmitButton>

    </div>

  </div>

</div>

      </div>
    </Section>
  );
}