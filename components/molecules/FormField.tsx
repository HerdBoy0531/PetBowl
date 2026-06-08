interface FormFieldProps {
  label: string;
  children: React.ReactNode; // ✅ 태그 사이의 내용을 받기 위해 추가
}

export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2 mb-6 w-full">
      <label className="text-lg font-bold dark:text-white uppercase tracking-tight">
        {label}
      </label>
      
      {children}
    </div>
  );
}