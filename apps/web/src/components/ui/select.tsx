"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==========================================
// 1. FORM SELECT COMPONENT
// ==========================================

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  error?: boolean;
  searchable?: boolean;
  clearable?: boolean;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      onValueChange,
      options,
      placeholder = "Bitte auswählen",
      className,
      disabled,
      required,
      name,
      error = false,
      searchable = false,
      clearable = false,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedLabel, setSelectedLabel] = React.useState<string>("");
    const containerRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const listboxId = React.useId();

    React.useImperativeHandle(ref, () => containerRef.current!);

    React.useEffect(() => {
      const found = options.find((o) => o.value === value);
      setSelectedLabel(found?.label ?? "");
    }, [value, options]);

    React.useEffect(() => {
      if (open && searchable) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      } else {
        setSearchQuery("");
      }
    }, [open, searchable]);

    React.useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      }

      function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open]);

    const toggleOpen = React.useCallback(() => {
      if (!disabled) {
        setOpen((prev) => !prev);
      }
    }, [disabled]);

    const handleOptionSelect = React.useCallback(
      (optionValue: string) => {
        onValueChange(optionValue);
        setOpen(false);
        buttonRef.current?.focus();
      },
      [onValueChange]
    );

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onValueChange("");
    };

    const filteredOptions = React.useMemo(() => {
      if (!searchQuery.trim()) return options;
      return options.filter((o) =>
        o.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (!open) {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleOpen();
          }
        } else {
          const buttons = containerRef.current?.querySelectorAll(
            "button[role='option']:not([disabled])"
          );
          if (!buttons || buttons.length === 0) return;

          const currentIndex = Array.from(buttons).findIndex(
            (btn) => btn.getAttribute("data-value") === value
          );

          let nextIndex = currentIndex;

          if (event.key === "ArrowDown") {
            event.preventDefault();
            nextIndex = Math.min(currentIndex + 1, buttons.length - 1);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            nextIndex = Math.max(currentIndex - 1, 0);
          } else if (event.key === "Enter") {
            event.preventDefault();
            const selectedButton = buttons[currentIndex >= 0 ? currentIndex : 0] as HTMLButtonElement;
            if (selectedButton) {
              handleOptionSelect(selectedButton.dataset.value || "");
            }
          }

          if (nextIndex !== currentIndex && nextIndex >= 0) {
            (buttons[nextIndex] as HTMLButtonElement).focus();
          }
        }
      },
      [open, toggleOpen, value, handleOptionSelect]
    );

    return (
      <div
        ref={containerRef}
        className={cn("relative w-full", className)}
        {...props}
      >
        {name && (
          <input
            type="hidden"
            name={name}
            value={value}
            required={required}
          />
        )}
        <button
          ref={buttonRef}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-label={selectedLabel || placeholder}
          aria-disabled={disabled}
          aria-required={required}
          aria-invalid={error ? "true" : undefined}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-lg border bg-surface px-3.5 py-2 text-sm text-foreground shadow-xs transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
            error
              ? "border-danger focus-visible:ring-danger"
              : "border-border focus-visible:border-primary focus-visible:ring-primary",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-muted",
            "hover:bg-surface-muted/40",
            open && "border-primary ring-2 ring-primary/20",
            !selectedLabel && "text-foreground-subtle"
          )}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
        >
          <span className="truncate">{selectedLabel || placeholder}</span>
          <div className="flex items-center gap-1.5 ml-2 shrink-0">
            {clearable && value && !disabled && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClear}
                className="rounded-sm p-0.5 text-foreground-subtle hover:text-foreground hover:bg-surface-muted"
                aria-label="Auswahl löschen"
              >
                ✕
              </span>
            )}
            <svg
              className={cn(
                "h-4 w-4 text-foreground-subtle transition-transform duration-200",
                open && "rotate-180 text-primary"
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </button>

        {open && (
          <div
            id={listboxId}
            className="absolute z-50 mt-1.5 w-full rounded-xl border border-border bg-surface shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
            role="listbox"
            aria-label="Optionen"
          >
            {searchable && (
              <div className="p-2 border-b border-border/60">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Suchen..."
                  className="w-full rounded-md border border-border bg-surface-muted/60 px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary"
                />
              </div>
            )}
            <ul className="max-h-60 overflow-y-auto p-1 space-y-0.5">
              {filteredOptions.length === 0 ? (
                <li className="px-3 py-4 text-center text-xs text-foreground-muted">
                  Keine Optionen gefunden
                </li>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <li key={option.value}>
                      <button
                        type="button"
                        role="option"
                        data-value={option.value}
                        aria-selected={isSelected}
                        disabled={option.disabled}
                        tabIndex={-1}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                          "hover:bg-surface-muted focus:bg-surface-muted focus:outline-none",
                          isSelected
                            ? "bg-primary-muted font-semibold text-primary"
                            : "text-foreground",
                          option.disabled && "cursor-not-allowed opacity-40"
                        )}
                        onClick={() => handleOptionSelect(option.value)}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected && (
                          <svg
                            className="h-4 w-4 text-primary shrink-0 ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

// ==========================================
// 2. DROPDOWN MENU & ACTION MENU COMPONENT
// ==========================================

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownMenu");
  }
  return context;
}

export interface DropdownMenuProps {
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, children, asChild, onClick, ...props }, ref) => {
    const { open, setOpen } = useDropdown();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      setOpen(!open);
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
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export type DropdownAlign = "left" | "right";

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: DropdownAlign;
}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = "right", ...props }, ref) => {
    const { open } = useDropdown();

    if (!open) return null;

    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          "absolute z-50 mt-2 min-w-[170px] rounded-xl border border-border bg-surface p-1.5 shadow-xl transition-all",
          align === "right" ? "right-0" : "left-0",
          className
        )}
        {...props}
      />
    );
  }
);

DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "danger";
  icon?: React.ReactNode;
}

export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, variant = "default", icon, children, onClick, ...props }, ref) => {
    const { setOpen } = useDropdown();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      setOpen(false);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        onClick={handleClick}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors cursor-pointer",
          variant === "danger"
            ? "text-danger hover:bg-danger-muted/60"
            : "text-foreground hover:bg-surface-muted hover:text-foreground",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

DropdownMenuItem.displayName = "DropdownMenuItem";

export type DropdownMenuSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

export const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("-mx-1.5 my-1.5 h-px bg-border", className)}
        {...props}
      />
    );
  }
);

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// ==========================================
// 3. POPOVER OVERLAY COMPONENT
// ==========================================

export interface PopoverProps {
  children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({ children }) => {
  return <DropdownMenu>{children}</DropdownMenu>;
};

export type PopoverTriggerProps = DropdownMenuTriggerProps;
export const PopoverTrigger = DropdownMenuTrigger;

export type PopoverAlign = "left" | "right" | "center";

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: PopoverAlign;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align = "left", ...props }, ref) => {
    const { open } = useDropdown();

    if (!open) return null;

    const alignClasses = {
      left: "left-0",
      right: "right-0",
      center: "left-1/2 -translate-x-1/2",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 mt-2 rounded-xl border border-border bg-surface p-4 shadow-xl text-foreground",
          alignClasses[align],
          className
        )}
        {...props}
      />
    );
  }
);

PopoverContent.displayName = "PopoverContent";