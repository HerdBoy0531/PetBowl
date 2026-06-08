"use client";

// 표준 HTML input 속성을 모두 상속받도록 인터페이스 확장
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, className = "", ...props }: CheckboxProps) {
  return (
    <label 
      className={`
        flex items-center gap-3 cursor-pointer select-none text-sm transition-all
        /* 비활성화(disabled) 상태일 때 시각적으로 부드럽게 톤다운 */
        ${props.disabled ? "opacity-40 cursor-not-allowed text-zinc-400" : "text-zinc-700 hover:text-black"}
      `}
    >
      <input
        type="checkbox"
        className={`
          /* 미니멀 오가닉 포인트: 아주 살짝 라운딩된 사각형, zinc 컬러 적용 */
          w-4 h-4 rounded border-zinc-300 text-black 
          
          /* 포커스 및 선택 시 링 효과 제거하여 정갈함 유지 */
          focus:ring-0 focus:ring-offset-0 cursor-pointer
          disabled:cursor-not-allowed
          
          ${className}
        `}
        {...props}
      />
      
      {/* 체크 여부에 따라 텍스트 굵기를 다르게 하여 직관성 부여 */}
      <span className={`${props.checked ? "font-semibold text-black" : "font-light text-zinc-600"}`}>
        {label}
      </span>
    </label>
  );
}