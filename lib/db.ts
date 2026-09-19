import "server-only";

import { Pool } from "pg";

import { SCHEMA_SQL } from "./db-schema";
import { stripTlsParams } from "./db-url";

/**
 * Pool Postgres condiviso.
 *
 * In sviluppo Next ricarica i moduli a ogni modifica: senza cache sul
 * globale ogni reload aprirebbe un nuovo pool ed esauriremmo le
 * connessioni del database.
 */

const globalForDb = globalThis as unknown as {
  rsvpPool: Pool | undefined;
};

/**
 * Trova la stringa di connessione.
 *
 * Prima i nomi standard. Poi, se il database è stato creato da Vercel
 * con un prefisso personalizzato (es. STORAGE_DATABASE_URL,
 * STORAGE_POSTGRES_URL), cerca una variabile con quel suffisso o il
 * cui valore è un URL postgres, escludendo le varianti "non pooling".
 */
function findConnectionString(): string | undefined {
  const standard =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_PRISMA_URL;

  if (standard) {
    return standard;
  }

  const candidates = Object.entries(process.env).filter(
    ([name, value]) =>
      typeof value === "string" &&
      /^postgres(ql)?:\/\//.test(value) &&
      !/NON_POOLING|UNPOOLED|NO_SSL/i.test(name),
  );

  const preferred =
    candidates.find(([name]) => /(DATABASE_URL|POSTGRES_URL)$/.test(name)) ??
    candidates[0];

  return preferred?.[1];
}

function connectionString(): string {
  const url = findConnectionString();

  if (!url) {
    throw new Error(
      "Database non configurato: manca DATABASE_URL (o POSTGRES_URL). " +
        "Vedi .env.example.",
    );
  }

  return url;
}

export function getPool(): Pool {
  if (!globalForDb.rsvpPool) {
    globalForDb.rsvpPool = new Pool({
      connectionString: stripTlsParams(connectionString()),
      // I Postgres gestiti (Neon, Supabase, Vercel) richiedono TLS ma
      // presentano certificati che Node non verifica di default.
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }

  return globalForDb.rsvpPool;
}

/**
 * Crea le tabelle se mancano, una sola volta per istanza del server.
 * Se fallisce (database irraggiungibile) si riprova alla richiesta dopo.
 */
let schemaReady: Promise<void> | undefined;

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getPool()
      .query(SCHEMA_SQL)
      .then(() => undefined)
      .catch((error) => {
        schemaReady = undefined;
        throw error;
      });
  }

  return schemaReady;
}

export async function query<T extends Record<string, unknown>>(
  text: string,
  params: readonly unknown[] = [],
): Promise<T[]> {
  await ensureSchema();

  const result = await getPool().query<T>(text, params as unknown[]);
  return result.rows;
}

/** True se è configurata una connessione al database. */
export function isDatabaseConfigured(): boolean {
  return Boolean(findConnectionString());
}
