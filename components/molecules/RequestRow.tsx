// "use client";

// import { useRouter } from "next/navigation";

// interface RequestRowProps {
//   no: number;
//   content: string;
//   date: string;
// }

// export default function RequestRow({ no, content, date }: RequestRowProps) {
//   const router = useRouter();

//   return (
//     <tr 
//       onClick={() => router.push(`/request/${no}`)} // ✅ 행 클릭 시 상세 페이지 이동
//       className="border-b-2 border-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
//     >
//       <td className="border-r-2 border-black dark:border-gray-700 p-4 text-center">{no}</td>
//       <td className="border-r-2 border-black dark:border-gray-700 p-4 text-left">{content}</td>
//       <td className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">{date}</td>
//     </tr>
//   );
// }


// // components/molecules/RequestRow.tsx (구조 이해를 돕기 위한 예시)
// "use client";

// import { useSession } from "next-auth/react";
// import RequestStatusBadge from "@/components/molecules/RequestStatusBadge"; // 배지 분자 수입

// export default function RequestRow({ item }: any) {
//   const { data: session } = useSession();
//   const user = session?.user as any;
  
//   // 현재 로그인한 집사가 ADMIN 권한을 갖고 있는지 스캔
//   const isAdmin = user?.role === "ADMIN";

//   return (
//     <div className="grid grid-cols-4 items-center py-4 border-b border-zinc-100">
//       <span className="text-sm font-light text-zinc-400 font-mono">{item.id}</span>
//       <span className="text-sm font-medium text-zinc-800 truncate">{item.title}</span>
//       <span className="text-xs font-light text-zinc-400">{item.createdAt}</span>
      
//       {/* 💡 이 구역에 새로 만든 하이브리드 어드민 배지를 바인딩합니다! */}
//       <div>
//         <RequestStatusBadge 
//           requestId={item.id} 
//           currentStatus={item.status} // ex: "PENDING"
//           isAdmin={isAdmin} 
//         />
//       </div>
//     </div>
//   );
// }




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