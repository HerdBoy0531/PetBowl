// "use client";

// import { useRouter, useParams } from "next/navigation";
// import Button from "@atoms/Button";

// export default function RequestDetailPage() {
//   const router = useRouter();
//   const { id } = useParams();

//   // 실제로는 여기서 id를 이용해 API 데이터를 호출합니다.
//   const post = { title: "샘플 제목", content: "샘플 내용입니다.", date: "2025-05-12" };

//   return (
//     <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950 transition-colors">
//       <div className="max-w-3xl mx-auto p-8 border-4 border-black bg-white dark:bg-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
//         <h2 className="text-2xl font-black mb-4 dark:text-white">{post.title}</h2>
//         <p className="text-sm text-gray-500 mb-8 border-b-2 border-black pb-2">{post.date}</p>
        
//         <div className="min-h-[300px] text-lg dark:text-gray-300">
//           {post.content}
//         </div>

//         <div className="flex justify-end gap-4 mt-10">
//           <Button 
//             onClick={() => router.push("/request")}
//             className="bg-white text-black border-2 border-black px-6"
//           >
//             목록으로
//           </Button>
//           <Button 
//             onClick={() => router.push(`/request/${id}/update`)}
//             className="bg-yellow-400 text-black border-2 border-black px-6 font-bold"
//           >
//             수정하기
//           </Button>
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import { useRouter, useParams } from "next/navigation";
import Button from "@/components/atoms/Button"; // 우리가 바꾼 미니멀 오가닉 버튼 원자

export default function RequestDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  // 더미 데이터 구조 보존
  const post = { 
    title: "사료 성분 데이터 추가 요청드립니다.", 
    content: "안녕하세요, 이번에 새로 출시된 네추럴코어 오가닉 연어 라인 성분 분석 데이터가 누락되어 있는 것 같습니다. 비교 분석해서 급여하고 싶으니 빠른 추가 부탁드립니다!", 
    date: "2026-05-12" 
  };

  return (
    <div className="max-w-3xl mx-auto w-full animate-fade-in">
      {/* 투박한 테두리 및 섀도우 제거 -> rounded-3xl, 부드러운 shadow-sm 매칭 */}
      <div className="bg-white border border-zinc-100 p-6 md:p-10 rounded-3xl shadow-sm space-y-6">
        
        {/* 상단 타이틀 헤더 라인 */}
        <div className="border-b border-zinc-100 pb-4 space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">
            {post.title}
          </h2>
          <p className="text-xs text-zinc-400 font-light">{post.date}</p>
        </div>
        
        {/* 본문 에디터 텍스트 영역 */}
        <div className="min-h-[280px] text-sm md:text-base text-zinc-700 font-light leading-relaxed whitespace-pre-wrap pt-2">
          {post.content}
        </div>

        {/* 하단 제어 버튼 그룹 (오가닉 아토믹 단단 결합) */}
        <div className="flex justify-end gap-3 pt-6 border-t border-zinc-50">
          <Button 
            variant="outline"
            onClick={() => router.push("/request")}
            className="text-xs md:text-sm px-5 py-2.5"
          >
            목록으로
          </Button>
          <Button 
            variant="primary"
            onClick={() => router.push(`/request/${id}/update`)}
            className="text-xs md:text-sm px-5 py-2.5"
          >
            수정하기
          </Button>
        </div>

      </div>
    </div>
  );
}