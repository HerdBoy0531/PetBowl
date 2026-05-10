import FilterRow from "@molecules/FilterRow";

// components/organisms/SearchFilterCard.tsx
export default function SearchFilterCard() {
  return (
    <section className="
      border-2 border-black dark:border-gray-600 
      rounded-sm overflow-hidden mb-10 
      bg-white dark:bg-gray-900 
      text-black dark:text-white
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
      dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]
    ">
      <FilterRow label="제조사" options={["Royal Canin", "Nutrience"]} />
      <FilterRow label="반려동물" options={["강아지"]} />
      <FilterRow label="사료종류" options={["일반식"]} />
      <FilterRow label="크기" options={["소형", "중형", "대형"]} />
      <FilterRow label="생애주기" options={["베이비", "어덜트", "올드"]} />
    </section>
  );
}