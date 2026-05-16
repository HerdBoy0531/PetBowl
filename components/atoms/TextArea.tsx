// "use client";

// import { forwardRef } from "react";

// interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className = "", ...props }, ref) => {
//   return (
//     <textarea
//       ref={ref}
//       className={`
//         w-full px-4 py-3 outline-none transition-all min-h-[200px] resize-none
//         bg-white dark:bg-gray-800
//         text-black dark:text-white
//         placeholder-gray-400 dark:placeholder-gray-500
//         border-2 border-black dark:border-gray-700
//         focus:ring-2 focus:ring-yellow-400
//         shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]
//         ${className}
//       `}
//       {...props}
//     />
//   );
// });

// TextArea.displayName = "TextArea";
// export default TextArea;


"use client";

import { forwardRef } from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// 💡 forwardRef 구조를 유지하여 부모 컴포넌트(Form)에서의 접근성을 보장합니다.
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`
        /* 기본 크기 및 레이아웃: 여백을 넓혀 글쓰기 쾌적함 확보 */
        w-full px-5 py-4 outline-none transition-all duration-200 min-h-[200px] resize-none
        
        /* 미니멀 오가닉 서체: 정갈한 text-sm, 부드러운 자간 및 얇은 두께(font-light) */
        bg-white text-black text-sm font-light leading-relaxed
        placeholder:text-zinc-400
        
        /* 테두리 및 라운딩: 부드러운 곡률(rounded-2xl)과 깨끗한 Zinc 라인 */
        border border-zinc-200 rounded-2xl
        
        /* 인터랙션: 포커스 시 쨍한 노란색 링 대신, 선만 차분하게 톤다운(focus:border-zinc-400) */
        focus:border-zinc-400 focus:ring-0
        shadow-none
        
        ${className}
      `}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea";
export default TextArea;