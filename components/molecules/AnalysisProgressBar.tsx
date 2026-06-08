"use client";

interface AnalysisProgressBarProps {
  label: string;
  value: number;
  unit: string;
}

export default function AnalysisProgressBar({ label, value, unit }: AnalysisProgressBarProps) {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-end text-xs md:text-sm">
        <span className="font-medium text-zinc-700">{label}</span>
        <span className="font-bold text-black">
          {value}{unit}
        </span>
      </div>
      <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden relative shadow-inner">
        <div 
          className="h-full bg-black rounded-full transition-all duration-500" 
          style={{ width: `${Math.min(value * 2, 100)}%` }} // 비율 시각화 안전 장치
        />
      </div>
    </div>
  );
}