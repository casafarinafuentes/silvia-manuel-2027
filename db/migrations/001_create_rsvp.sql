-- RSVP — schema iniziale
-- Applicare con: npm run db:migrate

create extension if not exists "pgcrypto";

create table if not exists rsvp (
  id            uuid primary key default gen_random_uuid(),

  -- Identità dell'invitato
  first_name    text        not null,
  last_name     text        not null,
  email         text,

  -- Partecipazione
  attending     boolean     not null,

  -- Numero totale di persone incluso chi compila (1 = viene da solo).
  -- Gli "accompagnatori" sono party_size - 1.
  party_size    integer     not null default 1,

  -- Preferenze e note
  dietary       text,
  message       text,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  constraint rsvp_party_size_range check (party_size between 1 and 20),
  constraint rsvp_first_name_len   check (char_length(first_name) between 1 and 80),
  constraint rsvp_last_name_len    check (char_length(last_name)  between 1 and 80),
  constraint rsvp_email_len        check (email   is null or char_length(email)   <= 160),
  constraint rsvp_dietary_len      check (dietary is null or char_length(dietary) <= 500),
  constraint rsvp_message_len      check (message is null or char_length(message) <= 2000),

  -- Chi non partecipa non porta accompagnatori.
  constraint rsvp_absent_party_size check (attending or party_size = 1)
);

create index if not exists rsvp_created_at_idx on rsvp (created_at desc);
create index if not exists rsvp_attending_idx  on rsvp (attending);

-- Evita doppi invii identici dovuti a doppio click / refresh:
-- lo stesso nome+cognome non può comparire due volte.
create unique index if not exists rsvp_person_unique
  on rsvp (lower(trim(first_name)), lower(trim(last_name)));

-- Mantiene updated_at coerente sugli aggiornamenti.
create or replace function rsvp_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists rsvp_set_updated_at on rsvp;

create trigger rsvp_set_updated_at
  before update on rsvp
  for each row
  execute function rsvp_touch_updated_at();

-- Rate limiting: traccia i tentativi per IP senza memorizzare l'IP in chiaro.
create table if not exists rsvp_submission_log (
  id          bigserial primary key,
  ip_hash     text        not null,
  created_at  timestamptz not null default now()
);

create index if not exists rsvp_submission_log_lookup_idx
  on rsvp_submission_log (ip_hash, created_at desc);
