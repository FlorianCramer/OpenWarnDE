"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", size = "default", disabled, ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#184e63] disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    default: "bg-[#184e63] text-white hover:bg-[#143d54]",
    outline: "border border-[#dfe5ec] bg-white text-[#334155] hover:bg-[#eef2f5]",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeClasses = {
    default: "px-4 py-2 text-sm",
    sm: "px-2 py-1 text-xs",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";
