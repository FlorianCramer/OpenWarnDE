"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "owner" | "developer";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = "default", ...props }, ref) => {
  const variantStyles = {
    default: "bg-[#eef2f5] text-[#334155]",
    owner: "bg-[#fef3e2] text-[#b45309] ring-1 ring-[#fcd34d]",
    developer: "bg-[#eef2ff] text-[#4f46e5] ring-1 ring-[#c7d2fe]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Badge.displayName = "Badge";
