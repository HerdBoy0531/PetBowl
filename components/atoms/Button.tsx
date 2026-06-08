"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  // 공통 스타일 (미니멀 오가닉 포인트: 큰 곡률, 부드러운 애니메이션)
  const baseStyles = "px-6 py-3 rounded-2xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  // 너비 설정
  const widthStyle = fullWidth ? "w-full" : "w-fit";

  // 변체 스타일 (포인트: 다크모드 클래스 제거 및 부드러운 색감)
  const variants = {
    // 메인 버튼: 검정 배경 + 흰 글씨 (가장 가독성 높음)
    primary: "bg-black text-white hover:bg-zinc-800 shadow-sm",
    
    // 보조 버튼: 아주 연한 회색/베이지 배경 + 검정 글씨
    secondary: "bg-zinc-100 text-black hover:bg-zinc-200 shadow-none",
    
    // 외곽선 버튼: 얇은 테두리 + 검정 글씨
    outline: "border border-zinc-200 bg-white text-black hover:bg-zinc-50 hover:border-zinc-300 shadow-sm",
  };

  return (
    <button
      className={`${baseStyles} ${widthStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}