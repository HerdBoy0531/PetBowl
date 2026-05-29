"use client";

interface FoodFeatureCardProps {
  title: string;
  items: string[];
}

export default function FoodFeatureCard({
  title,
  items,
}: FoodFeatureCardProps) {
  return (
    <div className="bg-white border border-zinc-100 rounded-3xl shadow-sm p-6">
      <h3 className="text-base font-bold text-zinc-900 mb-4">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-sm text-zinc-700"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm text-zinc-400">
            정보 없음
          </span>
        )}
      </div>
    </div>
  );
}