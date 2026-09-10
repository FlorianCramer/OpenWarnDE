"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

export function useDialog() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

export type DialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = useDialog();
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all",
          "hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={() => onOpenChange(true)}
        {...props}
      />
    );
  }
);

DialogTrigger.displayName = "DialogTrigger";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

const dialogSizeClasses: Record<DialogSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  "2xl": "max-w-5xl",
  full: "max-w-[94vw]",
};

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: DialogSize;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, size = "lg", showCloseButton = true, footer, ...props }, ref) => {
    const { open, onOpenChange } = useDialog();

    // Lock body scroll and handle escape key
    React.useEffect(() => {
      if (!open) return;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onOpenChange(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop with blur */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => onOpenChange(false)}
          aria-hidden="true"
        />

        {/* Modal Window */}
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative z-50 flex w-full flex-col max-h-[90vh] overflow-hidden rounded-2xl border border-border bg-surface text-foreground shadow-2xl transition-all",
            dialogSizeClasses[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Schließen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {children}
          </div>
          {footer && (
            <div className="shrink-0 border-t border-border/50 bg-surface p-4 sm:p-5">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

DialogContent.displayName = "DialogContent";

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const DialogHeader: React.FC<DialogHeaderProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("mb-6 flex flex-col space-y-2 pr-8", className)}
      {...props}
    />
  );
};

DialogHeader.displayName = "DialogHeader";

export type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn("text-xl font-bold tracking-tight text-foreground sm:text-2xl", className)}
        {...props}
      />
    );
  }
);

DialogTitle.displayName = "DialogTitle";

export type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ className, ...props }) => {
  return (
    <p
      className={cn("text-sm leading-relaxed text-foreground-muted", className)}
      {...props}
    />
  );
};

DialogDescription.displayName = "DialogDescription";

export type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>;

export const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4 py-2", className)}
        {...props}
      />
    );
  }
);

DialogBody.displayName = "DialogBody";

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, asChild, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialog();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        onOpenChange(false);
      }
    };

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        className?: string;
      }>;
      return React.cloneElement(child, {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          child.props.onClick?.(e);
          handleClick(e);
        },
        className: cn(child.props.className, className),
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children ?? "Schließen"}
      </button>
    );
  }
);

DialogClose.displayName = "DialogClose";

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const DialogFooter: React.FC<DialogFooterProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-3 border-t border-border/50 pt-5 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
};

DialogFooter.displayName = "DialogFooter";

// ==========================================
// CONVENIENCE CONFIRMATION / ALERT DIALOG
// ==========================================

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "primary" | "danger";
  loading?: boolean;
  onConfirm: () => Promise<void> | void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Bestätigen",
  cancelText = "Abbrechen",
  variant = "primary",
  loading = false,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        size="sm"
        footer={
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>
                {cancelText}
              </Button>
            </DialogClose>
            <Button
              variant={variant === "danger" ? "danger" : "primary"}
              loading={loading}
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </DialogFooter>
        }
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};