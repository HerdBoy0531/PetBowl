"use client";

import { useRouter, useParams } from "next/navigation";
import Button from "@atoms/Button";

export default function RequestDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  // 실제로는 여기서 id를 이용해 API 데이터를 호출합니다.
  const post = { title: "샘플 제목", content: "샘플 내용입니다.", date: "2025-05-12" };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-3xl mx-auto p-8 border-4 border-black bg-white dark:bg-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black mb-4 dark:text-white">{post.title}</h2>
        <p className="text-sm text-gray-500 mb-8 border-b-2 border-black pb-2">{post.date}</p>
        
        <div className="min-h-[300px] text-lg dark:text-gray-300">
          {post.content}
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <Button 
            onClick={() => router.push("/request")}
            className="bg-white text-black border-2 border-black px-6"
          >
            목록으로
          </Button>
          <Button 
            onClick={() => router.push(`/request/${id}/update`)}
            className="bg-yellow-400 text-black border-2 border-black px-6 font-bold"
          >
            수정하기
          </Button>
        </div>
      </div>
    </main>
  );
}