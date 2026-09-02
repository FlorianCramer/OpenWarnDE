"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

function useDialog() {
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

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(({ className, ...props }, ref) => {
  const { onOpenChange } = useDialog();
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-[#184e63] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors",
        "hover:bg-[#143d54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#184e63]",
        className
      )}
      onClick={() => onOpenChange(true)}
      {...props}
    />
  );
});

DialogTrigger.displayName = "DialogTrigger";

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = useDialog();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        ref={ref}
        className={cn(
          "relative z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});

DialogContent.displayName = "DialogContent";

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("mb-4 flex flex-col space-y-2", className)}
      {...props}
    />
  );
};

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn("text-lg font-semibold text-[#172033]", className)}
      {...props}
    />
  );
});

DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ className, ...props }) => {
  return (
    <p
      className={cn("text-sm text-[#5d6878]", className)}
      {...props}
    />
  );
};

export const DialogClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
  ({ className, children, asChild: _asChild, ...props }, ref) => {
    const { onOpenChange } = useDialog();
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-[#dfe5ec] bg-white px-4 py-2 text-sm font-semibold text-[#334155] hover:bg-[#eef2f5]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#184e63]",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={() => onOpenChange(false)}
        {...props}
      >
        {children ?? "✕"}
      </button>
    );
  }
);

DialogClose.displayName = "DialogClose";

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogFooter: React.FC<DialogFooterProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("mt-6 flex justify-end gap-3", className)}
      {...props}
    />
  );
};
