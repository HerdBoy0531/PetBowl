"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchFilterCard from "@/components/organisms/SearchFilterCard";
import FoodTableList from "@/components/organisms/FoodTableList";

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 주소창(URL) 파라미터 안전 수확 파이프라인
  const currentSearch = searchParams.get("search") || "";
  const currentBrandKo = searchParams.get("brandKo") || "";
  const currentAnimalType = searchParams.get("animalType") || "";
  const currentPrescription = searchParams.get("isPrescription") || ""; 
  const currentLifeStage = searchParams.get("lifeStage") || "";
  const currentSizeCategory = searchParams.get("sizeCategory") || "";
  const currentProteins = searchParams.get("proteins") || "";
  const currentSort = searchParams.get("sort") || "id";
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 10;

  // 오늘 개편된 스펙 주소창 수확 변수
  const currentKibbleSize = searchParams.get("kibbleSize") || "";
  const currentAllergies = searchParams.get("allergies") || "";
  const currentCertifications = searchParams.get("certifications") || "";

  // API 실시간 응답 상태 관리
  const [foods, setFoods] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // URL 파라미터가 변경될 때마다 백엔드 /api/foods와 연동하는 데이터 트럭 가동
  useEffect(() => {
    async function fetchFilteredFoods() {
      setIsLoading(true);
      try {
        const query = new URLSearchParams();
        if (currentSearch) query.set("search", currentSearch);
        if (currentAnimalType) query.set("animalType", currentAnimalType);
        if (currentLifeStage) query.set("lifeStage", currentLifeStage);
        if (currentSizeCategory) query.set("sizeCategory", currentSizeCategory);
        if (currentProteins) query.set("proteins", currentProteins); 
        if (currentSort) query.set("sort", currentSort);
        if (currentBrandKo) query.set("brand", currentBrandKo); 
        if (currentPrescription) query.set("isPrescription", currentPrescription);

        if (currentKibbleSize) query.set("kibbleSize", currentKibbleSize);
        if (currentAllergies) query.set("allergies", currentAllergies);
        if (currentCertifications) query.set("certifications", currentCertifications);

        query.set("page", String(currentPage));
        query.set("limit", String(currentLimit));

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
    currentBrandKo,        
    currentPrescription, 
    currentAnimalType,
    currentLifeStage,
    currentSizeCategory,
    currentProteins,
    currentSort,
    currentPage,
    currentLimit,
    currentKibbleSize,
    currentAllergies,
    currentCertifications
  ]);

  // 필터 토글 클릭 시 주소창을 안전하게 동기화해주는 코어 핸들러 함수
  const handleUpdateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); 

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key); 
    });

    router.push(`/search?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="space-y-10 animate-fade-in w-full">
      <header className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">사료 상세 검색</h1>
        <p className="text-sm text-zinc-500 font-light">우리 아이 맞춤형 안심 사료를 조건별 필터로 정밀하게 검색해보세요.</p>
      </header>

      <div className="flex flex-col gap-12">
        <SearchFilterCard
          filters={{
            search: currentSearch,
            brandKo: currentBrandKo,             
            animalType: currentAnimalType,
            isPrescription: currentPrescription,
            lifeStage: currentLifeStage,         
            sizeCategory: currentSizeCategory,
            proteins: currentProteins,  
            kibbleSize: currentKibbleSize,       
            allergies: currentAllergies,         
            certifications: currentCertifications 
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
            router.push(`/search?${params.toString()}`, {
              scroll: false,
            });
          }}
          onSortChange={(newSort) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("sort", newSort);
            params.set("page", "1");
            router.push(`/search?${params.toString()}`, {
              scroll: false,
            });
          }}
        />
      </div>
    </div>
  );
}

// Next.js 빌드 시 useSearchParams 관측 버그를 원천 봉쇄하는 정석 Suspense 쉴드 레이어
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