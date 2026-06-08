"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RequestStatusBadge from "@/components/molecules/RequestStatusBadge";

interface RequestRowProps {
  id: number;
  title: string;
  status: string;
  createdAt: string | Date;
}

export default function RequestRow({ id, title, status, createdAt }: RequestRowProps) {
  const { data: session } = useSession();
  const user = session?.user as any;
  const isAdmin = user?.role === "ADMIN";
  const router = useRouter();

return (
  <>
    {/* 모바일 */}
    <div
      onClick={() => router.push(`/request/${id}`)}
      className="md:hidden flex items-center gap-3 py-4 cursor-pointer hover:bg-zinc-50 border-b border-zinc-100"
    >
      <span className="w-8 text-sm text-zinc-400 font-mono shrink-0">
        {id}
      </span>

      <span className="flex-1 truncate text-sm font-medium text-zinc-900">
        {title}
      </span>
    </div>

    {/* 데스크톱 */}
    <div
      onClick={() => router.push(`/request/${id}`)}
      className="hidden md:grid grid-cols-[60px_1fr_120px_100px] items-center py-4 text-zinc-800 border-b border-zinc-100 last:border-b-0 w-full gap-4 cursor-pointer hover:bg-zinc-50 transition-colors"
    >
      <span className="text-sm font-light text-zinc-400 font-mono">
        {id}
      </span>

      <span className="text-sm font-medium text-zinc-900 truncate pr-2">
        {title}
      </span>

      <span className="text-xs font-light text-zinc-400">
        {new Date(createdAt).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </span>

      <div
        onClick={(e) => e.stopPropagation()}
        className="shrink-0 flex justify-center"
      >
        <RequestStatusBadge
          requestId={id}
          currentStatus={status}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  </>
);
}