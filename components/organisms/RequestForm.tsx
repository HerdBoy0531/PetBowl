// "use client";

// import { useState, useEffect } from "react";
// import FormField from "@molecules/FormField";
// import Button from "@atoms/Button";
// import TextArea from "@atoms/TextArea";
// import Input from "@atoms/Input";

// interface RequestFormProps {
//   id?: string;
//   onSuccess: () => void;
//   onCancel: () => void;
// }

// export default function RequestForm({ id, onSuccess, onCancel }: RequestFormProps) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const isUpdate = !!id;

//   useEffect(() => {
//     if (isUpdate) {
//       // 서버에서 가져온 데이터라고 가정
//       setTitle("기존 게시글 제목 (수정 불가)");
//       setContent("기존 게시글 상세 내용입니다.");
//     }
//   }, [id, isUpdate]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // ✅ F12로 제목을 강제 수정했더라도 실제 전송 시에는 
//     // 로컬 상태(title)가 초기 로드된 값 그대로라면 안전합니다.
//     // 만약 더 강력한 보안을 원하시면 서버 API에서 제목 변경 여부를 체크해야 합니다.
//     console.log(isUpdate ? "수정 완료:" : "등록 완료:", { title, content });
//     onSuccess();
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8 border-4 border-black bg-white dark:bg-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-colors">
//       <h2 className="text-3xl font-black mb-8 dark:text-white uppercase tracking-tighter">
//         {isUpdate ? "Edit Request" : "New Request"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <FormField label="제목">
//           <Input
//             name="title"
//             value={title}
//             // ✅ 수정 모드일 때는 onChange를 막아 상태 변경 자체를 불가능하게 함 (F12 방어)
//             onChange={(e) => !isUpdate && setTitle(e.target.value)}
//             // ✅ 수정 모드일 때는 readonly 적용 및 배경색 변경
//             readOnly={isUpdate}
//             placeholder="제목을 입력하세요"
//             required
//             className={`
//               border-2
//               /* ✅ 포커스 시 배경이 하얗게 되는 현상 수정 (dark 모드 대응) */
//               focus:bg-white dark:focus:bg-gray-800 
//               focus:text-black dark:focus:text-white
//               ${isUpdate ? "bg-gray-100 dark:bg-gray-800 opacity-70 cursor-not-allowed" : "bg-white dark:bg-gray-800"}
//             `}
//           />
//         </FormField>

//         <FormField label="내용">
//           <TextArea
//             name="content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="요청 내용을 상세히 적어주세요"
//             required
//             className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:bg-white dark:focus:bg-gray-800"
//           />
//         </FormField>

//         <div className="flex justify-end gap-4 pt-4">
//           <Button type="button" onClick={onCancel} className="bg-white text-black border-2 border-black px-8">
//             취소
//           </Button>
//           <Button
//             type="submit"
//             className="bg-yellow-400 text-black border-2 border-black px-8 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
//           >
//             {isUpdate ? "수정완료" : "작성완료"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import TextArea from "@/components/atoms/TextArea";
import Input from "@/components/atoms/Input";
import InfoModal from "@/components/molecules/InfoModal";

interface RequestFormProps {
  id?: string; // id가 전달되면 자동으로 '수정 모드'로 가동됩니다.
  onSuccess: () => void;
  onCancel: () => void;
}

export default function RequestForm({ id, onSuccess, onCancel }: RequestFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState("");
  const [infoModalMessage, setInfoModalMessage] = useState("");
  const [infoModalType, setInfoModalType] = useState<"success" | "error" | "warning">("success");
  const [shouldRunSuccess, setShouldRunSuccess] = useState(false);

  const isUpdate = !!id;
  const router = useRouter();

  // 🔄 수정 모드일 때, 백엔드로부터 기존 원본 글 데이터 Fetching 바인딩
  useEffect(() => {
    if (isUpdate) {
      async function getOriginalPost() {
        try {
          const res = await fetch(`/api/request/${id}`);
          if (res.ok) {
            const data = await res.json();
            setTitle(data.title);     // 원본 제목 세팅 (수정은 차단되지만 뷰 제공)
            setContent(data.content); // 원본 내용 세팅
          }
        } catch (error) {
          console.error("원본 데이터를 가져오는데 실패했습니다.", error);
        }
      }
      getOriginalPost();
    }
  }, [id, isUpdate]);

  // 🚀 [Submit Handler] 신규 등록 및 수정 전송 분기 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    // 수정 모드일 때는 PATCH, 신규 작성일 때는 POST 주소를 동적 채택
    const apiUrl = isUpdate ? `/api/request/${id}` : "/api/request";
    const apiMethod = isUpdate ? "PATCH" : "POST";
    
    // PATCH 보안 명세에 맞춰 수정 모드 시 content만 페이로드에 적재
    const payload = isUpdate ? { content } : { title, content };

    try {
      const res = await fetch(apiUrl, {
        method: apiMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        if (isUpdate) {
          setInfoModalTitle("수정 완료");
          setInfoModalMessage("성공적으로 수정되었습니다.");
        } else {
          setInfoModalTitle("등록 완료");
          setInfoModalMessage("요청사항이 안전하게 등록되었습니다.");
        }

        setInfoModalType("success");
        setShouldRunSuccess(true);
        setInfoModalOpen(true);
      } else {
        //const errorData = await res.json();
        //alert(errorData.message || "작업 처리 중 오류가 발생했습니다.");

        setInfoModalTitle("작업 오류");

        setInfoModalMessage(
          "작업 처리 중 오류가 발생했습니다."
        );

        setInfoModalType("error");

        setInfoModalOpen(true);
      }
    } catch (error) {
      console.error("API 전송 에러:", error);
      setInfoModalTitle("작업 오류");

      setInfoModalMessage(
        "서버 연결에 실패했습니다."
      );

      setInfoModalType("error");

      setInfoModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm animate-fade-in w-full">
      
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">
          {isUpdate ? "요청사항 수정하기" : "새로운 요청사항 작성"}
        </h2>
        <p className="text-xs text-zinc-400 font-light mt-1">
          우리 아이 맞춤 가이드를 완성할 수 있도록 소중한 피드백을 남겨주세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. 제목 입력 필드 */}
        <FormField label="제목">
          <Input
            name="title"
            value={title}
            // 🔒 F12 우회 방어 상태 락 유지: 수정 모드가 아닐 때만 작동
            onChange={(e) => !isUpdate && setTitle(e.target.value)}
            readOnly={isUpdate}
            placeholder="제목을 입력해 주세요"
            required
            className={`
              text-sm py-3 rounded-xl transition-all duration-200 shadow-none focus:ring-0
              ${isUpdate 
                ? "bg-zinc-100 text-zinc-400 cursor-not-allowed opacity-80 border-zinc-200" 
                : "bg-white text-black border-zinc-200 focus:border-zinc-400"
              }
            `}
          />
        </FormField>

        {/* 2. 내용 입력 필드 */}
        <FormField label="내용">
          <TextArea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="요청 내용을 상세히 적어주세요..."
            required
            rows={8}
            className="w-full px-4 py-3 bg-white text-black text-sm font-light border border-zinc-200 rounded-2xl focus:border-zinc-400 focus:ring-0 transition-all leading-relaxed placeholder:text-zinc-400 shadow-none"
          />
        </FormField>

        {/* 3. 하단 제어 액션 그룹 */}
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-50">
          <Button 
            type="button" 
            onClick={onCancel} 
            variant="secondary" 
            disabled={isSubmitting}
            className="text-xs py-2.5 px-5"
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="text-xs py-2.5 px-5"
          >
            {isSubmitting ? "전송 중..." : isUpdate ? "수정 완료" : "작성 완료"}
          </Button>
        </div>
      </form>

      <InfoModal
        isOpen={infoModalOpen}
        title={infoModalTitle}
        description={infoModalMessage}
        type={infoModalType}
        onConfirm={() => {
          setInfoModalOpen(false);

          if (shouldRunSuccess) {
            setShouldRunSuccess(false);
            onSuccess();
          }
        }}
      />
      
    </div>
  );
}