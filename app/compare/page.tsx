// "use client";

// import { useState } from "react";
// import CompareAddButton from "@/components/atoms/CompareAddButton";
// import CompareCard from "@/components/molecules/CompareCard";
// import SearchModal from "@/components/molecules/SearchModal";

// // 비교 슬롯의 최대 개수
// const MAX_SLOTS = 2;

// export default function ComparePage() {
//   // 선택된 사료 데이터를 담는 상태
//   const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
//   // 모달 열림/닫힘 상태
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // 사료 추가 함수 (왼쪽부터 채워짐)
//   const handleAddFood = (food: any) => {
//     if (selectedFoods.length < MAX_SLOTS) {
//       setSelectedFoods([...selectedFoods, food]);
//     }
//     setIsModalOpen(false); // 추가 후 모달 닫기
//   };

//   // 사료 제거 함수
//   const handleRemoveFood = (index: number) => {
//     setSelectedFoods(selectedFoods.filter((_, i) => i !== index));
//   };

//   return (
//     <main className="min-h-screen pt-24 pb-20 px-4 bg-white dark:bg-black">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-black mb-10 text-center dark:text-white">
//           사료 비교하기
//         </h1>

//         {/* 비교 섹션: 2열 그리드 */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black dark:border-gray-800 divide-x-4 divide-black dark:divide-gray-800 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]">
//           {[...Array(MAX_SLOTS)].map((_, index) => (
//             <div 
//               key={index} 
//               className="min-h-[600px] flex items-center justify-center bg-white dark:bg-gray-900 overflow-hidden"
//             >
//               {selectedFoods[index] ? (
//                 // 사료 데이터가 있는 경우 카드 표시
//                 <CompareCard 
//                   name={selectedFoods[index].name} 
//                   nutrients={selectedFoods[index].nutrients} 
//                   onRemove={() => handleRemoveFood(index)}
//                 />
//               ) : (
//                 // 데이터가 없는 경우 추가 버튼 표시
//                 <CompareAddButton onClick={() => setIsModalOpen(true)} />
//               )}
//             </div>
//           ))}
//         </div>

//         {/* 안내 문구 */}
//         <p className="mt-8 text-center text-gray-500 dark:text-gray-400 font-medium">
//           최대 2개의 사료를 선택하여 영양 성분을 한눈에 비교해보세요.
//         </p>
//       </div>

//       {/* 검색 및 추가 모달 */}
//       <SearchModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         onAdd={handleAddFood}
//       />
//     </main>
//   );
// }


// design renewal
// "use client";

// import { useState } from "react";
// import CompareAddButton from "@/components/atoms/CompareAddButton";
// import CompareCard from "@/components/molecules/CompareCard";
// import SearchModal from "@/components/molecules/SearchModal";

// // 비교 슬롯의 최대 개수
// const MAX_SLOTS = 2;

// export default function ComparePage() {
//   // 선택된 사료 데이터를 담는 상태
//   const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
//   // 모달 열림/닫힘 상태
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // 사료 추가 함수 (왼쪽부터 채워짐)
//   const handleAddFood = (food: any) => {
//     if (selectedFoods.length < MAX_SLOTS) {
//       setSelectedFoods([...selectedFoods, food]);
//     }
//     setIsModalOpen(false); // 추가 후 모달 닫기
//   };

//   // 사료 제거 함수
//   const handleRemoveFood = (index: number) => {
//     setSelectedFoods(selectedFoods.filter((_, i) => i !== index));
//   };

//   return (
//     // 미니멀 오가닉 포인트: 전역 layout.tsx의 인프라를 활용하고, 부드러운 entry 애니메이션 적용
//     <div className="space-y-10 pb-12 animate-fade-in">
      
//       {/* 1. 헤더 영역: 과도한 두께를 줄이고 정갈한 자간 정돈 */}
//       <header className="text-center space-y-2">
//         <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
//           사료 비교하기
//         </h1>
//         <p className="text-sm text-zinc-500 font-light">
//           최대 2개의 사료를 선택하여 영양 성분 비율과 특징을 한눈에 대조해보세요.
//         </p>
//       </header>

//       {/* 2. 비교 섹션: 투박하게 결합된 블랙 그리드 전면 타파 -> 독립된 부드러운 카드 그리드로 개편 */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {[...Array(MAX_SLOTS)].map((_, index) => (
//           <div 
//             key={index} 
//             className="min-h-[520px] flex flex-col items-center justify-center bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-6 overflow-hidden relative"
//           >
//             {selectedFoods[index] ? (
//               // 사료 데이터가 있는 경우 카드 표시
//               <CompareCard 
//                 name={selectedFoods[index].name} 
//                 nutrients={selectedFoods[index].nutrients} 
//                 onRemove={() => handleRemoveFood(index)}
//               />
//             ) : (
//               // 데이터가 없는 경우 추가 레이아웃 (오가닉 넘버 가이드 및 버튼 배치)
//               <div className="flex flex-col items-center justify-center space-y-3 text-center">
//                 {/* 배경에 은은하게 녹아드는 슬롯 번호 디테일 */}
//                 <span className="text-[56px] font-black text-zinc-500/5 select-none absolute top-4 left-6">
//                   0{index + 1}
//                 </span>
//                 <CompareAddButton onClick={() => setIsModalOpen(true)} />
//                 <p className="text-xs text-zinc-400 font-light">비교할 사료를 추가해 주세요</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* 3. 검색 및 추가 모달 */}
//       <SearchModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         onAdd={handleAddFood}
//       />
      
//     </div>
//   );
// }


"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CompareAddButton from "@/components/atoms/CompareAddButton";
import CompareCard from "@/components/molecules/CompareCard";
import SearchModal from "@/components/molecules/SearchModal";
import { useCompareStore } from "@/store/useCompareStore";

const MAX_SLOTS = 2;

// 🎯 영양소 한글 번역 사전 (백엔드 명세가 매칭되면 한글로 치환)
const NUTRIENT_DICTIONARY: Record<string, string> = {
  crudeProtein: "조단백질",
  crudeFat: "조지방",
  crudeFiber: "조섬유",
  crudeAsh: "조회분",
  moisture: "수분",
  protein: "조단백질",
  fat: "조지방",
  fiber: "조섬유",
  ash: "조회분",
  "조단백질": "조단백질",
  "조지방": "조지방",
  "조섬유": "조섬유",
  "조회분": "조회분",
  "수분": "수분",
};

// 🔬 [자율 키 스캔 엔진] 어떤 필드명으로 오든 성분 수치를 강제로 솎아내는 방어 함수
function parseAnalysisData(rawFood: any) {
  if (!rawFood) return [];
  
  // 백엔드가 주는 성분 주머니 후보군을 순차적으로 탐색 (?연산자 가드)
  const analysis = rawFood.analysis || rawFood.guaranteedAnalysis || rawFood.GuaranteedAnalysis;
  if (!analysis) return [];

  // Case A: 중괄호 일반 객체 구조일 때 {}
  if (typeof analysis === "object" && !Array.isArray(analysis)) {
    return Object.entries(analysis)
      .filter(([key]) => !["id", "foodId", "createdAt", "updatedAt"].includes(key)) // 메타 ID들은 제외
      .map(([key, value]) => {
        // 사전에 등록된 단어면 한글로 바꾸고, 처음 보는 영문 키면 그대로 노출시켜 확인 가능하게 처리
        const label = NUTRIENT_DICTIONARY[key] || key; 
        const displayValue = String(value).includes("%") ? value : `${value}%`;
        return {
          label,
          value: String(displayValue),
        };
      });
  }

  // Case B: 대괄호 배열 구조일 때 []
  if (Array.isArray(analysis)) {
    return analysis.map((item: any) => ({
      label: item.label || item.nutrientType || "기타성분",
      value: String(item.value).includes("%") ? item.value : `${item.value}%`,
    }));
  }

  return [];
}

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { selectedFoods, addFood, removeFood } = useCompareStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 🔄 1. 새로고침 시 URL 파라미터 역추적 복구 파이프라인
  useEffect(() => {
    const id1 = searchParams.get("id1");
    const id2 = searchParams.get("id2");
    
    if ((id1 || id2) && selectedFoods.length === 0) {
      async function restoreCompareList() {
        setIsLoading(true);
        const ids = [id1, id2].filter(Boolean);
        
        try {
          for (const id of ids) {
            const res = await fetch(`/api/foods/${id}`, { cache: "no-store" });
            if (res.ok) {
              const rawFood = await res.json();
              const formattedNutrients = parseAnalysisData(rawFood); // 통째로 넘겨 내부 탐색

              addFood({
                id: Number(rawFood.id),
                name: rawFood.name,
                brand: rawFood.brand,
                nutrients: formattedNutrients,
              });
            }
          }
        } catch (error) {
          console.error("비교 데이터 복구 실패:", error);
        } finally {
          setIsLoading(false);
        }
      }

      restoreCompareList();
    }
  }, [searchParams]);

  // 🔄 2. 바구니 변경 시 주소창 URL 자동 동기화
  useEffect(() => {
    const id1 = selectedFoods[0]?.id || "";
    const id2 = selectedFoods[1]?.id || "";
    
    if (id1 || id2) {
      router.replace(`/compare?id1=${id1}&id2=${id2}`, { scroll: false });
    } else {
      router.replace("/compare", { scroll: false });
    }
  }, [selectedFoods, router]);

  // 💡 3. 모달에서 추가 시 실시간 단독 상세 fetch 및 가공 바인딩
  const handleAddFood = async (lightFood: any) => {
    if (!lightFood?.id) return;
    
    try {
      const res = await fetch(`/api/foods/${lightFood.id}`, { cache: "no-store" });
      if (!res.ok) throw new Error("상세 정보 fetch 실패");
      
      const fullFood = await res.json();
      console.log("🔥 [비교창] DB에서 실시간 파싱해온 사료 원본:", fullFood);

      // 업그레이드된 자율 키 스캔 파싱 가동 (전체 데이터를 전달)
      const formattedNutrients = parseAnalysisData(fullFood);
      console.log("✨ 정제가 완료된 영양성분 결과 배열:", formattedNutrients);

      const success = addFood({
        id: Number(fullFood.id),
        name: fullFood.name,
        brand: fullFood.brand,
        nutrients: formattedNutrients, 
      });

      if (!success) {
        alert("이미 추가된 사료이거나 비교 슬롯이 가득 찼습니다.");
      }
    } catch (error) {
      console.error("비교 데이터 바인딩 오류:", error);
      alert("사료의 영양 성분 데이터를 불러오는 중 문제가 발생했습니다.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-10 pb-12 animate-fade-in w-full">
      <header className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
          사료 비교하기
        </h1>
        <p className="text-sm text-zinc-500 font-light">
          최대 2개의 사료를 선택하여 영양 성분 비율과 특징을 한눈에 대조해보세요.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(MAX_SLOTS)].map((_, index) => {
          const foodItem = selectedFoods[index];
          return (
            <div 
              key={index} 
              className="min-h-[520px] flex flex-col items-center justify-center bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-6 overflow-hidden relative w-full"
            >
              {foodItem ? (
                <CompareCard 
                  name={`[${foodItem.brand}] ${foodItem.name}`} 
                  nutrients={foodItem.nutrients} 
                  onRemove={() => removeFood(foodItem.id)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3 text-center">
                  <span className="text-[56px] font-black text-zinc-500/5 select-none absolute top-4 left-6">
                    0{index + 1}
                  </span>
                  <CompareAddButton onClick={() => setIsModalOpen(true)} />
                  <p className="text-xs text-zinc-400 font-light">비교할 사료를 추가해 주세요</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddFood} 
      />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="py-40 text-center text-zinc-400 text-sm">비교 엔진 구동 중...</div>}>
      <CompareContent />
    </Suspense>
  );
}