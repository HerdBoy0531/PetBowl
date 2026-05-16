// "use client";

// import Button from "@atoms/Button";
// import Checkbox from "@atoms/Checkbox";

// interface FoodResultItemProps {
//   name: string;
//   details: string;
//   onCheck: (checked: boolean) => void;
//   disabled?: boolean;
// }

// export default function FoodResultItem({ name, details }: FoodResultItemProps) {
//   return (
//     <div className="
//       flex items-center border-b 
//       border-gray-300 dark:border-gray-700 
//       bg-white dark:bg-gray-900 
//       hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors
//     ">
//       {/* 체크박스 영역 */}
//       <div className="w-1/3 p-4 border-r border-gray-300 dark:border-gray-700">
//         <Checkbox label={name} />
//       </div>
//       {/* 상세 텍스트 영역 */}
//       <div className="flex-1 p-4 text-sm text-gray-600 dark:text-gray-400">
//         {details}
//       </div>
//       {/* 추가 버튼 */}
//       <div className="p-4">
//         <Button variant="secondary" className="px-4 py-1 text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 cursor-not-allowed">
//           추가
//         </Button>
//       </div>
//     </div>
//   );
// }


"use client";

import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";

interface FoodResultItemProps {
  name: string;
  details: string;
  onCheck: (checked: boolean) => void;
  disabled?: boolean;
  checked?: boolean; // 선택 상태 일치를 위해 추가를 권장합니다.
}

export default function FoodResultItem({ 
  name, 
  details, 
  onCheck, 
  disabled = false,
  checked = false
}: FoodResultItemProps) {
  return (
    <div className={`
      flex items-center border-b border-zinc-100 bg-white 
      transition-colors last:border-b-0
      /* 비활성화 상태일 때 행 전체를 은은하게 톤다운 */
      ${disabled ? "opacity-60" : "hover:bg-zinc-50/60"}
    `}>
      
      {/* 1. 체크박스 영역: 연한 zinc 경계선 매칭 */}
      <div className="w-1/3 p-4 border-r border-zinc-100 flex items-center">
        {/* 누락되었던 체크 로직과 disabled 원자를 바인딩합니다. */}
        <Checkbox 
          label={name} 
          checked={checked}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheck(e.target.checked)}
        />
      </div>

      {/* 2. 상세 텍스트 영역: 미니멀 오가닉 감성의 얇고 세련된 서체 */}
      <div className="flex-1 p-4 text-xs md:text-sm text-zinc-500 font-light tracking-wide">
        {details}
      </div>

      {/* 3. 추가 버튼 영역: 커스텀 Button의 속성을 그대로 활용 */}
      <div className="p-4">
        <Button 
          variant={disabled ? "secondary" : "outline"} 
          disabled={disabled}
          className="text-xs px-4 py-1.5 rounded-xl shadow-none"
        >
          {checked ? "선택됨" : "추가"}
        </Button>
      </div>

    </div>
  );
}