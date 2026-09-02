"use client";

import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-[#dfe5ec] bg-white p-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
};

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return (
    <div className={cn("mb-4", className)} {...props} />
  );
};

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return (
    <h3
      className={cn("text-lg font-semibold text-[#172033]", className)}
      {...props}
    />
  );
};

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardContent = ({ className, ...props }: CardContentProps) => {
  return (
    <div className={cn("text-sm text-[#5d6878]", className)} {...props} />
  );
};

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <div className={cn("mt-4 flex justify-end gap-2", className)} {...props} />
  );
};
