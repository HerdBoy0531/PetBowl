"use client";

import { useRouter } from "next/navigation";

interface RequestRowProps {
  no: number;
  content: string;
  date: string;
}

export default function RequestRow({ no, content, date }: RequestRowProps) {
  const router = useRouter();

  return (
    <tr 
      onClick={() => router.push(`/request/${no}`)} // ✅ 행 클릭 시 상세 페이지 이동
      className="border-b-2 border-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
    >
      <td className="border-r-2 border-black dark:border-gray-700 p-4 text-center">{no}</td>
      <td className="border-r-2 border-black dark:border-gray-700 p-4 text-left">{content}</td>
      <td className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">{date}</td>
    </tr>
  );
}