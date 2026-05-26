import React from 'react';
import * as RadixProgress from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const progressTrackVariants = cva(
  [
    'relative overflow-hidden rounded-full',
    'border-2 border-fx-black',
    'bg-gray-100 dark:bg-gray-800 dark:border-fx-white',
  ],
  {
    variants: {
      size: {
        sm: 'h-3',
        md: 'h-5',
        lg: 'h-7',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

const progressFillVariants = cva(
  'h-full rounded-full transition-all duration-500 ease-out',
  {
    variants: {
      color: {
        default: 'bg-fx-black dark:bg-fx-white',
        success: 'bg-fx-green',
        warning: 'bg-fx-yellow',
        error: 'bg-[#FF1744]',
        info: 'bg-fx-blue',
        neon: 'bg-fx-pink',
      },
    },
    defaultVariants: { color: 'default' },
  }
);

export interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixProgress.Root>, 'color'>,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressFillVariants> {
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number, max: number) => string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof RadixProgress.Root>,
  ProgressProps
>(
  (
    {
      className,
      size,
      color,
      label,
      showValue = false,
      formatValue = (v, m) => `${Math.round((v / m) * 100)}%`,
      value = 0,
      max = 100,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, ((value ?? 0) / (max ?? 100)) * 100));

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <span className="text-sm font-bold text-fx-black dark:text-fx-white font-sans">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-xs font-mono font-bold text-fx-black dark:text-fx-white">
                {formatValue(value ?? 0, max ?? 100)}
              </span>
            )}
          </div>
        )}
        <RadixProgress.Root
          ref={ref}
          value={value}
          max={max}
          className={cn(progressTrackVariants({ size }), className)}
          {...props}
        >
          <RadixProgress.Indicator
            className={cn(progressFillVariants({ color }))}
            style={{ width: `${percentage}%` }}
          />
        </RadixProgress.Root>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
export default Progress;
