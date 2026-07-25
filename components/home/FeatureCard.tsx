import Image from "next/image";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  icon: LucideIcon;
};

export default function FeatureCard({
  title,
  description,
  image,
  href,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="grid grid-cols-[120px_1fr] gap-5">

        <div className="relative h-36 overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between">

          <div>

            <Icon
              size={22}
              className="mb-3 text-primary"
            />

            <h3 className="text-2xl text-primary">
              {title}
            </h3>

            <p className="mt-3 leading-7 text-secondary">
              {description}
            </p>

          </div>

          <ArrowRight
            className="mt-6 transition-transform group-hover:translate-x-1"
            size={20}
          />

        </div>

      </div>
    </Link>
  );
}