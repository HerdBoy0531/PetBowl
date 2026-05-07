"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`
        w-full px-4 py-3 outline-none transition-all
        bg-white dark:bg-gray-800
        text-black dark:text-white
        placeholder-gray-400 dark:placeholder-gray-500
        border border-gray-300 dark:border-gray-700
        focus:border-black dark:focus:border-gray-500
        ${className}
      `}
      {...props}
    />
  );
});

Input.displayName = "Input";
export default Input;