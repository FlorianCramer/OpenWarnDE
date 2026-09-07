"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "owner" | "developer" | "success" | "warning" | "danger" | "info" | "outline";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = "default", ...props }, ref) => {
  const variantStyles = {
    default: "bg-surface-muted text-foreground",
    owner: "bg-warning-muted text-warning-text ring-1 ring-warning",
    developer: "bg-info-muted text-info-text ring-1 ring-info",
    success: "bg-success-muted text-success-text ring-1 ring-success",
    warning: "bg-warning-muted text-warning-text ring-1 ring-warning",
    danger: "bg-danger-muted text-danger-text ring-1 ring-danger",
    info: "bg-info-muted text-info-text ring-1 ring-info",
    outline: "bg-transparent text-foreground-muted ring-1 ring-border",
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