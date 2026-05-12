"use client";

import { useState, useEffect } from "react";
import FormField from "@molecules/FormField";
import Button from "@atoms/Button";
import TextArea from "@atoms/TextArea";
import Input from "@atoms/Input";

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
      // 서버에서 가져온 데이터라고 가정
      setTitle("기존 게시글 제목 (수정 불가)");
      setContent("기존 게시글 상세 내용입니다.");
    }
  }, [id, isUpdate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ F12로 제목을 강제 수정했더라도 실제 전송 시에는 
    // 로컬 상태(title)가 초기 로드된 값 그대로라면 안전합니다.
    // 만약 더 강력한 보안을 원하시면 서버 API에서 제목 변경 여부를 체크해야 합니다.
    console.log(isUpdate ? "수정 완료:" : "등록 완료:", { title, content });
    onSuccess();
  };

  return (
    <div className="max-w-3xl mx-auto p-8 border-4 border-black bg-white dark:bg-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-colors">
      <h2 className="text-3xl font-black mb-8 dark:text-white uppercase tracking-tighter">
        {isUpdate ? "Edit Request" : "New Request"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="제목">
          <Input
            name="title"
            value={title}
            // ✅ 수정 모드일 때는 onChange를 막아 상태 변경 자체를 불가능하게 함 (F12 방어)
            onChange={(e) => !isUpdate && setTitle(e.target.value)}
            // ✅ 수정 모드일 때는 readonly 적용 및 배경색 변경
            readOnly={isUpdate}
            placeholder="제목을 입력하세요"
            required
            className={`
              border-2
              /* ✅ 포커스 시 배경이 하얗게 되는 현상 수정 (dark 모드 대응) */
              focus:bg-white dark:focus:bg-gray-800 
              focus:text-black dark:focus:text-white
              ${isUpdate ? "bg-gray-100 dark:bg-gray-800 opacity-70 cursor-not-allowed" : "bg-white dark:bg-gray-800"}
            `}
          />
        </FormField>

        <FormField label="내용">
          <TextArea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="요청 내용을 상세히 적어주세요"
            required
            className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:bg-white dark:focus:bg-gray-800"
          />
        </FormField>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" onClick={onCancel} className="bg-white text-black border-2 border-black px-8">
            취소
          </Button>
          <Button
            type="submit"
            className="bg-yellow-400 text-black border-2 border-black px-8 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          >
            {isUpdate ? "수정완료" : "작성완료"}
          </Button>
        </div>
      </form>
    </div>
  );
}