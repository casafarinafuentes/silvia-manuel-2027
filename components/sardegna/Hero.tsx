import PageHero from "@/components/ui/PageHero";

export default function Hero() {
  return (
    <PageHero
      title="La Sardegna che amiamo"
      subtitle="I posti che vi consigliamo"
      image="/sardegna/sardegna-hero.jpg"
      alt="La costa della Sardegna"
      imageClassName="object-cover object-center"
      overlayClassName="bg-gradient-to-b from-black/35 via-black/25 to-black/45"
    />
  );
}
