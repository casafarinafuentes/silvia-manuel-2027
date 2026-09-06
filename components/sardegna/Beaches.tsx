import Image from "next/image";

import Reveal from "@/components/ui/Reveal";

type Beach = {
  name: string;
  image: string;
};

const nearby: Beach[] = [
  { name: "Spiaggia del Principe", image: "/sardegna/spiaggia-del-principe.jpg" },
  { name: "Capriccioli", image: "/sardegna/capriccioli.jpg" },
  { name: "Grande Pevero", image: "/sardegna/grande-pevero.jpg" },
];

const further: Beach[] = [
  { name: "Cala Moresca", image: "/sardegna/cala-moresca.jpg" },
  { name: "La Pelosa", image: "/sardegna/la-pelosa.jpg" },
  { name: "Rena Bianca", image: "/sardegna/rena-bianca.jpg" },
  { name: "Cala Brandinchi", image: "/sardegna/cala-brandinchi.jpg" },
  { name: "Lu Impostu", image: "/sardegna/lu-impostu.jpg" },
  { name: "Porto Istana", image: "/sardegna/porto-istana.jpg" },
];

function Photo({
  beach,
  aspect,
  sizes,
  priority = false,
}: {
  beach: Beach;
  aspect: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <div className={`relative ${aspect} overflow-hidden rounded-[28px] bg-panel-photo`}>
        <Image
          src={beach.image}
          alt={beach.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>

      <figcaption className="mt-4 font-heading text-2xl font-light text-primary">
        {beach.name}
      </figcaption>
    </figure>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.35em] text-secondary">
      {children}
    </p>
  );
}

export default function Beaches() {
  const [principe, capriccioli, pevero] = nearby;
  const [moresca, ...others] = further;

  return (
    <section id="spiagge" className="anchor-offset px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 max-w-2xl">
          <Eyebrow>Acqua cristallina</Eyebrow>

          <h2 className="mt-4 font-heading text-5xl font-light text-primary md:text-6xl">
            Spiagge
          </h2>
        </Reveal>

        {/* --------------------------------------------------------
            Vicino: una grande immagine e due secondarie affiancate.
        --------------------------------------------------------- */}

        <Reveal>
          <Eyebrow>Vicino alla location</Eyebrow>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
          <Reveal>
            <Photo
              beach={principe}
              aspect="aspect-[4/3] lg:aspect-[4/4.6]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8">
            <Reveal delay={0.08}>
              <Photo
                beach={capriccioli}
                aspect="aspect-[4/3] lg:aspect-[16/9]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </Reveal>

            <Reveal delay={0.16}>
              <Photo
                beach={pevero}
                aspect="aspect-[4/3] lg:aspect-[16/9]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </Reveal>
          </div>
        </div>

        {/* --------------------------------------------------------
            Più lontano: una in evidenza, le altre in griglia più fitta.
        --------------------------------------------------------- */}

        <div className="mt-24 md:mt-28">
          <Reveal>
            <Eyebrow>Se avete qualche giorno in più</Eyebrow>
          </Reveal>

          <Reveal className="mt-8">
            <Photo
              beach={moresca}
              aspect="aspect-[16/10] md:aspect-[21/9]"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {others.map((beach, index) => (
              <Reveal key={beach.name} delay={index * 0.06}>
                <Photo
                  beach={beach}
                  aspect="aspect-[4/5]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
