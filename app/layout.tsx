import "./globals.css";

import Script from "next/script";

import AuthContext from "@/components/providers/SessionProvider";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import GlobalCompareDock from "@/components/organisms/GlobalCompareDock";

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

          {/* 비교 바구니 */}
          <GlobalCompareDock />
        </AuthContext>

        {/* Microsoft clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x4xi8m6khb");
          `}
        </Script>

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DMFHN2YK9S"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DMFHN2YK9S');
          `}
        </Script>
      </body>
    </html>
  );
}