"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <nav className="
      w-full px-6 py-4 flex justify-between items-center
      border-b
      bg-white dark:bg-gray-900
      border-gray-200 dark:border-gray-700
    ">
      {/* 로고 */}
      <Link href="/" className="font-bold text-lg">
        🐶 PETBOWL
      </Link>

      {/* 메뉴 */}
      <div className="flex items-center gap-6 text-sm">
        <Link href="/foods">사료 검색</Link>
        <Link href="/compare">사료 비교</Link>

        {/* 다크모드 토글 */}
        <button
          onClick={toggleDark}
          className="px-3 py-1 border rounded-md text-xs"
        >
          {dark ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}