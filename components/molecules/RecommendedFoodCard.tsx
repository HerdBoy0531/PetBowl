"use client";

import Link from "next/link";

interface RecommendedFoodCardProps {
  id: number;
  nameKo: string;
  brandEn: string;
  protein?: string;
  lifeStage?: string;
}

const proteinMap: Record<string, string> = {
  chicken: "닭고기",
  duck: "오리고기",
  salmon: "연어",
  lamb: "양고기",
  beef: "소고기",
  pork: "돼지고기",
  turkey: "칠면조",
};

const lifeStageMap: Record<string, string> = {
  puppy: "퍼피",
  adult: "성견",
  senior: "시니어",
  all: "전연령",
};

const animalTypeMap: Record<string, string> = {
  dog: "강아지",
  cat: "고양이",
};

export default function RecommendedFoodCard({
  id,
  nameKo,
  brandEn,
  protein,
  lifeStage,
}: RecommendedFoodCardProps) {
  return (
    <Link href={`/foods/${id}`}>
      <div className="h-full border border-zinc-100 rounded-2xl p-4 hover:shadow-md transition-all duration-200 bg-white cursor-pointer">
        <p className="text-xs text-zinc-400 mb-2">
          {brandEn}
        </p>

        <h3 className="font-semibold text-zinc-900 line-clamp-2 min-h-[48px]">
          {nameKo}
        </h3>

        <div className="flex flex-wrap gap-2 mt-4">
          {protein && (
            <span className="text-xs bg-zinc-100 px-2 py-1 rounded-lg">
              🥩 {proteinMap[protein] ?? protein}
            </span>
          )}

          {lifeStage && (
            <span className="text-xs bg-zinc-100 px-2 py-1 rounded-lg">
              {lifeStageMap[lifeStage] ?? lifeStage}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}