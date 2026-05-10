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
    <div className="border border-black dark:border-gray-700 mb-4 overflow-hidden bg-white dark:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
      {/* 요약 섹션 (클릭 영역) */}
      <div
        className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-lg font-bold text-black dark:text-white">
          {title} : <span className="font-normal ml-2">{description}</span>
        </div>
        <NutrientArrow isOpen={isOpen} />
      </div>

      {/* 상세 설명 섹션 (아코디언) */}
      <div
        className={`transition-all duration-300 ease-in-out border-t border-black dark:border-gray-700 ${
          isOpen ? "max-h-[500px] p-6 opacity-100" : "max-h-0 p-0 opacity-0"
        } overflow-hidden bg-gray-50 dark:bg-gray-800/50`}
      >
        <div className="text-black dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
          <p className="font-bold mb-2">상세 설명</p>
          <p className="mb-4">{details}</p>
          
          {links && links.length > 0 && (
            <div className="mt-4">
              <p className="font-bold mb-2">증명 논문들(링크)</p>
              <ul className="list-disc ml-5 space-y-1">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url} className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
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