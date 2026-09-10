"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-surface px-3.5 py-2 text-sm text-foreground shadow-xs transition-colors",
          "placeholder:text-foreground-subtle",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          error
            ? "border-danger focus-visible:border-danger focus-visible:ring-danger"
            : "border-border focus-visible:border-primary focus-visible:ring-primary",
          "disabled:pointer-events-none disabled:opacity-50 disabled:bg-surface-muted",
          className
        )}
        aria-invalid={error ? "true" : undefined}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";