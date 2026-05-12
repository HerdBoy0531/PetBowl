"use client";
import { useState } from "react";
import Button from "@atoms/Button";
import Input from "@atoms/Input";

export default function SearchModal({ isOpen, onClose, onAdd }: any) {
  const [search, setSearch] = useState("");
  if (!isOpen) return null;

  // 더미 데이터
  const searchResults = [
    { id: 1, name: "말티즈 어덜트", nutrients: [{label: "조단백", value: "24%"}, {label: "조지방", value: "12%"}] }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 border-2 border-black p-6 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="사료를 입력해주세요" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => {}}>🔍</Button>
        </div>
        <div className="border p-4 min-h-[200px]">
          {searchResults.map(item => (
            <div key={item.id} className="flex justify-between items-center p-2 border-b">
              <span className="dark:text-white">{item.name}</span>
              <Button onClick={() => { onAdd(item); onClose(); }}>추가</Button>
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-2">
          <button onClick={onClose} className="mt-4 text-sm text-red-500 underline">닫기</button>
        </div>
      </div>
    </div>
  );
}