// "use client";

// import { useState } from "react";
// import FoodResultItem from "@molecules/FoodResultItem";
// import SearchBar from "@molecules/SearchBar";

// const foods = [
//   {
//     id: 1,
//     name: "말티즈 어덜트",
//     details: "Royal Canin | 강아지 | 일반식 | 소형 | 어덜트",
//   },
//   {
//     id: 2,
//     name: "슈나우저 어덜트",
//     details: "Royal Canin | 강아지 | 일반식 | 소형 | 어덜트",
//   },
// ];

// export default function FoodTableList() {
//   const [selectedItems, setSelectedItems] = useState<number[]>([]);

//   const handleCheck = (id: number, checked: boolean) => {
//     if (checked) {
//       if (selectedItems.length < 2) {
//         setSelectedItems((prev) => [...prev, id]);
//       }
//     } else {
//       setSelectedItems((prev) =>
//         prev.filter((item) => item !== id)
//       );
//     }
//   };

//   const isFull = selectedItems.length >= 2;

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex justify-between items-end gap-4">
//         <button
//           disabled={!isFull}
//           className={`px-4 py-1 text-sm font-bold rounded-t-md transition-colors ${
//             isFull
//               ? "bg-black text-white dark:bg-blue-600 cursor-pointer"
//               : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-default"
//           }`}
//         >
//           {selectedItems.length}/2 비교
//         </button>

//         <div className="flex-1 max-w-sm">
//           <SearchBar placeholder="사료를 입력해주세요" />
//         </div>
//       </div>

//       <div className="border-2 border-black dark:border-gray-700 rounded-sm overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
//         {foods.map((food) => (
//           <FoodResultItem
//             key={food.id}
//             name={food.name}
//             details={food.details}
//             onCheck={(checked: boolean) =>
//               handleCheck(food.id, checked)
//             }
//             disabled={
//               isFull &&
//               !selectedItems.includes(food.id)
//             }
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


// design renewal
// "use client";

// import { useState } from "react";
// import FoodResultItem from "@molecules/FoodResultItem";
// import SearchBar from "@molecules/SearchBar";

// export default function FoodTableList() {
//   const [selectedItems, setSelectedItems] = useState<number[]>([]);

//   const handleCheck = (id: number, checked: boolean) => {
//     if (checked) {
//       if (selectedItems.length < 2) {
//         setSelectedItems((prev) => [...prev, id]);
//       }
//     } else {
//       setSelectedItems((prev) =>
//         prev.filter((item) => item !== id)
//       );
//     }
//   };

//   const isFull = selectedItems.length >= 2;

//   return (
//     <div className="flex flex-col gap-4 animate-fade-in">
//       <div className="flex justify-between items-end gap-4">
//         <button
//           disabled={!isFull}
//           className={`px-5 py-2 text-xs font-semibold rounded-t-xl transition-all duration-200 border-t border-x ${
//             isFull
//               ? "bg-black text-white border-black cursor-pointer active:scale-95"
//               : "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-default"
//           }`}
//         >
//           {selectedItems.length}/2 비교
//         </button>

//         <div className="flex-1 max-w-sm">
//           <SearchBar placeholder="사료를 입력해주세요" />
//         </div>
//       </div>

//       <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
//         {foods.map((food) => (
//           <FoodResultItem
//             key={food.id}
//             name={food.name}
//             details={food.details}
//             // 💡 1. 여기에 현재 이 사료가 선택된 배열에 포함되어 있는지 여부(true/false)를 넘겨줍니다!
//             checked={selectedItems.includes(food.id)} 
//             onCheck={(checked: boolean) =>
//               handleCheck(food.id, checked)
//             }
//             disabled={
//               isFull &&
//               !selectedItems.includes(food.id)
//             }
//           />
//         ))}
//       </div>
//     </div>
//   );
// }



// data binding
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import FoodResultItem from "@molecules/FoodResultItem";
// import Input from "@/components/atoms/Input";
// import CompareStickyDock from "./CompareStickyDock"; // 💡 분리된 플로팅 바 수입

// interface Food {
//   id: number;
//   name: string;
//   brand: string;
//   animalType: string;
//   lifeStage: string;
//   sizeCategory: string;
//   mainProtein: string[];
// }

// interface FoodTableListProps {
//   foods: Food[];
//   total: number;
//   isLoading: boolean;
//   pagination: {
//     page: number;
//     limit: number;
//     sort: string;
//   };
//   onPageChange: (page: number) => void;
//   onSortChange: (sort: string) => void;
// }

// export default function FoodTableList({
//   foods,
//   total,
//   isLoading,
//   pagination,
//   onPageChange,
//   onSortChange,
// }: FoodTableListProps) {
//   const router = useRouter();
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [localSearch, setLocalSearch] = useState("");

//   // 토글 추가/삭제 로직
//   const handleToggleAdd = (id: number) => {
//     setSelectedIds((prev) => {
//       if (prev.includes(id)) return prev.filter((item) => item !== id);
//       if (prev.length >= 2) return prev;
//       return [...prev, id];
//     });
//   };

//   // 💡 스스티키 독 내부에서 호출할 삭제 전용 핸들러
//   const handleRemoveId = (id: number) => {
//     setSelectedIds((prev) => prev.filter((item) => item !== id));
//   };

//   const isMaxCapacity = selectedIds.length >= 2;

//   // 💡 선택된 고유 ID 배열을 기반으로 실제 매칭되는 사료 메타정보 조립 추출 (독 전달용)
//   const selectedFoodsData = selectedIds
//     .map((id) => foods.find((f) => f.id === id))
//     .filter(Boolean) as Food[];

//   // 비교 확정 라우팅 실행
//   const handleGoCompare = () => {
//     if (selectedIds.length === 2) {
//       router.push(`/compare?id1=${selectedIds[0]}&id2=${selectedIds[1]}`);
//     }
//   };

//   const filteredFoods = foods.filter((food) => {
//     // 💡 방어 코드: 속성이 없으면 빈 문자열로 취급하여 에러를 원천 봉쇄합니다.
//     const name = (food.name || "").toLowerCase();
//     const brand = (food.brand || "").toLowerCase();
//     const search = localSearch.toLowerCase();

//     return name.includes(search) || brand.includes(search);
//   });

//   const totalPages = Math.ceil(total / pagination.limit) || 1;

//   return (
//     <div className="flex flex-col gap-5 animate-fade-in w-full pb-24 relative">
      
//       {/* 💡 요구사항 1, 2번: 상단 제어 바 좌/우 종단 끝 레이아웃 재배치 */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-100 pb-3 w-full">
        
//         {/* [좌측 끝 묶음] 총 매칭 스펙 명세 + 정렬 셀렉트 박스 */}
//         <div className="flex items-center gap-3 text-xs w-full sm:w-auto">
//           <span className="text-[11px] text-zinc-400 font-light tracking-tight shrink-0">
//             총 <strong className="text-zinc-700 font-medium">{total}</strong>개의 안심 매칭
//           </span>
//           <select
//             value={pagination.sort}
//             onChange={(e) => onSortChange(e.target.value)}
//             className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-xs text-zinc-600 focus:border-zinc-400 outline-none transition-all cursor-pointer"
//           >
//             <option value="id">최신순</option>
//             <option value="name">이름순</option>
//             <option value="brand">브랜드순</option>
//           </select>
//         </div>

//         {/* [우측 끝 묶음] 결과 내 재검색 서치 바 인풋 */}
//         <div className="relative w-full sm:w-64">
//           <Input
//             type="text"
//             value={localSearch}
//             onChange={(e) => setLocalSearch(e.target.value)}
//             placeholder="결과 내 재검색..."
//             className="py-1.5 px-4 text-xs bg-zinc-50 border border-zinc-200/80 rounded-xl focus:bg-white focus:border-zinc-400 transition-all placeholder:text-zinc-400 w-full"
//           />
//         </div>
//       </div>

//       {/* B. 메인 사료 목록 카드판 */}
//       <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm min-h-[350px] flex flex-col">
//         {isLoading ? (
//           <div className="flex-1 flex items-center justify-center py-20 text-zinc-400 font-light text-xs animate-pulse">
//             안심 사료 정렬 매칭 중...
//           </div>
//         ) : filteredFoods.length === 0 ? (
//           <div className="flex-1 flex items-center justify-center py-20 text-zinc-400 font-light text-xs">
//             매칭된 사료 목록이 없습니다. 다른 필터를 선택해 주세요.
//           </div>
//         ) : (
//           <div className="divide-y divide-zinc-50">
//             {filteredFoods.map((food) => (
//               <FoodResultItem
//                 key={food.id}
//                 id={food.id}
//                 name={food.name}
//                 brand={food.brand}
//                 details={`${food.animalType === "dog" ? "🐶 강아지" : "🐱 고양이"} · ${food.lifeStage} · ${food.sizeCategory}`}
//                 mainProtein={food.mainProtein}
//                 isAdded={selectedIds.includes(food.id)}
//                 onToggleAdd={() => handleToggleAdd(food.id)}
//                 isMaxCapacity={isMaxCapacity}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* C. 하단 페이징 컨트롤러 */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-2 pt-2">
//           <button
//             disabled={pagination.page <= 1}
//             onClick={() => onPageChange(pagination.page - 1)}
//             className="px-3 py-1.5 border border-zinc-200 rounded-xl text-xs font-light text-zinc-500 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//           >
//             이전
//           </button>
//           <div className="flex gap-1 text-xs font-mono font-light text-zinc-400 px-1">
//             <span className="text-zinc-700 font-medium">{pagination.page}</span>
//             <span>/</span>
//             <span>{totalPages}</span>
//           </div>
//           <button
//             disabled={pagination.page >= totalPages}
//             onClick={() => onPageChange(pagination.page + 1)}
//             className="px-3 py-1.5 border border-zinc-200 rounded-xl text-xs font-light text-zinc-500 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//           >
//             다음
//           </button>
//         </div>
//       )}

//       {/* 👑 독립 분리 완료: 화면에 상시 떠서 실시간 관제 및 개별 삭제가 가능한 플로팅 스스티키 독 */}
//       <CompareStickyDock
//             selectedFoods={selectedFoodsData}
//             onRemove={handleRemoveId}
//             onCompare={handleGoCompare}
//       />

//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FoodResultItem from "@molecules/FoodResultItem";
import Input from "@/components/atoms/Input";
import CompareStickyDock from "./CompareStickyDock"; // 💡 분리된 플로팅 바 수입

interface Food {
  id: number;
  nameKo: string;
  brandEn: string;
  animalType: string;
  allergies: string[];
  mainProtein: string[];
  kibbleSize?: number | null;
  price: number;
}

interface FoodTableListProps {
  foods: Food[];
  total: number;
  isLoading: boolean;
  pagination: {
    page: number;
    limit: number;
    sort: string;
  };
  onPageChange: (page: number) => void;
  onSortChange: (sort: string) => void;
}

export default function FoodTableList({
  foods,
  total,
  isLoading,
  pagination,
  onPageChange,
  onSortChange,
}: FoodTableListProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [localSearch, setLocalSearch] = useState("");

  // 토글 추가/삭제 로직
  const handleToggleAdd = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  // 💡 스스티키 독 내부에서 호출할 삭제 전용 핸들러
  const handleRemoveId = (id: number) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const isMaxCapacity = selectedIds.length >= 2;

  // 💡 선택된 고유 ID 배열을 기반으로 실제 매칭되는 사료 메타정보 조립 추출 (독 전달용)
  const selectedFoodsData = selectedIds
    .map((id) => foods.find((f) => f.id === id))
    .filter(Boolean) as Food[];

  // 비교 확정 라우팅 실행
  const handleGoCompare = () => {
    if (selectedIds.length === 2) {
      router.push(`/compare?id1=${selectedIds[0]}&id2=${selectedIds[1]}`);
    }
  };

  const filteredFoods = foods.filter((food) => {
    const name = (food.nameKo || "").toLowerCase();
    const brand = (food.brandEn || "").toLowerCase();
    const search = localSearch.toLowerCase();

    return name.includes(search) || brand.includes(search);
  });

  const totalPages = Math.ceil(total / pagination.limit) || 1;

  return (
    <div className="flex flex-col gap-5 animate-fade-in w-full pb-24 relative">
      
      {/* 💡 요구사항 1, 2번: 상단 제어 바 좌/우 종단 끝 레이아웃 재배치 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-100 pb-3 w-full">
        
        {/* [좌측 끝 묶음] 총 매칭 스펙 명세 + 정렬 셀렉트 박스 */}
        <div className="flex items-center gap-3 text-xs w-full sm:w-auto">
          <span className="text-[11px] text-zinc-400 font-light tracking-tight shrink-0">
            총 <strong className="text-zinc-700 font-medium">{total}</strong>개의 안심 매칭
          </span>
          <select
            value={pagination.sort}
            onChange={(e) => {
              const currentScroll = window.scrollY;
              onSortChange(e.target.value);

              requestAnimationFrame(() => {
                window.scrollTo({
                  top: currentScroll,
                  behavior: "smooth",
                })
              })
            }}
            className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-xs text-zinc-600 focus:border-zinc-400 outline-none transition-all cursor-pointer"
          >
            <option value="popular">인기순</option>
            <option value="name">이름순</option>
            <option value="price">가격순</option>
          </select>
        </div>

        {/* [우측 끝 묶음] 결과 내 재검색 서치 바 인풋 */}
        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="결과 내 재검색..."
            className="py-1.5 px-4 text-xs bg-zinc-50 border border-zinc-200/80 rounded-xl focus:bg-white focus:border-zinc-400 transition-all placeholder:text-zinc-400 w-full"
          />
        </div>
      </div>

      {/* B. 메인 사료 목록 카드판 */}
      <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm flex flex-col">
        {isLoading ? (
          <div className="min-h-[350px] flex-1 flex items-center justify-center py-20 text-zinc-400 font-light text-xs animate-pulse">
            안심 사료 정렬 매칭 중...
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-20 text-zinc-400 font-light text-xs">
            매칭된 사료 목록이 없습니다. 다른 필터를 선택해 주세요.
          </div>
        ) : (
          <div className="divide-y divide-zinc-50">
            {filteredFoods.map((food) => (
              <FoodResultItem
                key={food.id}
                id={food.id}
                nameKo={food.nameKo}
                brandEn={food.brandEn}
                animalType={food.animalType}
                allergies={food.allergies ?? []}
                mainProtein={food.mainProtein ?? []}
                kibbleSize={food.kibbleSize}
                price={food.price ?? 0}
                isAdded={selectedIds.includes(food.id)}
                onToggleAdd={() => handleToggleAdd(food.id)}
                isMaxCapacity={isMaxCapacity}
              />
            ))}
          </div>
        )}
      </div>

      {/* C. 하단 페이징 컨트롤러 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-2">
          <button
            disabled={pagination.page <= 1}
            onClick={() => onPageChange(pagination.page - 1)}
            className="px-3 py-1.5 border border-zinc-200 rounded-xl text-xs font-light text-zinc-500 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            이전
          </button>
          <div className="flex gap-1 text-xs font-mono font-light text-zinc-400 px-1">
            <span className="text-zinc-700 font-medium">{pagination.page}</span>
            <span>/</span>
            <span>{totalPages}</span>
          </div>
          <button
            disabled={pagination.page >= totalPages}
            onClick={() => onPageChange(pagination.page + 1)}
            className="px-3 py-1.5 border border-zinc-200 rounded-xl text-xs font-light text-zinc-500 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            다음
          </button>
        </div>
      )}

      {/* 👑 독립 분리 완료: 화면에 상시 떠서 실시간 관제 및 개별 삭제가 가능한 플로팅 스스티키 독 */}
      <CompareStickyDock
            selectedFoods={selectedFoodsData}
            onRemove={handleRemoveId}
            onCompare={handleGoCompare}
      />

    </div>
  );
}