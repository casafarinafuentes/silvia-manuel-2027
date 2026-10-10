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
    rsvpDeadline: "2027-03-12",

    /**
     * Istante d'inizio con fuso orario esplicito (CEST, UTC+2 a giugno).
     * Senza offset la data verrebbe interpretata nel fuso del
     * visitatore e il countdown mostrerebbe valori diversi a seconda
     * di dove si trova chi guarda.
     */
    startsAt: "2027-06-12T17:00:00+02:00",
  },

  ceremony: {
    // Il rito si svolge nella stessa location del ricevimento.
    time: "17:00",
    venue: "Li Capanni",
    address: "Cannigione",
    maps: "https://maps.app.goo.gl/hSrCvH41MyM8MJkDA",
  },

  reception: {
    time: "18:30",
    venue: "Li Capanni",
    address: "Cannigione",
    maps: "https://maps.app.goo.gl/hSrCvH41MyM8MJkDA",
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
      lat: 41.1545954,
      lng: 9.4222925,
    },

    maps: "https://maps.app.goo.gl/hSrCvH41MyM8MJkDA",
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
   * Regalo di nozze.
   *
   * IBAN e intestatario sono quelli veri, forniti dagli sposi: vanno
   * cambiati sempre INSIEME, perché un bonifico verso un intestatario
   * che non corrisponde al conto viene respinto.
   *
   * Se `holder` torna a null, la pagina nasconde i riferimenti invece
   * di mostrarne di sbagliati.
   */
  gift: {
    iban: "IT84 A032 6822 3000 EMH0 1137 787",
    holder: "Luis Manuel San Martin Fuentes" as string | null,
    /** Causale suggerita, per capire da chi arriva il pensiero. */
    reference: "Regalo di nozze",
  },

  /**
   * Raccolta di foto e video degli ospiti.
   *
   * DA FORNIRE: il link di caricamento (una "richiesta file": chi
   * carica non vede né può cancellare i file degli altri, e arrivano
   * solo a noi). Nei testi il servizio non viene mai nominato. Finché
   * resta `null` il pulsante non compare e al suo posto c'è un avviso
   * che il link arriverà.
   */
  photos: {
    uploadUrl: null as string | null,
  },

  rsvpDeadline: "2027-03-12",
};

/**
 * True se l'IBAN in config è quello vero. Il valore segnaposto
 * (IT00 0000 …) non deve mai comparire agli ospiti: un bonifico verso
 * un IBAN inventato è peggio di nessun bonifico.
 */
export function hasRealIban(): boolean {
  const iban = wedding.gift.iban.replace(/\s+/g, "").toUpperCase();

  return /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban) && !/^[A-Z]{2}00/.test(iban) && !/^[A-Z]{2}\d{2}0{10,}/.test(iban);
}

/** URL WhatsApp, o null se il numero non è ancora stato configurato. */
export function whatsappUrl(): string | null {
  const { whatsapp } = wedding.contacts;
  return whatsapp ? `https://wa.me/${whatsapp}` : null;
}
