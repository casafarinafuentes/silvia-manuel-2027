# Silvia & Manuel — 12 giugno 2027

Sito del matrimonio: informazioni, RSVP con database, hotel, guida alla
Sardegna e lista nozze. Online su <https://silviaemanuel.it>.

Stack: Next.js 16 (App Router), React 19, Tailwind 4, Postgres.

## Sviluppo in locale

```bash
npm install
cp .env.example .env.local   # poi compila i valori
npm run dev
```

Comandi utili: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

## Dove si modificano i contenuti

| Cosa | Dove |
| --- | --- |
| Data, luogo, orari, coordinate | `config/wedding.ts` (solo dati verificati: i campi incerti restano `null` e non vengono mostrati) |
| Programma della giornata | `data/timeline.ts` |
| Schede della home | `data/homeCards.ts` |
| Voci del menu | `data/navigation.ts` |
| Hotel, FAQ, dress code, Sardegna | `data/` |
| Colori, font, raggi | `app/globals.css` (token in `:root`) |

## RSVP e area admin

Il form `/rsvp` salva le conferme in Postgres tramite una Server Action
(`lib/rsvp/actions.ts`): validazione lato server, controllo duplicati per
nome+cognome, limite di 5 invii/ora per IP (hash con sale, mai l'IP in chiaro).

L'elenco delle conferme è su `/admin` (password), con ricerca, totali ed
export CSV. Il login ha un limite di 5 tentativi sbagliati ogni 15 minuti.

### Configurare il database (una tantum)

1. Vercel → progetto → **Storage** → **Create Database** → Postgres (Neon).
   Vercel aggiunge da solo `DATABASE_URL`/`POSTGRES_URL` al progetto.
2. Vercel → **Settings → Environment Variables**, aggiungi (per Production):
   - `ADMIN_PASSWORD` — la password per `/admin`
   - `ADMIN_SESSION_SECRET` — stringa casuale lunga, per esempio
     `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `RSVP_IP_SALT` — una stringa casuale qualsiasi
   - `NEXT_PUBLIC_SITE_URL` — `https://silviaemanuel.it`
3. Crea le tabelle (una volta): `vercel env pull .env.local` e poi
   `npm run db:migrate`. Le migration sono idempotenti.
4. Rifai il deploy perché le variabili vengano lette.

Senza database il form mostra un errore generico e non salva nulla.

## Deploy

Ogni push su `main` fa partire il deploy su Vercel. La CI di GitHub
(`.github/workflows/ci.yml`) esegue lint, typecheck, test e build.

## Immagini

Foto in `public/`, già ottimizzate (max 2000 px, JPEG ~76%). Prima di
aggiungerne di nuove ridimensionale e comprimile: Next le serve poi in
WebP/AVIF, ma parte sempre dall'originale.
