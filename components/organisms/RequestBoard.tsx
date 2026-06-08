"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Button from "@/components/atoms/Button";
import RequestRow from "@/components/molecules/RequestRow";

interface RequestPost {
  id : number;
  title : string;
  content : string;
  status : string;
  user : string;
  date: string;
  email: string;
}

export default function RequestBoard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const isMineFilter = searchParams.get("filter") === "mine";

  const [requests, setRequests] = useState<RequestPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const displayedRequests = isMineFilter && session?.user?.email
    ? requests.filter((req) => req.email === session.user.email)
    : requests;

  return (
    <section className="w-full space-y-6 animate-fade-in">
      
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
          {isMineFilter ? "내가 접수한 요청 사항" : "전체 요청 사항"}
        </h2>
        <p className="text-sm text-zinc-500 font-light">
          {isMineFilter 
            ? "보호자님이 PetBowl에 남겨주신 소중한 의견들과 처리 현황입니다."
            : "PetBowl에 추가되길 원하는 사료나 성분 분석, 서비스 개선 의견을 편하게 들려주세요."}
        </p>
      </div>
      
      <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="hidden md:grid grid-cols-[60px_1fr_120px_100px] items-center py-4 px-5 bg-zinc-50/60 border-b border-zinc-100 text-zinc-500 font-semibold text-xs md:text-sm text-left gap-4">
          <span>No.</span>
          <span className="text-zinc-700">내용 (제목)</span>
          <span>작성일자</span>
          <span className="text-center">진행 상태</span>
        </div>

        <div className="divide-y divide-zinc-100 text-zinc-600 text-xs md:text-sm font-light px-5">
          {isLoading ? (
            <div className="py-10 text-center text-zinc-400 animate-pulse">
              데이터베이스 연결 중...
            </div>
          ) : displayedRequests.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 font-light">
              {isMineFilter 
                ? "보호자님이 아직 등록하신 요청사항이 존재하지 않습니다." 
                : "아직 등록된 요청사항이 없습니다. 첫 번째 의견을 남겨보세요!"}
            </div>
          ) : (
            displayedRequests.map((req) => (
              <RequestRow 
                key={req.id} 
                id={req.id} 
                title={req.title} 
                status={req.status} 
                createdAt={req.date} 
              />
            ))
          )}
        </div>

      </div>

      <div className="flex justify-between items-center pt-2">
        {isMineFilter ? (
          <button onClick={() => router.push("/request")} className="text-xs text-zinc-400 hover:text-black underline underline-offset-4 transition-colors">
            전체 요청사항 보러가기
          </button>
        ) : (
          session && (
            <button onClick={() => router.push("/request?filter=mine")} className="text-xs text-zinc-400 hover:text-black underline underline-offset-4 transition-colors">
              내가 쓴 글만 모아보기
            </button>
          )
        )}

        {session && (
          <Button 
            onClick={() => router.push("/request/new")}
            variant="primary"
            className="px-6 py-2.5 text-xs md:text-sm shadow-sm"
          >
            글쓰기
          </Button>
        )}
      </div>
    </section>
  );
}