"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder,
  className,
  disabled,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder;

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-[#dfe5ec] bg-white px-3 py-2 text-sm text-[#172033]",
          "focus:border-[#184e63] focus:outline-none focus:ring-2 focus:ring-[#184e63]/20",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        <span className={cn(!value && "text-[#8a94a6]")}>{selectedLabel}</span>
        <span className="text-[#8a94a6]">▼</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-[#dfe5ec] bg-white shadow-lg">
          <ul className="max-h-60 overflow-y-auto py-1">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm hover:bg-[#eef2f5]",
                    option.value === value && "bg-[#eef2f5] font-semibold text-[#184e63]"
                  )}
                  onClick={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Select.displayName = "Select";