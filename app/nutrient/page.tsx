// import NutrientAccordion from "@organisms/NutrientAccordion";

// export default function NutrientsPage() {
//   return (
//     <main className="min-h-screen bg-white dark:bg-gray-900 pt-28 pb-20">
//       <div className="container mx-auto">
//         <NutrientAccordion />
//       </div>
//     </main>
//   );
// }

"use client";

import NutrientAccordion from "@/components/organisms/NutrientAccordion";

export default function NutrientsPage() {
  return (
    // 미니멀 오가닉 포인트: layout.tsx와 자연스럽게 매칭되도록 불필요한 중복 배경/패딩 래퍼를 걷어냈습니다.
    <div className="animate-fade-in">
      <NutrientAccordion />
    </div>
  );
}