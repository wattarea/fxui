import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const fabVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 font-sans font-black',
    'border-2 border-fx-black dark:border-fx-white',
    'shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px]',
    'active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fx-black',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black',
        yellow: 'bg-fx-yellow text-fx-black',
        pink: 'bg-fx-pink text-fx-white',
        green: 'bg-fx-green text-fx-black',
        blue: 'bg-fx-blue text-fx-white',
        white: 'bg-fx-white text-fx-black dark:bg-fx-black dark:text-fx-white',
      },
      shape: {
        circle: 'rounded-full',
        pill: 'rounded-full',
        square: 'rounded-[4px]',
      },
      size: {
        sm: 'h-10 text-sm',
        md: 'h-14 text-base',
        lg: 'h-16 text-lg',
      },
    },
    compoundVariants: [
      { shape: 'circle', size: 'sm', class: 'w-10' },
      { shape: 'circle', size: 'md', class: 'w-14' },
      { shape: 'circle', size: 'lg', class: 'w-16' },
      { shape: 'square', size: 'sm', class: 'w-10' },
      { shape: 'square', size: 'md', class: 'w-14' },
      { shape: 'square', size: 'lg', class: 'w-16' },
      { shape: 'pill', size: 'sm', class: 'px-4' },
      { shape: 'pill', size: 'md', class: 'px-6' },
      { shape: 'pill', size: 'lg', class: 'px-8' },
    ],
    defaultVariants: {
      variant: 'default',
      shape: 'circle',
      size: 'md',
    },
  }
);

export interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  icon: React.ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'static';
  offset?: number;
}

const positionClasses = {
  'bottom-right': 'fixed z-50',
  'bottom-left': 'fixed z-50',
  'top-right': 'fixed z-50',
  'top-left': 'fixed z-50',
  static: 'relative',
};

const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  (
    {
      className,
      variant,
      shape,
      size,
      icon,
      label,
      position = 'static',
      offset = 24,
      style,
      ...props
    },
    ref
  ) => {
    const positionStyle: React.CSSProperties =
      position === 'bottom-right' ? { bottom: offset, right: offset } :
      position === 'bottom-left' ? { bottom: offset, left: offset } :
      position === 'top-right' ? { top: offset, right: offset } :
      position === 'top-left' ? { top: offset, left: offset } :
      {};

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label ?? (typeof icon === 'string' ? icon : 'Action')}
        className={cn(positionClasses[position], fabVariants({ variant, shape, size }), className)}
        style={{ ...positionStyle, ...style }}
        {...props}
      >
        <span aria-hidden="true">{icon}</span>
        {label && shape === 'pill' && <span>{label}</span>}
      </button>
    );
  }
);

FloatingActionButton.displayName = 'FloatingActionButton';
export { FloatingActionButton, fabVariants };
export default FloatingActionButton;
