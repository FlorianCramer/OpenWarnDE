"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-[#dfe5ec] bg-white px-3 py-2 text-sm text-[#172033]",
        "placeholder:text-[#8a94a6] focus:border-[#184e63] focus:outline-none focus:ring-2 focus:ring-[#184e63]/20",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
