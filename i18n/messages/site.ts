import { p } from "../pair.ts";

/**
 * Testi che valgono per tutto il sito: nome, data, luogo, metadati e
 * le piccole etichette ripetute ovunque.
 */
export const siteMessages = {
  /** Nome della coppia, com'è nei titoli. */
  title: p("Silvia & Manuel", "Silvia & Manuel"),

  /** Data estesa, nel formato di ogni lingua. */
  date: p("12 giugno 2027", "12 de junio de 2027"),

  /** Data in maiuscolo per hero e intestazioni. */
  dateUpper: p("12 GIUGNO 2027", "12 DE JUNIO DE 2027"),

  region: p("Sardegna", "Cerdeña"),

  /** "Li Capanni, Cannigione (Sardegna)" */
  place: p("Li Capanni, Cannigione (Sardegna)", "Li Capanni, Cannigione (Cerdeña)"),

  skipLink: p("Vai al contenuto", "Ir al contenido"),

  /** Descrizione che compare su Google e nelle anteprime dei link. */
  description: {
    after: p(
      "Silvia & Manuel si sono sposati il 12 giugno 2027 a Li Capanni, Cannigione (Sardegna). Il luogo, le foto e i ricordi della giornata.",
      "Silvia & Manuel se casaron el 12 de junio de 2027 en Li Capanni, Cannigione (Cerdeña). El lugar, las fotos y los recuerdos del día.",
    ),
    rsvpClosed: p(
      "Silvia & Manuel si sposano il 12 giugno 2027 a Li Capanni, Cannigione (Sardegna). Programma e informazioni pratiche.",
      "Silvia & Manuel se casan el 12 de junio de 2027 en Li Capanni, Cannigione (Cerdeña). Programa e información práctica.",
    ),
    rsvpOpen: p(
      "Silvia & Manuel si sposano il 12 giugno 2027 a Li Capanni, Cannigione (Sardegna). Programma, informazioni pratiche e conferma di presenza.",
      "Silvia & Manuel se casan el 12 de junio de 2027 en Li Capanni, Cannigione (Cerdeña). Programa, información práctica y confirmación de asistencia.",
    ),
  },

  /** Cambio lingua. */
  language: {
    label: p("Lingua", "Idioma"),
    switchTo: p("Cambia lingua", "Cambiar idioma"),
  },

  notFound: {
    title: p("Pagina non trovata", "Página no encontrada"),
    text: p(
      "L'indirizzo che hai aperto non esiste, o non esiste più.",
      "La dirección que abriste no existe, o ya no existe.",
    ),
    home: p("Torna alla home", "Volver al inicio"),
  },
};

/** Testi dell'evento per i calendari (file .ics e Google Calendar). */
export const calendarMessages = {
  title: p("Matrimonio di Silvia & Manuel", "Boda de Silvia & Manuel"),
  region: p("Sardegna", "Cerdeña"),
  description: p(
    "Non vediamo l'ora di festeggiare con voi! Programma e informazioni: https://silviaemanuel.it",
    "¡Estamos ansiosos por celebrar con ustedes! Programa e información: https://silviaemanuel.it/es",
  ),
  reminder: p(
    "Tra una settimana: il matrimonio di Silvia & Manuel",
    "Dentro de una semana: la boda de Silvia & Manuel",
  ),
};
