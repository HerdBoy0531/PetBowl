// app/layout.tsx
import "./globals.css";
import Navbar from "../components/organisms/Navbar";
import Footer from "@organisms/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      {/* min-h-screen과 flex flex-col을 통해 푸터를 바닥에 고정하고 본문 길이에 따라 스크롤 허용 [cite: 76, 400] */}
      <body className="
        min-h-screen flex flex-col
        bg-white text-black
        dark:bg-gray-900 dark:text-white
      ">
        <Navbar />

        {/* ✅ 핵심 수정: pt-28 (Navbar 높이 고려) 및 pb-20 (하단 여유 공간) 추가 
          flex-1을 유지하여 콘텐츠가 적어도 화면 전체 높이를 차지하게 함 [cite: 405]
        */}
        <main className="flex-1 transition-all">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}