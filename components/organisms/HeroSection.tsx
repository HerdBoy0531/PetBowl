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

"use client";

import Button from "@/components/atoms/Button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative w-full h-[400px] md:h-[480px] bg-white rounded-3xl border border-zinc-100 shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300">
      {/* 미니멀 오가닉 포인트: 은은하고 따뜻한 자연의 톤으로 백그라운드 그라데이션 장식 */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-20px] left-[-20px] w-64 h-64 bg-amber-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-40px] right-[-40px] w-80 h-80 bg-zinc-100 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs bg-zinc-100 text-zinc-800 px-3 py-1.5 rounded-full font-bold tracking-wider uppercase">
            🌿 PetBowl Slide Guide
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight tracking-tight pt-2">
            슬라이드로 만나는<br />
            우리 아이 맞춤 건강 정보
          </h1>
        </div>
        
        <p className="max-w-md mx-auto text-zinc-500 font-light text-sm md:text-base leading-relaxed">
          반려동물의 건강을 위한 가장 쉬운 선택. 복잡한 성분 분석부터 맞춤형 사료 비교 서비스를 직관적으로 체험해보세요.
        </p>

        <div className="pt-4 flex justify-center">
          <Button 
            variant="primary" 
            onClick={() => router.push("/foods")}
            className="text-base px-8 py-3.5 shadow-md"
          >
            사료 보러가기
          </Button>
        </div>
      </div>

      {/* 캐러셀 인디케이터 (오가닉 스타일: 가볍고 정갈한 도트 디테일) */}
      <div className="absolute bottom-6 flex gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-black transition-all"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 hover:bg-zinc-400 transition-all cursor-pointer"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 hover:bg-zinc-400 transition-all cursor-pointer"></span>
      </div>
    </section>
  );
}