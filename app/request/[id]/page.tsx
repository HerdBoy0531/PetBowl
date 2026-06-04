// "use client";

// import { useRouter, useParams } from "next/navigation";
// import Button from "@atoms/Button";

// export default function RequestDetailPage() {
//   const router = useRouter();
//   const { id } = useParams();

//   // 실제로는 여기서 id를 이용해 API 데이터를 호출합니다.
//   const post = { title: "샘플 제목", content: "샘플 내용입니다.", date: "2025-05-12" };

//   return (
//     <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950 transition-colors">
//       <div className="max-w-3xl mx-auto p-8 border-4 border-black bg-white dark:bg-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
//         <h2 className="text-2xl font-black mb-4 dark:text-white">{post.title}</h2>
//         <p className="text-sm text-gray-500 mb-8 border-b-2 border-black pb-2">{post.date}</p>
        
//         <div className="min-h-[300px] text-lg dark:text-gray-300">
//           {post.content}
//         </div>

//         <div className="flex justify-end gap-4 mt-10">
//           <Button 
//             onClick={() => router.push("/request")}
//             className="bg-white text-black border-2 border-black px-6"
//           >
//             목록으로
//           </Button>
//           <Button 
//             onClick={() => router.push(`/request/${id}/update`)}
//             className="bg-yellow-400 text-black border-2 border-black px-6 font-bold"
//           >
//             수정하기
//           </Button>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Button from "@/components/atoms/Button";
import RequestForm from "@/components/organisms/RequestForm"; // 앞서 바인딩한 폼 수입
import InfoModal from "@/components/molecules/InfoModal";

interface DetailPost {
  id: number;
  title: string;
  content: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED";
  adminNote?: string;
  userId: string;
  user: string;
  date: string;
}

export default function RequestDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  // 상태 관리
  const [post, setPost] = useState<DetailPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false); // 수정 폼 전환 토글 스위치

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState("");
  const [infoModalMessage, setInfoModalMessage] = useState("");
  const [infoModalType, setInfoModalType] = useState<"success" | "error" | "warning">("success");
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  // 🔄 1. 특정 글 상세 데이터 실시간 Fetching
  const fetchPostDetail = async () => {
    try {
      const res = await fetch(`/api/request/${id}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        setInfoModalTitle("게시물 오류");

        setInfoModalMessage(
          "존재하지 않거나 삭제된 게시글입니다."
        );

        setInfoModalType("error");

        setRedirectPath("/request");

        setInfoModalOpen(true);
      }
    } catch (error) {
      console.error("상세조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPostDetail();
  }, [id]);

  // ❌ 2. 게시글 삭제 핸들러 (서버 검증 레이어 가동)
  const handleDelete = async () => {
    if (!window.confirm("정말 이 요청사항을 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/request/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInfoModalTitle("게시물 삭제 성공");

        setInfoModalMessage(
          "성공적으로 삭제되었습니다."
        );

        setInfoModalType("success");

        setRedirectPath("/request"); // 삭제 후 목록으로 안전 리다이렉트

        setInfoModalOpen(true);

      } else {
        const err = await res.json();
        alert(err.message || "삭제 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("삭제 요청 실패:", error);
      alert("서버와 통신에 실패했습니다.");
    }
  };

  // 로딩 인프라
  if (isLoading) {
    return (
      <div className="py-20 text-center text-zinc-400 font-light animate-pulse">
        데이터베이스에서 게시글을 조회 중입니다...
      </div>
    );
  }

  if (!post) return null;

  // 🔄 3. 수정 모드 활성화 시: 기존 화면을 폼 컴포넌트로 즉시 인라인 스위칭
  if (isEditMode) {
    return (
      <div className="w-full max-w-2xl mx-auto py-4">
        <RequestForm
          id={String(post.id)}
          onSuccess={() => {
            setIsEditMode(false);
            fetchPostDetail(); // 수정 완료 후 데이터 새로고침
          }}
          onCancel={() => setIsEditMode(false)}
        />
      </div>
    );
  }

  // 상태 배지 렌더링 함수 (Prisma Enum 대응 미니멀 색상 스펙)
  const getStatusBadge = (status: DetailPost["status"]) => {
    const styles = {
      PENDING: "bg-zinc-100 text-zinc-600 border-zinc-200",
      PROCESSING: "bg-amber-50 text-amber-700 border-amber-200/60",
      COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    };
    const labels = {
      PENDING: "접수 대기",
      PROCESSING: "검토 중",
      COMPLETED: "반영 완료",
    };
    return (
      <span className={`text-xs px-2.5 py-1 rounded-md border font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  // 🔒 본인 권한 검증 스위치 (글쓴이 본인이거나 role이 ADMIN인 경우만 허용)
  const hasPermission = session?.user?.id === post.userId || session?.user?.role === "ADMIN";

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in w-full">
      
      {/* 메인 리포트 카드 패널 */}
      <article className="bg-white border border-zinc-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        
        {/* 상단 메타 그리드 */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-50 pb-4">
          <div className="flex items-center gap-3">
            {getStatusBadge(post.status)}
            <h1 className="text-xl md:text-2xl font-bold text-black tracking-tight">
              {post.title}
            </h1>
          </div>
          <div className="text-xs text-zinc-400 font-light space-x-2">
            <span className="font-medium text-zinc-700">{post.user}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* 본문 에어리어 */}
        <div className="text-sm md:text-base text-zinc-700 font-light leading-relaxed whitespace-pre-wrap py-2 min-h-[150px]">
          {post.content}
        </div>

        {/* 제어 액션 단추 가판대 */}
        <div className="flex justify-between items-center pt-4 border-t border-zinc-50">
          <Button
            variant="secondary"
            onClick={() => router.push("/request")}
            className="text-xs py-2 px-4"
          >
            목록으로
          </Button>

          {/* 💡 권한 분리: 본인이나 어드민에게만 수정/삭제 노출 */}
          {hasPermission && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditMode(true)}
                className="text-xs py-2 px-4 hover:border-zinc-400"
              >
                수정
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-xs py-2 px-4 text-red-500 border-red-100 hover:bg-red-50 hover:border-red-200"
              >
                삭제
              </Button>
            </div>
          )}
        </div>
      </article>

      {/* 👑 관리자 피드백 서브 패널 (Prisma 스키마의 adminNote 실시간 연동) */}
      {post.adminNote && (
        <section className="bg-[#FDFCF0] border border-zinc-200/60 rounded-2xl p-5 md:p-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Bowl 마스터의 답변
          </h4>
          <p className="text-sm text-zinc-800 font-light leading-relaxed whitespace-pre-wrap">
            {post.adminNote}
          </p>
        </section>
      )}

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