"use client";

import AnalysisProgressBar from "@/components/molecules/AnalysisProgressBar";

interface NutrientAnalysis {
  label: string;
  value: number;
  unit: string;
}

interface FoodData {
  name: string;
  brand: string;
  description: string;
  animalType: string;
  lifeStage: string;
  mainProtein: string;
  analysis: any;
  ingredients: any;
}

export default function FoodDetailReport({ data }: { data: FoodData }) {
  console.log(data.analysis);
  return (
    <div className="space-y-6 w-full">
      
      {/* Slot 1: 기본 타이틀 메타 카드 */}
      <section className="bg-white border border-zinc-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
            {data.brand}
          </span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
          {data.name}
        </h1>
        
        <p className="text-sm text-zinc-500 font-light leading-relaxed">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-xs bg-[#FDFCF0] border border-zinc-200/60 text-zinc-700 px-3 py-1 rounded-xl">
            🎯 {data.animalType}
          </span>
          <span className="text-xs bg-[#FDFCF0] border border-zinc-200/60 text-zinc-700 px-3 py-1 rounded-xl">
            ⏳ {data.lifeStage}
          </span>
          <span className="text-xs bg-[#FDFCF0] border border-zinc-200/60 text-zinc-700 px-3 py-1 rounded-xl">
            🥩 주단백질: {data.mainProtein}
          </span>
        </div>
      </section>

      {/* Slot 2: 분석 게이지 보드 (분자 결합) */}
      <section className="bg-white border border-zinc-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
        <div className="space-y-4">
          {/* 💡 Object.entries()를 쓰면 {"조단백": 38} 객체가 [["조단백", 38]] 배열로 마법처럼 바뀝니다! */}
          {data?.analysis && Object.entries(data.analysis).map(([label, value], idx) => {
            // 백엔드에서 온 값이 숫자라면 unit을 붙여서 자식에게 전달
            const numericValue = typeof value === 'number' ? value : parseFloat(String(value)) || 0;
            
            // 조단백질, 조지방은 '% 이상'이고 수분, 조회분은 '% 이하'인 오가닉 매핑 규칙 적용
            const isMaxLimit = ["조섬유", "조회분", "수분"].includes(label);
            const unit = isMaxLimit ? "% 이하" : "% 이상";

            return (
              <AnalysisProgressBar 
                key={idx}
                label={label}         // "조단백질"
                value={numericValue}  // 38
                unit={unit}           // "% 이상"
              />
            );
          })}
        </div>
      </section>

      {/* Slot 3: 원료 전체 명세 */}
      <section className="bg-white border border-zinc-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4 w-full">
        <h3 className="text-base font-bold text-black tracking-tight">사용 원료 전체 성분</h3>
        <div className="p-4 md:p-5 bg-zinc-50/50 border border-zinc-100 rounded-2xl">
          <p className="text-sm text-zinc-600 font-light leading-relaxed tracking-wide">
            {/* 💡 안전 가드 이식: string이면 그대로 출력하고, 객체 배열이면 ingredientRaw만 콤마로 묶어서 출력합니다. */}
            {typeof data?.ingredients === "string"
              ? data.ingredients
              : Array.isArray(data?.ingredients)
              ? data.ingredients.map((i: any) => i.ingredientRaw || "").join(", ")
              : "등록된 원료 정보가 없습니다."}
          </p>
        </div>
        <p className="text-[11px] text-zinc-400 font-light">
          * 원료 배합 비율은 제조사 사정에 따라 일부 변경될 수 있습니다.
        </p>
      </section>

    </div>
  );
}