"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============ Context ============
const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  orientation?: "horizontal" | "vertical";
} | null>(null);

function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}

// ============ Slot Komponente ============
const Slot = React.forwardRef<
  HTMLElement,
  { asChild?: boolean } & React.HTMLAttributes<HTMLElement>
>(({ asChild, children, ...props }, ref) => {
  if (!asChild || !React.isValidElement(children)) {
    return <span ref={ref} {...props} />;
  }
  const child = children as React.ReactElement<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;
  const childClassName = (child.props as { className?: string }).className;
  const childOnClick = (child.props as { onClick?: React.MouseEventHandler<HTMLElement> }).onClick;

  return React.cloneElement(child, {
    ...props,
    ...child.props,
    ref,
    className: cn(childClassName, props.className),
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      childOnClick?.(e);
      props.onClick?.(e);
    },
  });
});
Slot.displayName = "Slot";

// ============ Tabs Root ============
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  defaultValue?: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      onValueChange,
      orientation = "horizontal",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <TabsContext.Provider value={{ value, onValueChange, orientation }}>
        <div
          ref={ref}
          className={cn(
            "w-full",
            orientation === "vertical" && "flex gap-8",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

// ============ Tabs List ============
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { orientation } = useTabs();

    const content = (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          "inline-flex items-center justify-center gap-1 rounded-md bg-surface-muted p-1",
          orientation === "vertical" && "flex-col items-stretch",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (asChild) {
      return (
        <Slot ref={ref as React.Ref<HTMLElement>} {...props}>
          {content}
        </Slot>
      );
    }

    return content;
  }
);

TabsList.displayName = "TabsList";

// ============ Tabs Trigger ============
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  asChild?: boolean;
  disabled?: boolean;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, asChild, disabled, ...props }, ref) => {
    const { value: selectedValue, onValueChange, orientation } = useTabs();
    const isActive = selectedValue === value;

    const handleClick = () => {
      if (!disabled) {
        onValueChange(value);
      }
    };

    const button = (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`tab-content-${value}`}
        id={`tab-trigger-${value}`}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          isActive
            ? "bg-surface text-primary shadow-sm"
            : "text-foreground-muted hover:text-foreground hover:bg-surface/50",
          orientation === "vertical" && "w-full justify-start",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );

    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          role="tab"
          aria-selected={isActive}
          aria-controls={`tab-content-${value}`}
          id={`tab-trigger-${value}`}
          tabIndex={isActive ? 0 : -1}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return button;
  }
);

TabsTrigger.displayName = "TabsTrigger";

// ============ Tabs Content ============
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  asChild?: boolean;
  forceMount?: boolean;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, asChild, forceMount, ...props }, ref) => {
    const { value: selectedValue } = useTabs();
    const isActive = selectedValue === value;

    if (!forceMount && !isActive) {
      return null;
    }

    const content = (
      <div
        ref={ref}
        role="tabpanel"
        aria-labelledby={`tab-trigger-${value}`}
        id={`tab-content-${value}`}
        tabIndex={0}
        className={cn(
          "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          !isActive && "hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          role="tabpanel"
          aria-labelledby={`tab-trigger-${value}`}
          id={`tab-content-${value}`}
          tabIndex={0}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return content;
  }
);

TabsContent.displayName = "TabsContent";

// ============ Tabs Indicator (optional) ============
export type TabsIndicatorProps = React.HTMLAttributes<HTMLDivElement>;

export const TabsIndicator = React.forwardRef<HTMLDivElement, TabsIndicatorProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useTabs();

    return (
      <div
        ref={ref}
        className={cn(
          "absolute transition-all duration-200",
          orientation === "horizontal" 
            ? "bottom-0 h-0.5 w-full bg-primary" 
            : "right-0 h-full w-0.5 bg-primary",
          className
        )}
        {...props}
      />
    );
  }
);

TabsIndicator.displayName = "TabsIndicator";

// ============ Tabs Scroll (optional) ============
export interface TabsScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const TabsScroll = React.forwardRef<HTMLDivElement, TabsScrollProps>(
  ({ className, children, orientation = "horizontal", ...props }, ref) => {
    const [showLeftArrow, setShowLeftArrow] = React.useState(false);
    const [showRightArrow, setShowRightArrow] = React.useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const container = scrollRef.current;
      if (!container) return;

      const checkScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
      };

      checkScroll();
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);

      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }, []);

    const scroll = (direction: "left" | "right") => {
      const container = scrollRef.current;
      if (!container) return;

      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    };

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface shadow-md p-1 hover:bg-surface-muted transition-colors"
            aria-label="Scroll left"
          >
            ◀
          </button>
        )}
        <div
          ref={scrollRef}
          className={cn(
            "overflow-x-auto scrollbar-hide",
            orientation === "horizontal" && "flex-nowrap"
          )}
        >
          {children}
        </div>
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface shadow-md p-1 hover:bg-surface-muted transition-colors"
            aria-label="Scroll right"
          >
            ▶
          </button>
        )}
      </div>
    );
  }
);

TabsScroll.displayName = "TabsScroll";