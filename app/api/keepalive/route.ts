import { query } from "@/lib/db";

/**
 * "Tieni sveglio" del database.
 *
 * Nel piano gratuito Supabase mette in pausa un progetto dopo circa una
 * settimana senza attività: da quel momento l'RSVP non salva più le
 * conferme e i deploy su Vercel falliscono. Le pagine del sito sono
 * statiche e non toccano il database, quindi tra una conferma e l'altra
 * può passare più di una settimana.
 *
 * Vercel chiama questo indirizzo una volta al giorno (vedi `crons` in
 * vercel.json): una lettura vera sulla tabella delle conferme basta a
 * contare come attività.
 */

// Deve interrogare il database a ogni chiamata, mai una risposta in cache.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Se in Vercel è impostato CRON_SECRET, le chiamate del cron arrivano
  // con questa intestazione e tutte le altre vengono rifiutate. Senza
  // segreto l'indirizzo resta aperto: restituisce solo "ok", nessun dato.
  const secret = process.env.CRON_SECRET;

  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  try {
    await query("select count(*) from rsvp");

    return Response.json({ ok: true });
  } catch (error) {
    // Il dettaglio resta nei log del server.
    console.error("[keepalive] database non raggiungibile", error);

    return Response.json({ ok: false }, { status: 503 });
  }
}
