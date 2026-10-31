import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { MAX_PARTY_SIZE, parseRsvp } from "./schema.ts";

const valid = {
  firstName: "Mario",
  lastName: "Rossi",
  email: "mario@example.com",
  attending: "true",
  partySize: "2",
  dietary: "",
  message: "",
};

describe("parseRsvp", () => {
  it("accetta una conferma completa e normalizza i tipi", () => {
    const result = parseRsvp(valid);

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.data.attending, true);
      assert.equal(result.data.partySize, 2);
    }
  });

  it("toglie gli spazi ai bordi", () => {
    const result = parseRsvp({ ...valid, firstName: "  Mario  " });

    assert.equal(result.ok, true);
    if (result.ok) assert.equal(result.data.firstName, "Mario");
  });

  it("richiede nome e cognome", () => {
    const result = parseRsvp({ ...valid, firstName: " ", lastName: "" });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.ok(result.errors.firstName);
      assert.ok(result.errors.lastName);
    }
  });

  it("l'email è facoltativa ma, se presente, deve essere plausibile", () => {
    assert.equal(parseRsvp({ ...valid, email: "" }).ok, true);

    const bad = parseRsvp({ ...valid, email: "non-una-email" });
    assert.equal(bad.ok, false);
    if (!bad.ok) assert.ok(bad.errors.email);
  });

  it("segnala la scelta mancante su 'partecipi?'", () => {
    const result = parseRsvp({ ...valid, attending: undefined });

    assert.equal(result.ok, false);
    if (!result.ok) assert.ok(result.errors.attending);
  });

  it("chi non partecipa viene sempre registrato come una persona sola", () => {
    const result = parseRsvp({ ...valid, attending: "false", partySize: "5" });

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.data.attending, false);
      assert.equal(result.data.partySize, 1);
    }
  });

  it("rifiuta un numero di persone fuori intervallo o non numerico", () => {
    for (const partySize of ["0", String(MAX_PARTY_SIZE + 1), "abc"]) {
      const result = parseRsvp({ ...valid, partySize });

      assert.equal(result.ok, false, `partySize=${partySize}`);
    }
  });

  it("rifiuta testi oltre i limiti del database", () => {
    assert.equal(parseRsvp({ ...valid, firstName: "a".repeat(81) }).ok, false);
    assert.equal(parseRsvp({ ...valid, dietary: "a".repeat(501) }).ok, false);
    assert.equal(parseRsvp({ ...valid, message: "a".repeat(2001) }).ok, false);
  });

  it("non va in errore con input vuoto o non oggetto", () => {
    assert.equal(parseRsvp(null).ok, false);
    assert.equal(parseRsvp(undefined).ok, false);
    assert.equal(parseRsvp("testo").ok, false);
  });

  describe("alloggio", () => {
    it("prima della scadenza è obbligatorio per chi partecipa", () => {
      const result = parseRsvp(valid, { hotelRequired: true });

      assert.equal(result.ok, false);
      if (!result.ok) assert.ok(result.errors.hotel);
    });

    it("accetta un hotel della lista e 'mi organizzo da solo'", () => {
      for (const hotel of ["micalosu", "self"]) {
        const result = parseRsvp({ ...valid, hotel }, { hotelRequired: true });

        assert.equal(result.ok, true, hotel);
        if (result.ok) assert.equal(result.data.hotel, hotel);
      }
    });

    it("rifiuta un valore che non è nella lista", () => {
      const result = parseRsvp(
        { ...valid, hotel: "hotel-inventato" },
        { hotelRequired: true },
      );

      assert.equal(result.ok, false);
    });

    it("chi non partecipa non ha alloggio, anche se lo invia", () => {
      const result = parseRsvp(
        { ...valid, attending: "false", hotel: "micalosu" },
        { hotelRequired: true },
      );

      assert.equal(result.ok, true);
      if (result.ok) assert.equal(result.data.hotel, "");
    });

    it("dopo la scadenza (non richiesto) l'alloggio viene ignorato", () => {
      const result = parseRsvp({ ...valid, hotel: "micalosu" });

      assert.equal(result.ok, true);
      if (result.ok) assert.equal(result.data.hotel, "");
    });
  });
});

describe("parseRsvp: lingua dei messaggi", () => {
  it("di default gli errori sono in italiano", () => {
    const result = parseRsvp({ ...valid, firstName: "" });

    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.errors.firstName, "Inserisci il tuo nome.");
  });

  it("con locale 'es' gli errori sono in spagnolo", () => {
    const result = parseRsvp(
      { ...valid, firstName: "", partySize: "99" },
      { locale: "es" },
    );

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.errors.firstName, "Escribe tu nombre.");
      assert.match(result.errors.partySize ?? "", /entre 1 y/);
    }
  });
});

describe("hotel dell'elenco precedente", () => {
  it("un id uscito dalla selezione non è più accettato, ma resta leggibile in admin", async () => {
    const result = parseRsvp(
      { ...valid, hotel: "moma" },
      { hotelRequired: true },
    );

    assert.equal(result.ok, false);

    const { hotelLabel } = await import("../../data/hotels.ts");

    assert.equal(hotelLabel("moma"), "Moma Hotel");
    assert.equal(hotelLabel("sconosciuto"), "sconosciuto");
  });
});

