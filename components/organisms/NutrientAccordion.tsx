"use client";

import NutrientItem from "@/components/molecules/NutrientItem";
import { COMPREHENSIVE_NUTRIENT_DATA } from "@/constants/nutrients";

export default function NutrientAccordion() {
  const formattedNutrientData = COMPREHENSIVE_NUTRIENT_DATA.map((item) => {
    const formattedDetails = `
${item.description}

■ AAFCO(미국사료관리협회) 영양 기준 가이드라인:
${item.aafcoStatement}
    `.trim();
    const formattedTitle = (
      <div className="space-y-0.5">
        <span className="font-bold text-black">{item.name}</span>
        <span className="block text-[11px] text-zinc-400 font-light tracking-tight">
          ({item.englishName})
        </span>
      </div>
    );

    return {
      title: formattedTitle,
      description: item.summary,
      details: formattedDetails,
      links: item.links
    };
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
          영양 성분 분석 가이드
        </h2>
        <p className="text-sm text-zinc-500 font-light">
          사료 성분표 속 복잡하고 낯선 용어들, 미국사료관리협회(AAFCO) 가이드라인을 기준으로 알기 쉽게 정리해 드립니다.
        </p>
      </div>

      <div className="space-y-4">
        {formattedNutrientData.map((item, idx) => (
          <NutrientItem key={idx} {...item} />
        ))}
      </div>
      
    </div>
  );
}