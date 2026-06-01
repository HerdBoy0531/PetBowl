"use client";

import RecommendedFoodCard from "@/components/molecules/RecommendedFoodCard";
import { useState, useEffect } from "react";

interface RecommendedFoodsSectionProps {
  currentFoodId: number;
}

interface RecommendedFood {
  id: number;
  nameKo: string;
  brandEn: string;
  animalType: string;
  lifeStage: string;
  kibbleSize: number;
  mainProtein: string;
}

export default function RecommendedFoodsSection({
  currentFoodId,
}: RecommendedFoodsSectionProps) {
  const [foods, setFoods] = useState<RecommendedFood[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendFoods() {
      try {
        const res = await fetch(
          `/api/foods/${currentFoodId}/recommend`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) return;

        const result = await res.json();

        setFoods(result);
      } catch (error) {
        console.error(
          "추천 사료 조회 실패",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendFoods();
  }, [currentFoodId]);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-zinc-400 text-sm">
        비슷한 사료를 찾는 중...
      </div>
    );
  }

  if (foods.length === 0) {
    return (
      <div className="py-10 text-center text-zinc-400 text-sm">
        추천 가능한 사료가 없습니다.
      </div>
    );
  }
  
  return (
    <section className="bg-white border border-zinc-100 rounded-3xl shadow-sm p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-900">
          비슷한 사료 추천
        </h2>

        <p className="text-sm text-zinc-500 mt-2">
          같은 단백질 원료를 사용하는 사료를 추천해드려요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {foods.map((food) => (
          <RecommendedFoodCard
            key={food.id}
            id={food.id}
            nameKo={food.nameKo}
            brandEn={food.brandEn}
            protein={food.mainProtein}
            lifeStage={food.lifeStage}
          />
        ))}
      </div>
    </section>
  );
}