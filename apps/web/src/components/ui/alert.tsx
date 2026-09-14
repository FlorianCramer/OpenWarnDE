"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCircleCheck,
  faTriangleExclamation,
  faCircleXmark,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

export type AlertVariant = "info" | "success" | "warning" | "danger" | "primary";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  icon?: React.ReactNode;
}

const ALERT_STYLES: Record<AlertVariant, string> = {
  info: "bg-info-muted text-info-text border-info/30",
  success: "bg-success-muted text-success-text border-success/30",
  warning: "bg-warning-muted text-warning-text border-warning/30",
  danger: "bg-danger-muted text-danger-text border-danger/30",
  primary: "bg-primary-muted text-primary border-primary/30",
};

const DEFAULT_ICONS: Record<AlertVariant, React.ReactNode> = {
  info: <FontAwesomeIcon icon={faCircleInfo} className="h-5 w-5 shrink-0" />,
  success: <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 shrink-0" />,
  warning: <FontAwesomeIcon icon={faTriangleExclamation} className="h-5 w-5 shrink-0" />,
  danger: <FontAwesomeIcon icon={faCircleXmark} className="h-5 w-5 shrink-0" />,
  primary: <FontAwesomeIcon icon={faCircleInfo} className="h-5 w-5 shrink-0" />,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative flex w-full gap-3 rounded-xl border p-4 text-sm font-medium",
          ALERT_STYLES[variant],
          className
        )}
        {...props}
      >
        <div className="mt-0.5">{icon !== undefined ? icon : DEFAULT_ICONS[variant]}</div>
        <div className="flex-1 space-y-1">{children}</div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h5
        ref={ref}
        className={cn("font-semibold leading-none tracking-tight", className)}
        {...props}
      />
    );
  }
);

AlertTitle.displayName = "AlertTitle";

export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-xs leading-relaxed opacity-90", className)}
        {...props}
      />
    );
  }
);

AlertDescription.displayName = "AlertDescription";

