// import FilterRow from "@molecules/FilterRow";

// // components/organisms/SearchFilterCard.tsx
// export default function SearchFilterCard() {
//   return (
//     <section className="
//       border-2 border-black dark:border-gray-600 
//       rounded-sm overflow-hidden mb-10 
//       bg-white dark:bg-gray-900 
//       text-black dark:text-white
//       shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
//       dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]
//     ">
//       <FilterRow label="제조사" options={["Royal Canin", "Nutrience"]} />
//       <FilterRow label="반려동물" options={["강아지"]} />
//       <FilterRow label="사료종류" options={["일반식"]} />
//       <FilterRow label="크기" options={["소형", "중형", "대형"]} />
//       <FilterRow label="생애주기" options={["베이비", "어덜트", "올드"]} />
//     </section>
//   );
// }

// design renewal
// import FilterRow from "@molecules/FilterRow";

// export default function SearchFilterCard() {
//   return (
//     <section className="
//       /* 미니멀 오가닉 포인트: 다크모드 제거, 깨끗한 흰색 배경 고정 */
//       bg-white text-black 
      
//       /* 얇은 선 처리와 부드러운 라운딩 */
//       border border-zinc-100 
//       rounded-2xl overflow-hidden mb-8 
      
//       /* 은은하게 공중에 떠 있는 듯한 shadow-sm 매칭 */
//       shadow-sm
//     ">
//       <FilterRow label="제조사" options={["Royal Canin", "Nutrience"]} />
//       <FilterRow label="반려동물" options={["강아지"]} />
//       <FilterRow label="사료종류" options={["일반식"]} />
//       <FilterRow label="크기" options={["소형", "중형", "대형"]} />
//       <FilterRow label="생애주기" options={["베이비", "어덜트", "올드"]} />
//     </section>
//   );
// }


// data binding
"use client";

import { useState, useEffect } from "react";
import FilterRow from "@molecules/FilterRow";

interface SearchFilterCardProps {
  filters: {
    search: string;
    brand: string;          // 제조사 추가 수입선 확보
    animalType: string;
    isPrescription: string; // 사료종류 추가 수입선 확보
    sizeCategory: string;
    lifeStage: string;
    proteins: string;
  };
  onFilterChange: (newFilters: Record<string, string>) => void;
}

interface FilterMeta {
  brands: string[];
  animals: { value: string; label: string }[];
  types: { value: string; label: string }[];
  sizes: string[];
  stages: { value: string; label: string }[];
}

export default function SearchFilterCard({ filters, onFilterChange }: SearchFilterCardProps) {
  const [meta, setMeta] = useState<FilterMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMetaOptions() {
      try {
        const res = await fetch("/api/foods/meta");
        if (res.ok) setMeta(await res.json());
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMetaOptions();
  }, []);

  if (isLoading || !meta) {
    return <div className="py-8 text-center text-xs text-zinc-400 font-light bg-white border border-zinc-100 rounded-2xl shadow-sm">사료 다중 검색 엔진 부팅 중...</div>;
  }

  // 💡 헬퍼 유틸: "A,B,C" 형태의 주소창 스트링을 깔끔하게 꺼내기 편한 ['A','B','C'] 배열로 변환 (빈값이면 빈배열)
  const toArray = (str: string) => (str ? str.split(",") : []);

  return (
    <section className="bg-white text-black border border-zinc-100 rounded-2xl overflow-hidden mb-8 shadow-sm animate-fade-in">
      
      {/* 1. 제조사 동적 다중 필터 */}
      <FilterRow
        label="제조사"
        options={meta.brands}
        selectedValues={toArray(filters.brand)}
        onChange={(arr) => onFilterChange({ brand: arr.join(",") })}
      />

      {/* 2. 반려동물 다중 필터 (영문 Enum <-> 한글 라벨 하이브리드 변환) */}
      <FilterRow
        label="반려동물"
        options={meta.animals.map((a) => a.label)}
        selectedValues={toArray(filters.animalType).map((val) => meta.animals.find((a) => a.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.animals.find((a) => a.label === l)?.value || "").filter(Boolean);
          onFilterChange({ animalType: vals.join(",") });
        }}
      />

      {/* 3. 사료종류 동적 다중 필터 */}
      <FilterRow
        label="사료종류"
        options={meta.types.map((t) => t.label)}
        selectedValues={toArray(filters.isPrescription).map((val) => meta.types.find((t) => t.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.types.find((t) => t.label === l)?.value || "").filter(Boolean);
          onFilterChange({ isPrescription: vals.join(",") });
        }}
      />

      {/* 4. 크기 동적 다중 필터 */}
      <FilterRow
        label="크기"
        options={meta.sizes}
        selectedValues={toArray(filters.sizeCategory)}
        onChange={(arr) => onFilterChange({ sizeCategory: arr.join(",") })}
      />

      {/* 5. 생애주기 동적 다중 필터 */}
      <FilterRow
        label="생애주기"
        options={meta.stages.map((s) => s.label)}
        selectedValues={toArray(filters.lifeStage).map((val) => meta.stages.find((s) => s.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.stages.find((s) => s.label === l)?.value || "").filter(Boolean);
          onFilterChange({ lifeStage: vals.join(",") });
        }}
      />

    </section>
  );
}