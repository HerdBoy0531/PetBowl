import Checkbox from "@atoms/Checkbox";

interface FilterRowProps {
  label: string;
  options: string[];
}

export default function FilterRow({ label, options }: FilterRowProps) {
  return (
    <div className="flex border-b border-gray-300 dark:border-gray-700 last:border-b-0">
      {/* 좌측 라벨 섹션 */}
      <div className="
        w-32 p-4 flex items-center justify-center border-r 
        bg-gray-50 dark:bg-gray-800 
        border-gray-300 dark:border-gray-700 
        font-bold text-sm text-black dark:text-white
      ">
        {label}
      </div>
      {/* 우측 옵션 섹션 */}
      <div className="flex-1 p-4 flex flex-wrap gap-6 items-center bg-white dark:bg-gray-900">
        {options.map((option) => (
          <Checkbox key={option} label={option} />
        ))}
      </div>
    </div>
  );
}