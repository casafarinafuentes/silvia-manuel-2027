import Image from "next/image";

export default function Favorite() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-secondary">
            Il nostro posto del cuore
          </p>

          <h2 className="mt-4 font-heading text-5xl font-light text-primary md:text-6xl">
            Cala Moresca
          </h2>
        </div>

        <div className="relative aspect-[16/8] overflow-hidden rounded-[36px]">
          <Image
            src="/sardegna/cala-moresca.jpg"
            alt="Cala Moresca"
            fill
            className="object-cover"
          />
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center font-heading text-2xl font-light leading-relaxed text-primary">
          “Se dovessimo sceglierne una sola,
          probabilmente sarebbe questa.”
        </p>
      </div>
    </section>
  );
}