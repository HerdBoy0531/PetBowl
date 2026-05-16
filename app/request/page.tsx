// import RequestBoard from "@organisms/RequestBoard";

// export default function RequestPage() {
//   return (
//     <main className="min-h-screen pt-28 pb-20 bg-white dark:bg-gray-900 transition-colors">
//       <RequestBoard />
//     </main>
//   );
// }

import RequestBoard from "@/components/organisms/RequestBoard";

export default function RequestPage() {
  return (
    // 미니멀 오가닉 포인트: layout.tsx와의 결합도를 높이기 위해 중복되는 패딩/배경 래퍼 제거
    <div className="animate-fade-in w-full">
      <RequestBoard />
    </div>
  );
}