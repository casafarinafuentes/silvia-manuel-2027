import Section from "@/components/ui/Section";

export default function Welcome() {
  return (
    <Section>

      <div className="mx-auto max-w-3xl text-center">

        <h2 className="text-primary text-5xl font-light">
          Benvenuti
        </h2>

        <div className="mt-5 text-xl text-[#b99d75]">
          ❦
        </div>

        <p className="mt-10 text-primary text-3xl leading-relaxed">

          Siamo felici di condividere con voi
          <br />
          uno dei giorni più importanti
          <br />
          della nostra vita.

        </p>

        <p className="mt-10 text-secondary text-lg leading-9">

          Abbiamo raccolto qui tutte le informazioni utili
          per il matrimonio, insieme ad alcuni dei luoghi
          della Sardegna che ci hanno fatto innamorare.

        </p>

      </div>

    </Section>
  );
}