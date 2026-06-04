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
    brandKo: string;        // ⭐️ 변경: brand에서 brandKo 형태로 동기화
    animalType: string;
    isPrescription: string;
    sizeCategory: string;
    lifeStage: string;      // 확장된 'all' 단계 자동 수용
    proteins: string;       // 주단백질원
    kibbleSize: string;     // 🆕 추가: 키블크기
    allergies: string;      // 🆕 추가: 알레르기 케어
    certifications: string; // 🆕 추가: 인증여부
  };
  onFilterChange: (newFilters: Record<string, string>) => void;
}

interface FilterMeta {
  brands: { ko: string; en: string }[]; // ⭐️ 변경: {ko, en} 구조 대응
  animals: { value: string; label: string }[];
  types: { value: string; label: string }[];
  sizes: string[];
  stages: { value: string; label: string }[];
  allergies: { value: string; label: string }[];       // 🆕 추가: 메타 명세 대응
  certifications: { value: string; label: string }[];  // 🆕 추가: 메타 명세 대응
  proteins: { value: string; label: string }[]; // 주단백질원
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
        console.error("Filter Card Fetch Meta Error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMetaOptions();
  }, []);

  if (isLoading || !meta) {
    return (
      <div className="py-8 text-center text-xs text-zinc-400 font-light bg-white border border-zinc-100 rounded-2xl shadow-sm">
        사료 다중 검색 엔진 부팅 중...
      </div>
    );
  }

  // 💡 헬퍼 유틸: "A,B,C" 형태의 콤마 분리 스트링을 ['A','B','C'] 배열로 변환
  const toArray = (str: string) => (str ? str.split(",") : []);

  // 🆕 사료 임시 키블 크기 고정 옵션 풀 (백엔드 파싱 데이터 규격 동기화용)
  const kibbleSizeOptions = [
    "소형 (0~9mm)",
    "중형 (10~14mm)",
    "대형 (15mm 이상)",
  ];

  return (
    <section className="bg-white text-black border border-zinc-100 rounded-2xl overflow-hidden mb-8 shadow-sm animate-fade-in">
      
      {/* 1. 제조사 동적 다중 필터 (brandKo 맵핑 및 한글 노출) */}
      <FilterRow
        label="제조사"
        options={meta.brands.map((b) => b.ko)}
        selectedValues={toArray(filters.brandKo)}
        onChange={(arr) => onFilterChange({ brandKo: arr.join(",") })}
      />

      {/* 2. 반려동물 다중 필터 (강아지/고양이) */}
      <FilterRow
        label="반려동물"
        options={meta.animals.map((a) => a.label)}
        selectedValues={toArray(filters.animalType).map((val) => meta.animals.find((a) => a.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.animals.find((a) => a.label === l)?.value || "").filter(Boolean);
          onFilterChange({ animalType: vals.join(",") });
        }}
      />

      {/* 3. 사료종류 다중 필터 (일반식/처방식) */}
      <FilterRow
        label="사료종류"
        options={meta.types.map((t) => t.label)}
        selectedValues={toArray(filters.isPrescription).map((val) => meta.types.find((t) => t.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.types.find((t) => t.label === l)?.value || "").filter(Boolean);
          onFilterChange({ isPrescription: vals.join(",") });
        }}
      />

      {/* 4. 주단백질원 다중 필터 (기존 뼈대 연동 보존) */}
      <FilterRow
        label="주단백질"
        options={meta.proteins.map((p) => p.label)}
        selectedValues={toArray(filters.proteins).map(
          (val) =>
            meta.proteins.find((p) => p.value === val)?.label || ""
        )}
        onChange={(labels) => {
          const vals = labels
            .map(
              (label) =>
                meta.proteins.find((p) => p.label === label)?.value || ""
            )
            .filter(Boolean);

          onFilterChange({
            proteins: vals.join(","),
          });
        }}
      />

      {/* 5. 생애주기 다중 필터 (퍼피/어덜트/시니어/전연령 통합) */}
      <FilterRow
        label="생애주기"
        options={meta.stages.map((s) => s.label)}
        selectedValues={toArray(filters.lifeStage).map((val) => meta.stages.find((s) => s.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.stages.find((s) => s.label === l)?.value || "").filter(Boolean);
          onFilterChange({ lifeStage: vals.join(",") });
        }}
      />

      {/* 6. 🆕 키블 크기 다중 필터 */}
      <FilterRow
        label="키블크기"
        options={kibbleSizeOptions}
        selectedValues={toArray(filters.kibbleSize)}
        onChange={(arr) => onFilterChange({ kibbleSize: arr.join(",") })}
      />

      {/* 7. 🆕 알레르기 제어 다중 필터 (가수분해, 글루텐프리, 그레인프리, LID 대응) */}
      <FilterRow
        label="알레르기"
        options={meta.allergies.map((a) => a.label)}
        selectedValues={toArray(filters.allergies).map((val) => meta.allergies.find((a) => a.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.allergies.find((a) => a.label === l)?.value || "").filter(Boolean);
          onFilterChange({ allergies: vals.join(",") });
        }}
      />

      {/* 8. 🆕 인증여부 다중 필터 (AAFCO, HACCP, 유기농 등 전격 배치) */}
      <FilterRow
        label="인증여부"
        options={meta.certifications.map((c) => c.label)}
        selectedValues={toArray(filters.certifications).map((val) => meta.certifications.find((c) => c.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.certifications.find((c) => c.label === l)?.value || "").filter(Boolean);
          onFilterChange({ certifications: vals.join(",") });
        }}
      />

      {filters.search && (
        <div className="px-5 py-4 border-t border-zinc-100 bg-zinc-50/50">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-zinc-500">
              현재 검색어
            </span>

            <button
              onClick={() =>
                onFilterChange({
                  search: "",
                })
              }
              className=" inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-white border border-zinc-200 hover:bg-zinc-50 transition"
            >
              {filters.search}
              <span className="text-zinc-400">✕</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}