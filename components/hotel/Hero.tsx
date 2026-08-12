import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[82vh] min-h-[720px] overflow-hidden">

      {/* Background */}

      <Image
        src="/hotel/hotel-hero.jpg"
        alt="Hotel in Sardegna"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-8">

          <div className="max-w-3xl">

            <p
              className="
                mb-6
                text-[11px]
                uppercase
                tracking-[0.45em]
                text-white/80
              "
            >
              HOTEL
            </p>

            <h1
              className="
                font-heading
                text-7xl
                font-light
                leading-none
                text-white
                md:text-[108px]
              "
            >
              Hotel
            </h1>

            <p
              className="
                mt-8
                max-w-xl
                text-lg
                leading-8
                text-white/90
              "
            >
              Abbiamo selezionato alcune strutture nelle
              vicinanze della location, per permettervi di
              vivere un soggiorno rilassante e godervi al
              meglio il weekend del matrimonio.
            </p>

          </div>

        </div>
      </div>

      {/* Scroll */}

      <div
        className="
          absolute
          bottom-12
          left-1/2
          -translate-x-1/2
          text-center
        "
      >
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.45em]
            text-white/80
          "
        >
          Scorri
        </p>

        <svg
          className="mx-auto mt-5 h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6 9 6 6 6-6"
          />
        </svg>
      </div>

    </section>
  );
}