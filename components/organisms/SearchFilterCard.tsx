"use client";

import { useState, useEffect } from "react";
import FilterRow from "@molecules/FilterRow";

interface SearchFilterCardProps {
  filters: {
    search: string;
    brandKo: string;
    animalType: string;
    isPrescription: string;
    sizeCategory: string;
    lifeStage: string; 
    proteins: string;
    kibbleSize: string;
    allergies: string; 
    certifications: string; 
  };
  onFilterChange: (newFilters: Record<string, string>) => void;
}

interface FilterMeta {
  brands: { ko: string; en: string }[];
  animals: { value: string; label: string }[];
  types: { value: string; label: string }[];
  sizes: string[];
  stages: { value: string; label: string }[];
  allergies: { value: string; label: string }[];
  certifications: { value: string; label: string }[];
  proteins: { value: string; label: string }[];
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

  const toArray = (str: string) => (str ? str.split(",") : []);

  const kibbleSizeOptions = [
    "소형 (0~9mm)",
    "중형 (10~14mm)",
    "대형 (15mm 이상)",
  ];

  return (
    <section className="bg-white text-black border border-zinc-100 rounded-2xl overflow-hidden mb-8 shadow-sm animate-fade-in">
      
      {/* 제조사 동적 다중 필터 */}
      <FilterRow
        label="제조사"
        options={meta.brands.map((b) => b.ko)}
        selectedValues={toArray(filters.brandKo)}
        onChange={(arr) => onFilterChange({ brandKo: arr.join(",") })}
      />

      {/* 반려동물 다중 필터 */}
      <FilterRow
        label="반려동물"
        options={meta.animals.map((a) => a.label)}
        selectedValues={toArray(filters.animalType).map((val) => meta.animals.find((a) => a.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.animals.find((a) => a.label === l)?.value || "").filter(Boolean);
          onFilterChange({ animalType: vals.join(",") });
        }}
      />

      {/* 사료종류 다중 필터 */}
      <FilterRow
        label="사료종류"
        options={meta.types.map((t) => t.label)}
        selectedValues={toArray(filters.isPrescription).map((val) => meta.types.find((t) => t.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.types.find((t) => t.label === l)?.value || "").filter(Boolean);
          onFilterChange({ isPrescription: vals.join(",") });
        }}
      />

      {/* 주단백질원 다중 필터 */}
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

      {/* 애주기 다중 필터 */}
      <FilterRow
        label="생애주기"
        options={meta.stages.map((s) => s.label)}
        selectedValues={toArray(filters.lifeStage).map((val) => meta.stages.find((s) => s.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.stages.find((s) => s.label === l)?.value || "").filter(Boolean);
          onFilterChange({ lifeStage: vals.join(",") });
        }}
      />

      {/* 키블 크기 다중 필터 */}
      <FilterRow
        label="키블크기"
        options={kibbleSizeOptions}
        selectedValues={toArray(filters.kibbleSize)}
        onChange={(arr) => onFilterChange({ kibbleSize: arr.join(",") })}
      />

      {/* 알레르기 제어 다중 필터 */}
      <FilterRow
        label="알레르기"
        options={meta.allergies.map((a) => a.label)}
        selectedValues={toArray(filters.allergies).map((val) => meta.allergies.find((a) => a.value === val)?.label || "")}
        onChange={(labels) => {
          const vals = labels.map((l) => meta.allergies.find((a) => a.label === l)?.value || "").filter(Boolean);
          onFilterChange({ allergies: vals.join(",") });
        }}
      />

      {/* 인증여부 다중 필터 */}
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