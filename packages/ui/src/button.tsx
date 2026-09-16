"use client";

import * as React from "react";
import { cn } from "./utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "default"
  | "destructive"
  | "link";

export type ButtonSize = "default" | "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      disabled,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const variants: Record<ButtonVariant, string> = {
      primary: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
      default: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active",
      outline: "border border-border bg-surface text-foreground hover:bg-surface-muted active:bg-border/30",
      ghost: "text-foreground hover:bg-surface-muted active:bg-border/20 shadow-none",
      danger: "bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-hover/90",
      destructive: "bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-hover/90",
      link: "text-primary underline-offset-4 hover:underline shadow-none p-0 h-auto font-normal",
    };
    const sizes: Record<ButtonSize, string> = {
      sm: "h-8 px-3 text-xs",
      default: "h-10 px-4 py-2 text-sm",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-6 py-3 text-base",
      icon: "h-10 w-10 p-2 text-sm",
    };

    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-semibold shadow-xs transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed select-none",
          variants[variant],
          variant !== "link" && sizes[size],
          className,
        )}
      >
        {loading ? <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";

export type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement>;

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      role="group"
      className={cn(
        "inline-flex rounded-lg shadow-xs [&>button]:rounded-none [&>button:first-child]:rounded-l-lg [&>button:last-child]:rounded-r-lg [&>button:not(:first-child)]:-ml-px",
        className,
      )}
    />
  ),
);

ButtonGroup.displayName = "ButtonGroup";