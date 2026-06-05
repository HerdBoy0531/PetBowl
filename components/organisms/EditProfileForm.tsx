"use client";

import { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

interface EditProfileFormProps {
  initialNickname: string;
  onSave: (newNickname: string) => Promise<void>;
  onCancel: () => void;
}

export default function EditProfileForm({ initialNickname, onSave, onCancel }: EditProfileFormProps) {
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 부모 세션에서 뒤늦게 복구된 초기 이름을 내부 인풋 상태에 동기화
  useEffect(() => {
    setNickname(initialNickname);
  }, [initialNickname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return alert("닉네임을 입력해 주세요.");

    setIsSubmitting(true);
    try {
      // 💡 핵심: 상위 지휘탑(Page)이 내려준 비동기 저장 파이프라인 트리거
      await onSave(nickname.trim()); 
    } catch (error) {
      console.error("폼 컴포넌트 내 전송 크래시:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white border border-zinc-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-5 w-full"
    >
      {/* 인풋 입력 필드 구획 */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
          보호자님 닉네임
        </label>
        <Input 
          value={nickname}
          onChange={(e: any) => setNickname(e.target.value)}
          placeholder="변경할 닉네임을 입력하세요..."
          maxLength={15}
          className="w-full text-sm"
          disabled={isSubmitting}
        />
      </div>

      {/* 하단 제어 제어 버튼 구획 */}
      <div className="flex items-center gap-3 pt-2">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel} 
          className="w-1/2 py-2.5 text-xs rounded-xl"
          disabled={isSubmitting}
        >
          취소
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          className="w-1/2 py-2.5 text-xs rounded-xl font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "수정 중..." : "변경 사항 저장"}
        </Button>
      </div>
    </form>
  );
}