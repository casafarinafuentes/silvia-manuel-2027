import { NextResponse, type NextRequest } from "next/server";

import { isAuthenticated } from "@/lib/admin/session";
import { listRsvp } from "@/lib/rsvp/repository";

export const dynamic = "force-dynamic";

/**
 * Escape di un campo CSV.
 *
 * Oltre alle virgolette, neutralizza i valori che iniziano con
 * =, +, - o @: Excel e Fogli Google li interpreterebbero come formule
 * (CSV injection). Il prefisso apostrofo li forza a testo.
 */
function csvCell(value: string | number | boolean | Date | null): string {
  if (value === null) return "";

  let text =
    value instanceof Date ? value.toISOString() : String(value);

  if (/^[=+\-@\t\r]/.test(text)) {
    text = `'${text}`;
  }

  return `"${text.replace(/"/g, '""')}"`;
}

const COLUMNS = [
  "id",
  "nome",
  "cognome",
  "email",
  "presenza",
  "persone_totali",
  "accompagnatori",
  "allergie_intolleranze",
  "messaggio",
  "inviato_il",
] as const;

export async function GET(request: NextRequest) {
  // I dati escono solo dal server e solo a sessione valida.
  if (!(await isAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const search = request.nextUrl.searchParams.get("q") ?? "";

  const entries = await listRsvp(search);

  const lines = [
    COLUMNS.join(","),
    ...entries.map((entry) =>
      [
        csvCell(entry.id),
        csvCell(entry.first_name),
        csvCell(entry.last_name),
        csvCell(entry.email),
        csvCell(entry.attending ? "sì" : "no"),
        csvCell(entry.attending ? entry.party_size : 0),
        csvCell(entry.attending ? entry.party_size - 1 : 0),
        csvCell(entry.dietary),
        csvCell(entry.message),
        csvCell(entry.created_at),
      ].join(","),
    ),
  ];

  // BOM UTF-8: senza, Excel su Windows sbaglia gli accenti.
  const body = `﻿${lines.join("\r\n")}\r\n`;

  const today = new Date().toISOString().slice(0, 10);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="rsvp-${today}.csv"`,
      // Contiene dati personali: nessuna cache, da nessuna parte.
      "Cache-Control": "no-store, private",
    },
  });
}
