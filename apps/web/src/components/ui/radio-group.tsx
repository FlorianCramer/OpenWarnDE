"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  const context = React.useContext(RadioGroupContext);
  return context;
}

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      name,
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? "");
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback(
      (val: string) => {
        if (!isControlled) {
          setUncontrolledValue(val);
        }
        onValueChange?.(val);
      },
      [isControlled, onValueChange]
    );

    return (
      <RadioGroupContext.Provider
        value={{
          name,
          value,
          onValueChange: handleValueChange,
          disabled,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={cn("grid gap-2.5", className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value: string;
  label?: React.ReactNode;
  description?: string;
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, label, description, disabled: itemDisabled, id, ...props }, ref) => {
    const group = useRadioGroup();
    const generatedId = React.useId();
    const itemId = id ?? generatedId;

    const isChecked = group?.value === value;
    const isDisabled = group?.disabled || itemDisabled;

    const handleChange = () => {
      if (!isDisabled) {
        group?.onValueChange?.(value);
      }
    };

    return (
      <div className={cn("inline-flex items-start gap-2.5", className)}>
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            id={itemId}
            type="radio"
            name={group?.name}
            value={value}
            checked={isChecked}
            onChange={handleChange}
            disabled={isDisabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full border bg-surface transition-colors cursor-pointer select-none",
              isChecked ? "border-primary" : "border-border",
              "peer-hover:border-primary/60",
              "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-1",
              "peer-disabled:pointer-events-none peer-disabled:opacity-50 peer-disabled:bg-surface-muted"
            )}
          >
            {isChecked && (
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </div>
        </div>

        {(label || description) && (
          <div className="space-y-0.5">
            {label && (
              <label
                htmlFor={itemId}
                className={cn(
                  "block text-sm font-medium text-foreground cursor-pointer select-none leading-none pt-0.5",
                  isDisabled && "cursor-not-allowed opacity-50"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-foreground-muted leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";

