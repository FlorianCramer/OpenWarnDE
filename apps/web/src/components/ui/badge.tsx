"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "owner"
  | "developer"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

export type WarningSeverity = "low" | "moderate" | "high" | "severe" | "extreme";

const SEVERITY_LABELS: Record<WarningSeverity, string> = {
  low: "Gering",
  moderate: "Mäßig",
  high: "Hoch",
  severe: "Sehr hoch",
  extreme: "Extrem",
};

const SEVERITY_STYLES: Record<WarningSeverity, string> = {
  low: "bg-severity-low-bg text-severity-low-text border-severity-low/40",
  moderate: "bg-severity-moderate-bg text-severity-moderate-text border-severity-moderate/40",
  high: "bg-severity-high-bg text-severity-high-text border-severity-high/40",
  severe: "bg-severity-severe-bg text-severity-severe-text border-severity-severe/40",
  extreme: "bg-severity-extreme-bg text-severity-extreme-text border-severity-extreme/40",
};

const SEVERITY_DOT: Record<WarningSeverity, string> = {
  low: "bg-severity-low",
  moderate: "bg-severity-moderate",
  high: "bg-severity-high",
  severe: "bg-severity-severe",
  extreme: "bg-severity-extreme",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  severity?: WarningSeverity;
  showDot?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", severity, showDot, size = "md", children, ...props }, ref) => {
    const sizeStyles = {
      sm: "px-2 py-0.5 text-[10px]",
      md: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-1 text-sm font-semibold",
    };

    const variantStyles: Record<BadgeVariant, string> = {
      default: "bg-surface-muted text-foreground border border-border",
      primary: "bg-primary-muted text-primary border border-primary/30",
      secondary: "bg-secondary-muted text-secondary border border-secondary/30",
      owner: "bg-warning-muted text-warning-text border border-warning/40",
      developer: "bg-info-muted text-info-text border border-info/40",
      success: "bg-success-muted text-success-text border border-success/40",
      warning: "bg-warning-muted text-warning-text border border-warning/40",
      danger: "bg-danger-muted text-danger-text border border-danger/40",
      info: "bg-info-muted text-info-text border border-info/40",
      outline: "bg-transparent text-foreground-muted border border-border",
    };

    // If severity is passed, prioritize severity style
    if (severity) {
      const displayDot = showDot !== undefined ? showDot : true;
      return (
        <span
          ref={ref}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide transition-colors",
            sizeStyles[size],
            SEVERITY_STYLES[severity],
            className
          )}
          {...props}
        >
          {displayDot && (
            <span
              className={cn("h-2 w-2 rounded-full", SEVERITY_DOT[severity])}
              aria-hidden="true"
            />
          )}
          {children ?? SEVERITY_LABELS[severity]}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {showDot && (
          <span
            className="h-1.5 w-1.5 rounded-full bg-current opacity-80"
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

// Convenience alias for Styleguide §9 & §10
export interface WarningBadgeProps extends BadgeProps {
  severity: WarningSeverity;
}

export const WarningBadge = React.forwardRef<HTMLSpanElement, WarningBadgeProps>(
  (props, ref) => <Badge ref={ref} {...props} />
);

WarningBadge.displayName = "WarningBadge";