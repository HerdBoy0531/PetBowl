import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      nickname: string | null;
    } & DefaultSession["user"];
  }

  // 이 부분이 안정 버전 어댑터와 DB 유저 모델을 연결해줍니다.
  interface User {
    id: string;
    role: string;
    nickname: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    nickname: string | null;
  }
}