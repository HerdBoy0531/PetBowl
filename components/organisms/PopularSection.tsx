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


import Badge from "@/components/atoms/Badge"; // 기존 컴포넌트 배치에 맞춤

const rankingData = [
  {
    title: "주간 인기 사료",
    items: ["오리 단백질 사료", "연어 저알러지", "닭고기 레시피"],
  },
  {
    title: "월간 인기 사료",
    items: ["소고기 프리미엄", "양고기 다이어트", "가수분해 사료"],
  },
  {
    title: "전체 인기 사료",
    items: ["그레인프리 치킨", "인섹트 단백질", "칠면조 조인트 케어"],
  },
];

export default function PopularSection() {
  return (
    <section className="max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rankingData.map((group) => (
          <div 
            key={group.title}
            // 미니멀 오가닉 포인트: 투박한 검정 보더와 하드 섀도우 제거 -> 부드러운 보더와 부드러운 shadow-sm 매칭
            className="border border-zinc-100 p-6 rounded-2xl flex flex-col bg-white shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200"
          >
            {/* 타이포그래피 정돈: underline을 걷어내고 차분하고 짙은 가독성의 폰트 무게 설정 */}
            <h3 className="text-base font-bold tracking-tight mb-6 text-black border-b border-zinc-100 pb-3 w-full text-center">
              {group.title}
            </h3>
            
            <ul className="w-full space-y-2">
              {group.items.map((name, index) => (
                <li 
                  key={name} 
                  className="flex items-center gap-4 text-zinc-700 hover:text-black group cursor-pointer p-2 hover:bg-zinc-50/80 rounded-xl transition-all duration-150"
                >
                  {/* 순위 인덱스를 직관적이고 귀여운 둥근 사각형으로 감싸 디자인적 위트 제공 */}
                  <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold shadow-sm border ${
                    index === 0 
                      ? "bg-black text-white border-black" 
                      : "bg-[#FDFCF0] text-zinc-800 border-zinc-200/60"
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium group-hover:underline decoration-zinc-400 underline-offset-4">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}