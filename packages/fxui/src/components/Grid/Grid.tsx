import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const gridVariants = cva('grid', {
  variants: {
    cols: {
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '5': 'grid-cols-5',
      '6': 'grid-cols-6',
      '7': 'grid-cols-7',
      '8': 'grid-cols-8',
      '9': 'grid-cols-9',
      '10': 'grid-cols-10',
      '11': 'grid-cols-11',
      '12': 'grid-cols-12',
      none: 'grid-cols-none',
    },
    rows: {
      '1': 'grid-rows-1',
      '2': 'grid-rows-2',
      '3': 'grid-rows-3',
      '4': 'grid-rows-4',
      '5': 'grid-rows-5',
      '6': 'grid-rows-6',
      none: 'grid-rows-none',
    },
    gap: {
      '0': 'gap-0',
      '1': 'gap-1',
      '2': 'gap-2',
      '3': 'gap-3',
      '4': 'gap-4',
      '5': 'gap-5',
      '6': 'gap-6',
      '8': 'gap-8',
      '10': 'gap-10',
      '12': 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-items-start',
      center: 'justify-items-center',
      end: 'justify-items-end',
      stretch: 'justify-items-stretch',
    },
    flow: {
      row: 'grid-flow-row',
      col: 'grid-flow-col',
      dense: 'grid-flow-dense',
      'row-dense': 'grid-flow-row-dense',
      'col-dense': 'grid-flow-col-dense',
    },
  },
  defaultVariants: { cols: '1', gap: '4', align: 'stretch', justify: 'stretch' },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, rows, gap, align, justify, flow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(gridVariants({ cols, rows, gap, align, justify, flow }), className)}
      {...props}
    />
  )
);

Grid.displayName = 'Grid';

// ─── Grid.Item ────────────────────────────────────────────────────────────────

const colSpanMap: Record<string, string> = {
  '1': 'col-span-1', '2': 'col-span-2', '3': 'col-span-3',
  '4': 'col-span-4', '5': 'col-span-5', '6': 'col-span-6',
  '7': 'col-span-7', '8': 'col-span-8', '9': 'col-span-9',
  '10': 'col-span-10', '11': 'col-span-11', '12': 'col-span-12',
  full: 'col-span-full',
};

const rowSpanMap: Record<string, string> = {
  '1': 'row-span-1', '2': 'row-span-2', '3': 'row-span-3',
  '4': 'row-span-4', '5': 'row-span-5', '6': 'row-span-6',
  full: 'row-span-full',
};

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: keyof typeof colSpanMap;
  rowSpan?: keyof typeof rowSpanMap;
  colStart?: string;
  rowStart?: string;
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, rowSpan, colStart, rowStart, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        colSpan && colSpanMap[colSpan],
        rowSpan && rowSpanMap[rowSpan],
        className
      )}
      style={{
        ...(colStart ? { gridColumnStart: colStart } : {}),
        ...(rowStart ? { gridRowStart: rowStart } : {}),
        ...style,
      }}
      {...props}
    />
  )
);

GridItem.displayName = 'Grid.Item';

export const GridWithItem = Object.assign(Grid, { Item: GridItem });
export { GridWithItem as Grid, gridVariants };
export default GridWithItem;
