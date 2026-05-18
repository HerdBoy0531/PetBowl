"use client";

import Link from "next/link";

interface MyProfileCardProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    nickname?: string;
    role?: string;
  };
  onSignOut: () => void;
}

export default function MyProfileCard({ user, onSignOut }: MyProfileCardProps) {
  return (
    <div className="bg-white border border-zinc-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        {/* 유저 아바타 서클 */}
        <div className="w-20 h-20 rounded-full bg-zinc-50 border border-zinc-200/60 overflow-hidden flex items-center justify-center text-2xl shadow-inner relative">
          {user?.image ? (
            <img src={user.image} alt="프로필" className="w-full h-full object-cover" />
          ) : (
            <span className="select-none">🥣</span>
          )}
        </div>
        
        {/* 정보 텍스트 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold text-black tracking-tight">
              {user?.nickname || user?.name || "안심집사"}
            </h2>
            {/* 권한 배지 */}
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider ${
              user?.role === "ADMIN" 
                ? "bg-red-50 text-red-600 border border-red-100" 
                : "bg-zinc-50 text-zinc-500 border border-zinc-100"
            }`}>
              {user?.role || "USER"}
            </span>
          </div>
          <p className="text-xs md:text-sm text-zinc-400 font-light font-mono">{user?.email}</p>
        </div>
      </div>

      {/* 액션 제어 패널 버튼 */}
      <div className="flex items-center gap-3 shrink-0">
        <Link href="/mypage/edit">
          <button className="text-xs border border-zinc-200 bg-white text-zinc-600 px-4 py-2 rounded-xl hover:text-black hover:border-zinc-400 transition-all font-medium shadow-sm">
            정보 수정
          </button>
        </Link>
        <button 
          onClick={onSignOut}
          className="text-xs text-zinc-400 hover:text-red-500 font-light transition-colors px-2 py-2"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}