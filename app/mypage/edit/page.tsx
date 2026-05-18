"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EditProfileForm from "@/components/organisms/EditProfileForm"; // 유기체 임포트

export default function MyPageEdit() {
  const { data: session, update: updateSession, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="py-40 text-center text-zinc-400 text-sm animate-pulse">인증 상태 조회 중...</div>;
  }

  // 🔒 비로그인 유저 접근 통제 보안 가드
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const user = session?.user as any;
  const currentNickname = user?.nickname || user?.name || "";

  // 📡 진짜 데이터베이스에 수정을 때리는 실시간 비동기 핸들러
  const handleSaveProfile = async (newNickname: string) => {
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname: newNickname }),
    });

    if (!res.ok) throw new Error("프로필 갱신 API 서버 통신 실패");

    // 🔄 NextAuth 세션 내부 가드를 강제 업데이트하여 전역 네비바 동기화
    await updateSession({ nickname: newNickname });
    
    alert("집사 프로필 정보가 정상 수정되었습니다. 🥣");
    router.push("/mypage");
    router.refresh();
  };

  return (
    <div className="w-full max-w-md mx-auto py-16 px-4 animate-fade-in text-zinc-800 space-y-6">
      
      {/* 헤더 안내판 */}
      <header className="space-y-1 text-center">
        <h1 className="text-xl font-bold tracking-tight text-black">집사 프로필 수정</h1>
        <p className="text-xs text-zinc-400 font-light">
          PetBowl 안심 게시판과 비교 보드에서 사용할 집사 이름을 정돈합니다.
        </p>
      </header>

      {/* 💡 유기체 컴포넌트 배출 및 인터랙션 콜백 바인딩 */}
      <EditProfileForm 
        initialNickname={currentNickname}
        onSave={handleSaveProfile}
        onCancel={() => router.push("/mypage")}
      />

    </div>
  );
}