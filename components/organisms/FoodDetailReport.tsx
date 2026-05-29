// "use client";

// import AnalysisProgressBar from "@/components/molecules/AnalysisProgressBar";

// interface NutrientAnalysis {
//   label: string;
//   value: number;
//   unit: string;
// }

// interface FoodData {
//   name: string;
//   brand: string;
//   description: string;
//   animalType: string;
//   lifeStage: string;
//   mainProtein: string;
//   analysis: any;
//   ingredients: any;
// }

// export default function FoodDetailReport({ data }: { data: FoodData }) {
//   console.log(data.analysis);
//   return (
//     <div className="space-y-6 w-full">
      
//       {/* Slot 1: 기본 타이틀 메타 카드 */}
//       <section className="bg-white border border-zinc-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
//         <div className="flex items-center justify-between">
//           <span className="text-xs bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
//             {data.brand}
//           </span>
//         </div>
        
//         <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
//           {data.name}
//         </h1>
        
//         <p className="text-sm text-zinc-500 font-light leading-relaxed">
//           {data.description}
//         </p>

//         <div className="flex flex-wrap gap-2 pt-2">
//           <span className="text-xs bg-[#FDFCF0] border border-zinc-200/60 text-zinc-700 px-3 py-1 rounded-xl">
//             🎯 {data.animalType}
//           </span>
//           <span className="text-xs bg-[#FDFCF0] border border-zinc-200/60 text-zinc-700 px-3 py-1 rounded-xl">
//             ⏳ {data.lifeStage}
//           </span>
//           <span className="text-xs bg-[#FDFCF0] border border-zinc-200/60 text-zinc-700 px-3 py-1 rounded-xl">
//             🥩 주단백질: {data.mainProtein}
//           </span>
//         </div>
//       </section>

//       {/* Slot 2: 분석 게이지 보드 (분자 결합) */}
//       <section className="bg-white border border-zinc-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
//         <div className="space-y-4">
//           {/* 💡 Object.entries()를 쓰면 {"조단백": 38} 객체가 [["조단백", 38]] 배열로 마법처럼 바뀝니다! */}
//           {data?.analysis && Object.entries(data.analysis).map(([label, value], idx) => {
//             // 백엔드에서 온 값이 숫자라면 unit을 붙여서 자식에게 전달
//             const numericValue = typeof value === 'number' ? value : parseFloat(String(value)) || 0;
            
//             // 조단백질, 조지방은 '% 이상'이고 수분, 조회분은 '% 이하'인 오가닉 매핑 규칙 적용
//             const isMaxLimit = ["조섬유", "조회분", "수분"].includes(label);
//             const unit = isMaxLimit ? "% 이하" : "% 이상";

//             return (
//               <AnalysisProgressBar 
//                 key={idx}
//                 label={label}         // "조단백질"
//                 value={numericValue}  // 38
//                 unit={unit}           // "% 이상"
//               />
//             );
//           })}
//         </div>
//       </section>

//       {/* Slot 3: 원료 전체 명세 */}
//       <section className="bg-white border border-zinc-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4 w-full">
//         <h3 className="text-base font-bold text-black tracking-tight">사용 원료 전체 성분</h3>
//         <div className="p-4 md:p-5 bg-zinc-50/50 border border-zinc-100 rounded-2xl">
//           <p className="text-sm text-zinc-600 font-light leading-relaxed tracking-wide">
//             {/* 💡 안전 가드 이식: string이면 그대로 출력하고, 객체 배열이면 ingredientRaw만 콤마로 묶어서 출력합니다. */}
//             {typeof data?.ingredients === "string"
//               ? data.ingredients
//               : Array.isArray(data?.ingredients)
//               ? data.ingredients.map((i: any) => i.ingredientRaw || "").join(", ")
//               : "등록된 원료 정보가 없습니다."}
//           </p>
//         </div>
//         <p className="text-[11px] text-zinc-400 font-light">
//           * 원료 배합 비율은 제조사 사정에 따라 일부 변경될 수 있습니다.
//         </p>
//       </section>

//     </div>
//   );
// }

"use client";

import FoodFeatureCard from "@/components/molecules/FoodFeatureCard";
import NutritionSummaryCard from "@/components/molecules/NutritionSummaryCard";
import IngredientSection from "@/components/molecules/IngredientSection";

interface FoodData {
  nameKo: string;
  brandEn: string;

  animalType?: string;
  lifeStage?: string;
  kibbleSize?: number;

  allergies?: string[];
  certifications?: string[];

  proteins?: any[];
  carbohydrates?: any[];
  vegetables?: any[];
  ingredients?: any[];

  analysis: any;
}

const lifeStageMap: Record<string, string> = {
  puppy: "퍼피",
  adult: "어덜트",
  senior: "시니어",
  all: "전연령",
};

const animalTypeMap: Record<string, string> = {
  dog: "강아지",
  cat: "고양이",
};

export default function FoodDetailReport({
  data,
}: {
  data: FoodData;
}) {
  const proteinSources =
    data.proteins?.map((p) => p.sourceRaw) || [];

  const fiberSources =
    data.carbohydrates?.map((c) => c.sourceRaw) || [];

  const vegetableSources =
    data.vegetables?.map((v) => v.sourceRaw) || [];

  const ingredientSources =
    data.ingredients?.map((i) => i.ingredientRaw) || [];

  const mainProtein =
    data.proteins?.find((p) => p.isPrimary)?.sourceRaw ??
    data.proteins?.[0]?.sourceRaw ??
    "-";

  return (
    <div className="space-y-6 w-full">

      {/* 상단 기본 정보 */}
      <section className="bg-white border border-zinc-100 rounded-3xl shadow-sm p-8">
        <div className="mb-4">
          <span className="px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-700 text-sm font-semibold">
            {data.brandEn}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-zinc-900 mb-5">
          {data.nameKo}
        </h1>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">
            {animalTypeMap[data.animalType || ""] ??
              data.animalType}
          </span>

          <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">
            {lifeStageMap[data.lifeStage || ""] ??
              data.lifeStage}
          </span>

          <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">
            {mainProtein}
          </span>

          {data.kibbleSize && (
            <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">
              {data.kibbleSize}mm
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          {/* 알레르기 */}
          <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              알레르기
            </h3>

            <div className="flex flex-wrap gap-2">
              {(data.allergies ?? []).length > 0 ? (
                data.allergies?.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs text-zinc-700"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-xs text-zinc-400">
                  정보 없음
                </span>
              )}
            </div>
          </div>

          {/* 인증 */}
          <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              인증
            </h3>

            <div className="flex flex-wrap gap-2">
              {(data.certifications ?? []).length > 0 ? (
                data.certifications?.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs text-zinc-700"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-xs text-zinc-400">
                  정보 없음
                </span>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 특징 영역 */}
      <section className="bg-white border border-zinc-100 rounded-3xl shadow-sm p-6">
        <div className="grid md:grid-cols-2 gap-4">

          {/* 왼쪽 */}
          <div className="space-y-4">

            <FoodFeatureCard
              title="예상 단백질 원료"
              items={proteinSources}
            />

            <FoodFeatureCard
              title="예상 조섬유 원료"
              items={fiberSources}
            />

            <FoodFeatureCard
              title="예상 야채 원료"
              items={vegetableSources}
            />
          </div>

          {/* 오른쪽 */}
          <div>
            <NutritionSummaryCard
              analysis={data.analysis}
            />
          </div>
        </div>
      </section>

      {/* 사용 원료 정보 */}
      <IngredientSection
        ingredients={ingredientSources}
      />
    </div>
  );
}