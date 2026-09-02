"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "block text-sm font-medium text-[#172033]",
        "mb-2",
        className
      )}
      {...props}
    />
  );
});

Label.displayName = "Label";