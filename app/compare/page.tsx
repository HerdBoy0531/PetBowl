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
import { useRouter } from "next/navigation";
import CompareAddButton from "@/components/atoms/CompareAddButton";
import CompareCard from "@/components/molecules/CompareCard";
import SearchModal from "@/components/molecules/SearchModal";
import { useCompareStore } from "@/store/useCompareStore";

const MAX_SLOTS = 2;

// 🎯 영양소 한글 번역 사전 (백엔드 명세가 매칭되면 한글로 치환)
const nutrientsMap: Record<string, string> = {
  crudeProtein: "조단백질",
  crudeFat: "조지방",
  crudeFiber: "조섬유",
  crudeAsh: "조회분",
  moisture: "수분",
  protein: "조단백질",
  fat: "조지방",
  fiber: "조섬유",
  ash: "조회분",
  calcium: "칼슘",
  phosphorus: "인",
  sodium: "나트륨",
  omega3: "오메가3",
  omega6: "오메가6",
  "조단백질": "조단백질",
  "조지방": "조지방",
  "조섬유": "조섬유",
  "조회분": "조회분",
  "수분": "수분",
  "칼슘": "칼슘",
  "인": "인",
  "나트륨": "나트륨",
  "오메가3": "오메가3",
  "오메가6": "오메가6",
};

// 생애주기 한글화
const lifeStageMap: Record<string, string> = {
  puppy: "퍼피",
  adult: "성견",
  senior: "시니어",
  all: "전연령",
};

// 반려동물 종류 한글화
const animalTypeMap: Record<string, string> = {
  dog: "강아지",
  cat: "고양이",
}

// 주단백질원 종류 한글화
const proteinTypeMap: Record<string, string> = {
  chicken: "닭고기",
  pork: "돼지고기",
  beef: "소고기",
  salmon: "연어",
  lamb: "양고기",

  duck: "오리고기",
  turkey: "칠면조",
  fish: "생선",
  venison: "사슴고기",
  rabbit: "토끼고기",
  kangaroo: "캥거루고기",
  goat: "염소고기",
}

// 알레르기 종류 한글화
const allergyMap: Record<string, string> = {
  HYDROLYZED: "가수분해",
  GRAIN_FREE: "그레인프리",
  GLUTEN_FREE: "글루텐프리",
  LID: "LID",
};

// Tags 분리
// 기본 정보 Tags
const createBasicTags = (food: any) => {
  const tags: string[] = [];

  if (food.animalType) {
    tags.push(
      animalTypeMap[food.animalType] ?? food.animalType
    );
  }

  if (food.lifeStage) {
    tags.push(
      lifeStageMap[food.lifeStage] ?? food.lifeStage
    );
  }

  if (food.proteins?.length) {
    tags.push(
      proteinTypeMap[
        food.proteins[0].proteinType
      ] ?? food.proteins[0].proteinType
    );
  }

  if (food.kibbleSize) {
    tags.push(`${food.kibbleSize}mm`);
  }

  return tags;
};

// 알레르기, 인증 정보 Tags
const createFeatureTags = (food: any) => {
  const tags: string[] = [];

  if (food.allergies?.length) {
    tags.push(
      ...food.allergies.map(
        (a: string) => allergyMap[a] ?? a
      )
    );
  }

  if (food.certifications?.length) {
    tags.push(...food.certifications);
  }

  return [...new Set(tags)].slice(0, 4);
};



// 영양성분 수치 비교
const parseNumber = (value: string) => {
  return Number(value.replace(/[^\d.]/g, ""));
};

const compareNutrients = (
  left: { label: string; value: string }[],
  right: { label: string; value: string }[]
) => {
  return left.map((leftItem) => {
    const rightItem = right.find(
      (r) => r.label === leftItem.label
    );

    if (!rightItem) {
      return {
        ...leftItem,
        isHigher: false,
      };
    }

    const leftValue = parseNumber(leftItem.value);
    const rightValue = parseNumber(rightItem.value);

    return {
      ...leftItem,
      isHigher: leftValue > rightValue,
    };
  });
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
      .filter(([key, value]) =>
        !["id", "foodId", "createdAt", "updatedAt"].includes(key) &&
        value !== null &&
        value !== undefined
      ) // 메타 ID들은 제외
      .map(([key, value]) => {
        // 사전에 등록된 단어면 한글로 바꾸고, 처음 보는 영문 키면 그대로 노출시켜 확인 가능하게 처리
        const label = nutrientsMap[key] || key; 
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
  const { selectedFoods, addFood, removeFood } = useCompareStore();
  const validFoods = selectedFoods.filter(
    
    (food):food is NonNullable<typeof food> => food !== null
  )

  const [compareFoods, setCompareFoods] = useState<any[] | null>([]);

  useEffect(() => {
    async function fetchCompareFoods() {
      const results = await Promise.all(
        selectedFoods.map(async (food) => {
          if(!food) return null;

          const res = await fetch(`/api/foods/${food.id}`);

          if (!res.ok) return null;

          return await res.json();
        })
      );

      setCompareFoods(results);
    }

    if (validFoods.length > 0) {
      fetchCompareFoods();
    } else {
      setCompareFoods([]);
    }
  }, [selectedFoods]);
  
  const leftFood = compareFoods ? compareFoods[0] : null;
  const rightFood = compareFoods ? compareFoods[1] : null;

  console.log(leftFood);

  const leftParsedNutrients =
  parseAnalysisData(leftFood);

  const rightParsedNutrients =
    parseAnalysisData(rightFood);

  const leftNutrients =
    leftFood && rightFood
      ? compareNutrients(
          leftParsedNutrients,
          rightParsedNutrients
        )
      : leftParsedNutrients;

  const rightNutrients =
    leftFood && rightFood
      ? compareNutrients(
          rightParsedNutrients,
          leftParsedNutrients
        )
      : rightParsedNutrients;


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

      console.log(fullFood);
      
      const success = addFood({
        id: Number(fullFood.id),
        name: fullFood.nameKo ?? fullFood.name,
        brand: fullFood.brandKo ?? fullFood.brand,
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
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(MAX_SLOTS)].map((_, index) => {
            const foodItem = compareFoods ? compareFoods[index] : null;

            console.log(foodItem);

            return (
              <div 
                key={index} 
                className="min-h-[520px] flex flex-col items-center justify-center bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-6 overflow-hidden relative w-full"
              >
                {foodItem ? (
                  <CompareCard
                    name={foodItem.nameKo}
                    basicTags={createBasicTags(foodItem)}
                    featureTags={createFeatureTags(foodItem)}
                    nutrients={index === 0 ? leftNutrients : rightNutrients}
                    onRemove={() => removeFood(index)}
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
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-24 h-24 rounded-full bg-gradient-to-b from-white to-zinc-50 border border-zinc-200 shadow-xl flex items-center justify-center">
            <span className="text-xl font-black tracking-widest text-zinc-900">
              VS
            </span>
          </div>
        </div>
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