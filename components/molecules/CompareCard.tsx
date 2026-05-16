// interface Nutrient {
//   label: string;
//   value: string;
// }

// interface CompareCardProps {
//   name: string;
//   nutrients: Nutrient[];
//   onRemove: () => void;
// }

// export default function CompareCard({ name, nutrients, onRemove }: CompareCardProps) {
//   return (
//     <div className="relative w-full h-full p-6 flex flex-col items-center">
//       <button 
//         onClick={onRemove}
//         className="absolute top-2 right-2 text-xs border px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
//       >
//         다른 사료
//       </button>
//       <h2 className="text-4xl font-bold mt-10 mb-8 dark:text-white">{name}</h2>
//       <div className="w-full space-y-4">
//         {nutrients.map((n, idx) => (
//           <div key={idx} className="border-b pb-2 flex justify-between dark:border-gray-700">
//             <span className="text-gray-500 dark:text-gray-400">{n.label}</span>
//             <span className="font-medium dark:text-white">{n.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

interface Nutrient {
  label: string;
  value: string;
}

interface CompareCardProps {
  name: string;
  nutrients: Nutrient[];
  onRemove: () => void;
}

export default function CompareCard({ name, nutrients, onRemove }: CompareCardProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-2 relative animate-fade-in">
      
      {/* 상단 액션 영역: 얇은 테두리와 부드러운 라운딩의 교체 단추 */}
      <div className="absolute top-0 right-0">
        <button 
          onClick={onRemove}
          className="text-xs border border-zinc-200 bg-white text-zinc-500 px-3 py-1.5 rounded-xl hover:text-black hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm font-medium"
        >
          사료 교체
        </button>
      </div>

      {/* 사료 메인 타이틀 정보 구획 */}
      <div className="text-center mt-12 mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">{name}</h2>
      </div>

      {/* 영양성분 명세표 리스트 판넬 */}
      <div className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl p-5 space-y-3.5 shadow-inner">
        {nutrients.map((n, idx) => (
          <div 
            key={idx} 
            className="border-b border-zinc-100/80 pb-3 flex justify-between items-center last:border-b-0 last:pb-0"
          >
            <span className="text-sm text-zinc-500 font-light">{n.label}</span>
            <span className="text-sm font-semibold text-zinc-900 tracking-wide">{n.value}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
}