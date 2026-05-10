"use client";

import Link from "next/link";
import Button from "@atoms/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* 로고 영역 */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="font-black text-xl flex items-center gap-2 text-black dark:text-white group">
            <span className="text-2xl transition-transform group-hover:rotate-12">🥣</span> 
            <span className="tracking-tighter">PETBOWL</span>
          </Link>
        </div>

        {/* 중앙 메뉴 영역 */}
        <div className="hidden md:flex items-center gap-8 text-[14px] font-bold text-gray-500 dark:text-gray-400">
          {/* href를 /foods/search로 수정 */}
          <Link href="/foods/search" className="hover:text-black dark:hover:text-white transition-colors">
            사료 검색
          </Link>
          <Link href="/compare" className="hover:text-black dark:hover:text-white transition-colors">
            사료 비교
          </Link>
          <Link href="/nutrition" className="hover:text-black dark:hover:text-white transition-colors">
            영양성분
          </Link>
          <Link href="/request" className="hover:text-black dark:hover:text-white transition-colors">
            요청 사항
          </Link>
        </div>

        {/* 우측 로그인 영역 */}
        <div className="flex-1 flex justify-end">
          <Link href="/login">
            <Button 
              variant="outline" 
              className="px-4 py-1.5 text-xs border-gray-300 dark:border-gray-600 font-bold"
            >
              로그인
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
}