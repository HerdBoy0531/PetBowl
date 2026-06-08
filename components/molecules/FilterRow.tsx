"use client";

import Checkbox from "@atoms/Checkbox";

interface FilterRowProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export default function FilterRow({ label, options, selectedValues, onChange }: FilterRowProps) {
  return (
    <div className="flex border-b border-zinc-100 last:border-b-0 w-full">
      
      {/* 좌측 라벨 랙 */}
      <div className="w-32 p-4 flex items-center justify-center border-r bg-zinc-50/60 border-zinc-100 font-semibold text-sm text-zinc-800 shrink-0">
        {label}
      </div>
      
      {/* 우측 옵션 랙 */}
      <div className="flex-1 p-4 flex flex-wrap gap-6 items-center bg-white overflow-hidden">
        {options.map((option) => {
          const isChecked = selectedValues.includes(option);

          return (
            <Checkbox
              key={option}
              label={option}
              checked={isChecked}
              onChange={() => {
                let nextValues: string[];

                if (isChecked) {
                  nextValues = selectedValues.filter((v) => v !== option);
                } else {
                  nextValues = Array.from(new Set([...selectedValues, option]));
                }
                
                onChange(nextValues);
              }}
            />
          );
        })}
      </div>

    </div>
  );
}