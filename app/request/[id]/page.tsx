"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Button from "@/components/atoms/Button";
import RequestForm from "@/components/organisms/RequestForm";
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
  const [isEditMode, setIsEditMode] = useState(false);

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState("");
  const [infoModalMessage, setInfoModalMessage] = useState("");
  const [infoModalType, setInfoModalType] = useState<"success" | "error" | "warning">("success");
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<"delete" | null>(null);

  // 특정 글 상세 데이터 실시간 Fetching
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

  // 게시글 삭제 핸들러 (서버 검증 레이어 가동)
  const handleDelete = async () => {
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

        setRedirectPath("/request");

        setPendingAction(null);

        setInfoModalOpen(true);
      } else {
        const err = await res.json();

        setInfoModalTitle("삭제 실패");

        setInfoModalMessage(
          err.message || "삭제 중 오류가 발생했습니다."
        );

        setInfoModalType("error");

        setPendingAction(null);

        setInfoModalOpen(true);
      }
    } catch (error) {
      console.error("삭제 요청 실패:", error);

      setInfoModalTitle("서버 오류");

      setInfoModalMessage(
        "서버와 통신에 실패했습니다."
      );

      setInfoModalType("error");

      setPendingAction(null);

      setInfoModalOpen(true);
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

  // 수정 모드 활성화 시: 기존 화면을 폼 컴포넌트로 즉시 인라인 스위칭
  if (isEditMode) {
    return (
      <div className="w-full max-w-2xl mx-auto py-4">
        <RequestForm
          id={String(post.id)}
          onSuccess={() => {
            setIsEditMode(false);
            fetchPostDetail();
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

  // 본인 권한 검증 스위치 (글쓴이 본인이거나 role이 ADMIN인 경우만 허용)
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

          {/* 본인이나 어드민에게만 수정/삭제 노출 */}
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
                onClick={() => {
                  setInfoModalTitle("게시물 삭제");
                  setInfoModalMessage(
                    "정말 이 요청사항을 삭제하시겠습니까?"
                  );
                  setInfoModalType("warning");
                  setPendingAction("delete");
                  setInfoModalOpen(true);
                }}
                className="text-xs py-2 px-4 text-red-500 border-red-100 hover:bg-red-50 hover:border-red-200"
              >
                삭제
              </Button>
            </div>
          )}
        </div>
      </article>

      {/* 관리자 피드백 서브 패널 (Prisma 스키마의 adminNote 실시간 연동) */}
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
          if (pendingAction === "delete") {
            setInfoModalOpen(false);
            handleDelete();
            return;
          }

          if (redirectPath) {
            router.push(redirectPath);
          }

          setInfoModalOpen(false);
        }}
      />

    </div>
  );
}