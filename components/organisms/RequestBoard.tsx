"use client"

import Button from "@atoms/Button";
import RequestRow from "@molecules/RequestRow";
import TableHead from "@atoms/TableHead";
import { useRouter } from "next/navigation";

const dummyRequests = [
  { id: 1, content: "A 브랜드 사료 추가 요청합니다!", date: "2025-05-12" },
  { id: 2, content: "영양성분 비교 항목에 오메가3도 넣어주세요.", date: "2025-05-11" },
];

export default function RequestBoard() {
  const router = useRouter();

  return (
    <section className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-black text-center mb-10 dark:text-white">요청 사항</h2>
      
      <div className="border-4 border-black dark:border-gray-700 bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <TableHead className="w-20 dark:text-white">No.</TableHead>
              <TableHead className="dark:text-white">내용</TableHead>
              <TableHead className="dark:text-white w-40 border-r-0">작성일자</TableHead>
            </tr>
          </thead>
          <tbody className="dark:text-white">
            {dummyRequests.map((req) => (
              <RequestRow key={req.id} no={req.id} content={req.content} date={req.date} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-6">
        <Button 
          onClick = {() => router.push("/request/new")}
          className="px-8 py-3 bg-white text-black border-2 border-black hover:bg-gray-100 ">
          글쓰기
        </Button>
      </div>
    </section>
  );
}