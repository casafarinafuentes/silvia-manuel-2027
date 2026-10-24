import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Sardegna from "@/components/home/Sardegna";
import Footer from "@/components/matrimonio/Footer";
import { initLocale } from "@/i18n/init-locale";

type PageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageProps) {
  await initLocale(params);

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      {/* Il countdown vive dentro l'Hero e, in chiusura, nel Footer. */}
      <Hero />

      <Welcome />

      <Sardegna />

      <Footer />
    </main>
  );
}