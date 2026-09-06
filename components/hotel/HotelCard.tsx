import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BedDouble,
  Bus,
  Coffee,
  MapPin,
  Tag,
  Waves,
} from "lucide-react";

type HotelCardProps = {
  title: string;
  image: string;
  distance: string;
  description: string;
  href: string;
  badges?: string[];
};

export default function HotelCard({
  title,
  image,
  distance,
  description,
  href,
  badges = [],
}: HotelCardProps) {
  return (
    <article
      className="
        overflow-hidden
        rounded-panel
        border
        border-border
        bg-white
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-[0_24px_70px_rgba(0,0,0,0.05)]
      "
    >
      <div className="grid lg:grid-cols-[46%_54%]">
        {/* FOTO */}

        <div className="relative min-h-[320px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="
              object-cover
              transition-transform
              duration-700
              hover:scale-105
            "
          />
        </div>

        {/* TESTO */}

        <div className="flex flex-col p-8">
          {/* Badge */}

          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-accent/30
                  bg-accent/5
                  px-3
                  py-1.5
                  text-[9px]
                  uppercase
                  tracking-[0.28em]
                  text-accent
                "
              >
                {badge === "Convenzione ospiti" ? (
                  <Tag size={11} />
                ) : (
                  <Bus size={11} />
                )}

                {badge}
              </span>
            ))}
          </div>

          {/* Titolo */}

          <h3
            className="
              mt-5
              font-heading
              text-[42px]
              font-light
              leading-none
              text-primary
            "
          >
            {title}
          </h3>

          {/* Stelle */}

          <div
            className="
              mt-3
              flex
              gap-1
              text-[17px]
              text-accent
            "
          >
            ★★★★★
          </div>

          {/* Informazioni */}

          <div className="mt-5 grid grid-cols-2 gap-y-3 text-[15px] text-secondary">
            <div className="flex items-center gap-2">
              <MapPin size={15} />
              <span>{distance}</span>
            </div>

            <div className="flex items-center gap-2">
              <Waves size={15} />
              <span>Vista mare</span>
            </div>

            <div className="flex items-center gap-2">
              <Coffee size={15} />
              <span>Colazione inclusa</span>
            </div>

            <div className="flex items-center gap-2">
              <BedDouble size={15} />
              <span>Camere premium</span>
            </div>
          </div>

          {/* Descrizione */}

          <p
            className="
              mt-6
              max-w-xl
              text-[16px]
              leading-7
              text-secondary
            "
          >
            {description}
          </p>
                    {/* CTA */}

          <div className="mt-4">
            <Link
              href={href}
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-border
                px-7
                py-3
                text-[11px]
                uppercase
                tracking-[0.30em]
                text-primary
                transition-all
                duration-300
                hover:border-primary
                hover:bg-primary
                hover:text-white
              "
            >
              Scopri l&apos;hotel

              <ArrowRight
                size={16}
                strokeWidth={1.7}
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}