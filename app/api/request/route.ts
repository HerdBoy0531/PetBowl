import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// [GET] 요청사항 전체 목록 조회
export async function GET(req: Request) {
  try {
    const requests = await prisma.request.findMany({
      orderBy: {
        createdAt: "desc", // 최신글 순 정렬
      },
      include: {
        user: {
          select: {
            nickname: true, // 작성자 닉네임만 선택 조인
            email: true,
          },
        },
      },
    });

    // 프론트엔드 오가닉 카드 컴포넌트에 맞는 규격으로 매핑 변환
    const result = requests.map((req) => ({
      id: req.id,
      title: req.title,
      content: req.content,
      status: req.status,

      nickname: req.user?.nickname || "탈퇴한 회원",
      email: req.user?.email || "",

      date: req.createdAt.toISOString().split("T")[0],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Board List GET Error:", error);
    return NextResponse.json({ message: "게시글 목록을 불러오지 못했습니다." }, { status: 500 });
  }
}

// [POST] 새로운 요청사항 등록 (로그인 회원 전용)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // 비로그인 유저 차단
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "로그인이 필요한 서비스입니다." }, { status: 401 });
    }

    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ message: "제목과 내용을 모두 입력해 주세요." }, { status: 400 });
    }

    const newRequest = await prisma.request.create({
      data: {
        title,
        content,
        userId: session.user.id,
      },
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error("Board POST Error:", error);
    return NextResponse.json({ message: "글 등록 중 서버 에러가 발생했습니다." }, { status: 500 });
  }
}