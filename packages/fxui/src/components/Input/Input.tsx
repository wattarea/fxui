import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  [
    'w-full font-sans text-base',
    'placeholder:text-gray-400',
    'focus:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transition-all duration-150',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-2 border-fx-black bg-fx-white text-fx-black px-3 py-2 rounded-[4px]',
          'focus:shadow-fx focus:translate-x-[-2px] focus:translate-y-[-2px]',
          'dark:border-fx-white dark:bg-fx-black dark:text-fx-white dark:focus:shadow-fx-dark',
        ],
        filled: [
          'border-2 border-transparent bg-gray-100 text-fx-black px-3 py-2 rounded-[4px]',
          'focus:border-fx-black focus:bg-fx-white focus:shadow-fx-sm',
          'dark:bg-gray-800 dark:text-fx-white dark:focus:border-fx-white dark:focus:bg-fx-black',
        ],
        flushed: [
          'border-0 border-b-2 border-fx-black bg-transparent text-fx-black px-1 py-2 rounded-none',
          'focus:border-b-[3px]',
          'dark:border-fx-white dark:text-fx-white',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      label,
      error,
      hint,
      leftAddon,
      rightAddon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="font-bold text-sm text-fx-black dark:text-fx-white"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-stretch">
          {leftAddon && (
            <div
              className={cn(
                'flex items-center px-3 border-2 border-r-0 border-fx-black bg-gray-100 rounded-l-[4px] text-sm font-medium',
                'dark:border-fx-white dark:bg-gray-800 dark:text-fx-white',
                error && 'border-red-500 dark:border-red-500'
              )}
            >
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-describedby={cn(error && errorId, hint && hintId)}
            aria-invalid={error ? 'true' : undefined}
            className={cn(
              inputVariants({ variant }),
              leftAddon && 'rounded-l-none',
              rightAddon && 'rounded-r-none',
              error && '!border-red-500 !focus:shadow-none',
              className
            )}
            {...props}
          />
          {rightAddon && (
            <div
              className={cn(
                'flex items-center px-3 border-2 border-l-0 border-fx-black bg-gray-100 rounded-r-[4px] text-sm font-medium',
                'dark:border-fx-white dark:bg-gray-800 dark:text-fx-white',
                error && 'border-red-500 dark:border-red-500'
              )}
            >
              {rightAddon}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="text-sm text-red-500 font-medium" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export default Input;
