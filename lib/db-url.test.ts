import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { stripTlsParams } from "./db-url.ts";

describe("stripTlsParams", () => {
  it("toglie sslmode e tiene gli altri parametri", () => {
    const out = stripTlsParams(
      "postgres://u:p@host.example.com:6543/db?sslmode=require&pgbouncer=true&connect_timeout=10",
    );

    assert.ok(!out.includes("sslmode"));
    assert.ok(out.includes("pgbouncer=true"));
    assert.ok(out.includes("connect_timeout=10"));
  });

  it("toglie anche sslrootcert, ssl e uselibpqcompat", () => {
    const out = stripTlsParams(
      "postgresql://u:p@h/db?sslmode=verify-full&sslrootcert=/x.pem&ssl=true&uselibpqcompat=true",
    );

    assert.ok(!/ssl|libpq/i.test(new URL(out).search));
  });

  it("non altera credenziali, host e database", () => {
    const out = new URL(stripTlsParams("postgres://user:pa%40ss@h.io:5432/mydb?sslmode=require"));

    assert.equal(out.username, "user");
    assert.equal(decodeURIComponent(out.password), "pa@ss");
    assert.equal(out.hostname, "h.io");
    assert.equal(out.pathname, "/mydb");
  });

  it("restituisce invariato ciò che non è un URL", () => {
    assert.equal(stripTlsParams("non-un-url"), "non-un-url");
  });
});
