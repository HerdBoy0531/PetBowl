"use client";

interface Nutrient {
  label: string;
  value: string;
  isHigher?: boolean;
}

interface CompareCardProps {
  brand?: string;
  name: string;
  basicTags?: string[];
  featureTags?: string[];
  nutrients: Nutrient[];
  onRemove: () => void;
  onReplace?: () => void;
}

const getCondition = (label: string) => {
  const minimumLables = [
    "조단백질",
    "조지방",
    "칼슘",
    "인",
  ]

  return minimumLables.includes(label) ? "이상" : "이하";
}

export default function CompareCard({
  brand = "NATURAL LAB",
  name,
  basicTags= [],
  featureTags = [],
  nutrients,
  onRemove,
  onReplace,
}: CompareCardProps) {
  return (
    <div className="w-full min-h-[580px] rounded-[36px] bg-[#F7F6F4] border border-zinc-200/70 shadow-sm p-4 md:p-8 flex flex-col animate-fade-in">
      
      {/* 상단 액션 영역 */}
      <div className="flex items-center justify-between mb-7">
        <button
          onClick={onReplace}
          className="px-5 py-2.5 rounded-full bg-white border border-zinc-200 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm"
        >
          ↺ 사료교체
        </button>

        <button
          onClick={onRemove}
          className="w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-black hover:bg-zinc-50 transition-all shadow-sm flex items-center justify-center text-lg"
        >
          ×
        </button>
      </div>

      {/* 브랜드 / 이름 */}
      <div className="mb-6">
        <h2 className="text-[18px] leading-none tracking-tight font-black text-zinc-900 mb-2">
          {brand}
        </h2>

        <p className="text-lg md:text-[24px] leading-relaxed text-zinc-600 font-light break-keep">
          {name}
        </p >
      </div>

      {/* 기본 정보 태그 */}
      {basicTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {basicTags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs text-zinc-700 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 특징 태그 */}
      {featureTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {featureTags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs text-blue-600 shadow-sky-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 영양성분 카드 */}
      <div className="bg-white/90 border border-zinc-100 rounded-[28px] p-4 md:p-6 shadow-inner space-y-4">
        {nutrients.length > 0 ? (
          nutrients.map((n, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between"
            >
              {/* 라벨 */}
              <span className="font-sm text-zinc-700">
                {n.label}
              </span>

              {/* 값 */}
              <div className={`w-[120px] flex justify-end items-center gap-1 px-4 py-1 rounded-xl transition-all
              ${
                n.isHigher ? "bg-emerald-50" : ""
              }`}
              >
                <span className={`text-[24px] font-bold ${
                    n.isHigher ? "text-emerald-600" : "text-zinc-900"
                  }`}
                >
                  {n.value}
                </span>

                <span className="text-sm font-medium text-zinc-400">
                  {getCondition(n.label)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-zinc-400 text-sm font-light">
            등록된 영양성분 정보가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}