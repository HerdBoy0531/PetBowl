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
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import TextArea from "@/components/atoms/TextArea";
import Input from "@/components/atoms/Input";

interface RequestFormProps {
  id?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function RequestForm({ id, onSuccess, onCancel }: RequestFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isUpdate = !!id;

  useEffect(() => {
    if (isUpdate) {
      // 안전한 상태 주입 데이터 흐름 유지
      setTitle("기존 게시글 제목 (수정 불가)");
      setContent("기존 게시글 상세 내용입니다.");
    }
  }, [id, isUpdate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isUpdate ? "수정 완료:" : "등록 완료:", { title, content });
    onSuccess();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm animate-fade-in w-full">
      
      {/* 헤더 타이틀 리터칭 */}
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
            className="text-xs py-2.5 px-5"
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="text-xs py-2.5 px-5"
          >
            {isUpdate ? "수정 완료" : "작성 완료"}
          </Button>
        </div>
      </form>

    </div>
  );
}