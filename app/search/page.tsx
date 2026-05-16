// // app/foods/search/page.tsx
// import SearchFilterCard from "@organisms/SearchFilterCard";
// import FoodTableList from "@organisms/FoodTableList";

// export default function SearchPage() {
//   return (
//     // 1. pt-28로 Navbar 가림 방지, transition-colors로 부드러운 전환 추가
//     <div className="px-6 pt-28 pb-20 min-h-screen transition-colors  dark:bg-gray-900">
//       <div className="mx-auto max-w-6xl">
//         <main className="flex flex-col gap-10">
//           <header className="text-center">
//             <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter">
//               사료 상세 검색
//             </h1>
//           </header>

//           {/* 2. 필터와 리스트 사이 간격 유지 및 배치 */}
//           <div className="flex flex-col gap-12">
//             <SearchFilterCard />
//             <FoodTableList />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import SearchFilterCard from "@/components/organisms/SearchFilterCard";
import FoodTableList from "@/components/organisms/FoodTableList";

export default function SearchPage() {
  return (
    // 미니멀 오가닉 포인트: layout.tsx가 이미 여백을 관리하므로 중복 패딩/너비 설정을 제거하여 결합성 극대화
    <div className="space-y-10 animate-fade-in">
      
      {/* 1. 헤더 영역: 과도한 Brutalist 속성 제거 및 정갈한 타이포그래피 매칭 */}
      <header className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
          사료 상세 검색
        </h1>
        <p className="text-sm text-zinc-500 font-light">
          우리 아이 맞춤형 안심 사료를 조건별 필터로 정밀하게 검색해보세요.
        </p>
      </header>

      {/* 2. 필터 카드와 결과 리스트 사이의 오가닉 감성 간격(gap-8) 매칭 */}
      <div className="flex flex-col gap-8">
        <SearchFilterCard />
        <FoodTableList />
      </div>

    </div>
  );
}