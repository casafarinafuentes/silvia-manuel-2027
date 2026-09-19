import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { hasRealIban, wedding } from "../config/wedding.ts";

describe("hasRealIban", () => {
  it("non considera reale il segnaposto IT00 0000…", () => {
    const original = wedding.gift.iban;

    wedding.gift.iban = "IT00 0000 0000 0000 0000 0000 000";
    assert.equal(hasRealIban(), false);

    wedding.gift.iban = original;
  });

  it("accetta un IBAN italiano ben formato", () => {
    const original = wedding.gift.iban;

    wedding.gift.iban = "IT60 X054 2811 1010 0000 0123 456";
    assert.equal(hasRealIban(), true);

    wedding.gift.iban = original;
  });

  it("rifiuta stringhe vuote o troppo corte", () => {
    const original = wedding.gift.iban;

    for (const value of ["", "IT60", "non un iban"]) {
      wedding.gift.iban = value;
      assert.equal(hasRealIban(), false, value);
    }

    wedding.gift.iban = original;
  });
});
