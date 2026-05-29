"use client";

interface NutritionSummaryCardProps {
  analysis: Record<string, number>;
}

const nutrientsMap: Record<string, string> = {
  protein: "조단백질",
  fat: "조지방",
  fiber: "조섬유",
  ash: "조회분",
  moisture: "수분",
  calcium: "칼슘",
  phosphorus: "인",
  sodium: "나트륨",
  omega3: "오메가3",
  omega6: "오메가6",
};

export default function NutritionSummaryCard({
  analysis,
}: NutritionSummaryCardProps) {
  const nutrients = Object.entries(analysis).filter(
    ([key, value]) =>
      ![
        "id",
        "foodId",
        "createdAt",
        "updatedAt",
      ].includes(key) &&
      value !== null &&
      value !== undefined
  );


  return (
    <div className="bg-white border border-zinc-100 rounded-3xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-zinc-900 mb-5">
        영양성분 요약
      </h3>

      <div className="space-y-3">
        {nutrients.map(([label, value]) => {
          const displayValue = Number(value).toFixed(1);

          const lowerLimitLabels = [
            "조섬유",
            "조회분",
            "수분",
          ];

          const condition = lowerLimitLabels.includes(
            nutrientsMap[label] ?? label
          )
            ? "이하"
            : "이상";

          return (
            <div
              key={label}
              className="flex items-center justify-between border-b border-zinc-100 pb-2 last:border-0"
            >
              <span className="text-sm text-zinc-600">
                {nutrientsMap[label] ?? label}
              </span>

              <span className="flex items-center gap-2">
                <span className="font-semibold text-zinc-900">
                  {displayValue}%
                </span>

                <span className="text-xs text-zinc-400 font-medium">
                  {condition}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}