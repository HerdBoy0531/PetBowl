// "use client";

// import Button from "@atoms/Button";
// import { useRouter } from "next/navigation";

// export default function HeroSection() {
//   const router = useRouter();

//   return (
//     <section className="relative w-full h-[400px] md:h-[500px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden transition-colors">
//       {/* 캐러셀 배경 느낌의 장식 (추후 이미지/슬라이드로 교체 가능) */}
//       <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
//         <div className="absolute top-10 left-10 w-32 h-32 bg-black dark:bg-white rounded-full blur-3xl"></div>
//         <div className="absolute bottom-10 right-10 w-48 h-48 bg-gray-400 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10 text-center px-4">
//         <h1 className="text-3xl md:text-5xl font-black mb-6 text-black dark:text-white leading-tight">
//           PETBOWL 서비스 내용<br />
//           <span className="text-gray-500 dark:text-gray-400 text-2xl md:text-3xl font-bold">
//             슬라이드로 만나는 우리 아이 맞춤 정보
//           </span>
//         </h1>
        
//         <p className="max-w-xl mx-auto mb-10 text-gray-600 dark:text-gray-400 font-medium">
//           강아지의 건강을 위한 가장 쉬운 선택, 성분 기반 사료 비교 서비스를 이용해보세요.
//         </p>

//         <Button 
//           variant="primary" 
//           onClick={() => router.push("/foods")}
//           className="text-lg px-10 py-4 shadow-lg"
//         >
//           사료 보러가기
//         </Button>
//       </div>

//       {/* 캐러셀 인디케이터 (와이어프레임 느낌용) */}
//       <div className="absolute bottom-6 flex gap-2">
//         <span className="w-3 h-3 rounded-full bg-black dark:bg-white"></span>
//         <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></span>
//         <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></span>
//       </div>
//     </section>
//   );
// }




// "use client";

// import Button from "@/components/atoms/Button";
// import { useRouter } from "next/navigation";

// export default function HeroSection() {
//   const router = useRouter();

//   return (
//     <section className="relative w-full h-[400px] md:h-[480px] bg-white rounded-3xl border border-zinc-100 shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300">
//       {/* 미니멀 오가닉 포인트: 은은하고 따뜻한 자연의 톤으로 백그라운드 그라데이션 장식 */}
//       <div className="absolute inset-0 opacity-40 pointer-events-none">
//         <div className="absolute top-[-20px] left-[-20px] w-64 h-64 bg-amber-100/40 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-[-40px] right-[-40px] w-80 h-80 bg-zinc-100 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10 text-center px-6 max-w-2xl space-y-6">
//         <div className="space-y-2">
//           <span className="text-xs bg-zinc-100 text-zinc-800 px-3 py-1.5 rounded-full font-bold tracking-wider uppercase">
//             🌿 PetBowl Slide Guide
//           </span>
//           <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight tracking-tight pt-2">
//             슬라이드로 만나는<br />
//             우리 아이 맞춤 건강 정보
//           </h1>
//         </div>
        
//         <p className="max-w-md mx-auto text-zinc-500 font-light text-sm md:text-base leading-relaxed">
//           반려동물의 건강을 위한 가장 쉬운 선택. 복잡한 성분 분석부터 맞춤형 사료 비교 서비스를 직관적으로 체험해보세요.
//         </p>

//         <div className="pt-4 flex justify-center">
//           <Button 
//             variant="primary" 
//             onClick={() => router.push("/search")}
//             className="text-base px-8 py-3.5 shadow-md"
//           >
//             사료 보러가기
//           </Button>
//         </div>
//       </div>

//       {/* 캐러셀 인디케이터 (오가닉 스타일: 가볍고 정갈한 도트 디테일) */}
//       <div className="absolute bottom-6 flex gap-2">
//         <span className="w-2.5 h-2.5 rounded-full bg-black transition-all"></span>
//         <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 hover:bg-zinc-400 transition-all cursor-pointer"></span>
//         <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 hover:bg-zinc-400 transition-all cursor-pointer"></span>
//       </div>
//     </section>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// 1. 하드코딩 슬라이드 데이터
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

  // 자동 슬라이딩 로직 (5초마다)
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

      {/* AnimatePresence로 슬라이드 전환 애니메이션 적용 */}
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
            onClick={() => setCurrentIndex(index)} // 💡 클릭 시 해당 슬라이드 인덱스로 변경
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