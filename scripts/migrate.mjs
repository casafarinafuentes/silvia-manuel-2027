/**
 * Applica in ordine i file .sql di db/migrations.
 *
 * Uso:  npm run db:migrate
 *
 * Legge DATABASE_URL da .env.local (o dall'ambiente). Le migration
 * sono idempotenti (IF NOT EXISTS / OR REPLACE), quindi rieseguirle
 * non causa danni.
 */

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

import pg from "pg";

const MIGRATIONS_DIR = join(process.cwd(), "db", "migrations");

/** Parser .env minimale: evita una dipendenza solo per questo script. */
async function loadEnvFile(file) {
  if (!existsSync(file)) return;

  const content = await readFile(file, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    process.env[key] = rawValue.replace(/^(['"])(.*)\1$/, "$2");
  }
}

async function main() {
  await loadEnvFile(join(process.cwd(), ".env.local"));
  await loadEnvFile(join(process.cwd(), ".env"));

  const connectionString =
    process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

  if (!connectionString) {
    console.error(
      "\n  DATABASE_URL non impostata.\n" +
        "  Copia .env.example in .env.local e inserisci la connection string,\n" +
        "  oppure esegui `vercel env pull .env.local`.\n",
    );
    process.exit(1);
  }

  const files = (await readdir(MIGRATIONS_DIR))
    .filter((name) => name.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("Nessuna migration da applicare.");
    return;
  }

  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();

  try {
    for (const file of files) {
      const sql = await readFile(join(MIGRATIONS_DIR, file), "utf8");

      process.stdout.write(`  ${file} … `);

      // Ogni migration in transazione: o passa tutta, o non passa.
      await client.query("begin");

      try {
        await client.query(sql);
        await client.query("commit");
        console.log("ok");
      } catch (error) {
        await client.query("rollback");
        console.log("FALLITA");
        throw error;
      }
    }

    console.log("\nMigration completate.\n");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("\nErrore durante le migration:\n", error.message ?? error);
  process.exit(1);
});
