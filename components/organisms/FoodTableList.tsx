"use client";

import { useState } from "react";
import FoodResultItem from "@molecules/FoodResultItem";
import SearchBar from "@molecules/SearchBar";

const foods = [
  {
    id: 1,
    name: "말티즈 어덜트",
    details: "Royal Canin | 강아지 | 일반식 | 소형 | 어덜트",
  },
  {
    id: 2,
    name: "슈나우저 어덜트",
    details: "Royal Canin | 강아지 | 일반식 | 소형 | 어덜트",
  },
];

export default function FoodTableList() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleCheck = (id: number, checked: boolean) => {
    if (checked) {
      if (selectedItems.length < 2) {
        setSelectedItems((prev) => [...prev, id]);
      }
    } else {
      setSelectedItems((prev) =>
        prev.filter((item) => item !== id)
      );
    }
  };

  const isFull = selectedItems.length >= 2;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end gap-4">
        <button
          disabled={!isFull}
          className={`px-4 py-1 text-sm font-bold rounded-t-md transition-colors ${
            isFull
              ? "bg-black text-white dark:bg-blue-600 cursor-pointer"
              : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-default"
          }`}
        >
          {selectedItems.length}/2 비교
        </button>

        <div className="flex-1 max-w-sm">
          <SearchBar placeholder="사료를 입력해주세요" />
        </div>
      </div>

      <div className="border-2 border-black dark:border-gray-700 rounded-sm overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
        {foods.map((food) => (
          <FoodResultItem
            key={food.id}
            name={food.name}
            details={food.details}
            onCheck={(checked: boolean) =>
              handleCheck(food.id, checked)
            }
            disabled={
              isFull &&
              !selectedItems.includes(food.id)
            }
          />
        ))}
      </div>
    </div>
  );
}