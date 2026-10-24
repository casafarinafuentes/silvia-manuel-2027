import FoodTile from "./FoodTile";
import Lines from "@/components/ui/Lines";
import type { Resolved } from "@/i18n/pair";
import { useM } from "@/i18n/use-messages";
import { sardegnaMessages } from "@/i18n/messages/sardegna";


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

function getPlaces(f: Resolved<typeof sardegnaMessages>["food"]) {
  const { places } = f;

  const cantina = [
  {
    name: "Sa Crescia Ezza",
    subtitle: places.saCrescia,
    location: "Olbia",
    image: "/sardegna/sa-crescia-ezza.jpg",
    href: "https://www.sacresciaezza.com/",
  },
  {
    name: "Tenuta Paltusa",
    subtitle: places.paltusa,
    location: places.locationGallura,
    image: "/sardegna/paltusa.jpg",
    href: "https://www.paltusa.it/",
  },
  {
    name: "Podere Guardia Grande",
    subtitle: places.guardia,
    location: "Alghero",
    image: "/sardegna/podere-guardia-grande.jpg",
    href: "https://podereguardiagrande.com/it",
  },
];

const restaurant = [
  {
    name: "Sushi Mio",
    subtitle: places.sushi,
    location: "Olbia",
    image: "/sardegna/sushi-mio.jpg",
  },
];

const breakfast = [
  {
    name: "Pasticceria Pace",
    subtitle: places.pace,
    location: "Porto Cervo",
    image: "/sardegna/pasticceria-pace.jpg",
  },
  {
    name: "Pistacchio",
    subtitle: places.pistacchio,
    location: "Olbia",
    image: "/sardegna/pistacchio-colazione.jpg",
  },
];

  return { cantina, restaurant, breakfast };
}

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
  const { food: t } = useM(sardegnaMessages);
  const { cantina, restaurant, breakfast } = getPlaces(t);

  return (
    <section id="cibo" className="anchor-offset px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-16 max-w-2xl">
          <h2 className="font-heading text-5xl font-light leading-none text-primary md:text-6xl">
            {t.title}
          </h2>

          <p className="mt-7 max-w-xl text-[15px] leading-7 text-secondary">
            {t.text}
          </p>
        </div>

        {/* =========================
            AGRITURISMO / CANTINA
        ========================== */}

        <div>
          <CategoryTitle>
            {t.cantina}
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
            {t.restaurant}
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
            {t.breakfast}
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
            {t.aperitifs}
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
              <Lines text={t.comingSoon} />
            </p>
          </div>
        </div>
        )}

      </div>
    </section>
  );
}