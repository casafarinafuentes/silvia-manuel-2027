-- Sicurezza: Supabase espone ogni tabella dello schema public anche
-- tramite la sua API REST (PostgREST), leggibile da chiunque conosca
-- l'URL del progetto, a meno che la Row-Level Security non sia attiva.
--
-- L'app non usa quella API: si collega al database direttamente con
-- DATABASE_URL, connessione che non e soggetta a RLS. Attivarla senza
-- creare policy per anon/authenticated blocca quindi solo l'accesso
-- pubblico via API, senza toccare il funzionamento del sito.

alter table rsvp enable row level security;
alter table rsvp_submission_log enable row level security;
