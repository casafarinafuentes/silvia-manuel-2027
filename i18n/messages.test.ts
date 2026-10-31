import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Pair, fill, resolve } from "./pair.ts";
import { locales } from "./locales.ts";
import { giftMessages } from "./messages/gift.ts";
import { homeMessages } from "./messages/home.ts";
import { hotelMessages } from "./messages/hotel.ts";
import { hotels } from "../data/hotels.ts";
import { inviteMessages } from "./messages/invite.ts";
import { matrimonioMessages } from "./messages/matrimonio.ts";
import { rsvpErrors, rsvpMessages } from "./messages/rsvp.ts";
import { sardegnaMessages } from "./messages/sardegna.ts";
import { calendarMessages, siteMessages } from "./messages/site.ts";
import { uiMessages } from "./messages/ui.ts";

const dictionaries = {
  gift: giftMessages,
  home: homeMessages,
  hotel: hotelMessages,
  hotels,
  invite: inviteMessages,
  matrimonio: matrimonioMessages,
  rsvp: rsvpMessages,
  rsvpErrors,
  sardegna: sardegnaMessages,
  site: siteMessages,
  calendar: calendarMessages,
  ui: uiMessages,
};

/** Tutte le coppie di un dizionario, con il percorso per i messaggi di errore. */
function collect(node: unknown, path: string, out: [string, Pair<unknown>][]) {
  if (node instanceof Pair) {
    out.push([path, node]);
  } else if (Array.isArray(node)) {
    node.forEach((item, index) => collect(item, `${path}[${index}]`, out));
  } else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      collect(value, `${path}.${key}`, out);
    }
  }
}

const placeholders = (text: string) =>
  [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

describe("traduzioni", () => {
  const pairs: [string, Pair<unknown>][] = [];

  for (const [name, dict] of Object.entries(dictionaries)) {
    collect(dict, name, pairs);
  }

  it("raccoglie un buon numero di testi", () => {
    assert.ok(pairs.length > 300, `solo ${pairs.length} testi`);
  });

  it("ogni testo ha tutte le lingue, e nessuna è vuota se l'altra non lo è", () => {
    for (const [path, pair] of pairs) {
      const values = locales.map((locale) => pair.values[locale]);

      assert.ok(
        values.every((value) => value !== undefined),
        `${path}: manca una lingua`,
      );

      if (typeof values[0] === "string") {
        const empty = values.map((value) => value === "");

        assert.ok(
          empty.every(Boolean) || empty.every((value) => !value),
          `${path}: vuoto solo in una lingua`,
        );
      }
    }
  });

  it("i segnaposto {nome} sono gli stessi in ogni lingua", () => {
    for (const [path, pair] of pairs) {
      const [first, ...rest] = locales.map((locale) => pair.values[locale]);

      if (typeof first !== "string") continue;

      for (const other of rest) {
        assert.deepEqual(
          placeholders(other as string),
          placeholders(first),
          `${path}: segnaposto diversi`,
        );
      }
    }
  });

  it("gli a capo (\\n) sono gli stessi in ogni lingua", () => {
    for (const [path, pair] of pairs) {
      const [first, ...rest] = locales.map((locale) => pair.values[locale]);

      if (typeof first !== "string") continue;

      for (const other of rest) {
        assert.equal(
          (other as string).split("\n").length,
          first.split("\n").length,
          `${path}: numero di righe diverso`,
        );
      }
    }
  });
});

describe("resolve e fill", () => {
  it("sceglie la lingua in dizionari annidati", () => {
    const dict = {
      a: new Pair({ it: "ciao", es: "hola" }),
      list: [{ x: new Pair({ it: "uno", es: "uno!" }) }],
      plain: 3,
    };

    assert.deepEqual(resolve(dict, "es"), {
      a: "hola",
      list: [{ x: "uno!" }],
      plain: 3,
    });
  });

  it("riempie i segnaposto e lascia quelli senza valore", () => {
    assert.equal(fill("Ciao {name}, {n}", { name: "Ana" }), "Ciao Ana, {n}");
  });
});
