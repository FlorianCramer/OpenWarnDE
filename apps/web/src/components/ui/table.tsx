"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => {
  return (
    <div className="w-full overflow-x-auto rounded-md border border-border">
      <table
        ref={ref}
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  );
});

Table.displayName = "Table";

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => {
  return (
    <thead ref={ref} className={cn("bg-surface-muted", className)} {...props} />
  );
});

TableHeader.displayName = "TableHeader";

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn("divide-y divide-border bg-surface", className)}
      {...props}
    />
  );
});

TableBody.displayName = "TableBody";

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={cn(
        "hover:bg-surface-muted transition-colors",
        className
      )}
      {...props}
    />
  );
});

TableRow.displayName = "TableRow";

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableCellElement> {}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={cn(
        "px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-foreground-muted",
        className
      )}
      {...props}
    />
  );
});

TableHead.displayName = "TableHead";

export interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn("px-4 py-3 text-foreground", className)}
      {...props}
    />
  );
});

TableCell.displayName = "TableCell";