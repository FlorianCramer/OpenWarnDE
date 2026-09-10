"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge, type WarningSeverity } from "./badge";

export type CardVariant = "default" | "muted" | "outline" | "elevated";

const SEVERITY_CARD_STYLES: Record<WarningSeverity, string> = {
  low: "border-severity-low/50 bg-surface shadow-xs",
  moderate: "border-severity-moderate/50 bg-surface shadow-xs",
  high: "border-severity-high/50 bg-surface shadow-xs",
  severe: "border-severity-severe/60 bg-surface shadow-sm",
  extreme: "border-severity-extreme/70 bg-surface shadow-md",
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  severity?: WarningSeverity;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", severity, ...props }, ref) => {
    const variantStyles: Record<CardVariant, string> = {
      default: "border-border bg-surface shadow-xs",
      muted: "border-border bg-surface-muted/60 shadow-none",
      outline: "border-border-strong bg-transparent shadow-none",
      elevated: "border-border bg-surface shadow-lg",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border p-6 text-foreground transition-all",
          severity ? SEVERITY_CARD_STYLES[severity] : variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("mb-4 flex flex-col space-y-1.5", className)} {...props} />;
  }
);

CardHeader.displayName = "CardHeader";

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("text-lg font-bold tracking-tight text-foreground", className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-foreground-muted", className)}
        {...props}
      />
    );
  }
);

CardDescription.displayName = "CardDescription";

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-sm text-foreground-muted", className)} {...props} />
    );
  }
);

CardContent.displayName = "CardContent";

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mt-6 flex items-center justify-end gap-3", className)} {...props} />
    );
  }
);

CardFooter.displayName = "CardFooter";

// Unified WarningCard component per Styleguide §14, §17, §31
export interface WarningCardProps extends React.HTMLAttributes<HTMLDivElement> {
  severity: WarningSeverity;
  title: string;
  location?: string;
  date?: string;
  description?: string;
  action?: React.ReactNode;
}

export const WarningCard = React.forwardRef<HTMLDivElement, WarningCardProps>(
  ({ severity, title, location, date, description, action, className, children, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl border p-5 transition-shadow hover:shadow-md",
          SEVERITY_CARD_STYLES[severity],
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge severity={severity} />
                {location && (
                  <span className="text-xs font-medium text-foreground-muted">
                    {location}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold tracking-tight text-foreground">
                {title}
              </h3>
            </div>
            {date && (
              <span className="text-xs text-foreground-subtle whitespace-nowrap">
                {date}
              </span>
            )}
          </div>

          {description && (
            <p className="text-sm leading-relaxed text-foreground-muted">
              {description}
            </p>
          )}

          {children}

          {action && (
            <div className="mt-2 flex items-center justify-end gap-2 pt-2 border-t border-border/50">
              {action}
            </div>
          )}
        </div>
      </article>
    );
  }
);

WarningCard.displayName = "WarningCard";