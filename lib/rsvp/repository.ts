import "server-only";

import { createHash } from "node:crypto";

import { query } from "@/lib/db";
import type { RsvpInput } from "./schema";

export type RsvpRecord = {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  attending: boolean;
  party_size: number;
  dietary: string | null;
  message: string | null;
  created_at: Date;
  updated_at: Date;
};

export class DuplicateRsvpError extends Error {
  constructor() {
    super("RSVP già registrato per questa persona.");
    this.name = "DuplicateRsvpError";
  }
}

/** Codice Postgres per violazione di vincolo unique. */
const UNIQUE_VIOLATION = "23505";

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === UNIQUE_VIOLATION
  );
}

function emptyToNull(value: string): string | null {
  return value.length > 0 ? value : null;
}

export async function insertRsvp(input: RsvpInput): Promise<RsvpRecord> {
  try {
    const rows = await query<RsvpRecord>(
      `insert into rsvp
         (first_name, last_name, email, attending, party_size, dietary, message)
       values ($1, $2, $3, $4, $5, $6, $7)
       returning *`,
      [
        input.firstName,
        input.lastName,
        emptyToNull(input.email),
        input.attending,
        input.partySize,
        emptyToNull(input.dietary),
        emptyToNull(input.message),
      ],
    );

    return rows[0];
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new DuplicateRsvpError();
    }

    throw error;
  }
}

export async function listRsvp(search = ""): Promise<RsvpRecord[]> {
  const term = search.trim();

  if (!term) {
    return query<RsvpRecord>(`select * from rsvp order by created_at desc`);
  }

  return query<RsvpRecord>(
    `select *
       from rsvp
      where first_name ilike $1
         or last_name  ilike $1
         or email      ilike $1
      order by created_at desc`,
    [`%${term}%`],
  );
}

export type RsvpTotals = {
  submissions: number;
  attendingSubmissions: number;
  decliningSubmissions: number;
  /** Persone totali attese, accompagnatori inclusi. */
  attendingPeople: number;
  companions: number;
};

export async function getTotals(): Promise<RsvpTotals> {
  const rows = await query<{
    submissions: string;
    attending_submissions: string;
    declining_submissions: string;
    attending_people: string | null;
  }>(
    `select
       count(*)                                            as submissions,
       count(*) filter (where attending)                   as attending_submissions,
       count(*) filter (where not attending)               as declining_submissions,
       coalesce(sum(party_size) filter (where attending), 0) as attending_people
     from rsvp`,
  );

  const row = rows[0];

  const submissions = Number(row?.submissions ?? 0);
  const attendingSubmissions = Number(row?.attending_submissions ?? 0);
  const decliningSubmissions = Number(row?.declining_submissions ?? 0);
  const attendingPeople = Number(row?.attending_people ?? 0);

  return {
    submissions,
    attendingSubmissions,
    decliningSubmissions,
    attendingPeople,
    companions: attendingPeople - attendingSubmissions,
  };
}

/* ------------------------------------------------------------------
   Rate limiting
------------------------------------------------------------------ */

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MINUTES = 60;

/**
 * L'IP non viene mai salvato in chiaro: ne conserviamo solo un hash
 * con sale, sufficiente per contare i tentativi ma non per risalire
 * alla provenienza.
 */
function hashIp(ip: string): string {
  const salt = process.env.RSVP_IP_SALT ?? "silvia-manuel-2027";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function isRateLimited(ip: string): Promise<boolean> {
  const rows = await query<{ count: string }>(
    `select count(*) as count
       from rsvp_submission_log
      where ip_hash = $1
        and created_at > now() - ($2 || ' minutes')::interval`,
    [hashIp(ip), String(RATE_LIMIT_WINDOW_MINUTES)],
  );

  return Number(rows[0]?.count ?? 0) >= RATE_LIMIT_MAX;
}

export async function recordAttempt(ip: string): Promise<void> {
  await query(`insert into rsvp_submission_log (ip_hash) values ($1)`, [
    hashIp(ip),
  ]);
}
