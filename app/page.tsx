import HeroSection from "./components/HeroSection";
import SearchSection from "./components/SearchSection";
import PopularSection from "./components/PopularSection";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <SearchSection />
      <PopularSection />
    </main>
  );
}