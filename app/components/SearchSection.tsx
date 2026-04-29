"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (!keyword.trim()) return;
    router.push(`/foods?search=${keyword}`);
  };

  return (
    <section className="
      py-16 flex flex-col items-center px-4
      bg-gray-50 dark:bg-gray-900
    ">
      {/* 제목 */}
      <h2 className="
        text-xl md:text-2xl font-semibold mb-6
        text-black dark:text-white
      ">
        원하는 사료 검색
      </h2>

      {/* 검색창 */}
      <div className="
        w-full max-w-xl flex rounded-xl overflow-hidden shadow-md
        border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-800
      ">
        <input
          type="text"
          placeholder="성분이 궁금한 사료를 입력해주세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="
            flex-1 px-4 py-3 outline-none
            bg-white dark:bg-gray-800
            text-black dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
          "
        />

        <button
          onClick={handleSearch}
          className="
            px-4
            bg-gray-100 dark:bg-gray-700
            hover:bg-gray-200 dark:hover:bg-gray-600
          "
        >
          🔍
        </button>
      </div>
    </section>
  );
}