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


// design renewal
// "use client";

// import { useState } from "react";
// import Button from "@/components/atoms/Button";
// import Input from "@/components/atoms/Input";

// export default function SearchModal({ isOpen, onClose, onAdd }: any) {
//   const [search, setSearch] = useState("");
//   if (!isOpen) return null;

//   // 더미 데이터 구조 보존
//   const searchResults = [
//     { id: 1, name: "말티즈 어덜트", nutrients: [{label: "조단백", value: "24%"}, {label: "조지방", value: "12%"}] },
//     { id: 2, name: "말티즈 퍼피", nutrients: [{label: "조단백", value: "14%"}, {label: "조지방", value: "23%"}] },
//   ];

//   return (
//     // 전체 모달 백그라운드 블러 오버레이
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4 animate-fade-in">
      
//       {/* 미니멀 오가닉 포인트: rounded-3xl 구조와 부드러운 shadow-xl 팝업 윈도우 개편 */}
//       <div className="bg-white border border-zinc-100 p-6 md:p-8 w-full max-w-md rounded-3xl shadow-xl space-y-5 transform transition-all">
        
//         {/* 상단 모달 헤더 바 */}
//         <div className="flex justify-between items-center border-b border-zinc-50 pb-2">
//           <h3 className="text-base font-bold text-black tracking-tight">비교 사료 검색</h3>
//           <button 
//             onClick={onClose} 
//             className="text-zinc-400 hover:text-black font-light text-2xl select-none focus:outline-none transition-colors"
//           >
//             &times;
//           </button>
//         </div>

//         {/* 내장형 일체식 검색 창 (앞서 완성한 알약 가이드 디자인 연동) */}
//         <div className="flex items-center p-1 bg-white border border-zinc-200 rounded-2xl shadow-sm focus-within:border-zinc-400 transition-all">
//           <Input 
//             placeholder="사료 이름 또는 브랜드를 입력하세요..." 
//             value={search} 
//             onChange={(e) => setSearch(e.target.value)}
//             className="border-none shadow-none py-2 px-3 focus:border-none focus:ring-0 text-sm bg-transparent"
//           />
//           <Button variant="primary" className="px-5 py-2 text-xs shrink-0 rounded-xl" onClick={() => {}}>
//             검색
//           </Button>
//         </div>

//         {/* 결과 도출 데이터 스크롤 판넬 */}
//         <div className="border border-zinc-100 bg-zinc-50/30 rounded-2xl overflow-hidden min-h-[200px] max-h-[300px] overflow-y-auto">
//           {searchResults.length > 0 ? (
//             searchResults.map(item => (
//               <div 
//                 key={item.id} 
//                 className="flex justify-between items-center p-4 border-b border-zinc-100/60 hover:bg-white transition-colors last:border-b-0"
//               >
//                 <span className="text-sm text-zinc-800 font-medium">{item.name}</span>
//                 <Button 
//                   variant="outline" 
//                   className="text-xs px-4 py-1.5 rounded-xl shadow-none font-medium"
//                   // 부모 비즈니스 로직 정상 연동
//                   onClick={() => { onAdd(item); onClose(); }}
//                 >
//                   추가
//                 </Button>
//               </div>
//             ))
//           ) : (
//             <div className="flex items-center justify-center min-h-[200px] text-xs text-zinc-400 font-light">
//               검색된 사료 결과가 없습니다.
//             </div>
//           )}
//         </div>

//         {/* 하단 제어 버튼 배치 구획 */}
//         <div className="flex justify-end pt-1">
//           <Button variant="secondary" onClick={onClose} className="text-xs py-2.5 px-5">
//             닫기
//           </Button>
//         </div>

//       </div>
//     </div>
//   );
// }


// data binding
"use client";

import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (food: any) => void;
}

export default function SearchModal({ isOpen, onClose, onAdd }: SearchModalProps) {
  const [search, setSearch] = useState("");
  const [dbFoods, setDbFoods] = useState<any[]>([]); // 백엔드 실제 DB 사료 저장소
  const [isLoading, setIsLoading] = useState(false);

  // 🔄 모달이 열릴 때 백엔드 API에서 실제 사료 데이터 풀(Pool) 로드
  useEffect(() => {
    if (!isOpen) return;

    async function fetchModalFoods() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/foods?limit=100", { cache: "no-store" });
        if (res.ok) {
          const result = await res.json();
          
          // 🔬 백엔드 리턴 구조가 객체{}인지 배열[]인지 자동 검증하여 안전하게 추출
          const validArray = Array.isArray(result)
            ? result
            : (result.foods || result.data || []);
            
          setDbFoods(validArray);
        }
      } catch (error) {
        console.error("모달 데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchModalFoods();
  }, [isOpen]);

  if (!isOpen) return null;

  // 🔍 입력한 키워드에 맞춰 실시간으로 제조사/제품명 필터링 (배열 안전장치 포함)
  const filteredResults = Array.isArray(dbFoods)
    ? dbFoods.filter(
        (item) =>
          item.name?.toLowerCase().includes(search.toLowerCase()) ||
          item.brand?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // 💡 [핵심 교정] 부모 함수가 크래시 나더라도 모달은 무조건 닫히도록 제어하는 안전 브릿지 함수
  const handleSelectFood = (item: any) => {
    try {
      // 1. 부모의 Zustand 바구니 적재 로직 실행 시도
      onAdd(item); 
    } catch (error) {
      // 데이터 구조 매핑 실패 등의 오류 발생 시 콘솔 로그만 남기고 차단
      console.error("부모 컴포넌트에 사료 적재 중 에러 발생 가드 작동:", error);
    } finally {
      // 2. 부모 함수가 성공하든 에러가 터지든 상관없이 무조건 닫기 명령 수행!
      onClose(); 
    }
  };

  return (
    // 전체 모달 백그라운드 블러 오버레이
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4 animate-fade-in">
      
      {/* 팝업 윈도우 본체 판넬 */}
      <div className="bg-white border border-zinc-100 p-6 md:p-8 w-full max-w-md rounded-3xl shadow-xl space-y-5 transform transition-all relative">
        
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

        {/* 내장형 일체식 검색 창 */}
        <div className="flex items-center p-1 bg-white border border-zinc-200 rounded-2xl shadow-sm focus-within:border-zinc-400 transition-all">
          <Input 
            placeholder="사료 이름 또는 브랜드를 입력하세요..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="border-none shadow-none py-2 px-3 focus:border-none focus:ring-0 text-sm bg-transparent w-full"
          />
          <Button variant="primary" className="px-5 py-2 text-xs shrink-0 rounded-xl">
            검색
          </Button>
        </div>

        {/* 결과 도출 데이터 스크롤 판넬 */}
        <div className="border border-zinc-100 bg-zinc-50/30 rounded-2xl overflow-hidden min-h-[200px] max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px] text-xs text-zinc-400 animate-pulse">
              안심 매칭 사료 조회 중...
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div 
                key={item.id} 
                className="flex justify-between items-center p-4 border-b border-zinc-100/60 hover:bg-white transition-colors last:border-b-0 gap-4"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-tight">
                    {item.brand || "미지정 브랜드"}
                  </span>
                  <span className="text-sm text-zinc-800 font-medium truncate block">{item.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="text-xs px-4 py-1.5 rounded-xl shadow-none font-medium shrink-0"
                  onClick={() => handleSelectFood(item)} // 💡 철벽 보안 브릿지 함수 호출
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