// app/foods/[id]/page.tsx

type FoodDetail = {
  id: number;
  name: string;
  brand: string;
  animalType: string;
  lifeStage: string;
  sizeCategory: string;
  proteins: { proteinType: string; isPrimary: boolean }[];
  carbohydrates: { carbType: string }[];
  vegetables: { vegType: string }[];
};

async function getFood(id: string): Promise<FoodDetail> {
  const res = await fetch(`http://localhost:3000/api/foods/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch food");
  }

  return res.json();
}

export default async function FoodDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const food = await getFood(id);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 🐶 기본 정보 */}
      <div className="border rounded-2xl p-6 shadow mb-6">
        <h1 className="text-3xl font-bold mb-2">{food.name}</h1>
        <p className="text-gray-500">{food.brand}</p>

        <div className="mt-4 flex gap-4 text-sm">
          <span>🐾 {food.animalType}</span>
          <span>📊 {food.lifeStage}</span>
          <span>📦 {food.sizeCategory}</span>
        </div>
      </div>

      {/* 🍖 단백질 */}
      <div className="border rounded-2xl p-6 shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">🍖 주요 단백질</h2>
        <div className="flex flex-wrap gap-2">
          {food.proteins.map((p, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-full text-sm ${
                p.isPrimary
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {p.proteinType}
            </span>
          ))}
        </div>
      </div>

      {/* 🌾 탄수화물 */}
      <div className="border rounded-2xl p-6 shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">🌾 탄수화물</h2>
        <div className="flex flex-wrap gap-2">
          {food.carbohydrates.map((c, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-yellow-100 text-sm"
            >
              {c.carbType}
            </span>
          ))}
        </div>
      </div>

      {/* 🥦 야채 */}
      <div className="border rounded-2xl p-6 shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">🥦 야채</h2>
        <div className="flex flex-wrap gap-2">
          {food.vegetables.map((v, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-green-100 text-sm"
            >
              {v.vegType}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}