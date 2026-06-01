"use client";

interface InfoModalProps {
  isOpen: boolean;

  title: string;

  description?: string;

  type?: "success" | "error" | "warning";

  onConfirm: () => void;
}

export default function InfoModal({
  isOpen,
  title,
  description,
  type = "success",
  onConfirm,
}: InfoModalProps) {
  if (!isOpen) return null;

  const buttonClass =
    type === "success"
      ? "bg-black text-white hover:bg-zinc-800"
      : type === "warning"
      ? "bg-orange-500 text-white hover:bg-orange-600"
      : "bg-red-500 text-white hover:bg-red-600";

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl w-[360px] p-6">
        <h2 className="text-lg font-bold text-zinc-900 mb-2">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-zinc-500 mb-6">
            {description}
          </p>
        )}

        <button
          onClick={onConfirm}
          className={`w-full py-3 rounded-2xl font-medium transition ${buttonClass}`}
        >
          확인
        </button>
      </div>
    </div>
  );
}