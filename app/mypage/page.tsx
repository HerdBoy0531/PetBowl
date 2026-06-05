"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import MyProfileCard from "@/components/molecules/MyProfileCard"; // 분자 수입
import MyMenuCard from "@/components/molecules/MyMenuCard";       // 분자 수입
import Button from "@/components/atoms/Button";

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="py-40 text-center text-zinc-400 text-sm animate-pulse">보호자님 세션 스캔 중...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="py-40 text-center space-y-4">
        <p className="text-zinc-500 font-light text-sm">로그인이 필요한 안전 구역입니다.</p>
        <Button variant="primary" onClick={() => router.push("/login")} className="px-6 py-2 rounded-xl text-xs">
          로그인하러 가기
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6 space-y-8 animate-fade-in">
      
      {/* 1. 상단 프로필 유닛 배출 (분자) */}
      <MyProfileCard 
        user={session?.user as any} 
        onSignOut={() => signOut({ callbackUrl: "/" })} 
      />

      {/* 2. 하단 메뉴 보드 그리드 배출 (분자 재사용) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <MyMenuCard 
          href="/request?filter=mine" // 💡 단순히 뒤에 ?filter=mine 만 붙여주면 끝!
          emoji="📋"
          title="내가 접수한 요청사항"
          description="추가를 요청한 사료나 서비스 건의 내역 및 어드민 처리 현황을 실시간 스캔합니다."
        />
        <MyMenuCard 
          href="/compare"
          emoji="🥣"
          title="마이 비교 보드"
          description="현재 전역 장바구니 슬롯에 세팅된 대조 사료들의 정밀 매트릭스 보드로 즉시 이동합니다."
        />
      </div>

    </div>
  );
}