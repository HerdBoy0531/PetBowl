// "use client";
// import { useState } from "react";
// import NutrientArrow from "@atoms/NutrientArrow";

// interface NutrientItemProps {
//   title: string;
//   description: string;
//   details: string;
//   links?: { label: string; url: string }[];
// }

// export default function NutrientItem({ title, description, details, links }: NutrientItemProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="border border-black dark:border-gray-700 mb-4 overflow-hidden bg-white dark:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
//       {/* 요약 섹션 (클릭 영역) */}
//       <div
//         className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="text-lg font-bold text-black dark:text-white">
//           {title} : <span className="font-normal ml-2">{description}</span>
//         </div>
//         <NutrientArrow isOpen={isOpen} />
//       </div>

//       {/* 상세 설명 섹션 (아코디언) */}
//       <div
//         className={`transition-all duration-300 ease-in-out border-t border-black dark:border-gray-700 ${
//           isOpen ? "max-h-[500px] p-6 opacity-100" : "max-h-0 p-0 opacity-0"
//         } overflow-hidden bg-gray-50 dark:bg-gray-800/50`}
//       >
//         <div className="text-black dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
//           <p className="font-bold mb-2">상세 설명</p>
//           <p className="mb-4">{details}</p>
          
//           {links && links.length > 0 && (
//             <div className="mt-4">
//               <p className="font-bold mb-2">증명 논문들(링크)</p>
//               <ul className="list-disc ml-5 space-y-1">
//                 {links.map((link, idx) => (
//                   <li key={idx}>
//                     <a href={link.url} className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
//                       {link.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import NutrientArrow from "@atoms/NutrientArrow";

interface NutrientItemProps {
  title: string;
  description: string;
  details: string;
  links?: { label: string; url: string }[];
}

export default function NutrientItem({ title, description, details, links }: NutrientItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-zinc-100 rounded-2xl mb-4 overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200">
      
      {/* 요약 섹션 (클릭 영역: 미니멀 오가닉 서체 정돈) */}
      <div
        className="flex justify-between items-center p-5 md:p-6 cursor-pointer hover:bg-zinc-50/50 transition-colors select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-base md:text-lg font-bold text-zinc-900 flex flex-col sm:flex-row sm:items-start sm:justify-start gap-1 sm:gap-3">
          <span>{title}</span>
          <span className="hidden sm:inline text-zinc-200 font-light">|</span>
          <span className="text-sm md:text-base font-light text-zinc-500">{description}</span>
        </div>
        <NutrientArrow isOpen={isOpen} />
      </div>

      {/* 상세 설명 섹션 (아코디언 판넬 영역) */}
      <div
        className={`transition-all duration-300 ease-in-out border-t border-zinc-100 ${
          isOpen ? "max-h-[1000px] p-6 opacity-100" : "max-h-0 p-0 opacity-0 pointer-events-none"
        } overflow-hidden bg-zinc-50/30`}
      >
        <div className="text-zinc-700 leading-relaxed whitespace-pre-wrap text-sm font-light space-y-5">
          
          {/* 본문 디테일 텍스트 */}
          <div>
            <p className="font-semibold text-zinc-400 mb-1.5 text-xs tracking-wider uppercase">상세 설명</p>
            <p className="text-zinc-600 leading-relaxed font-light">{details}</p>
          </div>
          
          {/* 증명 논문 링크 리스트 (오가닉 감성 리터칭) */}
          {links && links.length > 0 && (
            <div className="pt-4 border-t border-zinc-100">
              <p className="font-semibold text-zinc-400 mb-2 text-xs tracking-wider uppercase">참고 자료 및 증명 논문</p>
              <ul className="space-y-2">
                {links.map((link, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-zinc-300 text-xs select-none">📄</span>
                    <a 
                      href={link.url} 
                      className="text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:text-black hover:decoration-black font-medium transition-colors text-xs md:text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
        </div>
      </div>
      
    </div>
  );
}