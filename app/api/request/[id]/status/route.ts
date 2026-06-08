import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 보안 가드: 서버 세션을 열어 어드민 권한 확인
    const session = await getServerSession(authOptions);
    const user = session?.user as any;

    if (!session || user?.role !== "ADMIN") {
      return NextResponse.json({ error: "권한이 없는 요청입니다." }, { status: 403 });
    }

    // params 구조 분해 할당 전에 반드시 await를 걸어줍니다.
    const { id } = await params;
    const requestId = Number(id);

    // 변환된 ID가 올바른 숫자인지 검증
    if (isNaN(requestId)) {
      return NextResponse.json({ error: "유효하지 않은 게시글 ID 규격입니다." }, { status: 400 });
    }

    // 요청 바디 데이터 추출
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "상태 값이 누락되었습니다." }, { status: 400 });
    }

    // Prisma 가동: 무결해진 requestId로 상태값 스왑 수행
    const updatedRequest = await prisma.request.update({
      where: { id: requestId },
      data: { status: status }, 
    });

    return NextResponse.json({ success: true, status: updatedRequest.status });
  } catch (error) {
    console.error("어드민 상태 변경 API 파이프라인 크래시:", error);
    return NextResponse.json({ error: "서버 내부 런타임 에러 발생" }, { status: 500 });
  }
}