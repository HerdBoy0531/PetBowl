"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      router.push("/"); // 로그인 성공 시 메인으로
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black mb-2">PetBowl</h1>
          <p className="text-gray-500">다시 오신 것을 환영합니다!</p>
        </div>

        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-black"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-black"
          />
          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold shadow-md hover:bg-gray-800 transition-all mt-2">
            로그인
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-400 font-light">또는 구글로 계속하기</span>
          </div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-white text-black border border-gray-200 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
        >

          <img src="/google-logo.svg" alt="Google" className="w-6 h-6 object-contain" />
          Google로 시작하기
        </button>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            아직 회원이 아니신가요?{" "}
            <Link href="/register" className="text-black font-bold underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}