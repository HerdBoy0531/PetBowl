"use client";

import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    tag: "🌿 PetBowl Slide 01",
    title: "슬라이드로 만나는\n우리 아이 맞춤 건강 정보",
    desc: "반려동물의 건강을 위한 가장 쉬운 선택. 복잡한 성분 분석부터 맞춤형 사료 비교 서비스를 직관적으로 체험해보세요.",
    button: "사료 보러가기",
    link: "/search",
  },
  {
    id: 2,
    tag: "🔍 PetBowl Slide 02",
    title: "성분 하나까지 꼼꼼하게\n건강한 식단 관리",
    desc: "우리 아이에게 꼭 맞는 영양성분을 확인하고, 믿을 수 있는 사료만 선별하여 제공하는 프리미엄 서비스입니다.",
    button: "사료 비교하기",
    link: "/compare",
  },
  {
    id: 3,
    tag: "⚖️ PetBowl Slide 03",
    title: "사료 비교부터 분석까지\n한번에 해결하세요",
    desc: "여러 사료를 한 번에 비교하고 성분을 분석하여, 반려견과 반려묘를 위한 최상의 건강 식단을 계획하세요.",
    button: "영양성분 정보 확인하기",
    link: "/nutrients",
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이딩 로직
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[430px] md:h-[480px] bg-zinc-50/50 rounded-3xl border border-zinc-100 flex items-center justify-center overflow-hidden transition-all duration-300">
      
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-20px] left-[-20px] w-64 h-64 bg-amber-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-40px] right-[-40px] w-80 h-80 bg-zinc-200/50 rounded-full blur-3xl"></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentIndex].id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative z-10 text-center px-6 max-w-2xl space-y-6"
        >
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase font-bold">
              {slides[currentIndex].tag}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-tight tracking-tight whitespace-pre-line">
              {slides[currentIndex].title}
            </h1>
          </div>
          
          <p className="max-w-md mx-auto text-zinc-500 font-light text-sm md:text-base leading-relaxed">
            {slides[currentIndex].desc}
          </p>

          <div className="pt-4 pb-8 md:pb-0 flex justify-center">
            <Button 
              variant="primary" 
              onClick={() => router.push(slides[currentIndex].link)}
              className="px-6 md:px-8 py-3 text-sm md:text-base bg-zinc-900 text-white"
            >
              {slides[currentIndex].button}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 인디케이터 (클릭 가능) */}
      <div className="absolute bottom-4 md:bottom-8 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? "bg-zinc-900 w-8 h-2.5" 
                : "bg-zinc-300 w-2.5 h-2.5 hover:bg-zinc-400"
              }
            `}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </section>
  );
}