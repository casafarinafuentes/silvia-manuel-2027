"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { removeRsvp } from "@/lib/admin/actions";

import { DELETE_FORM_ID } from "./delete-form";

function selectedBoxes(): HTMLInputElement[] {
  return [
    ...document.querySelectorAll<HTMLInputElement>(
      `input[type="checkbox"][name="id"][form="${DELETE_FORM_ID}"]:checked`,
    ),
  ];
}

function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="border border-[#a4553f] bg-[#a4553f] px-6 py-3 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-[#8c4735] disabled:opacity-60"
    >
      {pending ? "Elimino…" : "Sì, elimina"}
    </button>
  );
}

/**
 * Un solo pulsante "Elimina" per le conferme spuntate nella tabella.
 * Apre una finestrella di conferma: la cancellazione è definitiva,
 * quindi un clic solo non deve bastare.
 *
 * Le caselle stanno nella tabella (resa dal server) e appartengono a
 * questo form tramite l'attributo `form`: inviandolo partono gli id
 * spuntati.
 */
export default function BulkDelete() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [count, setCount] = useState(0);
  const [empty, setEmpty] = useState(false);

  function ask() {
    const selected = selectedBoxes().length;

    if (selected === 0) {
      setEmpty(true);
      return;
    }

    setEmpty(false);
    setCount(selected);
    dialogRef.current?.showModal();
  }

  return (
    <form
      id={DELETE_FORM_ID}
      action={async (formData) => {
        await removeRsvp(formData);
        dialogRef.current?.close();
      }}
      className="flex flex-wrap items-center gap-4"
    >
      <button
        type="button"
        onClick={ask}
        className="border border-[#a4553f] px-6 py-3 text-xs uppercase tracking-[0.26em] text-[#a4553f] transition hover:bg-[#a4553f] hover:text-white"
      >
        Elimina selezionate
      </button>

      {empty && (
        <p role="status" className="text-xs text-secondary">
          Spunta prima le conferme da eliminare.
        </p>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="elimina-titolo"
        className="m-auto w-[min(92vw,420px)] border border-border bg-white p-8 text-left shadow-2xl backdrop:bg-black/40"
      >
        <h2
          id="elimina-titolo"
          className="font-heading text-3xl font-light text-primary"
        >
          {count === 1
            ? "Eliminare questa conferma?"
            : `Eliminare ${count} conferme?`}
        </h2>

        <p className="mt-4 text-sm leading-7 text-secondary">
          La cancellazione è definitiva: non si può annullare.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ConfirmButton />

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="px-4 py-3 text-xs uppercase tracking-[0.22em] text-secondary transition hover:text-primary"
          >
            Annulla
          </button>
        </div>
      </dialog>
    </form>
  );
}

/** Casella nell'intestazione: spunta o toglie tutte le righe visibili. */
export function SelectAll() {
  return (
    <input
      type="checkbox"
      aria-label="Seleziona tutte le conferme"
      onChange={(event) => {
        for (const box of document.querySelectorAll<HTMLInputElement>(
          `input[type="checkbox"][name="id"][form="${DELETE_FORM_ID}"]`,
        )) {
          box.checked = event.currentTarget.checked;
        }
      }}
      className="h-4 w-4 accent-[#7e8d80]"
    />
  );
}
