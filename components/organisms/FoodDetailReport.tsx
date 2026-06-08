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