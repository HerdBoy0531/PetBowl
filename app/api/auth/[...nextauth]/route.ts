import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; 
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // 1. 구글 로그인 설정
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // 2. 일반 이메일/비밀번호 로그인 설정
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("존재하지 않는 계정입니다.");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        return user;
      },
    }),
  ],
  // 💡 중요: 세션에 유저의 role과 nickname을 포함시키는 설정
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // DB의 데이터를 세션에 담아 프론트에서 쓸 수 있게 합니다.
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email! },
        });
        if (dbUser) {
          session.user.role = dbUser.role;
          session.user.nickname = dbUser.nickname;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // 우리가 만들 커스텀 로그인 페이지 경로
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };