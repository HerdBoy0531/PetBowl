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
  const [dbFoods, setDbFoods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchModalFoods() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/foods?limit=100", { cache: "no-store" });
        if (res.ok) {
          const result = await res.json();
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

  const filteredResults = Array.isArray(dbFoods)
    ? dbFoods.filter((item) => {
        if (!search.trim()) return true;

        return (
          item.nameKo?.toLowerCase().includes(search.toLowerCase()) ||
          item.brandEn?.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];

  const handleSelectFood = (item: any) => {
    try {
      onAdd(item); 
    } catch (error) {
      console.error("부모 컴포넌트에 사료 적재 중 에러 발생 가드 작동:", error);
    } finally {

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
                    {item.brandEn || "미지정 브랜드"}
                  </span>
                  <span className="text-sm text-zinc-800 font-medium truncate block">{item.nameKo}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="text-xs px-4 py-1.5 rounded-xl shadow-none font-medium shrink-0"
                  onClick={() => handleSelectFood(item)}
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