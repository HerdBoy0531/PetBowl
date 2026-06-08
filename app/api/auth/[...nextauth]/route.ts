import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // 새로 가공한 lib/auth 주소에서 바인딩

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };