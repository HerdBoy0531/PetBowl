import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, nickname, password } = body;

    // 1. 필수 값 확인
    if (!email || !nickname || !password) {
      return new NextResponse("필수 정보가 누락되었습니다.", { status: 400 });
    }

    // 2. 이메일 중복 체크
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      return new NextResponse("이미 사용 중인 이메일입니다.", { status: 409 });
    }

    // 3. 닉네임 중복 체크
    const existingNickname = await prisma.user.findUnique({
      where: { nickname },
    });
    if (existingNickname) {
      return new NextResponse("이미 사용 중인 닉네임입니다.", { status: 409 });
    }

    // 4. 비밀번호 암호화 (보안강화)
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. 유저 생성
    const user = await prisma.user.create({
      data: {
        email,
        nickname,
        password: hashedPassword,
        role: "USER", // 기본 권한
      },
    });

    return NextResponse.json({
      message: "회원가입이 완료되었습니다.",
      user: { email: user.email, nickname: user.nickname },
    });
  } catch (error) {
    console.error("REGISTER_ERROR", error);
    return new NextResponse("서버 오류가 발생했습니다.", { status: 500 });
  }
}