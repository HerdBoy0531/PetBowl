// "use client";

// import Link from "next/link";
// import Button from "@atoms/Button";

// export default function Navbar() {
//   return (
//     <nav className="fixed top-0 w-full z-50 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-gray-200 dark:border-gray-700 transition-colors">
//       <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
//         {/* 로고 영역 */}
//         <div className="flex-1 flex justify-start">
//           <Link href="/" className="font-black text-xl flex items-center gap-2 text-black dark:text-white group">
//             <span className="text-2xl transition-transform group-hover:rotate-12">🥣</span> 
//             <span className="tracking-tighter">PETBOWL</span>
//           </Link>
//         </div>

//         {/* 중앙 메뉴 영역 */}
//         <div className="hidden md:flex items-center gap-8 text-[14px] font-bold text-gray-500 dark:text-gray-400">
//           {/* href를 /foods/search로 수정 */}
//           <Link href="/search" className="hover:text-black dark:hover:text-white transition-colors">
//             사료 검색
//           </Link>
//           <Link href="/compare" className="hover:text-black dark:hover:text-white transition-colors">
//             사료 비교
//           </Link>
//           <Link href="/nutrient" className="hover:text-black dark:hover:text-white transition-colors">
//             영양성분
//           </Link>
//           <Link href="/request" className="hover:text-black dark:hover:text-white transition-colors">
//             요청 사항
//           </Link>
//         </div>

//         {/* 우측 로그인 영역 */}
//         <div className="flex-1 flex justify-end">
//           <Link href="/login">
//             <Button 
//               variant="outline" 
//               className="px-4 py-1.5 text-xs border-gray-300 dark:border-gray-600 font-bold"
//             >
//               로그인
//             </Button>
//           </Link>
//         </div>

//       </div>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/atoms/Button";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* 1. 로고 영역 */}
        <Link href="/" className="text-2xl font-black text-black tracking-tight select-none">
          PetBowl
        </Link>

        {/* 2. 중앙 메뉴 영역 (미니멀 오가닉 수치 동기화) */}
        <div className="hidden md:flex items-center gap-8 font-medium text-zinc-600">
          <Link href="/search" className="hover:text-black transition-colors">
            사료 검색
          </Link>
          <Link href="/compare" className="hover:text-black transition-colors">
            사료 비교
          </Link>
          {/* 💡 [보너스 케어] 404 방지를 위해 기존 /nutrient 뒤에 's'를 붙여 연동을 마감합니다. */}
          <Link href="/nutrients" className="hover:text-black transition-colors">
            영양성분
          </Link>
          <Link href="/request" className="hover:text-black transition-colors">
            요청사항
          </Link>
        </div>

        {/* 3. 우측 인증/유저 상태 영역 */}
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="w-16 h-8 bg-zinc-100 animate-pulse rounded-xl" />
          ) : session ? (
            // A. 로그인 완료 상태
            <div className="flex items-center gap-3 md:gap-4">
              
              {/* 💡 [교정 1] 유저 이름을 클릭하면 마이페이지로 즉시 라우팅 (오가닉 호버 언더라인 이식) */}
              <Link 
                href="/mypage" 
                className="text-sm text-zinc-600 font-medium group transition-colors shrink-0"
              >
                <strong className="text-black font-semibold group-hover:text-zinc-600 group-hover:underline underline-offset-4 transition-all">
                  {session.user?.nickname || session.user?.name}
                </strong> 집사님
              </Link>
              
              {/* 관리자(ADMIN) 배지 */}
              {session.user?.role === "ADMIN" && (
                <span className="text-[10px] bg-zinc-900 text-white px-2 py-0.5 rounded-md font-bold tracking-wider select-none shrink-0">
                  ADMIN
                </span>
              )}
              
              {/* 💡 [교정 2] 로그아웃 버튼의 패딩과 폰트를 한 단계 낮춰 시각적 조화를 성취합니다. */}
              <Button 
                variant="outline" 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-3 py-1.5 text-sm rounded-xl font-normal border-zinc-200 text-zinc-500 hover:text-black hover:border-zinc-400 shrink-0 shadow-none"
              >
                로그아웃
              </Button>
            </div>
          ) : (
            // B. 로그아웃 상태
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline">로그인</Button>
              </Link>
              <Link href="/register" className="hidden sm:inline-block">
                <Button variant="primary">회원가입</Button>
              </Link>
            </div>
          )}
        </div>
        
      </div>
    </nav>
  );
}