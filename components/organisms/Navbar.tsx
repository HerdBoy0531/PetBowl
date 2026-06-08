"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";



import Button from "@/components/atoms/Button";

export default function Navbar() {
  const { data: session, status } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center">
        
        {/* 좌측 로고 */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="text-2xl md:text-2xl font-black text-black tracking-tight select-none">
            PetBowl
          </Link>
        </div>

        {/* 중앙 메뉴 */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-4 xl:gap-8 font-medium text-zinc-600">
          <Link href="/search" className="hover:text-black transition-colors">사료 검색</Link>
          <Link href="/compare" className="hover:text-black transition-colors">사료 비교</Link>
          <Link href="/nutrients" className="hover:text-black transition-colors">영양성분</Link>
          <Link href="/request" className="hover:text-black transition-colors">요청사항</Link>
        </div>

        {/* 우측 상태 영역 */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {status === "loading" ? (
            <div className="w-16 h-8 bg-zinc-100 animate-pulse rounded-xl" />
          ) : session ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/mypage" 
                className="text-sm text-zinc-600 font-medium hover:text-black transition-colors"
              >
                <span className="hidden sm:block">
                  <strong className="text-black">
                    {session.user?.nickname || session.user?.name}
                  </strong>{" "}
                  님
                </span>
              </Link>

              {session.user?.role === "ADMIN" && (
                <span className="text-[10px] bg-zinc-900 text-white px-2 py-0.5 rounded-md font-bold tracking-wider">
                  ADMIN
                </span>
              )}

            </div>
            

          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" className="text-sm px-4 py-2">로그인</Button>
              </Link>
            </div>
          )}
        </div>
        <button
          className="lg:hidden text-2xl font-bold"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <>
          {/* 왼쪽 회색 배경 */}
          <div
            className="fixed top-0 right-0 h-screen w-[50vw] max-w-[320px] bg-white z-[70] shadow-2xl"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* 오른쪽 메뉴 */}
          <aside
            className="fixed top-0 right-0 h-screen w-[50vw] max-w-[320px] bg-white z-70 shadow-2xl transition-transform duration-300"
          >
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <span className="text-xl font-black">MENU</span>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col p-5 gap-5 text-sm font-semibold text-zinc-800">
              <Link href="/search" onClick={() => setIsMenuOpen(false)}>
                사료 검색
              </Link>
              <Link href="/compare" onClick={() => setIsMenuOpen(false)}>
                사료 비교
              </Link>
              <Link href="/nutrients" onClick={() => setIsMenuOpen(false)}>
                영양성분
              </Link>
              <Link href="/request" onClick={() => setIsMenuOpen(false)}>
                요청사항
              </Link>

              {session ? (
                <Link
                  href="/mypage"
                  onClick={() => setIsMenuOpen(false)}
                >
                  마이페이지
                </Link>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  로그인
                </Link>
              )}
            </div>
          </aside>
        </>
      )}
    </nav>
  );
}