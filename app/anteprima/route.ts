import { setPreviewDate } from "@/lib/temporal-now";

/**
 * Anteprima delle fasi, solo in sviluppo.
 *
 *   /anteprima?data=2027-06-20   guarda il sito come sarà quel giorno
 *   /anteprima                   torna alla data di oggi
 *
 * In produzione questa pagina non esiste (404).
 */
export function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const url = new URL(request.url);

  setPreviewDate(url.searchParams.get("data"));

  // Si torna alla pagina da cui si è partiti, o alla home.
  const referer = request.headers.get("referer");
  const back = referer ? new URL(referer).pathname : "/";

  return Response.redirect(new URL(back, url.origin), 307);
}
