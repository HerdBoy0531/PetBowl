"use client";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="
      w-full h-[300px] md:h-[400px]
      bg-gray-100 dark:bg-gray-900
      flex flex-col justify-center items-center text-center px-4
      text-black dark:text-white
    ">
      {/* 타이틀 */}
      <h1 className="text-2xl md:text-4xl font-bold mb-4">
        우리 강아지에게 맞는 사료 찾기
      </h1>

      {/* 설명 */}
      <p className="
        mb-6
        text-gray-600 dark:text-gray-300
      ">
        성분 기반으로 비교하고 더 좋은 선택을 하세요
      </p>

      {/* 버튼 */}
      <button
        onClick={() => router.push("/foods")}
        className="
          px-6 py-2 rounded-lg font-medium
          bg-black text-white
          hover:bg-gray-800
          dark:bg-white dark:text-black
          dark:hover:bg-gray-200
        "
      >
        사료 보러가기
      </button>
    </section>
  );
}