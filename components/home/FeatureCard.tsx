import Image from "next/image";
import Link from "next/link";

import { ArrowRight, LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  href: string;
  /** Senza immagine la scheda mostra un riquadro con il ramo botanico. */
  image: string | null;
  icon: LucideIcon;
};

export default function FeatureCard({
  title,
  description,
  href,
  image,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      data-cursor="Scopri"
      className="group flex h-full flex-col overflow-hidden border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Immagine */}

      <div className="relative aspect-[1.7] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 256px"
            className="object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-panel">
            <Image
              src="/decorations/branch.webp"
              alt=""
              aria-hidden="true"
              width={140}
              height={175}
              className="h-full w-auto object-contain py-3 opacity-60 transition duration-700 group-hover:scale-105 motion-reduce:transition-none"
            />
          </div>
        )}
      </div>

      {/* Contenuto */}

      <div className="flex flex-1 flex-col items-center px-7 pt-6 pb-3 text-center">
        <div className="text-primary">
          <Icon
            size={18}
            strokeWidth={1.6}
          />
        </div>

        <h3 className="mt-4 font-heading text-[16px] font-semibold uppercase tracking-[0.16em] text-primary">
          {title}
        </h3>

        <p className="mt-4 text-[15px] leading-6 text-secondary">
          {description}
        </p>

        <div className="flex-1" />

        <ArrowRight
          size={18}
          className="mt-4 mb-1 transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}