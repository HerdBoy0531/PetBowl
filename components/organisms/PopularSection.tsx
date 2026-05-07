import Badge from "@atoms/Badge";

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
    <section className="max-w-6xl mx-auto px-6 py-16 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rankingData.map((group) => (
          <div 
            key={group.title}
            className="border-2 border-black dark:border-gray-700 p-8 rounded-sm flex flex-col items-center bg-white dark:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
          >
            <h3 className="text-lg font-black mb-8 text-black dark:text-white underline underline-offset-4">
              {group.title}
            </h3>
            
            <ul className="w-full space-y-4">
              {group.items.map((name, index) => (
                <li 
                  key={name} 
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 group cursor-pointer"
                >
                  <Badge color={index === 0 ? "black" : "gray"}>{index + 1}</Badge>
                  <span className="text-sm font-medium group-hover:underline">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}