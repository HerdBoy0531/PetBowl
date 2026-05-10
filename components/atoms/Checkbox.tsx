"use client";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group py-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black dark:bg-gray-800 dark:border-gray-600"
      />
      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}