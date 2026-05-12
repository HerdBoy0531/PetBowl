"use client";

import { useState } from "react";
import CompareAddButton from "@/components/atoms/CompareAddButton";
import CompareCard from "@/components/molecules/CompareCard";
import SearchModal from "@/components/molecules/SearchModal";

// 비교 슬롯의 최대 개수
const MAX_SLOTS = 2;

export default function ComparePage() {
  // 선택된 사료 데이터를 담는 상태
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
  // 모달 열림/닫힘 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 사료 추가 함수 (왼쪽부터 채워짐)
  const handleAddFood = (food: any) => {
    if (selectedFoods.length < MAX_SLOTS) {
      setSelectedFoods([...selectedFoods, food]);
    }
    setIsModalOpen(false); // 추가 후 모달 닫기
  };

  // 사료 제거 함수
  const handleRemoveFood = (index: number) => {
    setSelectedFoods(selectedFoods.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black mb-10 text-center dark:text-white">
          사료 비교하기
        </h1>

        {/* 비교 섹션: 2열 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black dark:border-gray-800 divide-x-4 divide-black dark:divide-gray-800 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]">
          {[...Array(MAX_SLOTS)].map((_, index) => (
            <div 
              key={index} 
              className="min-h-[600px] flex items-center justify-center bg-white dark:bg-gray-900 overflow-hidden"
            >
              {selectedFoods[index] ? (
                // 사료 데이터가 있는 경우 카드 표시
                <CompareCard 
                  name={selectedFoods[index].name} 
                  nutrients={selectedFoods[index].nutrients} 
                  onRemove={() => handleRemoveFood(index)}
                />
              ) : (
                // 데이터가 없는 경우 추가 버튼 표시
                <CompareAddButton onClick={() => setIsModalOpen(true)} />
              )}
            </div>
          ))}
        </div>

        {/* 안내 문구 */}
        <p className="mt-8 text-center text-gray-500 dark:text-gray-400 font-medium">
          최대 2개의 사료를 선택하여 영양 성분을 한눈에 비교해보세요.
        </p>
      </div>

      {/* 검색 및 추가 모달 */}
      <SearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddFood}
      />
    </main>
  );
}