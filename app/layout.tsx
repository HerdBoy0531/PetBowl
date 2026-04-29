import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
                    // 초기값: 시스템 테마 따라감
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    }
                  }
                })();
              `,
            }}
          />
        </head>
      <body className="
        min-h-screen flex flex-col
        bg-white text-black
        dark:bg-gray-900 dark:text-white
      ">
        <Navbar />

        {/* 핵심 */}
        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}