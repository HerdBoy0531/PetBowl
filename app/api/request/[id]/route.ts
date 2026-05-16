// app/api/request/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// 🔍 [GET] 특정 요청글 상세 조회
export async function GET(req: Request, { params }: RouteParams) {
  const { id } = await params;
  const requestId = Number(id);

  if (isNaN(requestId)) {
    return NextResponse.json({ message: "올바르지 않은 접근입니다." }, { status: 400 });
  }

  try {
    const requestPost = await prisma.request.findUnique({
      where: { id: requestId },
      include: {
        user: { select: { nickname: true } },
      },
    });

    if (!requestPost) {
      return NextResponse.json({ message: "존재하지 않는 게시글입니다." }, { status: 404 });
    }

    return NextResponse.json({
      id: requestPost.id,
      title: requestPost.title,
      content: requestPost.content,
      status: requestPost.status,
      adminNote: requestPost.adminNote,
      userId: requestPost.userId, // 프론트엔드에서 수정/삭제 버튼 활성화 판단용
      user: requestPost.user?.nickname || "알 수 없는 사용자",
      date: requestPost.createdAt.toISOString().split("T")[0],
    });
  } catch (error) {
    console.error("Detail GET Error:", error);
    return NextResponse.json({ message: "상세 내용을 불러오지 못했습니다." }, { status: 500 });
  }
}

// 🔄 [PATCH] 요청글 수정 (본인 확인 방어막 탑재)
export async function PATCH(req: Request, { params }: RouteParams) {
  const { id } = await params;
  const requestId = Number(id);

  try {
    const session = await getServerSession(authOptions);
    console.log(session?.user?.id);
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "권한이 없습니다." }, { status: 401 });
    }

    // DB에서 원래 글의 작성자 ID 확인
    const originalPost = await prisma.request.findUnique({
      where: { id: requestId },
      select: { userId: true },
    });

    if (!originalPost) {
      return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    // 🔒 보안 검증 2: 원본 글의 userId와 현재 로그인한 유저의 id 대조 (F12 우회 돌파 무력화)
    if (originalPost.userId !== session.user.id) {
      return NextResponse.json({ message: "본인이 작성한 글만 수정할 수 있습니다." }, { status: 403 });
    }

    const body = await req.json();
    const { content } = body; // 제목은 수정 불가 정책이므로 content만 받음

    const updatedPost = await prisma.request.update({
      where: { id: requestId },
      data: { content },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Request PATCH Error:", error);
    return NextResponse.json({ message: "수정 중 에러가 발생했습니다." }, { status: 500 });
  }
}

// ❌ [DELETE] 요청글 삭제 (본인 또는 관리자만 가능)
export async function DELETE(req: Request, { params }: RouteParams) {
  const { id } = await params;
  const requestId = Number(id);

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "권한이 없습니다." }, { status: 401 });
    }

    const targetPost = await prisma.request.findUnique({
      where: { id: requestId },
      select: { userId: true },
    });

    if (!targetPost) {
      return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    // 🔒 보안 검증 3: 글쓴이 본인이거나, 어제 확장해둔 계정 권한이 ADMIN인 경우만 통과
    const isAuthor = targetPost.userId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";

    if (!isAuthor && !isAdmin) {
      return NextResponse.json({ message: "삭제 권한이 없습니다." }, { status: 403 });
    }

    await prisma.request.delete({
      where: { id: requestId },
    });

    return NextResponse.json({ message: "성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("Request DELETE Error:", error);
    return NextResponse.json({ message: "삭제 중 에러가 발생했습니다." }, { status: 500 });
  }
}