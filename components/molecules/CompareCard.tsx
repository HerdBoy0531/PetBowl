// interface Nutrient {
//   label: string;
//   value: string;
// }

// interface CompareCardProps {
//   name: string;
//   nutrients: Nutrient[];
//   onRemove: () => void;
// }

// export default function CompareCard({ name, nutrients, onRemove }: CompareCardProps) {
//   return (
//     <div className="relative w-full h-full p-6 flex flex-col items-center">
//       <button 
//         onClick={onRemove}
//         className="absolute top-2 right-2 text-xs border px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
//       >
//         다른 사료
//       </button>
//       <h2 className="text-4xl font-bold mt-10 mb-8 dark:text-white">{name}</h2>
//       <div className="w-full space-y-4">
//         {nutrients.map((n, idx) => (
//           <div key={idx} className="border-b pb-2 flex justify-between dark:border-gray-700">
//             <span className="text-gray-500 dark:text-gray-400">{n.label}</span>
//             <span className="font-medium dark:text-white">{n.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// design renewal
// "use client";

// interface Nutrient {
//   label: string;
//   value: string;
// }

// interface CompareCardProps {
//   name: string;
//   nutrients: Nutrient[];
//   onRemove: () => void;
// }

// export default function CompareCard({ name, nutrients, onRemove }: CompareCardProps) {
//   return (
//     <div className="w-full h-full flex flex-col justify-between p-2 relative animate-fade-in">
      
//       {/* 상단 액션 영역: 얇은 테두리와 부드러운 라운딩의 교체 단추 */}
//       <div className="absolute top-0 right-0">
//         <button 
//           onClick={onRemove}
//           className="text-xs border border-zinc-200 bg-white text-zinc-500 px-3 py-1.5 rounded-xl hover:text-black hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm font-medium"
//         >
//           사료 교체
//         </button>
//       </div>

//       {/* 사료 메인 타이틀 정보 구획 */}
//       <div className="text-center mt-12 mb-8">
//         <h2 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">{name}</h2>
//       </div>

//       {/* 영양성분 명세표 리스트 판넬 */}
//       <div className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl p-5 space-y-3.5 shadow-inner">
//         {nutrients.map((n, idx) => (
//           <div 
//             key={idx} 
//             className="border-b border-zinc-100/80 pb-3 flex justify-between items-center last:border-b-0 last:pb-0"
//           >
//             <span className="text-sm text-zinc-500 font-light">{n.label}</span>
//             <span className="text-sm font-semibold text-zinc-900 tracking-wide">{n.value}</span>
//           </div>
//         ))}
//       </div>
      
//     </div>
//   );
// }



// data binding
// "use client";

// interface Nutrient {
//   label: string;
//   value: string;
// }

// interface CompareCardProps {
//   name: string;
//   nutrients: Nutrient[];
//   onRemove: () => void;
// }

// export default function CompareCard({ name, nutrients, onRemove }: CompareCardProps) {
//   return (
//     <div className="w-full h-full flex flex-col justify-between p-2 relative animate-fade-in">
      
//       {/* 상단 액션 영역: 얇은 테두리와 부드러운 라운딩의 교체 단추 */}
//       <div className="absolute top-0 right-0">
//         <button 
//           onClick={onRemove}
//           className="text-xs border border-zinc-200 bg-white text-zinc-500 px-3 py-1.5 rounded-xl hover:text-black hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm font-medium"
//         >
//           사료 교체
//         </button>
//       </div>

//       {/* 사료 메인 타이틀 정보 구획 */}
//       <div className="text-center mt-12 mb-8">
//         <h2 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">{name}</h2>
//       </div>

//       {/* 영양성분 명세표 리스트 판넬 */}
//       <div className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl p-5 space-y-3.5 shadow-inner">
//         {nutrients && nutrients.length > 0 ? (
//           nutrients.map((n, idx) => (
//             <div 
//               key={idx} 
//               className="border-b border-zinc-100/80 pb-3 flex justify-between items-center last:border-b-0 last:pb-0"
//             >
//               <span className="text-sm text-zinc-500 font-light">{n.label}</span>
//               <span className="text-sm font-semibold text-zinc-900 tracking-wide">{n.value}</span>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-10 text-xs text-zinc-400 font-light">
//             등록된 성분 정보가 없습니다.
//           </div>
//         )}
//       </div>
      
//     </div>
//   );
// }



"use client";

interface Nutrient {
  label: string;
  value: string;
  isHigher?: boolean;
}

interface CompareCardProps {
  brand?: string;
  name: string;
  // tags?: string[];
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
  // tags = [],
  basicTags= [],
  featureTags = [],
  nutrients,
  onRemove,
  onReplace,
}: CompareCardProps) {
  return (
    <div className="w-full min-h-[580px] rounded-[36px] bg-[#F7F6F4] border border-zinc-200/70 shadow-sm p-8 flex flex-col animate-fade-in">
      
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

        <p className="text-[24px] leading-relaxed text-zinc-600 font-light ">
          {name}
        </p >
      </div>

      {/* 태그 영역 */}
      {/* {tags.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-8">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-white border border-zinc-200 text-sm text-zinc-800 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )} */}

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
      <div className="bg-white/90 border border-zinc-100 rounded-[28px] p-6 shadow-inner space-y-4">
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