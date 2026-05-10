// app/foods/search/page.tsx
import SearchFilterCard from "@organisms/SearchFilterCard";
import FoodTableList from "@organisms/FoodTableList";

export default function SearchPage() {
  return (
    // 1. pt-28로 Navbar 가림 방지, transition-colors로 부드러운 전환 추가
    <div className="px-6 pt-28 pb-20 min-h-screen transition-colors  dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <main className="flex flex-col gap-10">
          <header className="text-center">
            <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter">
              사료 상세 검색
            </h1>
          </header>

          {/* 2. 필터와 리스트 사이 간격 유지 및 배치 */}
          <div className="flex flex-col gap-12">
            <SearchFilterCard />
            <FoodTableList />
          </div>
        </main>
      </div>
    </div>
  );
}