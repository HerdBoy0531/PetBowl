import NutrientItem from "@molecules/NutrientItem";

const nutrientData = [
  {
    title: "조단백질",
    description: "반려견의 근육 형성과 세포 재생에 필수적인 성분입니다.",
    details: "조단백질은 사료 내에 포함된 모든 질소 화합물을 의미합니다. 주로 육류나 콩류를 통해 섭취하며, 아미노산 공급의 핵심입니다.",
    links: [{ label: "단백질 섭취가 신체 발달에 미치는 영향 연구", url: "#" }]
  },
  {
    title: "조지방",
    description: "에너지 공급원 및 피부/피모 건강을 유지해줍니다.",
    details: "지방은 가장 효율적인 에너지원이며, 지용성 비타민 흡수를 돕습니다. 오메가-3와 오메가-6의 균형이 중요합니다.",
    links: [{ label: "오메가 지방산과 피부 면역력 상관관계", url: "#" }]
  },
  {
    title: "조섬유",
    description: "소화 건강을 돕고 배변 활동을 원활하게 합니다.",
    details: "섬유질은 소화되지 않는 탄수화물로, 장내 유익균의 먹이가 되거나 장 운동을 촉진합니다.",
    links: [{ label: "반려견 장내 미생물과 식이섬유의 관계", url: "#" }]
  },
  {
    title: "조회분",
    description: "칼슘, 인 등 뼈 건강에 필요한 미네랄 성분입니다.",
    details: "사료를 태우고 남은 무기질 성분입니다. 과도할 경우 신장에 무리를 줄 수 있으므로 적정 비율이 중요합니다.",
    links: [{ label: "무기질 섭취 가이드라인 2024", url: "#" }]
  }
];

export default function NutrientAccordion() {
  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-black mb-8 text-center text-black dark:text-white uppercase tracking-tighter">
        영양 성분 분석
      </h2>
      <div className="space-y-4">
        {nutrientData.map((item, idx) => (
          <NutrientItem key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}