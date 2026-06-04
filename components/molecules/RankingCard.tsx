"use client";

interface RankingCardProps {
  index: number;
  brand: string;
  name: string;
  mainProtein: string[];
  viewCount: number;
  onClick: () => void;
}

export default function RankingCard({ index, brand, name, mainProtein, viewCount, onClick }: RankingCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 md:p-5 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center gap-5">
        {/* 순위 넘버링 */}
        <span className={`font-black text-xl md:text-2xl w-10 text-center font-bold tracking-tight ${index === 0 ? "text-amber-500" : index === 1 ? "text-zinc-500" : index === 2 ? "text-amber-800" : "text-zinc-300"}`}>
          0{index + 1}
        </span>
        
        {/* 정보 영역 */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase bg-zinc-50 px-2 py-0.5 rounded-md border border-zinc-100">
            {brand}
          </span>
          <h4 className="text-sm md:text-base font-bold text-zinc-900 group-hover:underline underline-offset-4 decoration-2">
            {name}
          </h4>
          <div className="flex gap-1.5">
            {mainProtein.map((p, i) => (
              <span key={i} className="text-[10px] font-medium bg-[#FDFCF0] border border-black/10 text-zinc-600 px-2 py-0.5 rounded-full">
                🥩 {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 조회수 */}
      <div className="text-right">
        <span className="text-xs font-mono font-medium text-zinc-400">
          {viewCount.toLocaleString()} views
        </span>
      </div>
    </div>
  );
}