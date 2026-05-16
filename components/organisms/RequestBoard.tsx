// "use client"

// import Button from "@atoms/Button";
// import RequestRow from "@molecules/RequestRow";
// import TableHead from "@atoms/TableHead";
// import { useRouter } from "next/navigation";

// const dummyRequests = [
//   { id: 1, content: "A 브랜드 사료 추가 요청합니다!", date: "2025-05-12" },
//   { id: 2, content: "영양성분 비교 항목에 오메가3도 넣어주세요.", date: "2025-05-11" },
// ];

// export default function RequestBoard() {
//   const router = useRouter();

//   return (
//     <section className="w-full max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-black text-center mb-10 dark:text-white">요청 사항</h2>
      
//       <div className="border-4 border-black dark:border-gray-700 bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr>
//               <TableHead className="w-20 dark:text-white">No.</TableHead>
//               <TableHead className="dark:text-white">내용</TableHead>
//               <TableHead className="dark:text-white w-40 border-r-0">작성일자</TableHead>
//             </tr>
//           </thead>
//           <tbody className="dark:text-white">
//             {dummyRequests.map((req) => (
//               <RequestRow key={req.id} no={req.id} content={req.content} date={req.date} />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-end mt-6">
//         <Button 
//           onClick = {() => router.push("/request/new")}
//           className="px-8 py-3 bg-white text-black border-2 border-black hover:bg-gray-100 ">
//           글쓰기
//         </Button>
//       </div>
//     </section>
//   );
// }


"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Button from "@/components/atoms/Button";
import RequestRow from "@/components/molecules/RequestRow";
import TableHead from "@/components/atoms/TableHead";

interface RequestPost {
  id : number;
  title : string;
  content : string;
  status : string;
  user : string;
  date: string;
}

export default function RequestBoard() {
  const router = useRouter();
  const { data: session} = useSession();

  const [requests, setRequests] = useState<RequestPost[]>([]);
  const [isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch("/api/request", { cache: "no-store"});
        if (res.ok) {
          const data = await res.json();
          setRequests(data);
        }
      } catch (error) {
        console.error("요청사항을 불러오는 중 오류가 발생했습니다", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRequests();
  }, []);


 return (
    <section className="w-full space-y-6 animate-fade-in">
      
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">요청 사항</h2>
        <p className="text-sm text-zinc-500 font-light">
          PetBowl에 추가되길 원하는 사료나 성분 분석, 서비스 개선 의견을 편하게 들려주세요.
        </p>
      </div>
      
      {/* 테이블 컨테이너 */}
      <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-zinc-50/60 border-b border-zinc-100">
              <TableHead className="w-20 py-4 px-5 text-zinc-700 font-semibold text-xs md:text-sm">No.</TableHead>
              <TableHead className="py-4 px-5 text-zinc-700 font-semibold text-xs md:text-sm">내용 (제목)</TableHead>
              <TableHead className="w-40 py-4 px-5 text-zinc-700 font-semibold text-xs md:text-sm text-right border-r-0">작성일자</TableHead>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-zinc-600 text-xs md:text-sm font-light">
            {isLoading ? (
              // 로딩 상태 스켈레톤 무드 처리
              <tr>
                <td colSpan={3} className="py-10 text-center text-zinc-400 font-light">
                  데이터베이스 연결 중...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              // 데이터가 비어있을 때 빈 화면 가이드
              <tr>
                <td colSpan={3} className="py-12 text-center text-zinc-400 font-light">
                  아직 등록된 요청사항이 없습니다. 첫 번째 의견을 남겨보세요!
                </td>
              </tr>
            ) : (
              // 실제 DB 원본 데이터 순회 매핑 (Prisma 스키마 title 연동)
              requests.map((req) => (
                <RequestRow 
                  key={req.id} 
                  no={req.id} 
                  content={req.title} // 내용 셀 자리에 실제 title 매핑
                  date={req.date} 
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 💡 오가닉 세션 연동: 로그인한 회원에게만 글쓰기 버튼 활성화 */}
      {session && (
        <div className="flex justify-end pt-2">
          <Button 
            onClick={() => router.push("/request/new")}
            variant="primary"
            className="px-6 py-2.5 text-xs md:text-sm shadow-sm"
          >
            글쓰기
          </Button>
        </div>
      )}
    </section>
  );
}