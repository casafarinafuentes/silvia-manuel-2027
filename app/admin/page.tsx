import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { logout } from "@/lib/admin/actions";
import { isAuthenticated } from "@/lib/admin/session";
import {
  getHotelBreakdown,
  getTotals,
  listRsvp,
} from "@/lib/rsvp/repository";
import { isPastRsvpDeadline } from "@/lib/rsvp/deadline";
import { hotelLabel } from "@/data/hotels";
import { isDatabaseConfigured } from "@/lib/db";

export const metadata: Metadata = {
  title: "Conferme RSVP",
  robots: { index: false, follow: false },
};

/** Contiene dati personali: mai memorizzata in cache. */
export const dynamic = "force-dynamic";

const dateFormat = new Intl.DateTimeFormat("it-IT", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border bg-white px-6 py-5">
      <p className="text-xs uppercase tracking-[0.28em] text-secondary">
        {label}
      </p>

      <p className="mt-3 font-heading text-4xl font-light text-primary">
        {value}
      </p>
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Il proxy fa solo un controllo ottimistico: qui verifichiamo davvero.
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  if (!isDatabaseConfigured()) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="font-heading text-4xl font-light text-primary">
          Database non configurato
        </h1>

        <p className="mt-6 text-sm leading-7 text-secondary">
          Manca la variabile <code>DATABASE_URL</code>. Aggiungila in{" "}
          <code>.env.local</code> (in locale) o nelle Environment Variables
          del progetto su Vercel, poi ricarica questa pagina.
        </p>
      </main>
    );
  }

  const { q = "" } = await searchParams;

  let entries: Awaited<ReturnType<typeof listRsvp>>;
  let totals: Awaited<ReturnType<typeof getTotals>>;
  let breakdown: Awaited<ReturnType<typeof getHotelBreakdown>>;

  try {
    [entries, totals, breakdown] = await Promise.all([
      listRsvp(q),
      getTotals(),
      getHotelBreakdown(),
    ]);
  } catch (error) {
    // Pagina riservata all'admin: qui il messaggio tecnico aiuta a
    // capire cosa non va (password, host, permessi) senza aprire i log.
    console.error("[admin] lettura database fallita", error);

    const detail = error instanceof Error ? error.message : String(error);

    return (
      <main className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="font-heading text-4xl font-light text-primary">
          Database non raggiungibile
        </h1>

        <p className="mt-6 text-sm leading-7 text-secondary">
          Il database è configurato ma la lettura è fallita. Dettaglio
          tecnico:
        </p>

        <pre className="mt-4 overflow-x-auto border border-border bg-white p-4 text-xs leading-6 text-primary">
          {detail}
        </pre>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      {/* Intestazione */}

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.38em] text-secondary">
            Silvia &amp; Manuel 2027
          </p>

          <h1 className="mt-3 font-heading text-4xl font-light text-primary">
            Conferme
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/admin/export${q ? `?q=${encodeURIComponent(q)}` : ""}`}
            className="
              border border-primary px-6 py-3 text-xs uppercase
              tracking-[0.26em] text-primary transition
              hover:bg-primary hover:text-white
            "
          >
            Esporta CSV
          </a>

          <form action={logout}>
            <button
              type="submit"
              className="
                px-4 py-3 text-xs uppercase tracking-[0.26em]
                text-secondary transition hover:text-primary
              "
            >
              Esci
            </button>
          </form>
        </div>
      </div>

      {/* Totali */}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Risposte" value={totals.submissions} />
        <Stat label="Presenti" value={totals.attendingSubmissions} />
        <Stat label="Assenti" value={totals.decliningSubmissions} />
        <Stat label="Persone attese" value={totals.attendingPeople} />
      </div>

      <p className="mt-4 text-xs text-secondary">
        Di cui {totals.companions}{" "}
        {totals.companions === 1 ? "accompagnatore" : "accompagnatori"}.
      </p>

      {/* Alloggio: il numero da comunicare agli hotel alla scadenza */}

      <section className="mt-12" aria-labelledby="alloggio-titolo">
        <h2
          id="alloggio-titolo"
          className="text-xs uppercase tracking-[0.34em] text-secondary"
        >
          Alloggio (persone che partecipano)
        </h2>

        {breakdown.length === 0 ? (
          <p className="mt-4 text-sm text-secondary">
            Nessuna preferenza ancora.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {breakdown.map((row) => (
              <li
                key={row.hotel || "non-indicato"}
                className="flex items-baseline justify-between border border-border bg-white px-5 py-4"
              >
                <span className="text-sm text-primary">
                  {row.hotel ? hotelLabel(row.hotel) : "Non indicato"}
                </span>

                <span className="font-heading text-2xl text-primary">
                  {row.people}
                  <span className="ml-2 text-xs text-secondary">
                    ({row.submissions}{" "}
                    {row.submissions === 1 ? "risposta" : "risposte"})
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Ricerca */}

      <form className="mt-12 flex gap-3" role="search">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Cerca per nome, cognome o email"
          aria-label="Cerca tra le conferme"
          className="
            w-full max-w-md border border-border bg-white px-4 py-3
            text-sm text-primary outline-none transition
            focus:border-primary
          "
        />

        <button
          type="submit"
          className="
            border border-border px-6 py-3 text-xs uppercase
            tracking-[0.26em] text-primary transition hover:border-primary
          "
        >
          Cerca
        </button>

        {q && (
          <a
            href="/admin"
            className="self-center text-xs uppercase tracking-[0.26em] text-secondary hover:text-primary"
          >
            Azzera
          </a>
        )}
      </form>

      {/* Elenco */}

      {entries.length === 0 ? (
        <p className="mt-16 text-sm text-secondary">
          {q
            ? `Nessun risultato per “${q}”.`
            : "Non è ancora arrivata nessuna conferma."}
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                {[
                  "Nome",
                  "Email",
                  "Presenza",
                  "Persone",
                  "Allergie / intolleranze",
                  "Alloggio",
                  "Messaggio",
                  "Inviato",
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="py-3 pr-4 text-xs uppercase tracking-[0.24em] font-normal text-secondary"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-border/60">
                  <td className="py-4 pr-4 text-primary">
                    {entry.first_name} {entry.last_name}
                  </td>

                  <td className="py-4 pr-4 text-secondary">
                    {entry.email ?? "—"}
                  </td>

                  <td className="py-4 pr-4">
                    <span
                      className={
                        entry.attending ? "text-[#4f6b4f]" : "text-[#a4553f]"
                      }
                    >
                      {entry.attending ? "Sì" : "No"}
                    </span>
                  </td>

                  <td className="py-4 pr-4 text-secondary">
                    {entry.attending ? entry.party_size : "—"}
                  </td>

                  <td className="py-4 pr-4 text-secondary">
                    {entry.dietary ?? "—"}
                  </td>

                  <td className="py-4 pr-4 text-secondary">
                    {entry.attending ? hotelLabel(entry.hotel) : "—"}
                  </td>

                  <td className="max-w-xs py-4 pr-4 text-secondary">
                    {entry.message ?? "—"}
                  </td>

                  <td className="py-4 pr-4 whitespace-nowrap text-secondary">
                    {dateFormat.format(entry.created_at)}

                    {isPastRsvpDeadline(entry.created_at) && (
                      <span className="ml-2 border border-[#e2c4ba] px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[#a4553f]">
                        Dopo la scadenza
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
