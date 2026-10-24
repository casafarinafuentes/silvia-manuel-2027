import { p } from "../pair.ts";

export const rsvpMessages = {
  hero: {
    title: p("RSVP", "RSVP"),
    open: p("Conferma entro il {date}", "Confirma antes del {date}"),
    closed: p("Le conferme sono chiuse", "Las confirmaciones están cerradas"),
    late: p("Conferma la tua presenza", "Confirma tu asistencia"),
  },

  intro: {
    title: p(
      "La vostra presenza\nrenderà questo giorno unico.",
      "Su presencia\nhará único este día.",
    ),
    lines: p(
      "Vi chiediamo di confermare la vostra presenza\ncompilando il form qui sotto.\nOgni dettaglio ci aiuterà a rendere tutto perfetto.",
      "Les pedimos que confirmen su asistencia\ncompletando el formulario de abajo.\nCada detalle nos ayudará a que todo sea perfecto.",
    ),
  },

  form: {
    eyebrow: p("RSVP", "RSVP"),
    title: p("Conferma la tua presenza", "Confirma tu asistencia"),
    lead: p(
      "Compila il modulo qui sotto. Ti richiederà meno di un minuto.",
      "Completa el formulario de abajo. Te tomará menos de un minuto.",
    ),
    late: p(
      "La scadenza del {date} è passata: se non hai ancora risposto, fallo al più presto, così possiamo organizzarci.",
      "El plazo del {date} ya pasó: si aún no has respondido, hazlo cuanto antes, así podemos organizarnos.",
    ),
    firstName: p("Nome", "Nombre"),
    firstNamePlaceholder: p("Mario", "María"),
    lastName: p("Cognome", "Apellido"),
    lastNamePlaceholder: p("Rossi", "Pérez"),
    email: p("Email", "Correo electrónico"),
    emailPlaceholder: p("nome@email.com", "nombre@correo.com"),
    attendingLegend: p("Parteciperai?", "¿Vas a asistir?"),
    yes: p("Ci saremo", "Ahí estaremos"),
    yesSub: p("Non vediamo l'ora!", "¡No podemos esperar!"),
    no: p("Non potremo esserci", "No podremos asistir"),
    noSub: p("Vi penseremo quel giorno.", "Pensaremos en ustedes ese día."),
    dietary: p("Allergie o intolleranze", "Alergias o intolerancias"),
    optional: p("Facoltativo", "Opcional"),
    message: p("Messaggio", "Mensaje"),
    messagePlaceholder: p("Lasciaci un pensiero...", "Déjanos unas palabras..."),
    submit: p("Invia conferma", "Enviar confirmación"),
    sending: p("Invio in corso…", "Enviando…"),
    guests: p("Numero invitati", "Número de invitados"),
    guestsLess: p("Una persona in meno", "Una persona menos"),
    guestsMore: p("Una persona in più", "Una persona más"),
    lodging: {
      legend: p("Dove dormirai?", "¿Dónde te alojarás?"),
      pastDeadline: p(
        "Il termine per segnalare l'alloggio ({date}) è passato: gli hotel sono già stati contattati. Scrivici e vediamo insieme cosa è ancora disponibile.",
        "El plazo para indicar el alojamiento ({date}) ya pasó: los hoteles ya fueron contactados. Escríbenos y vemos juntos qué sigue disponible.",
      ),
      note: p(
        "Non c'è una convenzione: il {date} diremo agli hotel quante persone siamo e vi gireremo le indicazioni per prenotare.",
        "No hay un convenio: el {date} les diremos a los hoteles cuántas personas somos y les enviaremos las indicaciones para reservar.",
      ),
      seeHotels: p("Vedi gli hotel", "Ver los hoteles"),
      label: p("Alloggio", "Alojamiento"),
      selfArranged: p("Mi organizzo autonomamente", "Me organizo por mi cuenta"),
      selfArrangedSub: p(
        "Prenoto per conto mio, dove preferisco.",
        "Reservo por mi cuenta, donde prefiera.",
      ),
    },
  },

  success: {
    title: p("Grazie, {name}", "Gracias, {name}"),
    yes: p(
      "Abbiamo registrato la tua conferma. Non vediamo l'ora di festeggiare con te.",
      "Registramos tu confirmación. Estamos ansiosos por celebrar contigo.",
    ),
    no: p(
      "Ci dispiace che non potrai esserci, ma grazie per avercelo fatto sapere.",
      "Lamentamos que no puedas venir, pero gracias por avisarnos.",
    ),
  },

  closedPage: {
    titleAfter: p("Grazie a tutti.", "Gracias a todos."),
    titleDay: p("Ci siamo.", "Llegó el día."),
    textAfter: p(
      "Il matrimonio è passato e le conferme sono chiuse. Grazie a chi ha festeggiato con noi e a chi ci ha pensato da lontano.",
      "La boda ya pasó y las confirmaciones están cerradas. Gracias a quienes celebraron con nosotros y a quienes nos pensaron desde lejos.",
    ),
    textDay: p(
      "Oggi è il giorno del matrimonio e le conferme sono chiuse. Per qualsiasi cosa dell'ultimo minuto, scriveteci.",
      "Hoy es el día de la boda y las confirmaciones están cerradas. Para cualquier cosa de último minuto, escríbannos.",
    ),
  },

  contact: {
    eyebrowClosed: p("Contatti", "Contacto"),
    eyebrowOpen: p("Hai bisogno di aiuto?", "¿Necesitas ayuda?"),
    titleClosed: p("Siamo felici di sentirvi.", "Nos encantará saber de ustedes."),
    titleOpen: p("Siamo felici di aiutarti.", "Con gusto te ayudamos."),
    textClosed: p(
      "Per qualsiasi cosa, o semplicemente per un saluto, scriveteci quando volete.",
      "Para lo que sea, o simplemente para saludarnos, escríbannos cuando quieran.",
    ),
    textOpen: p(
      "Per qualsiasi dubbio sulla conferma della presenza, esigenze particolari o semplicemente per salutarci, siamo sempre felici di sentirvi.",
      "Para cualquier duda sobre la confirmación de asistencia, necesidades especiales o simplemente para saludarnos, siempre nos alegra saber de ustedes.",
    ),
  },

  nextStep: {
    title: p("Se vi fermate qualche giorno in più", "Si se quedan unos días más"),
    description: p(
      "Spiagge, tavole e paesi della Gallura che vi consigliamo di scoprire.",
      "Playas, mesas y pueblos de la Gallura que les recomendamos descubrir.",
    ),
    cta: p("Scopri la Sardegna", "Descubre Cerdeña"),
  },

  metadata: {
    titleOpen: p("Conferma la tua presenza", "Confirma tu asistencia"),
    titleClosed: p("RSVP", "RSVP"),
    descriptionOpen: p(
      "Fateci sapere se ci sarete: bastano un minuto e qualche informazione.",
      "Avísennos si estarán: bastan un minuto y algunos datos.",
    ),
    descriptionClosed: p(
      "Le conferme di presenza sono chiuse.",
      "Las confirmaciones de asistencia están cerradas.",
    ),
  },
};

/**
 * Messaggi di errore del modulo (validazione e invio). Stanno a parte
 * perché li usa anche il server, e i test, senza passare dai testi della
 * pagina.
 */
export const rsvpErrors = {
  firstNameRequired: p("Inserisci il tuo nome.", "Escribe tu nombre."),
  lastNameRequired: p("Inserisci il tuo cognome.", "Escribe tu apellido."),
  maxLength: p("Massimo {max} caratteri.", "Máximo {max} caracteres."),
  emailInvalid: p("Controlla l'indirizzo email.", "Revisa el correo electrónico."),
  attendingRequired: p("Facci sapere se ci sarai.", "Avísanos si vas a asistir."),
  partySizeRequired: p("Indica quante persone siete.", "Indica cuántas personas son."),
  partySizeRange: p(
    "Inserisci un numero tra 1 e {max}.",
    "Escribe un número entre 1 y {max}.",
  ),
  hotelRequired: p(
    "Facci sapere dove pensi di dormire.",
    "Avísanos dónde piensas alojarte.",
  ),
  hotelInvalid: p("Scegli una delle opzioni indicate.", "Elige una de las opciones indicadas."),
  closed: p("Le conferme sono chiuse.", "Las confirmaciones están cerradas."),
  rateLimited: p(
    "Hai inviato troppe conferme di seguito. Riprova tra un'ora.",
    "Enviaste demasiadas confirmaciones seguidas. Vuelve a intentarlo en una hora.",
  ),
  duplicate: p(
    "Risulta già una conferma con questo nome. Se devi correggere qualcosa, scrivici pure.",
    "Ya existe una confirmación con este nombre. Si necesitas corregir algo, escríbenos.",
  ),
  failed: p(
    "Non siamo riusciti a salvare la conferma. Riprova tra poco o scrivici.",
    "No pudimos guardar la confirmación. Vuelve a intentarlo en un momento o escríbenos.",
  ),
};
