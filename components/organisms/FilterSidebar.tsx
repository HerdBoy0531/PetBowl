"use client";

import Checkbox from "@atoms/Checkbox";

const filterData = [
  { title: "브랜드", items: ["로얄캐닌", "오리젠", "나우", "지위픽"] },
  { title: "주단백질원", items: ["연어", "닭고기", "소고기", "오리"] },
  { title: "대상 연령", items: ["퍼피", "어덜트", "시니어"] },
];

export default function FilterSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <h2 className="text-lg font-black mb-6 text-black dark:text-white border-b-2 border-black dark:border-white pb-2">
        FILTERS
      </h2>
      <div className="space-y-8">
        {filterData.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-bold mb-3 text-black dark:text-white">{group.title}</h3>
            <div className="flex flex-col">
              {group.items.map((item) => (
                <Checkbox key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}