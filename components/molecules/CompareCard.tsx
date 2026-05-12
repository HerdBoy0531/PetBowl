interface Nutrient {
  label: string;
  value: string;
}

interface CompareCardProps {
  name: string;
  nutrients: Nutrient[];
  onRemove: () => void;
}

export default function CompareCard({ name, nutrients, onRemove }: CompareCardProps) {
  return (
    <div className="relative w-full h-full p-6 flex flex-col items-center">
      <button 
        onClick={onRemove}
        className="absolute top-2 right-2 text-xs border px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        다른 사료
      </button>
      <h2 className="text-4xl font-bold mt-10 mb-8 dark:text-white">{name}</h2>
      <div className="w-full space-y-4">
        {nutrients.map((n, idx) => (
          <div key={idx} className="border-b pb-2 flex justify-between dark:border-gray-700">
            <span className="text-gray-500 dark:text-gray-400">{n.label}</span>
            <span className="font-medium dark:text-white">{n.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}