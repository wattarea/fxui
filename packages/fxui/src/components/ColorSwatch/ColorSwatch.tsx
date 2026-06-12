import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const colorSwatchVariants = cva(
  [
    'inline-flex flex-col overflow-hidden',
    'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
    'shadow-fx font-sans',
  ],
  {
    variants: {
      size: {
        sm: 'w-16',
        md: 'w-24',
        lg: 'w-32',
      },
      shape: {
        square: 'rounded-[4px]',
        circle: 'rounded-full overflow-hidden border-2',
      },
    },
    defaultVariants: { size: 'md', shape: 'square' },
  }
);

export interface ColorSwatchProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof colorSwatchVariants> {
  color: string;
  name?: string;
  showHex?: boolean;
}

const ColorSwatch = React.forwardRef<HTMLDivElement, ColorSwatchProps>(
  ({ className, color, name, showHex = true, size = 'md', shape = 'square', ...props }, ref) => {
    const heightClass = size === 'sm' ? 'h-10' : size === 'lg' ? 'h-20' : 'h-14';
    const hasLabel = name || showHex;

    if (shape === 'circle') {
      const sizeClass = size === 'sm' ? 'h-10 w-10' : size === 'lg' ? 'h-20 w-20' : 'h-14 w-14';
      return (
        <div
          ref={ref}
          title={name ?? color}
          className={cn(
            'rounded-full border-2 border-fx-black dark:border-fx-white shadow-fx-sm',
            sizeClass,
            className
          )}
          style={{ background: color }}
          aria-label={name ?? color}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(colorSwatchVariants({ size, shape }), className)}
        {...props}
      >
        {/* Color preview */}
        <div
          className={cn('w-full', heightClass)}
          style={{ background: color }}
          aria-label={name ?? color}
        />

        {/* Label */}
        {hasLabel && (
          <div className="px-2 py-1.5 bg-fx-white dark:bg-fx-black border-t-2 border-fx-black dark:border-fx-white">
            {name && (
              <p className="text-[10px] font-bold uppercase tracking-wide text-fx-black dark:text-fx-white truncate">
                {name}
              </p>
            )}
            {showHex && (
              <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 truncate">
                {color}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

ColorSwatch.displayName = 'ColorSwatch';

export { ColorSwatch, colorSwatchVariants };
export default ColorSwatch;
