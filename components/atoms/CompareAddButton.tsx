// interface CompareAddButtonProps {
//   onClick: () => void;
// }

// export default function CompareAddButton({ onClick }: CompareAddButtonProps) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex flex-col items-center justify-center w-full h-full group"
//     >
//       <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-5xl font-light text-gray-400 group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition-colors">
//         +
//       </div>
//       <p className="mt-4 text-gray-500 dark:text-gray-400">사료를 추가해주세요</p>
//     </button>
//   );
// }


"use client";

interface CompareAddButtonProps {
  onClick: () => void;
}

export default function CompareAddButton({ onClick }: CompareAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full h-full group py-8 transition-all select-none focus:outline-none"
    >
      {/* 미니멀 오가닉 포인트: 부드러운 원형 인프라와 호버 시 은은한 스케일 피드백 */}
      <div className="w-20 h-20 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-4xl font-light text-zinc-400 group-hover:bg-zinc-100/80 group-hover:text-zinc-600 shadow-inner transition-all duration-200 active:scale-95">
        +
      </div>
      <p className="mt-4 text-zinc-400 font-light text-xs tracking-wide group-hover:text-zinc-700 transition-colors">
        비교할 사료 추가하기
      </p>
    </button>
  );
}