interface CompareAddButtonProps {
  onClick: () => void;
}

export default function CompareAddButton({ onClick }: CompareAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full h-full group"
    >
      <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-5xl font-light text-gray-400 group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition-colors">
        +
      </div>
      <p className="mt-4 text-gray-500 dark:text-gray-400">사료를 추가해주세요</p>
    </button>
  );
}