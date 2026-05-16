import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const textareaVariants = cva(
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
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      resize: 'vertical',
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  hint?: string;
  showCount?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      resize,
      label,
      error,
      hint,
      showCount = false,
      maxLength,
      id,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId();
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;
    const [count, setCount] = React.useState(
      typeof defaultValue === 'string' ? defaultValue.length : 0
    );

    return (
      <div className="flex flex-col gap-1 w-full">
        {(label || (showCount && maxLength)) && (
          <div className="flex items-center justify-between">
            {label && (
              <label
                htmlFor={textareaId}
                className="font-bold text-sm text-fx-black dark:text-fx-white"
              >
                {label}
              </label>
            )}
            {showCount && maxLength && (
              <span className="text-xs text-gray-400 font-mono">
                {count}/{maxLength}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          aria-describedby={cn(error && errorId, hint && hintId)}
          aria-invalid={error ? 'true' : undefined}
          onChange={(e) => {
            setCount(e.target.value.length);
            props.onChange?.(e);
          }}
          className={cn(
            textareaVariants({ variant, resize }),
            error && '!border-red-500',
            className
          )}
          {...props}
        />
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

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
export default Textarea;
