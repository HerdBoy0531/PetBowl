import { Suspense } from "react";
import RequestBoard from "@/components/organisms/RequestBoard";

export default function RequestPage() {
  return (
    // layout.tsx와의 결합도를 높이기 위해 중복되는 패딩/배경 래퍼 제거
    <div className="animate-fade-in w-full">
      
      {/* useSearchParams()의 CSR Bailout 현상을 완벽히 방어하는 무적의 서스펜스 배리어 */}
      <Suspense fallback={
        <div className="py-20 text-center text-sm text-zinc-400 font-light animate-pulse">
          요청사항 게시판 엔진을 불러오는 중입니다...
        </div>
      }>
        <RequestBoard />
      </Suspense>

    </div>
  );
}