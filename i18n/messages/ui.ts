import { p } from "../pair.ts";

/**
 * Testi condivisi dai componenti di tutte le pagine: menu, navigazione,
 * countdown, footer, inviti a proseguire.
 */
export const uiMessages = {
  scroll: p("Scorri", "Desliza"),

  nav: {
    matrimonio: p("Il Matrimonio", "La Boda"),
    rsvp: p("RSVP", "Confirmar asistencia"),
    hotel: p("Hotel", "Hoteles"),
    sardegna: p("La Sardegna che amiamo", "La Cerdeña que amamos"),
    gift: p("Per tutto ciò che verrà", "Para todo lo que vendrá"),
  },

  menu: {
    open: p("Apri menu", "Abrir menú"),
    close: p("Chiudi menu", "Cerrar menú"),
    title: p("Menu", "Menú"),
    dialog: p("Menu di navigazione", "Menú de navegación"),
    home: p("Silvia & Manuel — Home", "Silvia & Manuel — Inicio"),
  },

  countdown: {
    label: p("Tempo mancante al matrimonio", "Tiempo que falta para la boda"),
    today: p("È il giorno! ♡", "¡Es hoy! ♡"),
    days: p("Giorni", "Días"),
    hours: p("Ore", "Horas"),
    minutes: p("Minuti", "Minutos"),
    seconds: p("Secondi", "Segundos"),
    title: p("Countdown", "Cuenta regresiva"),
  },

  thanks: p(
    "Grazie per aver festeggiato con noi.",
    "Gracias por haber celebrado con nosotros.",
  ),

  contact: {
    write: p("Scrivici", "Escríbenos"),
    preparing: p(
      "Stiamo preparando i nostri recapiti:\nli troverete qui a breve.",
      "Estamos preparando nuestros datos de contacto:\nlos encontrarán aquí muy pronto.",
    ),
  },

  nextStep: {
    eyebrow: p("Prossimo passo", "Próximo paso"),
  },

  stayTip: {
    title: p(
      "Hai bisogno di un consiglio su dove dormire?",
      "¿Necesitas un consejo sobre dónde alojarte?",
    ),
    text: p(
      "Ti suggeriamo di cercare su Airbnb o Booking nelle zone limitrofe: Cannigione, Arzachena, Baja Sardinia e Palau sono tutte a pochi minuti dalla location.",
      "Te sugerimos buscar en Airbnb o Booking en las zonas cercanas: Cannigione, Arzachena, Baja Sardinia y Palau están todas a pocos minutos del lugar.",
    ),
    airbnb: p("Cerca su Airbnb", "Buscar en Airbnb"),
    booking: p("Cerca su Booking", "Buscar en Booking"),
    airbnbUrl: p(
      "https://www.airbnb.it/s/Cannigione--Sardegna/homes",
      "https://www.airbnb.com/s/Cannigione--Sardinia/homes",
    ),
    bookingUrl: p(
      "https://www.booking.com/searchresults.it.html?ss=Cannigione",
      "https://www.booking.com/searchresults.es.html?ss=Cannigione",
    ),
  },

  cursor: {
    discover: p("Scopri", "Descubre"),
  },

  footer: {
    countdown: p("Countdown", "Cuenta regresiva"),
    photosTitle: p("Le vostre foto", "Sus fotos"),
    photosText: p(
      "Avete foto e video\ndella giornata?\nInviateceli da qui.",
      "¿Tienen fotos y videos\ndel día?\nEnvíenoslos desde aquí.",
    ),
    photosLink: p("Invia le tue foto →", "Envía tus fotos →"),
    faqTitle: p("Domande frequenti", "Preguntas frecuentes"),
    faqText: p(
      "Hai qualche dubbio?\nTrova qui le risposte\nalle domande più comuni.",
      "¿Tienes alguna duda?\nEncuentra aquí las respuestas\na las preguntas más comunes.",
    ),
    faqLink: p("Scopri di più →", "Descubre más →"),
    contactsTitle: p("Contatti", "Contacto"),
    contactsText: p(
      "Per qualsiasi necessità\nsiamo a vostra disposizione.",
      "Para cualquier necesidad\nestamos a su disposición.",
    ),
    contactsLink: p("Scrivici →", "Escríbenos →"),
    withLove: p("Con amore,", "Con cariño,"),
    addToCalendar: p("Aggiungi al calendario", "Añadir al calendario"),
    googleCalendar: p("Google Calendar", "Google Calendar"),
    gift: p("Per tutto ciò che verrà", "Para todo lo que vendrá"),
  },

  phaseAction: {
    rsvp: p("Conferma la tua presenza", "Confirma tu asistencia"),
    waiting: p("Scopri la giornata", "Descubre el día"),
    finalWeeks: p("Informazioni pratiche", "Información práctica"),
    wedding: p("Come arrivare", "Cómo llegar"),
    after: p("Le vostre foto", "Sus fotos"),
  },
};
