// import Checkbox from "@atoms/Checkbox";

// interface FilterRowProps {
//   label: string;
//   options: string[];
// }

// export default function FilterRow({ label, options }: FilterRowProps) {
//   return (
//     <div className="flex border-b border-gray-300 dark:border-gray-700 last:border-b-0">
//       {/* 좌측 라벨 섹션 */}
//       <div className="
//         w-32 p-4 flex items-center justify-center border-r 
//         bg-gray-50 dark:bg-gray-800 
//         border-gray-300 dark:border-gray-700 
//         font-bold text-sm text-black dark:text-white
//       ">
//         {label}
//       </div>
//       {/* 우측 옵션 섹션 */}
//       <div className="flex-1 p-4 flex flex-wrap gap-6 items-center bg-white dark:bg-gray-900">
//         {options.map((option) => (
//           <Checkbox key={option} label={option} />
//         ))}
//       </div>
//     </div>
//   );
// }


// design renewal

// import Checkbox from "@atoms/Checkbox";

// interface FilterRowProps {
//   label: string;
//   options: string[];
// }

// export default function FilterRow({ label, options }: FilterRowProps) {
//   return (
//     // 미니멀 오가닉 포인트: 투박한 회색선을 걷어내고 부드러운 border-zinc-100으로 리터칭
//     <div className="flex border-b border-zinc-100 last:border-b-0">
      
//       {/* 좌측 라벨 섹션: 은은하고 자연스러운 zinc-50/60 톤과 정갈한 폰트 두께 매칭 */}
//       <div className="
//         w-32 p-4 flex items-center justify-center border-r 
//         bg-zinc-50/60 border-zinc-100
//         font-semibold text-sm text-zinc-800
//       ">
//         {label}
//       </div>
      
//       {/* 우측 옵션 섹션: 다크모드 분기 완벽 제거 및 깨끗한 bg-white 인프라 고정 */}
//       <div className="flex-1 p-4 flex flex-wrap gap-6 items-center bg-white">
//         {options.map((option) => (
//           <Checkbox key={option} label={option} />
//         ))}
//       </div>

//     </div>
//   );
// }



// data binding
"use client";

import Checkbox from "@atoms/Checkbox";

interface FilterRowProps {
  label: string;
  options: string[];
  selectedValues: string[]; // 부모 주소창에서 온 선택된 텍스트 배열
  onChange: (values: string[]) => void; // 최종 가공된 배열 보고 핸들러
}

export default function FilterRow({ label, options, selectedValues, onChange }: FilterRowProps) {
  return (
    <div className="flex border-b border-zinc-100 last:border-b-0 w-full">
      
      {/* 좌측 라벨 랙 */}
      <div className="w-32 p-4 flex items-center justify-center border-r bg-zinc-50/60 border-zinc-100 font-semibold text-sm text-zinc-800 shrink-0">
        {label}
      </div>
      
      {/* 우측 옵션 랙 */}
      <div className="flex-1 p-4 flex flex-wrap gap-6 items-center bg-white overflow-hidden">
        {options.map((option) => {
          // 현재 이 옵션이 선택 배열 보관함에 들어있는지 실시간 체크
          const isChecked = selectedValues.includes(option);

          return (
            <Checkbox
              key={option}
              label={option}
              checked={isChecked}
              // 💡 핵심 튜닝: 인자(checked)가 무엇으로 오든 무시하고, 우리 배열 상태를 기준으로 직접 판단합니다.
              onChange={() => {
                let nextValues: string[];

                if (isChecked) {
                  // 1. 이미 존재한다면 클릭 시 '해제'하는 것이므로 -> 배열에서 깔끔하게 탈탈 털어 제거
                  nextValues = selectedValues.filter((v) => v !== option);
                } else {
                  // 2. 존재하지 않는다면 클릭 시 '선택'하는 것이므로 -> 배열에 새로 추가 (중복 방지 Set 쉴드 탑재)
                  nextValues = Array.from(new Set([...selectedValues, option]));
                }

                // 부모 제어탑 주소창에 최종 배열 인코딩 보고
                onChange(nextValues);
              }}
            />
          );
        })}
      </div>

    </div>
  );
}