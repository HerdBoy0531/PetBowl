"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@atoms/Button";
import Input from "@atoms/Input";

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
}

export default function SearchBar({ 
  placeholder = "성분이 궁금한 사료를 입력해주세요", 
  initialValue = "" 
}: SearchBarProps) {
  const [keyword, setKeyword] = useState(initialValue);
  const router = useRouter();

  const handleSearch = () => {
    if (!keyword.trim()) return;
    // 검색 페이지로 이동 (쿼리 파라미터 전달)
    router.push(`/foods?search=${encodeURIComponent(keyword)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl flex items-stretch shadow-sm">
      {/* 1. Input 원자 사용 */}
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="rounded-l-md border-r-0 focus:border-black dark:focus:border-gray-500" 
      />

      {/* 2. Button 원자 사용 */}
      <Button
        onClick={handleSearch}
        variant="primary"
        className="rounded-l-none rounded-r-md px-8 flex items-center justify-center border-2 border-black dark:border-white"
      >
        <span className="text-xl">🔍</span>
      </Button>
    </div>
  );
}