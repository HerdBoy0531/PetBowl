interface FormFieldProps {
  label: string;
  children: React.ReactNode; // ✅ 태그 사이의 내용을 받기 위해 추가
}

export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2 mb-6 w-full">
      {/* 라벨 디자인 (PetBowl 스타일) */}
      <label className="text-lg font-bold dark:text-white uppercase tracking-tight">
        {label}
      </label>
      
      {/* ✅ 이 자리에 RequestForm에서 넣은 <input>이나 <TextArea>가 렌더링됩니다 */}
      {children}
    </div>
  );
}