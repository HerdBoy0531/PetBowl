// import Navbar from "@organisms/Navbar";
// import HeroSection from "@organisms/HeroSection";
// import SearchBar from "@molecules/SearchBar";
// import PopularSection from "@organisms/PopularSection";


// export default function HomePage() {
//   return (
//     <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
//       {/* 상단 고정 바 */}
//       <Navbar />
      
//       <main className="flex-grow pt-16">
//         {/* 1. 히어로 캐러셀 섹션 */}
//         <HeroSection />

//         {/* 2. 원하는 사료 검색 섹션 */}
//         <section className="py-24 flex flex-col items-center px-4">
//           <h2 className="text-2xl md:text-3xl font-black mb-12 text-black dark:text-white">
//             원하는 사료 검색
//           </h2>
//           <SearchBar />
//         </section>

//         {/* 3. 인기 사료 랭킹 섹션 */}
//         <PopularSection />
//       </main>

//     </div>
//   );
// }


"use client";

import HeroSection from "@organisms/HeroSection";
import SearchBar from "@molecules/SearchBar";
import PopularSection from "@organisms/PopularSection";

export default function HomePage() {
  return (
    // 미니멀 오가닉 포인트: 전역 배경색을 활용하고, 섹션 간 여백(space-y-20)을 넓혀 여백의 미를 살림
    <div className="space-y-20 pb-12 animate-fade-in">
      
      {/* 1. 히어로 캐러셀 섹션 */}
      <HeroSection />

      {/* 2. 원하는 사료 검색 섹션 */}
      <section className="flex flex-col items-center px-4 max-w-2xl mx-auto text-center space-y-6">
        {/* font-black 대신 정갈한 font-bold와 자간 최적화(tracking-tight) 적용 */}
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
          원하는 사료 검색
        </h2>
        <p className="text-sm text-zinc-500 font-light max-w-md">
          궁금한 사료의 이름이나 브랜드를 입력하여 상세한 영양 성분 비율과 가성비를 바로 확인해보세요.
        </p>
        <div className="w-full">
          <SearchBar />
        </div>
      </section>

      {/* 3. 인기 사료 랭킹 섹션 */}
      <PopularSection />
      
    </div>
  );
}