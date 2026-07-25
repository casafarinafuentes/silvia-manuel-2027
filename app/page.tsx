import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Countdown from "@/components/home/Countdown";
import HomeCards from "@/components/home/HomeCards";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <Countdown />
      <HomeCards />
    </>
  );
}