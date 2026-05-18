import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // 프로젝트의 NextAuth 설정 경로에 맞춰 정돈해 주세요.
import { prisma } from "@/lib/prisma"; // 프로젝트 공용 Prisma 클라이언트 수입

export async function PUT(request: Request) {
  try {
    // 🔒 1. 보안 가드: 서버 단에서 현재 세션 무결성 검증
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "인증되지 않은 유저 요청" }, { status: 401 });
    }

    // 🔬 2. 페이로드 파싱
    const body = await request.json();
    const { nickname } = body;

    if (!nickname || !nickname.trim()) {
      return NextResponse.json({ error: "유효하지 않은 데이터 규격" }, { status: 400 });
    }

    // 🔄 3. Prisma 가동: 유저 고유 이메일 키를 기반으로 닉네임 교체 명령 가동!
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { nickname: nickname.trim() },
    });

    return NextResponse.json({ success: true, user: { nickname: updatedUser.nickname } });
  } catch (error) {
    console.error("백엔드 프로필 갱신 API 파이프라인 크래시:", error);
    return NextResponse.json({ error: "서버 내부 런타임 오류" }, { status: 500 });
  }
}