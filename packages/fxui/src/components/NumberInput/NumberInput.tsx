import React from 'react';
import { cn } from '../../utils/cn';

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  label?: string;
  error?: string;
  hint?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      value,
      defaultValue = 0,
      min,
      max,
      step = 1,
      onChange,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const controlled = value !== undefined;
    const current = controlled ? value : internalValue;

    const clamp = (v: number) => {
      if (min !== undefined && v < min) return min;
      if (max !== undefined && v > max) return max;
      return v;
    };

    const update = (next: number) => {
      const clamped = clamp(next);
      if (!controlled) setInternalValue(clamped);
      onChange?.(clamped);
    };

    const decrement = () => update(current - step);
    const increment = () => update(current + step);

    const btnBase = cn(
      'flex items-center justify-center w-10 shrink-0',
      'border-2 border-fx-black font-bold text-lg',
      'bg-fx-white text-fx-black',
      'transition-all duration-150',
      'hover:shadow-fx-sm hover:translate-x-[1px] hover:translate-y-[1px]',
      'active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fx-black focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none',
      'dark:border-fx-white dark:bg-fx-black dark:text-fx-white',
    );

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={inputId} className="font-bold text-sm text-fx-black dark:text-fx-white">
            {label}
          </label>
        )}
        <div className="flex">
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || (min !== undefined && current <= min)}
            aria-label="Decrease"
            className={cn(btnBase, 'border-r-0 rounded-l-[4px]')}
          >
            −
          </button>
          <input
            ref={ref}
            id={inputId}
            type="number"
            value={current}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            aria-describedby={cn(error && errorId, hint && hintId)}
            aria-invalid={error ? 'true' : undefined}
            onChange={(e) => update(parseFloat(e.target.value) || 0)}
            className={cn(
              'flex-1 min-w-0 text-center font-bold font-sans',
              'border-2 border-fx-black bg-fx-white text-fx-black',
              'focus:outline-none focus:shadow-fx',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'dark:border-fx-white dark:bg-fx-black dark:text-fx-white',
              '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
              error && '!border-red-500',
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={increment}
            disabled={disabled || (max !== undefined && current >= max)}
            aria-label="Increase"
            className={cn(btnBase, 'border-l-0 rounded-r-[4px]')}
          >
            +
          </button>
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

NumberInput.displayName = 'NumberInput';

export { NumberInput };
export default NumberInput;
