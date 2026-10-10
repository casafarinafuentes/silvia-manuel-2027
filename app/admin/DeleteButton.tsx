"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { removeRsvp } from "@/lib/admin/actions";

function Confirm() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="border border-[#a4553f] bg-[#a4553f] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white transition hover:bg-[#8c4735] disabled:opacity-60"
    >
      {pending ? "Elimino…" : "Sì, elimina"}
    </button>
  );
}

/**
 * Elimina una conferma, in due passaggi: il primo clic chiede conferma
 * nella riga stessa, il secondo cancella. L'eliminazione è definitiva,
 * quindi un clic solo non deve bastare.
 */
export default function DeleteButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [asking, setAsking] = useState(false);

  if (!asking) {
    return (
      <button
        type="button"
        onClick={() => setAsking(true)}
        aria-label={`Elimina la conferma di ${name}`}
        className="text-[11px] uppercase tracking-[0.18em] text-secondary underline-offset-4 transition hover:text-[#a4553f] hover:underline"
      >
        Elimina
      </button>
    );
  }

  return (
    <form action={removeRsvp} className="flex items-center gap-3">
      <input type="hidden" name="id" value={id} />

      <span className="sr-only">Eliminare la conferma di {name}?</span>

      <Confirm />

      <button
        type="button"
        onClick={() => setAsking(false)}
        className="text-[11px] uppercase tracking-[0.18em] text-secondary transition hover:text-primary"
      >
        Annulla
      </button>
    </form>
  );
}
