import Image from "next/image";
import Link from "next/link";

type FoodTileProps = {
  name: string;
  subtitle: string;
  location?: string;
  /** Se manca, la tile diventa una scheda tipografica invece di una foto. */
  image?: string;
  href?: string;
  aspect?: "square" | "wide" | "hero";
};

const ASPECT = {
  square: "aspect-[1.25/1]",
  wide: "aspect-[2/1] md:aspect-[2.65/1]",
  hero: "aspect-[2.4/1] md:aspect-[4.8/1]",
} as const;

/** Dimensioni reali della tile, per non far scaricare immagini enormi. */
const SIZES = {
  square: "(max-width: 768px) 100vw, 33vw",
  wide: "(max-width: 768px) 100vw, 50vw",
  hero: "(max-width: 768px) 100vw, 1200px",
} as const;

export default function FoodTile({
  name,
  subtitle,
  location,
  image,
  href,
  aspect = "wide",
}: FoodTileProps) {
  const hasLink = Boolean(href);

  /* ------------------------------------------------------------------
     Senza fotografia: scheda tipografica sobria, coerente col resto
     della pagina. Meglio di un riquadro vuoto o di un'immagine rotta.
  ------------------------------------------------------------------ */

  if (!image) {
    return (
      <Wrapper href={href}>
        <div
          className={`
            group relative w-full
            ${ASPECT[aspect]}
            overflow-hidden rounded-tile
            bg-gradient-to-br from-[#efe9de] via-panel-photo to-[#e4ddd0]
          `}
        >
          {/* Al posto della foto: il ramo botanico, che reagisce all'hover
              come la fotografia delle altre schede (zoom lento). */}
          <Image
            src="/decorations/branch.webp"
            alt=""
            aria-hidden="true"
            width={260}
            height={325}
            className="
              pointer-events-none absolute -right-6 -top-6 h-[120%] w-auto
              object-contain opacity-30
              transition-transform duration-700
              ease-[cubic-bezier(.22,1,.36,1)]
              group-hover:scale-[1.06] group-hover:rotate-2
              motion-reduce:transition-none
              motion-reduce:group-hover:scale-100
              motion-reduce:group-hover:rotate-0
            "
          />

          {/* Stesso velo e stessa comparsa del testo delle schede con foto. */}
          <div
            className="
              absolute inset-0 bg-gradient-to-t from-black/10 to-transparent
              transition-colors duration-500
              md:group-hover:bg-black/10
            "
          />

          <div
            className="
              absolute inset-x-0 bottom-0 p-6 md:p-7
              transition-transform duration-500 ease-out
              md:group-hover:-translate-y-1
              motion-reduce:transition-none
              motion-reduce:md:group-hover:translate-y-0
            "
          >
            {location && (
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">
                {location}
              </p>
            )}

            <h3 className="mt-2 font-heading text-2xl font-light leading-tight text-primary md:text-3xl">
              {name}
            </h3>

            <p className="mt-2 text-[13px] leading-5 text-secondary">
              {subtitle}
            </p>

            {hasLink && (
              <span className="mt-4 inline-block border-b border-primary/50 pb-1 text-xs uppercase tracking-[0.3em] text-primary">
                Scopri →
              </span>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }

  /* ------------------------------------------------------------------
     Con fotografia: la foto è la card.

     Il testo resta sempre leggibile su mobile (dove l'hover non
     esiste) e compare in dissolvenza da `md` in su, dove il puntatore
     c'è davvero. Il gruppo reagisce anche al focus da tastiera.
  ------------------------------------------------------------------ */

  return (
    <Wrapper href={href}>
      <div
        className={`
          group relative w-full
          ${ASPECT[aspect]}
          overflow-hidden rounded-tile bg-[#e8e4dc]
        `}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes={SIZES[aspect]}
          className="
            object-cover
            transition-transform duration-700
            ease-[cubic-bezier(.22,1,.36,1)]
            group-hover:scale-[1.035]
            motion-reduce:transition-none
            motion-reduce:group-hover:scale-100
          "
        />

        {/* Scrim: sempre presente su mobile per garantire il contrasto
            del testo, solo in hover/focus sul desktop. */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t from-black/65 via-black/20 to-transparent
            transition-opacity duration-500
            md:bg-none md:bg-black/0
            md:opacity-0 md:transition-colors
            md:group-hover:bg-black/45 md:group-hover:opacity-100
            md:group-focus-within:bg-black/45 md:group-focus-within:opacity-100
          "
        />

        <div
          className="
            absolute inset-x-0 bottom-0 p-6 md:p-7
            md:translate-y-3 md:opacity-0
            md:transition-all md:duration-500 md:ease-out
            md:group-hover:translate-y-0 md:group-hover:opacity-100
            md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100
            motion-reduce:transition-none
          "
        >
          {location && (
            <p className="text-[8px] uppercase tracking-[0.35em] text-white/75">
              {location}
            </p>
          )}

          <h3 className="mt-2 font-heading text-2xl font-light leading-tight text-white md:text-3xl">
            {name}
          </h3>

          <p className="mt-2 text-[13px] leading-5 text-white/85">
            {subtitle}
          </p>

          {hasLink && (
            <span className="mt-4 inline-block border-b border-white/60 pb-1 text-[8px] uppercase tracking-[0.3em] text-white">
              Scopri →
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

function Wrapper({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  if (!href) return <>{children}</>;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-tile"
    >
      {children}
    </Link>
  );
}
