/**
 * Crediti delle fotografie della pagina Sardegna.
 *
 * Per le immagini con licenza CC BY / CC BY-SA, che richiede di citare
 * autore e licenza: l'elenco è mostrato in fondo alla pagina.
 */

export type PhotoCredit = {
  label: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
};

/* Vuoto: le foto di Wikimedia sono state tutte sostituite con quelle
   scelte dagli sposi. Se ne torna una con licenza che chiede di citare
   l'autore, va aggiunta qui e la sezione ricompare da sola. */
export const photoCredits: PhotoCredit[] = [];
