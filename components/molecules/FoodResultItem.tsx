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









// "use client";

// import { useRouter } from "next/navigation";

// interface FoodResultItemProps {
//   id: number;
//   name: string;
//   brand: string;
//   details: string;
//   mainProtein: string[];
//   isAdded: boolean;       // 💡 현재 비교 바구니에 담겼는지 여부
//   onToggleAdd: () => void; // 💡 추가/해제 토글 핸들러
//   isMaxCapacity: boolean;  // 💡 이미 2개가 꽉 찼는지 여부
// }

// export default function FoodResultItem({
//   id,
//   name,
//   brand,
//   details,
//   mainProtein,
//   isAdded,
//   onToggleAdd,
//   isMaxCapacity,
// }: FoodResultItemProps) {
//   const router = useRouter();

//   // 이미 2개가 꽉 찼고, 현재 아이템은 선택되지 않았다면 버튼만 잠금 처리
//   const buttonDisabled = isMaxCapacity && !isAdded;

//   return (
//     <div className="flex items-center justify-between p-4 md:p-5 bg-white hover:bg-zinc-50/50 transition-colors w-full gap-4">
      
//       {/* 🖱️ 왼쪽 영역: 클릭 시 해당 사료의 진짜 상세 페이지로 고속 점프 */}
//       <div 
//         onClick={() => router.push(`/foods/${id}`)}
//         className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 cursor-pointer group"
//       >
//         {/* 브랜드 라벨 배지 */}
//         <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase bg-zinc-100 px-2 py-0.5 rounded w-fit shrink-0">
//           {brand}
//         </span>
        
//         {/* 💡 요구사항 6번: 제어 상태와 무관하게 글자색은 항상 선명한 text-zinc-800 고정 */}
//         <div className="space-y-0.5">
//           <h4 className="text-sm md:text-base font-semibold text-zinc-800 group-hover:text-black group-hover:underline underline-offset-4 decoration-zinc-300">
//             {name}
//           </h4>
//           <p className="text-xs text-zinc-400 font-light">
//             {details} · {mainProtein.map(p => `🥩 ${p}`).join(" ")}
//           </p>
//         </div>
//       </div>

//       {/* ➕ 오른쪽 영역: 비교함 추가 제어 단추 가판대 */}
//       <button
//         disabled={buttonDisabled}
//         onClick={(e) => {
//           e.stopPropagation(); // 부모 상세페이지 이동 버블링 링크 차단
//           onToggleAdd();
//         }}
//         className={`
//           text-xs font-medium px-4 py-2 rounded-xl transition-all tracking-tight shrink-0 border
//           ${isAdded 
//             ? "bg-zinc-900 text-white border-zinc-900 active:scale-95" 
//             : buttonDisabled
//             ? "bg-zinc-50 text-zinc-300 border-zinc-200 cursor-not-allowed"
//             : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 active:scale-95"
//           }
//         `}
//       >
//         {isAdded ? "선택됨" : "추가"}
//       </button>

//     </div>
//   );
// }





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
          console.log(id);
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