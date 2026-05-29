"use client";

interface IngredientSectionProps {
  ingredients: string[];
}

export default function IngredientSection({
  ingredients,
}: IngredientSectionProps) {
  return (
    <div className="bg-white border border-zinc-100 rounded-3xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-zinc-900 mb-4">
        사용 원료 정보
      </h3>

      <p className="text-sm leading-7 text-zinc-600">
        {ingredients.length > 0
          ? ingredients.join(", ")
          : "등록된 원료 정보가 없습니다."}
      </p>
    </div>
  );
}