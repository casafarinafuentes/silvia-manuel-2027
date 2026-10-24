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
| Programma della giornata, dress code, FAQ, ispirazioni | `i18n/messages/matrimonio.ts` (IT + ES) |
| Schede della home | `data/homeCards.ts` + testi in `i18n/messages/home.ts` |
| Voci del menu | `data/navigation.ts` + testi in `i18n/messages/ui.ts` |
| Hotel, avventure della Sardegna | `data/` |
| Colori, font, raggi | `app/globals.css` (token in `:root`) |

## Lingue (italiano e spagnolo)

Il sito è in italiano (senza prefisso: `/matrimonio`) e in spagnolo
(sotto `/es`: `/es/matrimonio`). Il cambio lingua è nell'intestazione,
nel menu e nell'hero della home; chi arriva con il browser in spagnolo
viene portato su `/es`.

- **Testi**: stanno in `i18n/messages/*.ts` (e in `data/adventures.ts`),
  sempre in coppia: `p("italiano", "español")`. Se manca una traduzione
  il progetto non compila; `npm test` controlla anche che le due
  versioni abbiano gli stessi segnaposto (`{date}`) e lo stesso numero
  di righe.
- **Nei componenti**: `useM(dizionario)` (componenti client e server non
  async) oppure `await getM(dizionario)` (server async).
- **Link interni**: sempre `Link` da `@/i18n/navigation`, che mantiene la
  lingua. Ogni pagina nuova in `app/[locale]/` chiama `initLocale(params)`.
- **Per aggiungere una lingua** (es. inglese): una riga in
  `i18n/locales.ts` e un campo in `Pair` (`i18n/pair.ts`); il compilatore
  elenca ogni testo da tradurre.
- La pagina `/hotel` (nascosta) non è tradotta.

## Invito interattivo

Una busta con sigillo che si apre e mostra l'invito, per chi non può
ricevere quello di carta. Vive solo a `/invito/<INVITE_SLUG>` (e
`/es/invito/<INVITE_SLUG>` in spagnolo); qualsiasi altro indirizzo dà
"pagina non trovata". Non è in sitemap né in `robots.txt` e ha `noindex`.

Il repository è pubblico, quindi il segreto è una variabile d'ambiente:
`INVITE_SLUG` (su Vercel: Settings → Environment Variables, poi un nuovo
deploy). In sviluppo, senza variabile, vale `/invito/prova`. Codice in
`components/invito/`, immagini in `public/invito/` (ritagli del file di
stampa), testi in `i18n/messages/invite.ts`.

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
3. Le tabelle si creano da sole alla prima richiesta (`lib/db-schema.ts`,
   idempotente): non serve lanciare nessuna migration. `npm run db:migrate`
   resta disponibile per applicarle a mano.
4. Rifai il deploy perché le variabili vengano lette.
5. Controllo: apri `/admin`, accedi e verifica che compaiano i totali (0).

Senza database il form mostra un errore generico e non salva nulla.

## Deploy

Ogni push su `main` fa partire il deploy su Vercel. La CI di GitHub
(`.github/workflows/ci.yml`) esegue lint, typecheck, test e build.

## Immagini

Foto in `public/`, già ottimizzate (max 2000 px, JPEG ~76%). Prima di
aggiungerne di nuove ridimensionale e comprimile: Next le serve poi in
WebP/AVIF, ma parte sempre dall'originale.

## Fasi del matrimonio

Il sito cambia da solo man mano che il matrimonio si avvicina. La logica
sta tutta in `lib/temporal.ts` (`getTemporalContext`): i componenti
chiedono la fase, non guardano mai la data.

| Fase | Quando | Cosa cambia |
|---|---|---|
| `rsvp` | fino alla scadenza delle conferme | l'RSVP è in evidenza |
| `waiting` | dalla scadenza a 22 giorni prima | in evidenza i dettagli della giornata |
| `final-weeks` | ultimi 21 giorni | prima le informazioni pratiche |
| `wedding` | il giorno del matrimonio, fino alle 6 del mattino dopo | l'essenziale, pulsante "Come arrivare"; RSVP chiuso |
| `after` | da lì in poi | ringraziamento e foto, tutto al passato |

Le date vengono da `config/wedding.ts`; il pulsante principale di ogni
fase è in `lib/phase-content.ts`.

**Anteprima (solo in sviluppo).** In basso a destra c'è una barra per
saltare da una fase all'altra; oppure `/anteprima?data=2027-06-20` per
una data precisa e `/anteprima` per tornare a oggi. In produzione
l'anteprima non esiste.
