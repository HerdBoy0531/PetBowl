"use client";

interface CompareAddButtonProps {
  onClick: () => void;
}

export default function CompareAddButton({ onClick }: CompareAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full h-full group py-8 transition-all select-none focus:outline-none"
    >
      <div className="w-20 h-20 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-4xl font-light text-zinc-400 group-hover:bg-zinc-100/80 group-hover:text-zinc-600 shadow-inner transition-all duration-200 active:scale-95">
        +
      </div>
      <p className="mt-4 text-zinc-400 font-light text-xs tracking-wide group-hover:text-zinc-700 transition-colors">
        비교할 사료 추가하기
      </p>
    </button>
  );
}