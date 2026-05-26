import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const tableVariants = cva('w-full text-sm font-sans border-collapse', {
  variants: {
    variant: {
      default: '',
      striped: '[&_tbody_tr:nth-child(even)]:bg-gray-50 dark:[&_tbody_tr:nth-child(even)]:bg-gray-900',
      bordered: '[&_th]:border-2 [&_td]:border-2 [&_th]:border-fx-black [&_td]:border-fx-black dark:[&_th]:border-fx-white dark:[&_td]:border-fx-white',
    },
  },
  defaultVariants: { variant: 'default' },
});

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  hoverable?: boolean;
  stickyHeader?: boolean;
  caption?: string;
}

type TableContextValue = { variant: 'default' | 'striped' | 'bordered'; hoverable: boolean };
const TableContext = React.createContext<TableContextValue>({ variant: 'default', hoverable: false });

const TableRoot = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'default', hoverable = false, stickyHeader = false, caption, children, ...props }, ref) => (
    <TableContext.Provider value={{ variant: variant ?? 'default', hoverable }}>
      <div className="w-full overflow-x-auto border-2 border-fx-black rounded-[4px] shadow-fx dark:border-fx-white">
        <table
          ref={ref}
          className={cn(tableVariants({ variant }), hoverable && '[&_tbody_tr]:cursor-pointer', className)}
          {...props}
        >
          {caption && <caption className="pb-3 text-sm text-gray-500 text-left font-medium">{caption}</caption>}
          {children}
        </table>
      </div>
    </TableContext.Provider>
  )
);
TableRoot.displayName = 'Table';

const TableHead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn('border-b-2 border-fx-black bg-fx-black text-fx-white dark:border-fx-white dark:bg-fx-white dark:text-fx-black', className)}
      {...props}
    />
  )
);
TableHead.displayName = 'Table.Head';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => {
    const { hoverable } = React.useContext(TableContext);
    return (
      <tbody
        ref={ref}
        className={cn(
          'divide-y-2 divide-gray-100 dark:divide-gray-800',
          hoverable && '[&_tr]:hover:bg-gray-50 dark:[&_tr]:hover:bg-gray-900 [&_tr]:transition-colors [&_tr]:duration-100',
          className
        )}
        {...props}
      />
    );
  }
);
TableBody.displayName = 'Table.Body';

const TableFoot = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t-2 border-fx-black bg-gray-50 dark:border-fx-white dark:bg-gray-900', className)}
      {...props}
    />
  )
);
TableFoot.displayName = 'Table.Foot';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn('transition-colors', className)} {...props} />
  )
);
TableRow.displayName = 'Table.Row';

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
}

const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ className, sortable, sortDirection, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'px-4 py-3 text-left font-black text-xs uppercase tracking-widest',
        sortable && 'cursor-pointer select-none hover:opacity-80',
        className
      )}
      aria-sort={sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : undefined}
      {...props}
    >
      <span className="inline-flex items-center gap-1.5">
        {children}
        {sortable && (
          <span aria-hidden="true" className="opacity-60">
            {sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : '↕'}
          </span>
        )}
      </span>
    </th>
  )
);
TableHeaderCell.displayName = 'Table.HeaderCell';

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('px-4 py-3 text-fx-black dark:text-fx-white align-middle', className)}
      {...props}
    />
  )
);
TableCell.displayName = 'Table.Cell';

export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Foot: TableFoot,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
});

export default Table;
