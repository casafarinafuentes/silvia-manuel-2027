import Section from "@/components/ui/Section";

export default function Welcome() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">

        <p className="font-heading text-4xl leading-relaxed text-text md:text-5xl">
          Siamo felici di condividere con voi
uno dei giorni più importanti
della nostra vita.
        </p>

        <p className="mt-10 text-lg leading-9 text-text-muted">
          Abbiamo raccolto qui tutte le informazioni utili per il matrimonio, insieme ad alcuni dei luoghi della Sardegna che ci hanno fatto innamorare di questa terra.
        </p>

      </div>
    </Section>
  );
}