import { p } from "../pair.ts";

export const homeMessages = {
  welcome: {
    after: p(
      "Grazie per aver condiviso con noi",
      "Gracias por haber compartido con nosotros",
    ),
    before: p(
      "Siamo felici di condividere con voi",
      "Estamos felices de compartir con ustedes",
    ),
    rest: p(
      "uno dei giorni più importanti della nostra vita.",
      "uno de los días más importantes de nuestra vida.",
    ),
  },

  sardegna: {
    alt: p("Sardegna", "Cerdeña"),
    titleAfter: p("Per quando tornerete", "Para cuando vuelvan"),
    titleBefore: p("Qualche giorno in più", "Unos días más"),
    titleEnd: p("in Sardegna.", "en Cerdeña."),
    textAfter: p(
      "Abbiamo raccolto per voi i posti che vi consigliamo di non perdere.",
      "Hemos reunido para ustedes los lugares que les recomendamos no perderse.",
    ),
    textBefore: p(
      "Se decidete di fermarvi, abbiamo raccolto per voi i posti che vi consigliamo di non perdere.",
      "Si deciden quedarse, hemos reunido para ustedes los lugares que les recomendamos no perderse.",
    ),
    cta: p("Scopri la Sardegna", "Descubre Cerdeña"),
  },

  cards: {
    matrimonio: {
      title: p("Il Matrimonio", "La Boda"),
      after: p(
        "Il nostro giorno a Li Capanni: il luogo, le foto e i ricordi.",
        "Nuestro día en Li Capanni: el lugar, las fotos y los recuerdos.",
      ),
      before: p(
        "Scopri quando, dove e tutti i dettagli della giornata.",
        "Descubre cuándo, dónde y todos los detalles del día.",
      ),
    },
    rsvp: {
      title: p("RSVP", "Confirmar asistencia"),
      open: p(
        "Conferma la tua presenza entro il 12 marzo 2027.",
        "Confirma tu asistencia antes del 12 de marzo de 2027.",
      ),
      late: p(
        "La scadenza è passata: se non hai ancora risposto, fallo al più presto.",
        "El plazo ya pasó: si aún no has respondido, hazlo cuanto antes.",
      ),
    },
    hotel: {
      title: p("Hotel", "Hoteles"),
      text: p(
        "Gli alberghi di Cannigione, la navetta e come prenotare.",
        "Los hoteles de Cannigione, el transporte y cómo reservar.",
      ),
    },
    sardegna: {
      title: p("La Sardegna che amiamo", "La Cerdeña que amamos"),
      text: p(
        "Spiagge, tavole e paesi che vi consigliamo di scoprire.",
        "Playas, mesas y pueblos que les recomendamos descubrir.",
      ),
    },
    gift: {
      title: p("Per tutto ciò che verrà", "Para todo lo que vendrá"),
      text: p(
        "Se desiderate farci un regalo, potete contribuire ai progetti della nostra famiglia.",
        "Si desean hacernos un regalo, pueden contribuir a los proyectos de nuestra familia.",
      ),
    },
  },
};
