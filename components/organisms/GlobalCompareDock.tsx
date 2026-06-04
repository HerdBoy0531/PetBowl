// "use client";

// interface SelectedFood {
//   id: number;
//   name: string;
//   brand: string;
// }

// interface CompareStickyDockProps {
//   selectedFoods: SelectedFood[];
//   onRemove: (id: number) => void;
//   onCompare: () => void;
// }

// export default function CompareStickyDock({
//   selectedFoods,
//   onRemove,
//   onCompare,
// }: CompareStickyDockProps) {
//   // 담긴 사료가 하나도 없을 때는 화면을 깔끔하게 비워둡니다.
//   if (selectedFoods.length === 0) return null;

//   const canCompare = selectedFoods.length === 2;

//   return (
//     <div className="fixed right-6 bottom-8 z-50 w-64 md:w-72 animate-fade-in">
//       {/* 우측 전용 미니멀 오가닉 대시보드 판넬 */}
//       <div className="bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
        
//         {/* 미니 위젯 헤더 */}
//         <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
//           <h5 className="text-xs font-bold text-zinc-700 tracking-tight">비교 바구니</h5>
//           <span className="text-[10px] font-mono text-zinc-400 font-light">
//             {selectedFoods.length} / 2 selected
//           </span>
//         </div>

//         {/* 중간: 세로로 스택 정렬되는 사료 슬롯 가판대 */}
//         <div className="flex flex-col gap-2 w-full">
//           {[0, 1].map((index) => {
//             const food = selectedFoods[index];
//             return (
//               <div
//                 key={index}
//                 className={`flex items-center justify-between gap-2 px-3 py-2.5 text-xs rounded-xl border min-w-0 transition-all ${
//                   food
//                     ? "bg-zinc-50 border-zinc-200/60"
//                     : "bg-white border-dashed border-zinc-200 text-zinc-300 font-light justify-center text-center"
//                 }`}
//               >
//                 {food ? (
//                   <>
//                     <span className="truncate font-medium text-zinc-700 block flex-1">
//                       <strong className="text-zinc-400 font-normal block text-[10px] uppercase tracking-tight">
//                         {food.brand}
//                       </strong>
//                       <span className="truncate">{food.name}</span>
//                     </span>
//                     {/* 즉시 빼기 단추 */}
//                     <button
//                       onClick={() => onRemove(food.id)}
//                       className="text-zinc-400 hover:text-red-500 font-mono p-1 transition-colors shrink-0 text-sm"
//                     >
//                       ✕
//                     </button>
//                   </>
//                 ) : (
//                   <span className="text-[11px] py-1 text-zinc-300">사료를 추가해 주세요</span>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* 하단: 액션 트리거 단추 */}
//         <button
//           disabled={!canCompare}
//           onClick={canCompare ? onCompare : undefined}
//           className={`w-full py-2.5 text-md font-semibold rounded-xl tracking-tight transition-all duration-200 border ${
//             canCompare
//               ? "bg-black text-white border-black cursor-pointer active:scale-95 hover:bg-zinc-800 shadow-sm"
//               : "bg-zinc-100 text-zinc-400 border-zinc-200/60 cursor-not-allowed"
//           }`}
//         >
//           성분 비교하기
//         </button>

//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { useCompareStore } from "@/store/useCompareStore";


export default function GlobalCompareDock() {
  console.log("GlobalCompareDock Render");

  const [isOpen, setIsOpen] = useState(true); // 기본적으로 열린 상태
  const router = useRouter();

  const { selectedFoods, removeFood } = useCompareStore();

  const validFoods = selectedFoods.filter(Boolean);

  const pathname = usePathname();

  if (pathname.startsWith("/search") || pathname.startsWith("/foods")) {
    
  } else {
    return null;
  }

  if (validFoods.length === 0) return null;

  const canCompare = validFoods.length === 2;

  return (
    <motion.div 
      className="fixed right-6 bottom-8 z-50 w-64 md:w-72"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      {/* 토글 버튼 (패널 상단에 배치) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -top-10 -translate-x-1/2 left-1/2 bg-white border border-zinc-200 px-4 py-1.5 rounded-t-xl font-bold text-[10px] uppercase tracking-widest shadow-sm hover:bg-zinc-50 transition-colors"
      >
        비교 바구니 {isOpen ? "▼" : "▲"}
      </button>

      {/* <AnimatePresence mode="wait"> */}
        {isOpen && (
          <motion.div 
            className="bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-4 shadow-xl flex flex-col gap-3"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}

          >
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
              <h5 className="text-xs font-bold text-zinc-700 tracking-tight">선택된 사료</h5>
              <span className="text-[10px] font-mono text-zinc-400 font-light">
                {validFoods.length} / 2
              </span>
            </div>

            <div className="flex flex-col gap-2 w-full">
              {[0, 1].map((index) => {
                const food = selectedFoods[index];
                return (
                  <div key={index} className={`flex items-center justify-between gap-2 px-3 py-2.5 text-xs rounded-xl border transition-all ${food ? "bg-zinc-50 border-zinc-200/60" : "bg-white border-dashed border-zinc-200 text-zinc-300 justify-center"}`}>
                    {food ? (
                      <>
                        <span className="truncate">
                          <strong className="text-[9px] block text-zinc-400 uppercase">{food.brand}</strong>
                          {food.name}
                        </span>
                        <button onClick={() => removeFood(index)} className="text-zinc-400 hover:text-red-500 p-1">✕</button>
                      </>
                    ) : (
                      <span className="text-[10px]">빈 슬롯</span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              disabled={!canCompare}
              onClick={() => router.push("/compare")}
              className={`w-full py-2.5 text-xs font-bold rounded-xl tracking-tight transition-all ${canCompare ? "bg-black text-white hover:bg-zinc-800" : "bg-zinc-100 text-zinc-400 cursor-not-allowed"}`}
            >
              성분 비교하기
            </button>
          </motion.div>
        )}
      {/* </AnimatePresence> */}
    </motion.div>
  );
}