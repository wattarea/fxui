import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const tagVariants = cva(
  [
    'inline-flex items-center gap-1.5 font-sans font-bold rounded-[4px]',
    'border-2 transition-all duration-150',
  ],
  {
    variants: {
      variant: {
        default: 'bg-fx-black text-fx-white border-fx-black dark:bg-fx-white dark:text-fx-black dark:border-fx-white',
        outline: 'bg-transparent text-fx-black border-fx-black dark:text-fx-white dark:border-fx-white',
        neon: 'bg-fx-yellow text-fx-black border-fx-black shadow-fx-sm',
        ghost: 'bg-gray-100 text-fx-black border-gray-200 dark:bg-gray-800 dark:text-fx-white dark:border-gray-700',
      },
      color: {
        default: '',
        success: '',
        warning: '',
        error: '',
        info: '',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
      },
    },
    compoundVariants: [
      { variant: 'neon', color: 'success', className: 'bg-fx-green text-fx-black border-fx-black' },
      { variant: 'neon', color: 'warning', className: 'bg-fx-yellow text-fx-black border-fx-black' },
      { variant: 'neon', color: 'error', className: 'bg-fx-pink text-white border-fx-black' },
      { variant: 'neon', color: 'info', className: 'bg-fx-blue text-white border-fx-black' },
    ],
    defaultVariants: { variant: 'default', size: 'md', color: 'default' },
  }
);

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof tagVariants> {
  leftIcon?: React.ReactNode;
  onClose?: () => void;
  closeable?: boolean;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, color, size, leftIcon, onClose, closeable = !!onClose, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(tagVariants({ variant, color, size }), className)}
      {...props}
    >
      {leftIcon && <span aria-hidden="true" className="shrink-0">{leftIcon}</span>}
      {children}
      {closeable && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose?.(); }}
          aria-label="Remove tag"
          className={cn(
            'shrink-0 ml-0.5 rounded-sm opacity-60 hover:opacity-100 transition-opacity',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current',
          )}
        >
          ✕
        </button>
      )}
    </span>
  )
);

Tag.displayName = 'Tag';

export { Tag, tagVariants };
export default Tag;
