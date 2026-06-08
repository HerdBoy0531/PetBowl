"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

export default function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    router.push(`/search?search=${encodeURIComponent(keyword.trim())}`);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full max-w-lg mx-auto">
      <Input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="사료 이름이나 브랜드를 입력해 주세요"
        className="flex-1 py-3 px-5 text-sm bg-white border border-zinc-200 rounded-2xl shadow-none focus:border-zinc-400 focus:ring-0 transition-all placeholder:text-zinc-400"
      />
      <Button 
        type="submit" 
        variant="primary"
        className="px-6 rounded-2xl text-sm font-medium shadow-sm transition-all"
      >
        검색
      </Button>
    </form>
  );
}