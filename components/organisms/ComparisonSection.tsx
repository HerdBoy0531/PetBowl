"use client";
import { useState } from "react";
import CompareAddButton from "@atoms/CompareAddButton";
import CompareCard from "@molecules/CompareCard";
import SearchModal from "@molecules/SearchModal";

export default function ComparePage() {
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addFood = (food: any) => {
    if (selectedFoods.length < 2) {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const removeFood = (index: number) => {
    setSelectedFoods(selectedFoods.filter((_, i) => i !== index));
  };

  return (
    <main className="pt-28 pb-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-10">사료 비교</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-black dark:border-gray-700 min-h-[500px] divide-x-2 divide-black dark:divide-gray-700">
        {[0, 1].map((index) => (
          <div key={index} className="flex items-center justify-center bg-white dark:bg-gray-900">
            {selectedFoods[index] ? (
              <CompareCard 
                name={selectedFoods[index].name} 
                nutrients={selectedFoods[index].nutrients} 
                onRemove={() => removeFood(index)}
              />
            ) : (
              <CompareAddButton onClick={() => setIsModalOpen(true)} />
            )}
          </div>
        ))}
      </div>

      <SearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addFood}
      />
    </main>
  );
}