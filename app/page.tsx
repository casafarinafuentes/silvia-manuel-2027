import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Sardegna from "@/components/home/Sardegna";
import Footer from "@/components/matrimonio/Footer";

export default function HomePage() {
  return (
    <>
      {/* Il countdown vive dentro l'Hero e, in chiusura, nel Footer. */}
      <Hero />

      <Welcome />

      <Sardegna />

      <Footer />
    </>
  );
}