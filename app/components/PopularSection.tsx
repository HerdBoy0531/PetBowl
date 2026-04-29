import Link from "next/link";

const dummyFoods = [
  { id: 1, name: "오리 단백질 사료", brand: "Brand A" },
  { id: 2, name: "연어 저알러지 사료", brand: "Brand B" },
  { id: 3, name: "닭고기 고단백 사료", brand: "Brand C" },
  { id: 4, name: "소고기 프리미엄 사료", brand: "Brand D" },
];

export default function PopularSection() {
  return (
    <section className="
      py-12 px-4
      bg-gray-50 dark:bg-gray-900
    ">
      {/* 제목 */}
      <h2 className="
        text-xl font-bold mb-6
        text-black dark:text-white
      ">
        🔥 인기 사료
      </h2>

      {/* 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dummyFoods.map((food) => (
          <Link href={`/foods/${food.id}`} key={food.id}>
            <div className="
              border p-4 rounded-xl
              shadow-sm hover:shadow-md transition cursor-pointer
              bg-white dark:bg-gray-800
              text-black dark:text-white
              border-gray-200 dark:border-gray-700
            ">
              <h3 className="font-bold mb-1">{food.name}</h3>

              <p className="
                text-sm
                text-gray-500 dark:text-gray-400
              ">
                {food.brand}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}