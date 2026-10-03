import FoodTile from "./FoodTile";

/**
 * Indirizzi verificati.
 *
 * `image` è valorizzata solo dove la fotografia esiste davvero in
 * /public/sardegna: senza file la tile diventa una scheda tipografica
 * invece di un'immagine rotta. Man mano che arrivano le foto basta
 * aggiungere qui il percorso.
 *
 * `href` solo dove il sito ufficiale è stato verificato.
 */

const cantina = [
  {
    name: "Sa Crescia Ezza",
    subtitle: "Sapori della tradizione gallurese",
    location: "Olbia",
    image: "/sardegna/sa-crescia-ezza.jpg",
    href: "https://www.sacresciaezza.com/",
  },
  {
    name: "Tenuta Paltusa",
    subtitle: "Vini, vigneti e degustazioni",
    location: "Gallura",
    image: "/sardegna/tenuta-paltusa.jpg",
    href: "https://www.paltusa.it/",
  },
  {
    name: "Podere Guardia Grande",
    subtitle: "Vini e sapori della Sardegna",
    location: "Alghero",
    href: "https://podereguardiagrande.com/it",
  },
];

const restaurant = [
  {
    name: "Sushi Mio",
    subtitle: "Sushi à la carte",
    location: "Olbia",
    image: "/sardegna/sushi-mio.jpg",
  },
];

const breakfast = [
  {
    name: "Pasticceria Pace",
    subtitle: "Colazioni e dolci",
    location: "Olbia",
  },
  {
    name: "Pistacchio",
    subtitle: "Caffetteria e pasticceria",
    location: "Olbia",
  },
];

function CategoryTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-5">
      <span className="h-px w-9 bg-border" />

      <p className="text-[9px] uppercase tracking-[0.38em] text-secondary">
        {children}
      </p>
    </div>
  );
}

export default function Food({
  showComingSoon = true,
}: {
  /** Il riquadro "stiamo ancora scegliendo" della categoria Aperitivi. */
  showComingSoon?: boolean;
}) {
  return (
    <section id="cibo" className="anchor-offset px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-16 max-w-2xl">
          <h2 className="font-heading text-5xl font-light leading-none text-primary md:text-6xl">
            Food
          </h2>

          <p className="mt-7 max-w-xl text-[15px] leading-7 text-secondary">
            Qualche indirizzo che ci piace particolarmente,
            tra sapori locali, colazioni, vino e posti dove
            fermarsi per qualcosa di buono.
          </p>
        </div>

        {/* =========================
            AGRITURISMO / CANTINA
        ========================== */}

        <div>
          <CategoryTitle>
            Agriturismo / Cantina
          </CategoryTitle>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {cantina.map((place) => (
              <FoodTile
                key={place.name}
                {...place}
                aspect="square"
              />
            ))}
          </div>
        </div>

        {/* =========================
            RISTORANTE
        ========================== */}

        <div className="mt-12">
          <CategoryTitle>
            Ristorante
          </CategoryTitle>

          <FoodTile
            {...restaurant[0]}
            aspect="hero"
          />
        </div>

        {/* =========================
            COLAZIONI
        ========================== */}

        <div className="mt-12">
          <CategoryTitle>
            Colazioni
          </CategoryTitle>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {breakfast.map((place) => (
              <FoodTile
                key={place.name}
                {...place}
                aspect="wide"
              />
            ))}
          </div>
        </div>

        {/* =========================
            APERITIVI
        ========================== */}

        {/* "Stiamo ancora scegliendo": ha senso finché il matrimonio è
            lontano; a ridosso e dopo sembrerebbe una dimenticanza. */}
        {showComingSoon && (
        <div className="mt-12">
          <CategoryTitle>
            Aperitivi
          </CategoryTitle>

          <div
            className="
              flex
              min-h-[120px]
              items-center
              justify-center
              rounded-tile
              border
              border-dashed
              border-border
              px-6
            "
          >
            <p className="text-center font-heading text-[15px] leading-6 text-secondary">
              Stiamo ancora scegliendo qualche posto
              <br />
              da consigliarvi...
            </p>
          </div>
        </div>
        )}

      </div>
    </section>
  );
}