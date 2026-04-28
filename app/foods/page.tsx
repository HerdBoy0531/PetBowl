// type Food = {
//   id: number;
//   name: string;
//   brand: string;
//   animalType: string;
//   lifeStage: string;
//   sizeCategory: string;
//   mainProtein: string[];
// };

// type ApiResponse = {
//   data: Food[];
//   total: number;
//   page: number;
//   limit: number;
// };

// async function getFoods(): Promise<ApiResponse> {
//   const res = await fetch("http://localhost:3000/api/foods?page=1&limit=10", {
//     cache: "no-store", // 최신 데이터
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch foods");
//   }

//   return res.json();
// }

// export default async function FoodsPage() {
//   const { data, total, page, limit } = await getFoods();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">🐶 사료 리스트</h1>

//       <p className="mb-4 text-gray-500">
//         총 {total}개 / 페이지 {page}
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {data.map((food) => (
//           <div
//             key={food.id}
//             className="border rounded-xl p-4 shadow hover:shadow-md transition"
//           >
//             <h2 className="text-lg font-semibold">{food.name}</h2>
//             <p className="text-sm text-gray-500">{food.brand}</p>

//             <div className="mt-2 text-sm">
//               <p>🐾 {food.animalType}</p>
//               <p>📊 {food.lifeStage}</p>
//               <p>📦 {food.sizeCategory}</p>
//             </div>

//             <div className="mt-2 text-sm">
//               🍖 {food.mainProtein.join(", ")}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// app/foods/page.tsx

import FoodList from "./FoodList";

export default async function FoodsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams; // ✅ 핵심

  const page = Number(params.page ?? 1);
  const search = params.search ?? "";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🐶 사료 리스트</h1>

      <FoodList page={page} search={search} />
    </div>
  );
}