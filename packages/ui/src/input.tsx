"use client";

import * as React from "react";
import { cn } from "./utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error = false, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      type={type}
      aria-invalid={error ? "true" : undefined}
      className={cn(
        "flex h-12 w-full rounded-md border bg-surface px-4 py-3 text-sm text-foreground shadow-xs transition-colors duration-150",
        "placeholder:text-foreground-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
        error
          ? "border-danger focus-visible:border-danger focus-visible:ring-danger"
          : "border-border focus-visible:border-primary focus-visible:ring-primary",
        "disabled:pointer-events-none disabled:opacity-50 disabled:bg-surface-muted",
        type === "search" && "[&::-webkit-search-cancel-button]:hidden",
        className,
      )}
    />
  ),
);

Input.displayName = "Input";

export type SearchInputProps = InputProps & { icon?: React.ReactNode };

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, icon, "aria-label": ariaLabel = "Suchen", ...props }, ref) => (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle">
        {icon ?? (
          <span
            aria-hidden="true"
            className="relative block h-3 w-3 rounded-full border-2 border-current after:absolute after:-bottom-1 after:-right-1 after:h-1.5 after:w-0.5 after:rotate-[-45deg] after:bg-current"
          />
        )}
      </span>
      <Input {...props} ref={ref} type="search" aria-label={ariaLabel} className={cn("pl-10", className)} />
    </div>
  ),
);

SearchInput.displayName = "SearchInput";