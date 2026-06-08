"use client";

import { useRouter } from "next/navigation";

interface FoodResultItemProps {
  id: number;

  nameKo: string;
  brandEn: string;

  animalType: string;

  allergies: string[];
  mainProtein: string[];

  kibbleSize?: number | null;

  price: number;

  isAdded: boolean;
  onToggleAdd: () => void;
  isMaxCapacity: boolean;
}

export default function FoodResultItem({
  id,
  nameKo,
  brandEn,
  animalType,
  allergies,
  mainProtein,
  kibbleSize,
  price,
  isAdded,
  onToggleAdd,
  isMaxCapacity,
}: FoodResultItemProps) {
  const router = useRouter();

  const buttonDisabled = isMaxCapacity && !isAdded;

  const animalLabel =
    animalType === "dog" ? "🐶 강아지" :
    animalType === "cat" ? "🐱 고양이" :
    animalType;

  return (
    <div className="flex items-center justify-between p-4 md:p-5 bg-white hover:bg-zinc-50/50 transition-colors w-full gap-4">
      <div
        onClick={() => {
          router.push(`/foods/${id}`)
        }}
        className="flex-1 flex flex-col gap-2 cursor-pointer group"
      >
        <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase bg-zinc-100 px-2 py-0.5 rounded w-fit">
          {brandEn}
        </span>

        <h4 className="text-sm md:text-base font-semibold text-zinc-800 group-hover:text-black group-hover:underline underline-offset-4 decoration-zinc-300">
          {nameKo}
        </h4>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500">
          <span>{animalLabel}</span>

          {mainProtein.length > 0 && (
            <span>🥩 {mainProtein.join(", ")}</span>
          )}

          {allergies.length > 0 && (
            <span>🚫 {allergies.join(", ")}</span>
          )}

          {kibbleSize !== null && kibbleSize !== undefined && (
            <span>⚪ {kibbleSize}mm</span>
          )}

          <span className="font-semibold text-zinc-700">
            💰 {price.toLocaleString()}원
          </span>
        </div>
      </div>

      <button
        disabled={buttonDisabled}
        onClick={(e) => {
          e.stopPropagation();
          onToggleAdd();
        }}
        className={`
          text-xs font-medium px-4 py-2 rounded-xl transition-all tracking-tight shrink-0 border w-17
          ${
            isAdded
              ? "bg-zinc-900 text-white border-zinc-900 active:scale-95"
              : buttonDisabled
                ? "bg-zinc-50 text-zinc-300 border-zinc-200 cursor-not-allowed"
                : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 active:scale-95"
          }
        `}
      >
        {isAdded ? "선택됨" : "추가"}
      </button>
    </div>
  );
}