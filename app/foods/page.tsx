import Navbar from "@organisms/Navbar";
import HeroSection from "@organisms/HeroSection";
import SearchBar from "@molecules/SearchBar";
import PopularSection from "@organisms/PopularSection";


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* 상단 고정 바 */}
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* 히어로 캐러셀 섹션 */}
        <HeroSection />

        {/* 원하는 사료 검색 섹션 */}
        <section className="py-24 flex flex-col items-center px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-12 text-black dark:text-white">
            원하는 사료 검색
          </h2>
          <SearchBar />
        </section>

        {/* 인기 사료 랭킹 섹션 */}
        <PopularSection />
      </main>

    </div>
  );
}