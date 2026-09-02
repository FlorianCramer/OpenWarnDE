"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
} | null>(null);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, className, children, ...props }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList: React.FC<TabsListProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center gap-1 rounded-md bg-[#eef2f5] p-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(({ value, className, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs");
  }
  const isActive = context.value === value;
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors",
        isActive
          ? "bg-white text-[#184e63] shadow-sm"
          : "text-[#5d6878] hover:text-[#172033]",
        className
      )}
      onClick={() => context.onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
});

TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, className, children, ...props }) => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs");
  }
  if (context.value !== value) {
    return null;
  }
  return (
    <div
      className={cn("mt-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

TabsContent.displayName = "TabsContent";