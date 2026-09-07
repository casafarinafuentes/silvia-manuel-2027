/**
 * Dati del matrimonio — unica fonte di verità.
 *
 * REGOLA: qui dentro solo informazioni verificate.
 * I campi non ancora confermati restano `null`; i componenti sanno
 * gestirlo e nascondono l'elemento invece di mostrare un dato falso.
 */

export const wedding = {
  couple: {
    bride: "Silvia",
    groom: "Manuel",
  },

  branding: {
    title: "Silvia & Manuel",
    subtitle: "12 giugno 2027",
    tagline: "Ci sposiamo!",
  },

  dates: {
    wedding: "2027-06-12",
    rsvpDeadline: "2027-04-30",

    /**
     * Istante d'inizio con fuso orario esplicito (CEST, UTC+2 a giugno).
     * Senza offset la data verrebbe interpretata nel fuso del
     * visitatore e il countdown mostrerebbe valori diversi a seconda
     * di dove si trova chi guarda.
     */
    startsAt: "2027-06-12T17:30:00+02:00",
  },

  ceremony: {
    time: "17:00",
    venue: "Chiesa di San Giovanni Battista",
    address: "Arzachena",
    // DA VERIFICARE: link Google Maps della chiesa.
    maps: null as string | null,
  },

  reception: {
    time: "18:30",
    venue: "Li Capanni",
    address: "Cannigione",
    maps: "https://www.google.com/maps?q=41.1550237,9.4201348",
  },

  location: {
    venue: "Li Capanni",

    address: {
      locality: "Cannigione",
      municipality: "Arzachena",
      province: "SS",
      region: "Sardegna",
      country: "Italia",
    },

    coordinates: {
      lat: 41.1550237,
      lng: 9.4201348,
    },

    maps: "https://www.google.com/maps?q=41.1550237,9.4201348",
  },

  /**
   * Contatti pubblici.
   *
   * DA FORNIRE. Finché restano `null` i pulsanti "Scrivici" mostrano
   * un testo statico invece di un link: meglio nessun contatto che un
   * numero sbagliato, che squillerebbe a casa di un estraneo.
   *
   * `whatsapp`: numero in formato internazionale senza + né spazi,
   *             es. "393331234567".
   * `email`:    indirizzo a cui far scrivere gli invitati.
   */
  contacts: {
    whatsapp: null as string | null,
    email: null as string | null,
  },

  /**
   * Lista nozze.
   *
   * DA FORNIRE. L'IBAN qui sotto è composto di soli zeri: non
   * corrisponde ad alcun conto e va sostituito prima di pubblicare.
   *
   * `holder` è l'intestatario del conto ed è obbligatorio: senza,
   * chi fa il bonifico non sa a chi lo sta mandando. Finché resta
   * null la pagina non mostra i riferimenti, così non può partire
   * un bonifico verso un intestatario sbagliato.
   */
  gift: {
    iban: "IT00 0000 0000 0000 0000 0000 000",
    holder: null as string | null,
    /** Causale suggerita, per capire da chi arriva il pensiero. */
    reference: "Regalo di nozze",
  },

  rsvpDeadline: "2027-04-30",
};

/** URL WhatsApp, o null se il numero non è ancora stato configurato. */
export function whatsappUrl(): string | null {
  const { whatsapp } = wedding.contacts;
  return whatsapp ? `https://wa.me/${whatsapp}` : null;
}
