import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const dividerVariants = cva('', {
  variants: {
    variant: {
      solid: '',
      dashed: '',
      dotted: '',
    },
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
  },
  defaultVariants: { variant: 'solid', orientation: 'horizontal' },
});

const lineClass: Record<NonNullable<VariantProps<typeof dividerVariants>['variant']>, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: React.ReactNode;
  labelPlacement?: 'start' | 'center' | 'end';
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      variant = 'solid',
      orientation = 'horizontal',
      label,
      labelPlacement = 'center',
      ...props
    },
    ref
  ) => {
    const lv = variant ?? 'solid';

    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn('inline-flex h-full min-h-[1em] items-center', className)}
          {...props}
        >
          <div
            className={cn('h-full w-0 border-l-2 border-fx-black dark:border-fx-white', lineClass[lv])}
          />
        </div>
      );
    }

    if (label) {
      const alignClass =
        labelPlacement === 'start'
          ? 'justify-start'
          : labelPlacement === 'end'
          ? 'justify-end'
          : 'justify-center';

      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn('flex w-full items-center gap-3', alignClass, className)}
          {...props}
        >
          {labelPlacement !== 'start' && (
            <div className={cn('flex-1 border-t-2 border-fx-black dark:border-fx-white', lineClass[lv])} />
          )}
          <span className="shrink-0 text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 font-sans">
            {label}
          </span>
          {labelPlacement !== 'end' && (
            <div className={cn('flex-1 border-t-2 border-fx-black dark:border-fx-white', lineClass[lv])} />
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn('w-full', className)}
        {...props}
      >
        <div className={cn('border-t-2 border-fx-black dark:border-fx-white', lineClass[lv])} />
      </div>
    );
  }
);

Divider.displayName = 'Divider';

export { Divider, dividerVariants };
export default Divider;
