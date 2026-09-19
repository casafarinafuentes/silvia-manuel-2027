import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

import { SCHEMA_SQL } from "./db-schema.ts";

const migration = readFileSync("db/migrations/001_create_rsvp.sql", "utf8");

/** Nomi di tabelle, indici, funzioni e trigger dichiarati in un file SQL. */
function objectNames(sql: string): string[] {
  const names = new Set<string>();
  const pattern =
    /create\s+(?:or\s+replace\s+)?(?:unique\s+)?(?:table|index|function|trigger)\s+(?:if\s+not\s+exists\s+)?([a-z_]+)/gi;

  for (const match of sql.matchAll(pattern)) {
    names.add(match[1].toLowerCase());
  }

  return [...names].sort();
}

describe("SCHEMA_SQL", () => {
  it("dichiara gli stessi oggetti della migration su file", () => {
    assert.deepEqual(objectNames(SCHEMA_SQL), objectNames(migration));
  });

  it("è idempotente: nessun create senza if not exists / or replace", () => {
    for (const line of SCHEMA_SQL.split("\n")) {
      if (/^\s*create\s+(table|index|unique)/i.test(line)) {
        assert.match(line, /if\s+not\s+exists/i, line);
      }
    }
  });
});
