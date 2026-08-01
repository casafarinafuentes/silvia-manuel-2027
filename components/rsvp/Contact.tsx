import Section from "@/components/ui/Section";

export default function Contact() {
  return (
    <Section>
      <div className="mx-auto max-w-5xl rounded-[34px] border border-border bg-white shadow-[0_18px_60px_rgba(0,0,0,0.05)]">
        <div className="grid gap-12 p-10 md:grid-cols-2 md:p-14">
          {/* Sinistra */}

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-secondary">
              Hai bisogno di aiuto?
            </p>

            <h2 className="mt-4 font-heading text-4xl font-light text-primary">
              Contattaci
            </h2>

            <p className="mt-6 leading-8 text-secondary">
              Se hai dubbi sulla conferma della presenza,
              esigenze particolari oppure qualsiasi altra
              domanda, siamo sempre felici di aiutarti.
            </p>
          </div>

          {/* Destra */}

          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">
                Email
              </p>

              <p className="mt-2 text-lg text-primary">
                info@silviamanuel.it
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">
                Silvia
              </p>

              <p className="mt-2 text-lg text-primary">
                +39 333 123 4567
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">
                Manuel
              </p>

              <p className="mt-2 text-lg text-primary">
                +39 333 765 4321
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}