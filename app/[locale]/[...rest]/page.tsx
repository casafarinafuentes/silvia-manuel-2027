import { notFound } from "next/navigation";

/**
 * Raccoglie ogni indirizzo che non corrisponde a una pagina e mostra
 * il "non trovato" nella lingua giusta (senza questo Next userebbe la
 * 404 generica, in inglese e senza il resto del sito).
 */
export default function CatchAll() {
  notFound();
}
