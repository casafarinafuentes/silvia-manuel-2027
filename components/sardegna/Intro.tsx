export default function Intro() {
  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl text-center">

        <p className="font-heading text-[30px] font-light leading-tight text-primary md:text-[38px]">
          Abbiamo scelto di sposarci qui anche perché
          questa terra ci ha conquistati.
        </p>

        <div className="my-8 flex items-center justify-center gap-5">
          <span className="h-px w-16 bg-border" />

          <svg
            viewBox="0 0 48 24"
            className="h-6 w-12 text-secondary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              d="M24 20C20 14 16 9 8 7"
              strokeLinecap="round"
            />
            <path
              d="M24 20C28 14 32 9 40 7"
              strokeLinecap="round"
            />
            <path
              d="M18 14C15 11 13 8 13 4"
              strokeLinecap="round"
            />
            <path
              d="M30 14C33 11 35 8 35 4"
              strokeLinecap="round"
            />
          </svg>

          <span className="h-px w-16 bg-border" />
        </div>

        <p className="mx-auto max-w-2xl text-[17px] leading-8 text-secondary">
          Se avete voglia di fermarvi qualche giorno in più,
          abbiamo raccolto per voi alcuni dei nostri posti
          del cuore.
        </p>

      </div>
    </section>
  );
}