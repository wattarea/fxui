import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputGroupVariants = cva(
  [
    'flex items-stretch w-full',
    'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
    'overflow-hidden',
    'focus-within:ring-2 focus-within:ring-fx-black dark:focus-within:ring-fx-white focus-within:ring-offset-1',
    'transition-shadow duration-150',
    'bg-fx-white dark:bg-fx-black',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
      error: {
        true: 'border-fx-pink focus-within:ring-fx-pink',
      },
      disabled: {
        true: 'opacity-50 pointer-events-none bg-gray-50 dark:bg-gray-900',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

const addonBase = cn(
  'flex items-center justify-center shrink-0 px-3',
  'bg-gray-100 dark:bg-gray-800',
  'text-fx-black dark:text-fx-white font-sans font-medium',
  'select-none',
);

export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
  position: 'left' | 'right';
}

const InputGroupAddon = ({ position, className, children, ...props }: InputGroupAddonProps) => (
  <span
    className={cn(
      addonBase,
      position === 'left'
        ? 'border-r-2 border-fx-black dark:border-fx-white'
        : 'border-l-2 border-fx-black dark:border-fx-white',
      className,
    )}
    aria-hidden="true"
    {...props}
  >
    {children}
  </span>
);

export interface InputGroupProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputGroupVariants>, 'disabled'> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean;
  wrapperClassName?: string;
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  (
    { prefix, suffix, size, error, disabled, wrapperClassName, className, ...props },
    ref
  ) => (
    <div
      className={cn(
        inputGroupVariants({ size, error: !!error, disabled: !!disabled }),
        wrapperClassName,
      )}
    >
      {prefix && <InputGroupAddon position="left">{prefix}</InputGroupAddon>}
      <input
        ref={ref}
        disabled={disabled}
        className={cn(
          'flex-1 min-w-0 px-3 bg-transparent outline-none',
          'text-fx-black dark:text-fx-white placeholder:text-gray-400',
          'font-sans',
          'disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      />
      {suffix && <InputGroupAddon position="right">{suffix}</InputGroupAddon>}
    </div>
  )
);
InputGroup.displayName = 'InputGroup';
export { InputGroup, inputGroupVariants };
export default InputGroup;
