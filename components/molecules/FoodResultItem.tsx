"use client";

import Button from "@atoms/Button";
import Checkbox from "@atoms/Checkbox";

interface FoodResultItemProps {
  name: string;
  details: string;
  onCheck: (checked: boolean) => void;
  disabled?: boolean;
}

export default function FoodResultItem({ name, details }: FoodResultItemProps) {
  return (
    <div className="
      flex items-center border-b 
      border-gray-300 dark:border-gray-700 
      bg-white dark:bg-gray-900 
      hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors
    ">
      {/* 체크박스 영역 */}
      <div className="w-1/3 p-4 border-r border-gray-300 dark:border-gray-700">
        <Checkbox label={name} />
      </div>
      {/* 상세 텍스트 영역 */}
      <div className="flex-1 p-4 text-sm text-gray-600 dark:text-gray-400">
        {details}
      </div>
      {/* 추가 버튼 */}
      <div className="p-4">
        <Button variant="secondary" className="px-4 py-1 text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 cursor-not-allowed">
          추가
        </Button>
      </div>
    </div>
  );
}