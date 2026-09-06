import Image from "next/image";
import Link from "next/link";

type FoodPlaceProps = {
  name: string;
  subtitle: string;
  description: string;
  location: string;
  image: string;
  href: string;
  reverse?: boolean;
};

export default function FoodPlace({
  name,
  subtitle,
  description,
  location,
  image,
  href,
  reverse = false,
}: FoodPlaceProps) {
  return (
    <article
  className={`
    grid
    overflow-hidden
    border-b
    border-border
    lg:grid-cols-2
    ${
      reverse
        ? "lg:[&>*:first-child]:order-2"
        : ""
    }
  `}
>
      {/* FOTO */}

      <div className="relative h-[340px] md:h-[380px] lg:h-[400px]">
        <Image
          src={image}
          alt={name}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            hover:scale-[1.02]
          "
        />
      </div>

      {/* TESTO */}

      <div className="flex items-center px-7 py-9 md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div className="max-w-lg">
          <p className="text-[9px] uppercase tracking-[0.35em] text-secondary">
            {location}
          </p>

          <h3 className="mt-3 font-heading text-3xl font-light leading-tight text-primary md:text-4xl">
            {name}
          </h3>

          <p className="mt-2 font-heading text-lg font-light text-secondary">
            {subtitle}
          </p>

          <p className="mt-5 text-[14px] leading-7 text-secondary">
            {description}
          </p>

          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-6
              inline-flex
              items-center
              border-b
              border-primary
              pb-1
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-primary
              transition-opacity
              duration-300
              hover:opacity-60
            "
          >
            Scopri di più
          </Link>
        </div>
      </div>
    </article>
  );
}