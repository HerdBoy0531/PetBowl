export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 border-t bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* 이메일 정보 */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-black dark:text-white mb-1">
            E-mail : herdboy0531@gmail.com
          </p>
        </div>

        {/* 저작권 문구 (와이어프레임과 동일) */}
        <p className="text-xs tracking-widest text-gray-500 dark:text-gray-400 font-medium uppercase">
          COPYRIGHT {currentYear} BY PETBOWL ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}