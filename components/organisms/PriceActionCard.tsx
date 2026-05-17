"use client";

import Button from "@/components/atoms/Button";

interface PriceActionCardProps {
  price: string;
  weight: string;
  calories: string;
  onAddCompare: () => void;
  onGoBack: () => void;
}

export default function PriceActionCard({
  price,
  weight,
  calories,
  onAddCompare,
  onGoBack,
}: PriceActionCardProps) {
  return (
    <aside className="space-y-4 w-full">
      
      {/* 가격 배너 큐브 */}
      <div className="bg-white border border-zinc-100 p-6 rounded-3xl shadow-sm space-y-4">
        <div className="border-b border-zinc-50 pb-3">
          <span className="text-xs text-zinc-400 font-light">PetBowl 권장 소비자 가격</span>
          <div className="text-2xl font-black text-black mt-1">
            {price}
          </div>
        </div>

        <div className="space-y-2 text-xs text-zinc-500 font-light">
          <div className="flex justify-between">
            <span>포장 중량</span>
            <span className="text-zinc-800 font-medium">{weight}</span>
          </div>
          <div className="flex justify-between">
            <span>총 칼로리</span>
            <span className="text-zinc-800 font-medium">{calories}</span>
          </div>
        </div>

        {/* 인터랙션 버튼 레이어 */}
        <div className="space-y-2 pt-4">
          <Button variant="primary" fullWidth onClick={onAddCompare} className="py-3 text-sm">
            비교 슬롯에 추가하기
          </Button>
          <Button variant="outline" fullWidth onClick={onGoBack} className="py-3 text-sm">
            목록으로 돌아가기
          </Button>
        </div>
      </div>

      {/* 오가닉 미니 헬프 팁 */}
      <div className="bg-[#FDFCF0] border border-zinc-200/60 p-5 rounded-2xl text-center">
        <p className="text-xs text-zinc-500 font-light leading-relaxed">
          🌿 영양 성분이 우리 아이에게 맞는지 확인하고 싶다면 비교 슬롯에 추가하여 다른 사료와 직접 대조해 보세요.
        </p>
      </div>

    </aside>
  );
}