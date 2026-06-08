"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`
        w-full px-5 py-4 outline-none transition-all duration-200
        /* 배경 및 글자색: 라이트 모드 고정 */
        bg-white text-black 
        placeholder:text-zinc-400
        
        /* 테두리: 얇고 부드러운 zinc 계열 사용 */
        border border-zinc-200
        
        /* 미니멀 오가닉 포인트: 큰 곡률과 미세한 그림자 */
        rounded-2xl shadow-sm
        
        /* 포커스 상태: 테두리색만 살짝 짙어지게 하여 깔끔함 유지 */
        focus:border-zinc-400 focus:ring-0
        
        /* 비활성화 상태 */
        disabled:bg-zinc-50 disabled:cursor-not-allowed
        
        ${className}
      `}
      {...props}
    />
  );
});

Input.displayName = "Input";
export default Input;