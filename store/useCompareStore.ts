// store/useCompareStore.ts
import { create } from "zustand";

interface CompareFood {
  id: number;
  name: string;
  brand: string;
  nutrients: { label: string; value: string }[];
}

interface CompareState {
  selectedFoods: CompareFood[];
  addFood: (food: CompareFood) => boolean; // 추가 성공 여부 반환
  removeFood: (id: number) => void;
  clearFoods: () => void;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  selectedFoods: [],
  
  addFood: (food) => {
    const { selectedFoods } = get();
    // 중복 체크 및 최대 2개 제한 캡슐화
    if (selectedFoods.some((item) => item.id === food.id)) return false;
    if (selectedFoods.length >= 2) return false;
    
    set({ selectedFoods: [...selectedFoods, food] });
    return true;
  },
  
  removeFood: (id) => set((state) => ({
    selectedFoods: state.selectedFoods.filter((item) => item.id !== id),
  })),
  
  clearFoods: () => set({ selectedFoods: [] }),
}));