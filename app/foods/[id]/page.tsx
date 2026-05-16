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

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/atoms/Button";

export default function FoodDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // 더미 데이터: 사료 상세 정보 (실제 데이터베이스 모델 기준 구조)
  const foodDetail = {
    id: id,
    name: "그레인프리 치킨 & 칠면조 어덜트",
    brand: "오리젠 (Orijen)",
    animalType: "강아지 (Dog)",
    lifeStage: "성견 (Adult)",
    mainProtein: "닭고기, 칠면조, 닭 간",
    price: "45,000원",
    weight: "1.8kg",
    calories: "3,860 kcal/kg",
    description: "곡물을 전혀 사용하지 않고 신선한 통닭고기와 칠면조육을 주원료로 하여 반려동물의 생물학적 특성에 맞춘 고단백 가공 사료입니다.",
    // 등록 성분 비율 데이터
    analysis: [
      { label: "조단백질", value: 38, target: 25, unit: "% 이상" },
      { label: "조지방", value: 18, target: 12, unit: "% 이상" },
      { label: "조섬유", value: 5, target: 4, unit: "% 이하" },
      { label: "조회분", value: 9, target: 8, unit: "% 이하" },
      { label: "수분", value: 12, target: 10, unit: "% 이하" },
    ],
    ingredients: "신선한 닭고기(25%), 건조 칠면조육(15%), 신선한 닭 간(6%), 신선한 통청어(5%), 탈수 닭고기(4%), 완두콩, 렌즈콩, 신선한 통달걀(4%), 병아리콩, 신선한 치킨 오일, 호박, 크랜베리, 블루베리, 로즈마리 추출물.",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
      
      {/* LEFT COLUMN: 사료 메인 디테일 리포트 (2개 슬롯 차지) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Slot 1: 기본 타이틀 정보 카드 */}
        <section className="bg-white border border-zinc-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
              {foodDetail.brand}
            </span>
            <span className="text-sm text-zinc-400 font-light">
              ID: #{foodDetail.id}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
            {foodDetail.name}
          </h1>
          
          <p className="text-sm text-zinc-500 font-light leading-relaxed">
            {foodDetail.description}
          </p>

          {/* 주요 스펙 태그 랙 */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs bg-[#FDFCF0] border border-zinc-200/60 text-zinc-700 px-3 py-1 rounded-xl">
              🎯 {foodDetail.animalType}
            </span>
            <span className="text-xs bg-[#FDFCF0] border border-zinc-200/60 text-zinc-700 px-3 py-1 rounded-xl">
              ⏳ {foodDetail.lifeStage}
            </span>
            <span className="text-xs bg-[#FDFCF0] border border-zinc-200/60 text-zinc-700 px-3 py-1 rounded-xl">
              🥩 주단백질: {foodDetail.mainProtein}
            </span>
          </div>
        </section>

        {/* Slot 2: 등록성분량 분석 시각화 판넬 (오가닉 프로그레스 바) */}
        <section className="bg-white border border-zinc-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-black tracking-tight">영양 성분 등록성분량</h3>
            <p className="text-xs text-zinc-400 mt-1">사료 포장지에 표기된 정식 보증 성분 비율입니다.</p>
          </div>

          <div className="space-y-4">
            {foodDetail.analysis.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-end text-xs md:text-sm">
                  <span className="font-medium text-zinc-700">{item.label}</span>
                  <span className="font-bold text-black">
                    {item.value}{item.unit}
                  </span>
                </div>
                {/* 미니멀 오가닉 스타일 바 디자인 */}
                <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden relative shadow-inner">
                  <div 
                    className="h-full bg-black rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(item.value * 2, 100)}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Slot 3: 사용 원료성분 전체 명세 */}
        <section className="bg-white border border-zinc-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-base font-bold text-black tracking-tight">사용 원료 전체 성분</h3>
          <div className="p-4 md:p-5 bg-zinc-50/50 border border-zinc-100 rounded-2xl">
            <p className="text-sm text-zinc-600 font-light leading-relaxed tracking-wide">
              {foodDetail.ingredients}
            </p>
          </div>
          <p className="text-[11px] text-zinc-400 font-light">
            * 원료 배합 비율은 제조사 사정에 따라 일부 변경될 수 있습니다.
          </p>
        </section>
      </div>

      {/* RIGHT COLUMN: 가성비 요약 및 즉시 비교 액션 스티커 바 (1개 슬롯 차지) */}
      <aside className="space-y-4 lg:sticky lg:top-24">
        
        {/* 가격 정보 랙 */}
        <div className="bg-white border border-zinc-100 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="border-b border-zinc-50 pb-3">
            <span className="text-xs text-zinc-400 font-light">PetBowl 권장 소비자 가격</span>
            <div className="text-2xl font-black text-black mt-1">
              {foodDetail.price}
            </div>
          </div>

          <div className="space-y-2 text-xs text-zinc-500 font-light">
            <div className="flex justify-between">
              <span>포장 중량</span>
              <span className="text-zinc-800 font-medium">{foodDetail.weight}</span>
            </div>
            <div className="flex justify-between">
              <span>총 칼로리</span>
              <span className="text-zinc-800 font-medium">{foodDetail.calories}</span>
            </div>
          </div>

          {/* 제어 인터랙션 버튼 세트 */}
          <div className="space-y-2 pt-4">
            <Button variant="primary" fullWidth className="py-3 text-sm">
              비교 슬롯에 추가하기
            </Button>
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => router.push("/search")}
              className="py-3 text-sm"
            >
              목록으로 돌아가기
            </Button>
          </div>
        </div>

        {/* 미니 가이드 박스 */}
        <div className="bg-[#FDFCF0] border border-zinc-200/60 p-5 rounded-2xl text-center">
          <p className="text-xs text-zinc-500 font-light leading-relaxed">
            🌿 영양 성분이 우리 아이에게 맞는지 확인하고 싶다면 비교 슬롯에 추가하여 다른 사료와 직접 대조해 보세요.
          </p>
        </div>

      </aside>

    </div>
  );
}