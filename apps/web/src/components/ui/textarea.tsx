"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      label,
      helperText,
      required,
      showCount = false,
      maxLength,
      value,
      defaultValue,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [characterCount, setCharacterCount] = React.useState(0);
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;

    // Character count tracking
    React.useEffect(() => {
      if (showCount && maxLength) {
        const currentValue = (value as string) || (defaultValue as string) || "";
        setCharacterCount(currentValue.length);
      }
    }, [value, defaultValue, showCount, maxLength]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (showCount && maxLength) {
        setCharacterCount(e.target.value.length);
      }
      props.onChange?.(e);
    };

    const isError = Boolean(error);
    const countExceeded = Boolean(showCount && maxLength && characterCount > maxLength);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "block text-sm font-medium text-foreground",
              disabled && "opacity-50 cursor-not-allowed",
              isError && "text-danger"
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-danger" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <textarea
            id={textareaId}
            ref={ref}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-invalid={isError}
            aria-describedby={
              error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
            }
            className={cn(
              "flex min-h-[80px] w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-foreground shadow-xs transition-colors",
              "placeholder:text-foreground-subtle",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
              isError
                ? "border-danger focus-visible:border-danger focus-visible:ring-danger"
                : "border-border focus-visible:border-primary focus-visible:ring-primary",
              "disabled:pointer-events-none disabled:opacity-50 disabled:bg-surface-muted",
              className
            )}
            {...props}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          {error ? (
            <p id={`${textareaId}-error`} className="text-danger font-medium">
              {error}
            </p>
          ) : helperText ? (
            <p id={`${textareaId}-helper`} className="text-foreground-muted">
              {helperText}
            </p>
          ) : (
            <span />
          )}

          {showCount && maxLength && (
            <span
              className={cn(
                "text-foreground-subtle",
                countExceeded && "text-danger font-medium"
              )}
            >
              {characterCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";