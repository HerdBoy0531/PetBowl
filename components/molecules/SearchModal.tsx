// "use client";
// import { useState } from "react";
// import Button from "@atoms/Button";
// import Input from "@atoms/Input";

// export default function SearchModal({ isOpen, onClose, onAdd }: any) {
//   const [search, setSearch] = useState("");
//   if (!isOpen) return null;

//   // 더미 데이터
//   const searchResults = [
//     { id: 1, name: "말티즈 어덜트", nutrients: [{label: "조단백", value: "24%"}, {label: "조지방", value: "12%"}] }
//   ];

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white dark:bg-gray-900 border-2 border-black p-6 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
//         <div className="flex gap-2 mb-4">
//           <Input 
//             placeholder="사료를 입력해주세요" 
//             value={search} 
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <Button onClick={() => {}}>🔍</Button>
//         </div>
//         <div className="border p-4 min-h-[200px]">
//           {searchResults.map(item => (
//             <div key={item.id} className="flex justify-between items-center p-2 border-b">
//               <span className="dark:text-white">{item.name}</span>
//               <Button onClick={() => { onAdd(item); onClose(); }}>추가</Button>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-end pt-2">
//           <button onClick={onClose} className="mt-4 text-sm text-red-500 underline">닫기</button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

export default function SearchModal({ isOpen, onClose, onAdd }: any) {
  const [search, setSearch] = useState("");
  if (!isOpen) return null;

  // 더미 데이터 구조 보존
  const searchResults = [
    { id: 1, name: "말티즈 어덜트", nutrients: [{label: "조단백", value: "24%"}, {label: "조지방", value: "12%"}] },
    { id: 2, name: "말티즈 퍼피", nutrients: [{label: "조단백", value: "14%"}, {label: "조지방", value: "23%"}] },
  ];

  return (
    // 전체 모달 백그라운드 블러 오버레이
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4 animate-fade-in">
      
      {/* 미니멀 오가닉 포인트: rounded-3xl 구조와 부드러운 shadow-xl 팝업 윈도우 개편 */}
      <div className="bg-white border border-zinc-100 p-6 md:p-8 w-full max-w-md rounded-3xl shadow-xl space-y-5 transform transition-all">
        
        {/* 상단 모달 헤더 바 */}
        <div className="flex justify-between items-center border-b border-zinc-50 pb-2">
          <h3 className="text-base font-bold text-black tracking-tight">비교 사료 검색</h3>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-black font-light text-2xl select-none focus:outline-none transition-colors"
          >
            &times;
          </button>
        </div>

        {/* 내장형 일체식 검색 창 (앞서 완성한 알약 가이드 디자인 연동) */}
        <div className="flex items-center p-1 bg-white border border-zinc-200 rounded-2xl shadow-sm focus-within:border-zinc-400 transition-all">
          <Input 
            placeholder="사료 이름 또는 브랜드를 입력하세요..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="border-none shadow-none py-2 px-3 focus:border-none focus:ring-0 text-sm bg-transparent"
          />
          <Button variant="primary" className="px-5 py-2 text-xs shrink-0 rounded-xl" onClick={() => {}}>
            검색
          </Button>
        </div>

        {/* 결과 도출 데이터 스크롤 판넬 */}
        <div className="border border-zinc-100 bg-zinc-50/30 rounded-2xl overflow-hidden min-h-[200px] max-h-[300px] overflow-y-auto">
          {searchResults.length > 0 ? (
            searchResults.map(item => (
              <div 
                key={item.id} 
                className="flex justify-between items-center p-4 border-b border-zinc-100/60 hover:bg-white transition-colors last:border-b-0"
              >
                <span className="text-sm text-zinc-800 font-medium">{item.name}</span>
                <Button 
                  variant="outline" 
                  className="text-xs px-4 py-1.5 rounded-xl shadow-none font-medium"
                  // 부모 비즈니스 로직 정상 연동
                  onClick={() => { onAdd(item); onClose(); }}
                >
                  추가
                </Button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center min-h-[200px] text-xs text-zinc-400 font-light">
              검색된 사료 결과가 없습니다.
            </div>
          )}
        </div>

        {/* 하단 제어 버튼 배치 구획 */}
        <div className="flex justify-end pt-1">
          <Button variant="secondary" onClick={onClose} className="text-xs py-2.5 px-5">
            닫기
          </Button>
        </div>

      </div>
    </div>
  );
}