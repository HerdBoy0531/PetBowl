// // app/foods/[id]/page.tsx

// type FoodDetail = {
//   id: number;
//   name: string;
//   brand: string;
//   animalType: string;
//   lifeStage: string;
//   sizeCategory: string;
//   proteins: { proteinType: string; isPrimary: boolean }[];
//   carbohydrates: { carbType: string }[];
//   vegetables: { vegType: string }[];
// };

// async function getFood(id: string): Promise<FoodDetail> {
//   const res = await fetch(`http://localhost:3000/api/foods/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch food");
//   }

//   return res.json();
// }

// export default async function FoodDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const food = await getFood(id);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {/* 🐶 기본 정보 */}
//       <div className="border rounded-2xl p-6 shadow mb-6">
//         <h1 className="text-3xl font-bold mb-2">{food.name}</h1>
//         <p className="text-gray-500">{food.brand}</p>

//         <div className="mt-4 flex gap-4 text-sm">
//           <span>🐾 {food.animalType}</span>
//           <span>📊 {food.lifeStage}</span>
//           <span>📦 {food.sizeCategory}</span>
//         </div>
//       </div>

//       {/* 🍖 단백질 */}
//       <div className="border rounded-2xl p-6 shadow mb-6">
//         <h2 className="text-xl font-semibold mb-3">🍖 주요 단백질</h2>
//         <div className="flex flex-wrap gap-2">
//           {food.proteins.map((p, idx) => (
//             <span
//               key={idx}
//               className={`px-3 py-1 rounded-full text-sm ${
//                 p.isPrimary
//                   ? "bg-black text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               {p.proteinType}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* 🌾 탄수화물 */}
//       <div className="border rounded-2xl p-6 shadow mb-6">
//         <h2 className="text-xl font-semibold mb-3">🌾 탄수화물</h2>
//         <div className="flex flex-wrap gap-2">
//           {food.carbohydrates.map((c, idx) => (
//             <span
//               key={idx}
//               className="px-3 py-1 rounded-full bg-yellow-100 text-sm"
//             >
//               {c.carbType}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* 🥦 야채 */}
//       <div className="border rounded-2xl p-6 shadow mb-6">
//         <h2 className="text-xl font-semibold mb-3">🥦 야채</h2>
//         <div className="flex flex-wrap gap-2">
//           {food.vegetables.map((v, idx) => (
//             <span
//               key={idx}
//               className="px-3 py-1 rounded-full bg-green-100 text-sm"
//             >
//               {v.vegType}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import FoodDetailReport from "@/components/organisms/FoodDetailReport";
import PriceActionCard from "@/components/organisms/PriceActionCard";
import { useCompareStore } from "@/store/useCompareStore"; // 💡 Zustand 전역 스토어 수입

interface NutrientAnalysis {
  label: string;
  value: number;
  unit: string;
}

interface FoodDetailData {
  id: string;
  name: string;
  brand: string;
  animalType: string;
  lifeStage: string;
  sizeCategory: string;
  mainProtein: string;
  price: string;
  weight: string;
  calories: string;
  description: string;
  ingredients: string;
  analysis: NutrientAnalysis[];
}

export default function FoodDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // 🔄 1. 유저님의 실제 스토어 명세에 맞춰 selectedFoods와 addFood를 정확히 매칭하여 수확합니다.
  const { selectedFoods, addFood } = useCompareStore();

  const [food, setFood] = useState<FoodDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchFoodDetail() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/foods/${id}`, { cache: "no-store" });
        if (res.ok) {
          const result = await res.json();
          setFood(result);
        } else {
          alert("존재하지 않거나 삭제된 사료 정보입니다.");
          router.push("/search");
        }
      } catch (error) {
        console.error("사료 상세 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFoodDetail();
  }, [id]);

  // 💡 2. [비교 슬롯 추가] 핸들러 리터칭 (스토어 인터페이스 규격 변환 레이어 가동)
  const handleAddCompareSlot = () => {
    if (!food) return;

    // 💡 핵심 교정: 스토어의 CompareFood 규격(nutrients, value: string)에 일치하도록 맵핑 조립
    const foodToStore = {
      id: Number(food.id),
      name: food.name,
      brand: food.brand,
      nutrients: food.analysis.map((item) => ({
        label: item.label,
        // 숫자와 단위를 끈끈하게 결합하여 스토어가 원하는 'string' 타입으로 변환 (ex: "38% 이상")
        value: `${item.value}${item.unit}`, 
      })),
    };

    // Zustand 스토어의 캡슐화 로직으로 전송 및 성공 여부 확인
    const success = addFood(foodToStore);

    if (success) {
      alert(`[${food.brand}] ${food.name}\n사료 비교 바구니에 정상 장착되었습니다!`);
    } else {
      // 스토어 내부 분기(중복이거나 2개 초과)일 때 예외 안내 처리
      alert("이미 담긴 사료이거나 비교 슬롯(최대 2개)이 꽉 찼습니다.\n비교 페이지나 우측 독 위젯에서 비워주세요.");
    }
  };

  if (isLoading) {
    return (
      <div className="py-40 text-center text-zinc-400 font-light text-sm animate-pulse">
        데이터베이스에서 정밀 영양 분석표를 파싱하는 중...
      </div>
    );
  }

  if (!food) return null;
  console.log("food", food);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in w-full">
      
      {/* 왼쪽 리포트 판넬 */}
      <div className="lg:col-span-2">
        <FoodDetailReport data={food} />
      </div>

      {/* 우측 가격 및 제어 랙 */}
      <div className="lg:sticky lg:top-24">
        <PriceActionCard 
          price={food.price}
          weight={food.weight}
          calories={food.calories}
          onAddCompare={handleAddCompareSlot} // 튜닝된 스토어 액션 핸들러 주입
          onGoBack={() => router.push("/search")}
        />
      </div>

    </div>
  );
}