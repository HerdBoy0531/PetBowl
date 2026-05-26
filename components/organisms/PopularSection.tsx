// import Badge from "@atoms/Badge";

// const rankingData = [
//   {
//     title: "주간 인기 사료",
//     items: ["오리 단백질 사료", "연어 저알러지", "닭고기 레시피"],
//   },
//   {
//     title: "월간 인기 사료",
//     items: ["소고기 프리미엄", "양고기 다이어트", "가수분해 사료"],
//   },
//   {
//     title: "전체 인기 사료",
//     items: ["그레인프리 치킨", "인섹트 단백질", "칠면조 조인트 케어"],
//   },
// ];

// export default function PopularSection() {
//   return (
//     <section className="max-w-6xl mx-auto px-6 py-16 w-full">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {rankingData.map((group) => (
//           <div 
//             key={group.title}
//             className="border-2 border-black dark:border-gray-700 p-8 rounded-sm flex flex-col items-center bg-white dark:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
//           >
//             <h3 className="text-lg font-black mb-8 text-black dark:text-white underline underline-offset-4">
//               {group.title}
//             </h3>
            
//             <ul className="w-full space-y-4">
//               {group.items.map((name, index) => (
//                 <li 
//                   key={name} 
//                   className="flex items-center gap-3 text-gray-700 dark:text-gray-300 group cursor-pointer"
//                 >
//                   <Badge color={index === 0 ? "black" : "gray"}>{index + 1}</Badge>
//                   <span className="text-sm font-medium group-hover:underline">{name}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }



// design renewal
// import Badge from "@/components/atoms/Badge"; // 기존 컴포넌트 배치에 맞춤

// const rankingData = [
//   {
//     title: "주간 인기 사료",
//     items: ["오리 단백질 사료", "연어 저알러지", "닭고기 레시피"],
//   },
//   {
//     title: "월간 인기 사료",
//     items: ["소고기 프리미엄", "양고기 다이어트", "가수분해 사료"],
//   },
//   {
//     title: "전체 인기 사료",
//     items: ["그레인프리 치킨", "인섹트 단백질", "칠면조 조인트 케어"],
//   },
// ];

// export default function PopularSection() {
//   return (
//     <section className="max-w-6xl mx-auto w-full">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {rankingData.map((group) => (
//           <div 
//             key={group.title}
//             // 미니멀 오가닉 포인트: 투박한 검정 보더와 하드 섀도우 제거 -> 부드러운 보더와 부드러운 shadow-sm 매칭
//             className="border border-zinc-100 p-6 rounded-2xl flex flex-col bg-white shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200"
//           >
//             {/* 타이포그래피 정돈: underline을 걷어내고 차분하고 짙은 가독성의 폰트 무게 설정 */}
//             <h3 className="text-base font-bold tracking-tight mb-6 text-black border-b border-zinc-100 pb-3 w-full text-center">
//               {group.title}
//             </h3>
            
//             <ul className="w-full space-y-2">
//               {group.items.map((name, index) => (
//                 <li 
//                   key={name} 
//                   className="flex items-center gap-4 text-zinc-700 hover:text-black group cursor-pointer p-2 hover:bg-zinc-50/80 rounded-xl transition-all duration-150"
//                 >
//                   {/* 순위 인덱스를 직관적이고 귀여운 둥근 사각형으로 감싸 디자인적 위트 제공 */}
//                   <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold shadow-sm border ${
//                     index === 0 
//                       ? "bg-black text-white border-black" 
//                       : "bg-[#FDFCF0] text-zinc-800 border-zinc-200/60"
//                   }`}>
//                     {index + 1}
//                   </span>
//                   <span className="text-sm font-medium group-hover:underline decoration-zinc-400 underline-offset-4">
//                     {name}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




// data binding
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// interface RankedFood {
//   id: number;
//   name: string;
//   brand: string;
//   animalType: string;
//   lifeStage: string;
//   viewCount: number;
//   mainProtein: string[];
// }

// export default function PopularSection() {
//   const router = useRouter();
  
//   // 🔄 탭 상태 관리: "weekly" (주간), "monthly" (월간), "total" (누적)
//   const [period, setPeriod] = useState<"weekly" | "monthly" | "total">("weekly");
//   const [rankedFoods, setRankedFoods] = useState<RankedFood[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 🔄 백엔드 실시간 랭킹 집계 API 연동
//   useEffect(() => {
//     async function fetchRanking() {
//       setIsLoading(true);
//       const startTime = Date.now(); // 💡 1. API 요청 시작 시간 기록

//       try {
//         const res = await fetch(`/api/foods/ranking?period=${period}`, { cache: "no-store" });
//         if (res.ok) {
//           const result = await res.json();
          
//           // 💡 2. 데이터가 너무 빨리 올 때 번쩍이는 현상을 막기 위한 최소 딜레이 연산
//           const endTime = Date.now();
//           const duration = endTime - startTime; // 실제 네트워크에 걸린 시간 (예: 5ms)
//           const minDelay = 400; // 눈이 인지하기 가장 편안한 최소 로딩 시간 (0.4초)

//           // 만약 걸린 시간이 0.4초보다 짧다면, 남은 시간만큼 인위적으로 로딩을 부드럽게 유지
//           if (duration < minDelay) {
//             await new Promise((resolve) => setTimeout(resolve, minDelay - duration));
//           }

//           setRankedFoods(result.data);
//         }
//       } catch (error) {
//         console.error("랭킹 데이터를 가져오는 중 오류 발생:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchRanking();
//   }, [period]);

//   const tabs = [
//     { id: "weekly", label: "주간 인기" },
//     { id: "monthly", label: "월간 인기" },
//     { id: "total", label: "누적 인기" },
//   ] as const;

//   return (
//     <section className="w-full max-w-4xl mx-auto px-4 space-y-8 animate-fade-in">
      
//       {/* 1. 상단 헤더 및 미니멀 오가닉 탭 스위치 */}
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-zinc-100 pb-4">
//         <div className="text-center sm:text-left">
//           <h3 className="text-xl font-bold text-black tracking-tight">실시간 인기 사료</h3>
//           <p className="text-xs text-zinc-400 font-light mt-0.5">유저들이 가장 많이 찾아본 사료 랭킹입니다.</p>
//         </div>
        
//         {/* 탭 내비게이터 랙 */}
//         <div className="flex bg-zinc-100/80 p-1 rounded-full border border-zinc-200/20">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setPeriod(tab.id)}
//               className={`
//                 text-xs px-4 py-2 rounded-full font-medium transition-all duration-200
//                 ${period === tab.id 
//                   ? "bg-zinc-900 text-white shadow-sm" 
//                   : "text-zinc-500 hover:text-zinc-900"
//                 }
//               `}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 2. 랭킹 콘텐츠 바디 리스트 */}
//       <div className="bg-white border border-zinc-100 rounded-3xl shadow-sm overflow-hidden p-2">
//         {isLoading ? (
//           // 로딩 중 가이드 스켈레톤 무드
//           <div className="py-20 text-center text-zinc-400 font-light animate-pulse">
//             실시간 집계 데이터 분석 중...
//           </div>
//         ) : rankedFoods.length === 0 ? (
//           // 검색 로그가 데이터베이스에 하나도 없을 때
//           <div className="py-20 text-center text-zinc-400 font-light">
//             아직 수집된 랭킹 데이터가 없습니다. 사료를 검색해 보세요!
//           </div>
//         ) : (
//           // 🏆 데이터 매핑: 상위 5개 순위 순회
//           <div className="divide-y divide-zinc-50">
//             {rankedFoods.map((food, index) => (
//               <div
//                 key={food.id}
//                 onClick={() => router.push(`/foods/${food.id}`)} // 사료 상세로 실시간 하이패스 리다이렉트
//                 className="flex items-center justify-between p-4 md:p-5 hover:bg-zinc-50/60 transition-colors cursor-pointer group"
//               >
//                 <div className="flex items-center gap-5">
//                   {/* 왼쪽 순위 넘버링 박스 */}
//                   <span className={`
//                     font-mono font-black text-lg md:text-xl w-8 text-center transition-transform group-hover:scale-110
//                     ${index === 0 ? "text-amber-500" : index === 1 ? "text-zinc-500" : index === 2 ? "text-amber-700" : "text-zinc-300"}
//                   `}>
//                     0{index + 1}
//                   </span>
                  
//                   {/* 중간 사료 텍스트 명세 */}
//                   <div className="space-y-1">
//                     <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase bg-zinc-100 px-2 py-0.5 rounded">
//                       {food.brand}
//                     </span>
//                     <h4 className="text-sm md:text-base font-semibold text-zinc-800 group-hover:text-black group-hover:underline decoration-zinc-300 underline-offset-4 transition-colors">
//                       {food.name}
//                     </h4>
//                     {/* 주단백질 태그 칩 */}
//                     <div className="flex gap-1">
//                       {food.mainProtein.map((p, pIdx) => (
//                         <span key={pIdx} className="text-[10px] bg-[#FDFCF0] border border-zinc-200/50 text-zinc-600 px-1.5 py-0.5 rounded-md">
//                           🥩 {p}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* 우측 총 조회 횟수 카운터 배지 */}
//                 <div className="text-right pr-2">
//                   <span className="text-xs font-mono font-light text-zinc-400 group-hover:text-zinc-600 transition-colors">
//                     {food.viewCount.toLocaleString()} views
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//     </section>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import RankingCard from "@/components/molecules/RankingCard";

interface RankedFood {
  id: number;
  name: string;
  brand: string;
  viewCount: number;
  mainProtein: string[];
}

export default function PopularSection() {
  const router = useRouter();

  const [period, setPeriod] = useState<
    "weekly" | "monthly" | "total"
  >("weekly");

  const [rankedFoods, setRankedFoods] = useState<RankedFood[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    async function fetchRanking() {
      try {
        if (rankedFoods.length === 0) {
          setIsLoading(true);
        } else {
          setIsRefreshing(true);
        }

        const res = await fetch(
          `/api/foods/ranking?period=${period}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) return;

        const result = await res.json();

        setRankedFoods(result.data ?? []);
      } catch (error) {
        console.error("랭킹 데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }

    fetchRanking();
  }, [period]);

  const tabs = [
    { id: "weekly", label: "주간" },
    { id: "monthly", label: "월간" },
    { id: "total", label: "전체" },
  ] as const;

  return (
    <section className="w-full max-w-4xl mx-auto px-4 space-y-8 animate-fade-in">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">
            실시간 인기 사료
          </h3>
        </div>

        {/* 탭 */}
        <div className="flex items-center gap-3">
          {isRefreshing && (
            <span className="text-xs text-zinc-400 animate-pulse">
              업데이트 중...
            </span>
          )}

          <div className="flex bg-zinc-100 p-1 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPeriod(tab.id)}
                className={`
                  text-xs px-5 py-2 rounded-full font-medium
                  transition-all duration-300
                  ${
                    period === tab.id
                      ? "bg-white text-zinc-900 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-800"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 최초 로딩 */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-[92px] w-full bg-zinc-100 rounded-3xl animate-pulse"
            />
          ))}
        </div>
      ) : rankedFoods.length === 0 ? (
        <div className="py-20 text-center text-zinc-400 font-light border border-dashed border-zinc-200 rounded-3xl">
          수집된 랭킹 데이터가 없습니다.
        </div>
      ) : (
        <motion.div
          layout
          className={`
            space-y-4
            transition-opacity duration-300
            ${isRefreshing ? "opacity-60" : "opacity-100"}
          `}
        >
          <AnimatePresence mode="popLayout">
            {rankedFoods.map((food, index) => (
              <motion.div
                key={food.id}
                layout
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  },
                  opacity: {
                    duration: 0.2,
                  },
                }}
              >
                <RankingCard
                  index={index}
                  brand={food.brand}
                  name={food.name}
                  mainProtein={food.mainProtein || []}
                  viewCount={food.viewCount || 0}
                  onClick={() =>
                    router.push(`/foods/${food.id}`)
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}