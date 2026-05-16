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


import Checkbox from "@atoms/Checkbox";

interface FilterRowProps {
  label: string;
  options: string[];
}

export default function FilterRow({ label, options }: FilterRowProps) {
  return (
    // 미니멀 오가닉 포인트: 투박한 회색선을 걷어내고 부드러운 border-zinc-100으로 리터칭
    <div className="flex border-b border-zinc-100 last:border-b-0">
      
      {/* 좌측 라벨 섹션: 은은하고 자연스러운 zinc-50/60 톤과 정갈한 폰트 두께 매칭 */}
      <div className="
        w-32 p-4 flex items-center justify-center border-r 
        bg-zinc-50/60 border-zinc-100
        font-semibold text-sm text-zinc-800
      ">
        {label}
      </div>
      
      {/* 우측 옵션 섹션: 다크모드 분기 완벽 제거 및 깨끗한 bg-white 인프라 고정 */}
      <div className="flex-1 p-4 flex flex-wrap gap-6 items-center bg-white">
        {options.map((option) => (
          <Checkbox key={option} label={option} />
        ))}
      </div>

    </div>
  );
}