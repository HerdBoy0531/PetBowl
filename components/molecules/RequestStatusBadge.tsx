"use client";

import { useState } from "react";

interface StatusBadgeProps {
  requestId: number;
  currentStatus: "PENDING" | "PROCESSING" | "COMPLETED" | string;
  isAdmin: boolean;
}

// 보기 편한 한글 맵핑 및 미니멀 컬러 셋 정의
const STATUS_MAP = {
  PENDING: { label: "접수 대기", className: "bg-zinc-50 text-zinc-500 border-zinc-200" },
  PROCESSING: { label: "처리중", className: "bg-amber-50 text-amber-600 border-amber-200" },
  COMPLETED: { label: "답변 완료", className: "bg-emerald-50 text-emerald-600 border-emerald-200" },
};

export default function RequestStatusBadge({ requestId, currentStatus, isAdmin }: StatusBadgeProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  // 어드민 전용 실시간 스왑 핸들러
  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/request/${requestId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("서버 통신 실패");
      
      setStatus(newStatus);
    } catch (error) {
      console.error("상태 변경 버그 터짐:", error);
      alert("상태 변경 중 오류가 발생했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  const currentConfig = STATUS_MAP[status as keyof typeof STATUS_MAP] || {
    label: status,
    className: "bg-zinc-50 text-zinc-400 border-zinc-100",
  };

  // 👑 Case A: 로그인 계정이 ADMIN 마스터일 때 ➔ 셀렉트 드롭다운 가판대 개전
  if (isAdmin) {
    return (
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={isUpdating}
        className={`text-xs font-semibold px-2.5 py-1 rounded-xl border outline-none cursor-pointer transition-all shadow-sm focus:border-zinc-400 ${currentConfig.className} ${
          isUpdating ? "animate-pulse opacity-60" : ""
        }`}
      >
        <option value="PENDING">접수 대기</option>
        <option value="PROCESSING">처리중</option>
        <option value="COMPLETED">답변 완료</option>
      </select>
    );
  }

  // 👤 Case B: 일반 집사 유저일 때 ➔ 정갈하고 부드러운 오가닉 정적 배지 노출
  return (
    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border tracking-tight ${currentConfig.className}`}>
      {currentConfig.label}
    </span>
  );
}