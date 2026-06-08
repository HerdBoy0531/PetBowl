"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import FoodResultItem from "@molecules/FoodResultItem";
import Input from "@/components/atoms/Input";
import InfoModal from "@/components/molecules/InfoModal";

import { useCompareStore } from "@/store/useCompareStore";

interface Food {
  id: number;
  nameKo: string;
  brandEn: string;
  animalType: string;
  lifeStage: string;
  sizeCategory: string;
  allergies: string[];
  certifications: string[];
  proteins: any[];
  mainProtein: string[];
  kibbleSize?: number | undefined;
  price: number;
}

interface FoodTableListProps {
  foods: Food[];
  total: number;
  isLoading: boolean;
  pagination: {
    page: number;
    limit: number;
    sort: string;
  };
  onPageChange: (page: number) => void;
  onSortChange: (sort: string) => void;
}

export default function FoodTableList({
  foods,
  total,
  isLoading,
  pagination,
  onPageChange,
  onSortChange,
}: FoodTableListProps) {
  const [localSearch, setLocalSearch] = useState("");

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState("");
  const [infoModalMessage, setInfoModalMessage] = useState("");
  const [infoModalType, setInfoModalType] = useState<"success" | "error" | "warning">("success");

  const {
    selectedFoods,
    addFood,
    removeFood,
  } = useCompareStore();

  const handleToggleAdd = (food: Food) => {
    const existingIndex = selectedFoods.findIndex(
      (item) => item?.id === food.id
    );

    if (existingIndex !== -1) {
      removeFood(existingIndex);
      return;
    }

    const success = addFood({
      id: food.id,
      name: food.nameKo,
      brand: food.brandEn,
    });

    if (!success) {
        setInfoModalTitle("사료 추가 실패");

        setInfoModalMessage(
          "이미 추가된 사료이거나 비교 슬롯이 가득 찼습니다."
        );

        setInfoModalType("error");

        setInfoModalOpen(true);
    }
  };

  const isMaxCapacity = selectedFoods.filter(Boolean).length >= 2;

  const filteredFoods = foods.filter((food) => {
    const name = (food.nameKo || "").toLowerCase();
    const brand = (food.brandEn || "").toLowerCase();
    const search = localSearch.toLowerCase();

    return name.includes(search) || brand.includes(search);
  });

  const totalPages = Math.ceil(total / pagination.limit) || 1;

  return (
    <div className="flex flex-col gap-5 animate-fade-in w-full pb-24 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-100 pb-3 w-full">
        <div className="flex items-center gap-3 text-xs w-full sm:w-auto">
          <span className="text-[11px] text-zinc-400 font-light tracking-tight shrink-0">
            총 <strong className="text-zinc-700 font-medium">{total}</strong>개의 안심 매칭
          </span>
          <select
            value={pagination.sort}
            onChange={(e) => {
              const currentScroll = window.scrollY;
              onSortChange(e.target.value);

              requestAnimationFrame(() => {
                window.scrollTo({
                  top: currentScroll,
                  behavior: "smooth",
                })
              })
            }}
            className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-xs text-zinc-600 focus:border-zinc-400 outline-none transition-all cursor-pointer"
          >
            <option value="popular">인기순</option>
            <option value="name">이름순</option>
            <option value="price">가격순</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="결과 내 재검색..."
            className="py-1.5 px-4 text-xs bg-zinc-50 border border-zinc-200/80 rounded-xl focus:bg-white focus:border-zinc-400 transition-all placeholder:text-zinc-400 w-full"
          />
        </div>
      </div>

      <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm flex flex-col">
        {isLoading ? (
          <div className="min-h-[350px] flex-1 flex items-center justify-center py-20 text-zinc-400 font-light text-xs animate-pulse">
            안심 사료 정렬 매칭 중...
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-20 text-zinc-400 font-light text-xs">
            매칭된 사료 목록이 없습니다. 다른 필터를 선택해 주세요.
          </div>
        ) : (
          <div className="divide-y divide-zinc-50">
            {filteredFoods.map((food) => (
              <FoodResultItem
                key={food.id}
                id={food.id}
                nameKo={food.nameKo}
                brandEn={food.brandEn}
                animalType={food.animalType}
                allergies={food.allergies ?? []}
                mainProtein={food.mainProtein ?? []}
                kibbleSize={food.kibbleSize}
                price={food.price ?? 0}
                isAdded={selectedFoods.some(
                  (item) => item?.id === food.id
                )}
                onToggleAdd={() => handleToggleAdd(food)}
                isMaxCapacity={isMaxCapacity}
              />
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-2">
          <button
            disabled={pagination.page <= 1}
            onClick={() => onPageChange(pagination.page - 1)}
            className="px-3 py-1.5 border border-zinc-200 rounded-xl text-xs font-light text-zinc-500 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            이전
          </button>
          <div className="flex gap-1 text-xs font-mono font-light text-zinc-400 px-1">
            <span className="text-zinc-700 font-medium">{pagination.page}</span>
            <span>/</span>
            <span>{totalPages}</span>
          </div>
          <button
            disabled={pagination.page >= totalPages}
            onClick={() => onPageChange(pagination.page + 1)}
            className="px-3 py-1.5 border border-zinc-200 rounded-xl text-xs font-light text-zinc-500 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            다음
          </button>
        </div>
      )}

      <InfoModal
        isOpen={infoModalOpen}
        title={infoModalTitle}
        description={infoModalMessage}
        type={infoModalType}
        onConfirm={() => {
          setInfoModalOpen(false);
        }}
      />
    </div>
  );
}