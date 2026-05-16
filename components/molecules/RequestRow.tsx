// "use client";

// import { useRouter } from "next/navigation";

// interface RequestRowProps {
//   no: number;
//   content: string;
//   date: string;
// }

// export default function RequestRow({ no, content, date }: RequestRowProps) {
//   const router = useRouter();

//   return (
//     <tr 
//       onClick={() => router.push(`/request/${no}`)} // ✅ 행 클릭 시 상세 페이지 이동
//       className="border-b-2 border-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
//     >
//       <td className="border-r-2 border-black dark:border-gray-700 p-4 text-center">{no}</td>
//       <td className="border-r-2 border-black dark:border-gray-700 p-4 text-left">{content}</td>
//       <td className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">{date}</td>
//     </tr>
//   );
// }


"use client";

import { useRouter } from "next/navigation";

interface RequestRowProps {
  no: number;
  content: string;
  date: string;
}

export default function RequestRow({ no, content, date }: RequestRowProps) {
  const router = useRouter();

  return (
    <tr 
      onClick={() => router.push(`/request/${no}`)} // ✅ 행 클릭 시 상세 페이지 이동 로직 보존
      // 미니멀 오가닉 포인트: 투박한 검정 테두리를 지우고 부드러운 가로선(border-zinc-100) 및 은은한 호버 매칭
      className="border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50/50 cursor-pointer transition-colors group"
    >
      {/* 1. 번호 영역: 답답한 border-r-2 제거, 차분한 모노톤 숫자로 세련미 가미 */}
      <td className="p-4 text-center text-zinc-400 font-mono text-xs md:text-sm w-20">
        {no}
      </td>
      
      {/* 2. 내용 영역: 호버 시 글자색이 진해지며 부드러운 zinc 밑줄이 생기는 감성 디테일 */}
      <td className="p-4 text-left text-zinc-800 font-medium text-xs md:text-sm group-hover:text-black group-hover:underline decoration-zinc-300 underline-offset-4 transition-colors">
        {content}
      </td>
      
      {/* 3. 작성일자 영역: 헤더 라인에 맞춰 정갈하게 우측 정렬(text-right) 배치 */}
      <td className="p-4 text-right text-zinc-400 font-light text-xs md:text-sm w-40">
        {date}
      </td>
    </tr>
  );
}