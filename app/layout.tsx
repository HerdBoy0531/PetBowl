// // app/layout.tsx
// import "./globals.css";
// import Navbar from "../components/organisms/Navbar";
// import Footer from "@organisms/Footer";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="ko">
//       <head>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               (function() {
//                 const theme = localStorage.getItem('theme');
//                 if (theme === 'dark') {
//                   document.documentElement.classList.add('dark');
//                 } else if (theme === 'light') {
//                   document.documentElement.classList.remove('dark');
//                 } else {
//                   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//                     document.documentElement.classList.add('dark');
//                   }
//                 }
//               })();
//             `,
//           }}
//         />
//       </head>
//       {/* min-h-screen과 flex flex-col을 통해 푸터를 바닥에 고정하고 본문 길이에 따라 스크롤 허용 [cite: 76, 400] */}
//       <body className="
//         min-h-screen flex flex-col
//         bg-white text-black
//         dark:bg-gray-900 dark:text-white
//       ">
//         <Navbar />

//         {/* ✅ 핵심 수정: pt-28 (Navbar 높이 고려) 및 pb-20 (하단 여유 공간) 추가 
//           flex-1을 유지하여 콘텐츠가 적어도 화면 전체 높이를 차지하게 함 [cite: 405]
//         */}
//         <main className="flex-1 transition-all">
//           {children}
//         </main>

//         <Footer />
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import AuthContext from "@/components/providers/SessionProvider";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

export const metadata = {
  title: "PetBowl - 반려동물 건강 사료 가이드",
  description: "우리 아이에게 딱 맞는 건강한 사료 정보를 비교하고 분석해보세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/* 미니멀 오가닉 포인트: 다크모드 제거(dark: 제거), 배경색 고정, 기본 글자색 검정 */}
      <body className="bg-[#FDFCF0] text-black min-h-screen flex flex-col antialiased">
        <AuthContext>
          {/* 전역 상단 바 */}
          <Navbar />
          
          {/* 메인 콘텐츠 영역: Navbar와 겹치지 않도록 여백(pt-24) 확보 */}
          <main className="flex-grow pt-24 max-w-6xl w-full mx-auto px-4 pb-20">
            {children}
          </main>
          
          {/* 전역 하단 바 */}
          <Footer />
        </AuthContext>
      </body>
    </html>
  );
}