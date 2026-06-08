"use client";

import { useState } from "react";
import NutrientArrow from "@atoms/NutrientArrow";

interface NutrientItemProps {
  title: React.ReactNode;
  description: string;
  details: string;
  links?: { label: string; url: string }[];
}

export default function NutrientItem({ title, description, details, links }: NutrientItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-zinc-100 rounded-2xl mb-4 overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200 w-full">
      
      {/* 요약 섹션 */}
      <div
        className="flex justify-between items-center p-5 md:p-6 cursor-pointer hover:bg-zinc-50/50 transition-colors select-none gap-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 flex-1 min-w-0">
          
          {/* 이름 구획 (고정 너비 기둥) */}
          <div className="text-base md:text-lg font-bold text-zinc-900 sm:w-44 md:w-48 flex-shrink-0">
            {title}
          </div>
          
          {/* 요약 설명 구획 (세로 중앙 배치 완료) */}
          <div className="flex-1 min-w-0">
            <p className="text-sm md:text-base font-light text-zinc-500 leading-relaxed">
              {description}
            </p>
          </div>

        </div>

        {/* 우측 화살표 */}
        <NutrientArrow isOpen={isOpen} />
      </div>

      {/* 상세 설명 섹션 (아코디언 판넬 영역) */}
      <div
        className={`transition-all duration-300 ease-in-out border-t border-zinc-100 ${
          isOpen ? "max-h-[1200px] p-6 opacity-100" : "max-h-0 p-0 opacity-0 pointer-events-none"
        } overflow-hidden bg-zinc-50/30`}
      >
        <div className="text-zinc-700 leading-relaxed whitespace-pre-wrap text-sm font-light space-y-6">
          
          {/* 본문 디테일 텍스트 */}
          <div>
            <p className="font-semibold text-zinc-400 mb-2 text-xs tracking-wider uppercase">상세 설명 및 가이드라인</p>
            <p className="text-zinc-600 leading-relaxed font-light whitespace-pre-line">{details}</p>
          </div>
          
          {links && links.length > 0 && (
            <div className="pt-5 border-t border-t-zinc-200/60">
              <p className="font-semibold text-zinc-400 mb-3 text-xs tracking-wider uppercase">참고 자료 및 증명 논문 (5개 출처)</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
                {links.map((link, idx) => (
                  <li key={idx} className="flex items-start gap-2 min-w-0">
                    <span className="text-zinc-300 text-xs select-none pt-0.5">📄</span>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-700 underline decoration-zinc-200 underline-offset-4 hover:text-black hover:decoration-black font-medium transition-colors text-xs truncate block"
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