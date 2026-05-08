import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const chipVariants = cva(
  [
    'inline-flex items-center gap-1.5 font-sans font-bold select-none',
    'border-2 border-fx-black dark:border-fx-white rounded-full',
    'transition-all duration-150',
  ],
  {
    variants: {
      variant: {
        default: 'bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white',
        filled: 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black',
        yellow: 'bg-fx-yellow text-fx-black border-fx-black',
        pink: 'bg-fx-pink text-fx-white border-fx-black',
        green: 'bg-fx-green text-fx-black border-fx-black',
        blue: 'bg-fx-blue text-fx-white border-fx-black',
        purple: 'bg-fx-purple text-fx-white border-fx-black',
      },
      size: {
        sm: 'text-xs px-2.5 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-1.5',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
        false: '',
      },
      selected: {
        true: 'shadow-fx-sm translate-x-[2px] translate-y-[2px]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
      selected: false,
    },
  }
);

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'>,
    VariantProps<typeof chipVariants> {
  icon?: React.ReactNode;
  onClose?: () => void;
  onClick?: () => void;
  closeLabel?: string;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      selected,
      icon,
      onClose,
      onClick,
      closeLabel = 'Remove',
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = !!(interactive || onClick);

    return (
      <span
        ref={ref}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
        className={cn(chipVariants({ variant, size, interactive: isInteractive, selected }), className)}
        {...props}
      >
        {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
        <span>{children}</span>
        {onClose && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label={closeLabel}
            className={cn(
              'shrink-0 flex items-center justify-center rounded-full w-4 h-4',
              'hover:bg-black/10 dark:hover:bg-white/10 transition-colors',
              'text-current opacity-60 hover:opacity-100',
            )}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Chip.displayName = 'Chip';
export { Chip, chipVariants };
export default Chip;
