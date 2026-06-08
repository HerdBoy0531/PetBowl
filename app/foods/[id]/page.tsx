"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import FoodDetailReport from "@/components/organisms/FoodDetailReport";
import PriceActionCard from "@/components/organisms/PriceActionCard";
import RecommendedFoodsSection from "@/components/organisms/RecommendedFoodsSection";

import InfoModal from "@/components/molecules/InfoModal";

import { useCompareStore } from "@/store/useCompareStore";

interface NutrientAnalysis {
  label: string;
  value: number;
  unit: string;
}

interface FoodDetailData {
  id: number;

  nameKo: string;
  brandEn: string;

  animalType?: string;
  lifeStage?: string;
  sizeCategory?: string;

  kibbleSize?: number;

  allergies?: string[];
  certifications?: string[];

  proteins?: any[];

  analysis: {
    label: string;
    value: string;
  }[];

  price: string;
  weight: string;
  calories: string;
}

export default function FoodDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // 유저님의 실제 스토어 명세에 맞춰 selectedFoods와 addFood를 정확히 매칭하여 수확합니다.
  const { selectedFoods, addFood } = useCompareStore();

  const [food, setFood] = useState<FoodDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState("");
  const [infoModalMessage, setInfoModalMessage] = useState("");
  const [infoModalType, setInfoModalType] = useState<"success" | "error" | "warning">("success");


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
          setInfoModalTitle("사료 정보 없음");

          setInfoModalMessage(
            "존재하지 않거나 삭제된 사료 정보입니다."
          );

          setInfoModalType("error");

          setInfoModalOpen(true);

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

  const handleAddCompareSlot = () => {
    if (!food) return;
    const foodToStore = {
      id: Number(food.id),
      name: food.nameKo,
      brand: food.brandEn,
    };

    const success = addFood(foodToStore);

    if (success) {
      setInfoModalTitle("추가 완료");

      setInfoModalMessage(
        `[${food.brandEn}] ${food.nameKo}\n사료 비교 바구니에 정상 추가되었습니다!`
      );

      setInfoModalType("success");

      setInfoModalOpen(true);
    } else {
      setInfoModalTitle("추가 불가");

      setInfoModalMessage(
        "이미 담긴 사료이거나 비교 슬롯(최대 2개)이 꽉 찼습니다.\n비교 페이지나 비교 바구니에서 비워주세요."
      );

      setInfoModalType("error");

      setInfoModalOpen(true);
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in w-full">
      
      {/* 왼쪽 리포트 판넬 */}
      <div className="lg:col-span-2 space-y-6">
        <FoodDetailReport data={food} />

        <RecommendedFoodsSection 
          currentFoodId={food.id}
        />
      </div>



      {/* 우측 가격 및 제어 랙 */}
      <div className="lg:sticky lg:top-24">
        <PriceActionCard 
          price={food.price}
          weight={food.weight}
          calories={food.calories}
          onAddCompare={handleAddCompareSlot}
          onGoBack={() => router.push("/search")}
        />
      </div>

      <InfoModal
        isOpen={infoModalOpen}
        title={infoModalTitle}
        description={infoModalMessage}
        type={infoModalType}
        onConfirm={() => {
          setInfoModalOpen(false);
        }}
      />

    </div>
  );
}