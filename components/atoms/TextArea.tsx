"use client";

import { forwardRef } from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`
        w-full px-4 py-3 outline-none transition-all min-h-[200px] resize-none
        bg-white dark:bg-gray-800
        text-black dark:text-white
        placeholder-gray-400 dark:placeholder-gray-500
        border-2 border-black dark:border-gray-700
        focus:ring-2 focus:ring-yellow-400
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]
        ${className}
      `}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea";
export default TextArea;