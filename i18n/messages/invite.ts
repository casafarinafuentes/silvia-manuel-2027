import { p } from "../pair.ts";

/** Testi dell'invito interattivo (la busta che si apre). */
export const inviteMessages = {
  metadata: {
    title: p("Il tuo invito", "Tu invitación"),
    description: p(
      "Un invito speciale al matrimonio di Silvia & Manuel.",
      "Una invitación especial a la boda de Silvia & Manuel.",
    ),
  },

  header: {
    eyebrow: p("MATRIMONIO", "BODA"),
    names: p("SILVIA & MANUEL", "SILVIA & MANUEL"),
  },

  envelope: {
    hint: p("Tocca la busta per aprirla", "Toca el sobre para abrirlo"),
    open: p("Apri l'invito", "Abrir la invitación"),
    sealed: p(
      "Busta chiusa con sigillo di ceralacca",
      "Sobre cerrado con sello de lacre",
    ),
    opened: p("Invito aperto", "Invitación abierta"),
  },

  card: {
    intro: p(
      "Siamo felici di invitarvi\nal nostro matrimonio",
      "Estamos felices de invitarlos\na nuestra boda",
    ),
    namesAlt: p("Silvia e Manuel", "Silvia y Manuel"),
    date: p("12 . 06 . 2027", "12 . 06 . 2027"),
    where: p(
      "LA CERIMONIA E I FESTEGGIAMENTI\nSI TERRANNO PRESSO:",
      "LA CEREMONIA Y LA CELEBRACIÓN\nSE REALIZARÁN EN:",
    ),
    place: p(
      "Li Capanni\nCannigione, Sardegna\nore 17:00",
      "Li Capanni\nCannigione, Cerdeña\na las 17:00",
    ),
    rsvp: p(
      "CONFERMATE LA VOSTRA PRESENZA\nENTRO IL 12 MARZO",
      "CONFIRMEN SU ASISTENCIA\nANTES DEL 12 DE MARZO",
    ),
    rsvpClosed: p(
      "TUTTI I DETTAGLI\nSONO SUL NOSTRO SITO",
      "TODOS LOS DETALLES\nESTÁN EN NUESTRO SITIO",
    ),
    button: p("Conferma", "Confirmar"),
    buttonClosed: p("Vai al sito", "Ir al sitio"),
  },

  actions: {
    rsvp: p("Conferma la tua presenza", "Confirma tu asistencia"),
    site: p("Scopri il sito del matrimonio", "Descubre el sitio de la boda"),
    note: p(
      "Sul sito trovate il programma, come arrivare in nave o in aereo e dove dormire.",
      "En el sitio encontrarán el programa, cómo llegar en barco o en avión y dónde alojarse.",
    ),
  },
};
