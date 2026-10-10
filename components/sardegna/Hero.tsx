import PageHero from "@/components/ui/PageHero";

export default function Hero() {
  return (
    <PageHero
      title="La Sardegna che amiamo"
      subtitle="I posti che vi consigliamo"
      image="/sardegna/hero-scogliera.jpg"
      alt="Scogliera di granito sul mare, in Sardegna"
      imageClassName="object-cover object-center"
      overlayClassName="bg-gradient-to-b from-black/40 via-black/35 to-black/50"
    />
  );
}
