import React from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { cn } from '../../utils/cn';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>, 'children'> {
  options: RadioOption[];
  label?: string;
  error?: string;
  hint?: string;
  orientation?: 'horizontal' | 'vertical';
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  RadioGroupProps
>(({ options, label, error, hint, orientation = 'vertical', className, ...props }, ref) => {
  const id = React.useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <p className="font-bold text-sm text-fx-black dark:text-fx-white">{label}</p>
      )}
      <RadixRadioGroup.Root
        ref={ref}
        orientation={orientation}
        aria-describedby={cn(error && errorId, hint && hintId)}
        aria-invalid={error ? 'true' : undefined}
        className={cn(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
          className
        )}
        {...props}
      >
        {options.map((option) => {
          const itemId = `${id}-${option.value}`;
          return (
            <div key={option.value} className="flex items-start gap-3">
              <RadixRadioGroup.Item
                id={itemId}
                value={option.value}
                disabled={option.disabled}
                className={cn(
                  'mt-0.5 h-5 w-5 shrink-0 rounded-full',
                  'border-2 border-fx-black bg-fx-white',
                  'shadow-fx-sm transition-all duration-150',
                  'hover:shadow-fx hover:translate-x-[-1px] hover:translate-y-[-1px]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fx-black focus-visible:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'dark:border-fx-white dark:bg-fx-black',
                  error && '!border-red-500',
                )}
              >
                <RadixRadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2.5 after:h-2.5 after:rounded-full after:bg-fx-black dark:after:bg-fx-white" />
              </RadixRadioGroup.Item>
              <div className="flex flex-col">
                <label
                  htmlFor={itemId}
                  className={cn(
                    'font-medium font-sans text-fx-black dark:text-fx-white cursor-pointer select-none',
                    option.disabled && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  {option.label}
                </label>
                {option.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </RadixRadioGroup.Root>
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
});

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
export default RadioGroup;
