"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, striped, bordered, compact, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "w-full overflow-x-auto rounded-xl border border-border bg-surface shadow-xs",
          className
        )}
      >
        <table
          ref={ref}
          className={cn(
            "w-full border-collapse text-sm text-foreground",
            compact && "text-xs",
            bordered && "border-separate border-spacing-0",
            className
          )}
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement<TableBodyProps>(child) && child.type === TableBody) {
              return React.cloneElement(child, {
                striped: child.props.striped ?? striped,
                compact: child.props.compact ?? compact,
              });
            }
            return child;
          })}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  sticky?: boolean;
}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, sticky, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          "bg-surface-muted border-b border-border text-foreground",
          sticky && "sticky top-0 z-10 shadow-xs",
          className
        )}
        {...props}
      />
    );
  }
);

TableHeader.displayName = "TableHeader";

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  striped?: boolean;
  compact?: boolean;
}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, striped, compact, children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(
          "divide-y divide-border bg-surface",
          striped && "divide-y-0",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<TableRowProps>(child) && child.type === TableRow) {
            return React.cloneElement(child, {
              striped: child.props.striped ?? striped,
              compact: child.props.compact ?? compact,
              index: child.props.index ?? index,
            });
          }
          return child;
        })}
      </tbody>
    );
  }
);

TableBody.displayName = "TableBody";

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  striped?: boolean;
  compact?: boolean;
  index?: number;
  selected?: boolean;
  clickable?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, striped, compact, index, selected, clickable, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "transition-colors duration-150",
          striped && index !== undefined && index % 2 === 0 && "bg-surface-muted/40",
          "hover:bg-surface-muted/70",
          selected && "bg-primary-muted/40 hover:bg-primary-muted/60",
          clickable && "cursor-pointer hover:bg-surface-muted",
          compact && "h-8",
          className
        )}
        {...props}
      />
    );
  }
);

TableRow.displayName = "TableRow";

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  sortable?: boolean;
  sorted?: "asc" | "desc" | false;
  align?: "left" | "center" | "right";
}

export const TableHead = React.forwardRef<HTMLTableHeaderCellElement, TableHeadProps>(
  ({
    className,
    sortable,
    sorted,
    align = "left",
    children,
    ...props
  }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground-muted",
          sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
          align === "center" && "text-center",
          align === "right" && "text-right",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex items-center gap-1.5",
            align === "center" && "justify-center",
            align === "right" && "justify-end"
          )}
        >
          {children}
          {sortable && (
            <span className="inline-flex flex-col text-[10px] leading-none opacity-60">
              {sorted === "asc" && "▲"}
              {sorted === "desc" && "▼"}
              {!sorted && "▾"}
            </span>
          )}
        </div>
      </th>
    );
  }
);

TableHead.displayName = "TableHead";

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  align?: "left" | "center" | "right";
  nowrap?: boolean;
  truncate?: boolean;
}

export const TableCell = React.forwardRef<HTMLTableDataCellElement, TableCellProps>(
  ({ className, align = "left", nowrap, truncate, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn(
          "px-4 py-3.5 text-sm text-foreground align-middle",
          align === "center" && "text-center",
          align === "right" && "text-right",
          nowrap && "whitespace-nowrap",
          truncate && "truncate max-w-[200px]",
          className
        )}
        {...props}
      />
    );
  }
);

TableCell.displayName = "TableCell";

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn("border-t border-border bg-surface-muted/50 font-medium text-foreground", className)}
        {...props}
      />
    );
  }
);

TableFooter.displayName = "TableFooter";

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={cn("mt-3 text-xs text-foreground-muted text-left", className)}
        {...props}
      />
    );
  }
);

TableCaption.displayName = "TableCaption";

export interface TableEmptyProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  colSpan?: number;
  message?: string;
}

export const TableEmpty = React.forwardRef<HTMLTableDataCellElement, TableEmptyProps>(
  ({ className, colSpan = 1, message = "Keine Daten vorhanden", ...props }, ref) => {
    return (
      <td
        ref={ref}
        colSpan={colSpan}
        className={cn(
          "px-4 py-10 text-center text-foreground-muted",
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <svg
            className="h-8 w-8 text-foreground-subtle"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-sm font-medium">{message}</p>
        </div>
      </td>
    );
  }
);

TableEmpty.displayName = "TableEmpty";