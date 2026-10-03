import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { getTemporalContext, isRsvpClosed } from "./temporal.ts";

/** Mezzogiorno italiano del giorno indicato (ora solare o legale). */
const at = (day: string, time = "12:00:00", offset = "+02:00") =>
  getTemporalContext(new Date(`${day}T${time}${offset}`));

describe("getTemporalContext", () => {
  it("prima della scadenza: fase rsvp", () => {
    const context = at("2026-10-03");

    assert.equal(context.phase, "rsvp");
    assert.equal(context.beforeRsvpDeadline, true);
  });

  it("il giorno della scadenza l'RSVP è ancora in evidenza", () => {
    assert.equal(at("2027-03-12", "23:30:00", "+01:00").phase, "rsvp");
  });

  it("dal giorno dopo la scadenza: attesa", () => {
    const context = at("2027-03-13", "00:30:00", "+01:00");

    assert.equal(context.phase, "waiting");
    assert.equal(context.beforeRsvpDeadline, false);
  });

  it("ultime settimane a partire da 21 giorni prima", () => {
    assert.equal(at("2027-05-21").phase, "waiting");
    assert.equal(at("2027-05-22").phase, "final-weeks");
    assert.equal(at("2027-05-22").daysToWedding, 21);
    assert.equal(at("2027-06-11").phase, "final-weeks");
  });

  it("il giorno del matrimonio dura fino alle 6 del mattino dopo", () => {
    assert.equal(at("2027-06-12", "00:10:00").phase, "wedding");
    assert.equal(at("2027-06-12").daysToWedding, 0);
    assert.equal(at("2027-06-13", "02:00:00").phase, "wedding");
    assert.equal(at("2027-06-13", "05:59:00").phase, "wedding");
  });

  it("dalle 6 del mattino dopo il sito è un ricordo", () => {
    assert.equal(at("2027-06-13", "06:01:00").phase, "after");
    assert.equal(at("2027-06-13").phase, "after");
    assert.equal(at("2028-01-01", "12:00:00", "+01:00").phase, "after");
  });

  it("conta i giorni sul calendario italiano, non su quello UTC", () => {
    // 23:30 UTC dell'11 giugno sono già l'1:30 del 12 in Italia.
    const context = getTemporalContext(new Date("2027-06-11T23:30:00Z"));

    assert.equal(context.today, "2027-06-12");
    assert.equal(context.phase, "wedding");
  });

  it("le conferme si chiudono con il giorno del matrimonio", () => {
    assert.equal(isRsvpClosed(at("2027-06-11").phase), false);
    assert.equal(isRsvpClosed(at("2027-06-12").phase), true);
    assert.equal(isRsvpClosed(at("2027-07-01").phase), true);
  });
});
