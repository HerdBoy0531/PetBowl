// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Button from "@atoms/Button";
// import Input from "@atoms/Input";

// interface SearchBarProps {
//   placeholder?: string;
//   initialValue?: string;
// }

// export default function SearchBar({ 
//   placeholder = "성분이 궁금한 사료를 입력해주세요", 
//   initialValue = "" 
// }: SearchBarProps) {
//   const [keyword, setKeyword] = useState(initialValue);
//   const router = useRouter();

//   const handleSearch = () => {
//     if (!keyword.trim()) return;
//     // 검색 페이지로 이동 (쿼리 파라미터 전달)
//     router.push(`/foods?search=${encodeURIComponent(keyword)}`);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl flex items-stretch shadow-sm">
//       {/* 1. Input 원자 사용 */}
//       <Input
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder={placeholder}
//         className="rounded-l-md border-r-0 focus:border-black dark:focus:border-gray-500" 
//       />

//       {/* 2. Button 원자 사용 */}
//       <Button
//         onClick={handleSearch}
//         variant="primary"
//         className="rounded-l-none rounded-r-md px-8 flex items-center justify-center border-2 border-black dark:border-white"
//       >
//         <span className="text-xl">🔍</span>
//       </Button>
//     </div>
//   );
// }


// design renewal
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Button from "@/components/atoms/Button";
// import Input from "@/components/atoms/Input";

// interface SearchBarProps {
//   placeholder?: string;
//   initialValue?: string;
// }

// export default function SearchBar({ 
//   placeholder = "성분이 궁금한 사료를 입력해주세요...", 
//   initialValue = "" 
// }: SearchBarProps) {
//   const [keyword, setKeyword] = useState(initialValue);
//   const router = useRouter();

//   const handleSearch = () => {
//     if (!keyword.trim()) return;
//     router.push(`/foods?search=${encodeURIComponent(keyword)}`);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     // 미니멀 오가닉 포인트: 전체를 부드러운 rounded-2xl 테두리로 감싸 통합형 검색바로 리터칭
//     <div className="w-full max-w-2xl flex items-center p-1.5 bg-white border border-zinc-200 rounded-2xl shadow-sm focus-within:border-zinc-400 transition-all duration-200">
//       <Input
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder={placeholder}
//         // 인풋 자체의 외부 테두리와 그림자를 제거하여 컴포넌트 내부에서 완전히 녹아들게 처리
//         className="border-none shadow-none py-3 px-4 focus:border-none focus:ring-0 text-black placeholder:text-zinc-400 bg-transparent" 
//       />

//       <Button
//         onClick={handleSearch}
//         variant="primary"
//         className="px-6 py-3 shrink-0"
//       >
//         <span className="text-sm font-medium">검색</span>
//       </Button>
//     </div>
//   );
// }


// data binding
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

    // 💡 미니멀 오가닉 핵심 바인딩: 검색 조건을 쿼리스트링에 안전하게 인코딩하여 검색 페이지로 쏩니다.
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