"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import InfoModal from "@/components/molecules/InfoModal";

export default function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    nickname: "",
    password: "",
  });

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState("");
  const [infoModalMessage, setInfoModalMessage] = useState("");
  const [infoModalType, setInfoModalType] = useState<"success" | "error" | "warning">("success");
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {

      setInfoModalTitle("회원가입 완료");

      setInfoModalMessage(
        "회원가입이 완료되었습니다."
      );

      setInfoModalType("success");

      setRedirectPath("/login");

      setInfoModalOpen(true);
    } else {
      const error = await response.text();
      setInfoModalTitle("회원가입 실패");

      setInfoModalMessage(
        `${error}`
      );

      setInfoModalType("success");

      setInfoModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black mb-2">PetBowl</h1>
          <p className="text-gray-500">반려동물을 위한 건강한 시작, 함께해요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">이메일</label>
            <input
              type="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-black outline-none transition-all text-black"
              placeholder="example@petbowl.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">닉네임</label>
            <input
              type="text"
              required
              value={data.nickname}
              onChange={(e) => setData({ ...data, nickname: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-black outline-none transition-all text-black"
              placeholder="멋진 보호자님"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">비밀번호</label>
            <input
              type="password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-black outline-none transition-all text-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors shadow-md"
          >
            가입하기
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-black font-bold underline">
              로그인하기
            </Link>
          </p>
        </div>
      </div>

      <InfoModal
        isOpen={infoModalOpen}
        title={infoModalTitle}
        description={infoModalMessage}
        type={infoModalType}
        onConfirm={() => {
          if (redirectPath) {
            router.push(redirectPath);
          }

          setInfoModalOpen(false);
        }}
      />
    </div>
  );
}