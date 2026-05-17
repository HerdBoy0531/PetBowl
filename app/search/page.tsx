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


// design renewal

// "use client";

// import SearchFilterCard from "@/components/organisms/SearchFilterCard";
// import FoodTableList from "@/components/organisms/FoodTableList";

// export default function SearchPage() {
//   return (
//     // 미니멀 오가닉 포인트: layout.tsx가 이미 여백을 관리하므로 중복 패딩/너비 설정을 제거하여 결합성 극대화
//     <div className="space-y-10 animate-fade-in">
      
//       {/* 1. 헤더 영역: 과도한 Brutalist 속성 제거 및 정갈한 타이포그래피 매칭 */}
//       <header className="text-center space-y-2">
//         <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
//           사료 상세 검색
//         </h1>
//         <p className="text-sm text-zinc-500 font-light">
//           우리 아이 맞춤형 안심 사료를 조건별 필터로 정밀하게 검색해보세요.
//         </p>
//       </header>

//       {/* 2. 필터 카드와 결과 리스트 사이의 오가닉 감성 간격(gap-8) 매칭 */}
//       <div className="flex flex-col gap-8">
//         <SearchFilterCard />
//         <FoodTableList />
//       </div>

//     </div>
//   );
// }


// data binding
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchFilterCard from "@/components/organisms/SearchFilterCard";
import FoodTableList from "@/components/organisms/FoodTableList";

function SearchPageContent() {
const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentBrand = searchParams.get("brand") || "";                   // 👈 💡 추가
  const currentAnimalType = searchParams.get("animalType") || "";
  const currentPrescription = searchParams.get("isPrescription") || "";   // 👈 💡 추가
  const currentLifeStage = searchParams.get("lifeStage") || "";
  const currentSizeCategory = searchParams.get("sizeCategory") || "";
  const currentProteins = searchParams.get("proteins") || "";
  const currentSort = searchParams.get("sort") || "id";
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 10;

  // API 응답 상태 관리
  const [foods, setFoods] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 🔄 2. URL 조건이 바뀔 때마다 백엔드 /api/foods 실시간 Fetching 파이프라인
  useEffect(() => {
    async function fetchFilteredFoods() {
      setIsLoading(true);
      try {
        // 백엔드 명세 쿼리스트링 규격 조립
        const query = new URLSearchParams();
        if (currentSearch) query.set("search", currentSearch);
        if (currentAnimalType) query.set("animalType", currentAnimalType);
        if (currentLifeStage) query.set("lifeStage", currentLifeStage);
        if (currentSizeCategory) query.set("sizeCategory", currentSizeCategory);
        if (currentProteins) query.set("protein", currentProteins); 
        if (currentSort) query.set("sort", currentSort);
        
        // 💡 [💡핵심 버그 해결 포인트] 백엔드 서버에 요청을 전송할 때 
        // 주소창에서 수확한 동적 제조사(brand)와 사료종류(isPrescription)를 페이로드에 꽉 실어줍니다!
        if (currentBrand) query.set("brand", currentBrand);
        if (currentPrescription) query.set("isPrescription", currentPrescription);

        query.set("page", String(currentPage));
        query.set("limit", String(currentLimit));

        // 최종 완성된 조건 쿼리를 날립니다 (?brand=Royal...&isPrescription=true)
        const res = await fetch(`/api/foods?${query.toString()}`, { cache: "no-store" });
        if (res.ok) {
          const result = await res.json();
          setFoods(result.data);
          setTotal(result.total);
        }
      } catch (error) {
        console.error("사료 목록 검색 실패:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFilteredFoods();
  }, [
    currentSearch,
    currentBrand,        // 💡 잊지 말고 디펜던시 배열에도 추가하여
    currentPrescription, // 이 조건들이 주소창에서 변경될 때마다 자동 실시간 호출을 태웁니다.
    currentAnimalType,
    currentLifeStage,
    currentSizeCategory,
    currentProteins,
    currentSort,
    currentPage,
    currentLimit
  ]);

  // 🔄 3. 핸들러 가판대: 필터가 바뀔 때 URL 주소창을 안전하게 업데이트하는 핵심 제어탑
  const handleUpdateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // 페이지 번호 리셋 (새로운 조건을 누르면 1페이지부터 보여주는 것이 기본 UX 규칙)
    params.set("page", "1"); 

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key); // 빈 값(전체 선택 등)일 경우 쿼리스트링에서 깔끔하게 삭제
      }
    });

    router.push(`/search?${params.toString()}`);
  };

 return (
    <div className="space-y-10 animate-fade-in w-full">
      <header className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">사료 상세 검색</h1>
        <p className="text-sm text-zinc-500 font-light">우리 아이 맞춤형 안심 사료를 조건별 필터로 정밀하게 검색해보세요.</p>
      </header>

      <div className="flex flex-col gap-8">
        <SearchFilterCard
          filters={{
            search: currentSearch,
            brand: currentBrand,                   // 👈 💡 바인딩 배달 연동
            animalType: currentAnimalType,
            isPrescription: currentPrescription,   // 👈 💡 바인딩 배달 연동
            lifeStage: currentLifeStage,
            sizeCategory: currentSizeCategory,
            proteins: currentProteins,
          }}
          onFilterChange={handleUpdateFilters}
        />
        
        <FoodTableList
          foods={foods}
          total={total}
          isLoading={isLoading}
          pagination={{ page: currentPage, limit: currentLimit, sort: currentSort }}
          onPageChange={(newPage) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(newPage));
            router.push(`/search?${params.toString()}`);
          }}
          onSortChange={(newSort) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("sort", newSort);
            params.set("page", "1");
            router.push(`/search?${params.toString()}`);
          }}
        />
      </div>
    </div>
  );
}

// 🔒 Next.js 빌드 타임에 useSearchParams 사용 시 발생하는 정적 분석 에러를 원천 차단하는 Suspense 쉴드
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-zinc-400 font-light animate-pulse">
        사료 검색 엔진 부팅 중...
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}