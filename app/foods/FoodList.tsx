"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type Food = {
  id: number;
  name: string;
  brand: string;
  mainProtein: string[];
};

type ApiResponse = {
  data: Food[];
  total: number;
  page: number;
  limit: number;
};

export default function FoodList({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [foods, setFoods] = useState<Food[]>([]);
  const [total, setTotal] = useState(0);
  const [input, setInput] = useState(search);

  useEffect(() => {
    fetch(
      `/api/foods?page=${page}&limit=6&search=${input}`
    )
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        setFoods(data.data);
        setTotal(data.total);
      });
  }, [page, input]);

  const totalPages = Math.ceil(total / 6);

  // 페이지 이동
  const goToPage = (newPage: number) => {
    const query = new URLSearchParams(params.toString());
    query.set("page", String(newPage));
    router.push(`/foods?${query.toString()}`);
  };

  // 검색
  const handleSearch = () => {
    const query = new URLSearchParams();
    query.set("search", input);
    query.set("page", "1");
    router.push(`/foods?${query.toString()}`);
  };

  // 필터
  const updateFilter = (key: string, value: string) => {
    const query = new URLSearchParams(params.toString());

    if (value) {
      query.set(key, value);
    } else {
      query.delete(key);
    }

    query.set("page", "1"); // 필터 바뀌면 페이지 초기화

    router.push(`/foods?${query.toString()}`);
  };

  useEffect(() => {
    const query = new URLSearchParams(params.toString());

    fetch(`/api/foods?${query.toString()}`)
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        setFoods(data.data);
        setTotal(data.total);
      });
  }, [params]);

  return (
    <div>
      {/* 검색 */}
      <div className="mb-4 flex gap-2">
        <input
          className="border p-2 rounded w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="사료 검색..."
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 rounded"
        >
          검색
        </button>
      </div>

      {/* 필터 */}
      <div className="mb-4 flex gap-2">

        {/* 정렬 UI */}
        <select
          className="border p-2 rounded"
          value={params.get("sort") ?? ""}
          onChange={(e) => updateFilter("sort", e.target.value)}
        >
          <option value="">최신순</option>
          <option value="name">이름순</option>
          <option value="brand">브랜드순</option>
        </select>

        {/* animalType */}
        <select
          className="border p-2 rounded"
          value={params.get("animalType") ?? ""}
          onChange={(e) => updateFilter("animalType", e.target.value)}
        >
          <option value="">전체 동물</option>
          <option value="dog">강아지</option>
          <option value="cat">고양이</option>
        </select>

        {/* lifeStage */}
        <select
          className="border p-2 rounded"
          value={params.get("lifeStage") ?? ""}
          onChange={(e) => updateFilter("lifeStage", e.target.value)}
        >
          <option value="">전체 연령</option>
          <option value="puppy">퍼피</option>
          <option value="adult">어덜트</option>
          <option value="senior">시니어</option>
        </select>

        {/* 초기화 버튼 */}
        <button
          onClick={() => router.push("/foods")}
          className="px-3 py-1 border rounded"
        >
          초기화
        </button>
      </div>
      

      {/* 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <Link href={`/foods/${food.id}`} key={food.id}>
            <div className="border p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer">
              <h2 className="font-bold">{food.name}</h2>
              <p className="text-sm text-gray-500">{food.brand}</p>

              <p className="text-sm mt-2">
                🍖 {food.mainProtein.join(", ")}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
          className="px-3 py-1 border rounded"
        >
          이전
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => goToPage(page + 1)}
          className="px-3 py-1 border rounded"
        >
          다음
        </button>
      </div>
    </div>
  );
}