import React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { cn } from '../../utils/cn';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ className, label, id, ...props }, ref) => {
  const checkboxId = id || React.useId();

  return (
    <div className="flex items-center gap-3">
      <RadixCheckbox.Root
        ref={ref}
        id={checkboxId}
        className={cn(
          'h-5 w-5 shrink-0 rounded-[4px]',
          'border-2 border-fx-black bg-fx-white',
          'shadow-fx-sm',
          'transition-all duration-150',
          'hover:shadow-fx hover:translate-x-[-1px] hover:translate-y-[-1px]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fx-black focus-visible:ring-offset-2',
          'data-[state=checked]:bg-fx-black data-[state=checked]:border-fx-black',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'dark:border-fx-white dark:bg-fx-black',
          'dark:data-[state=checked]:bg-fx-white dark:data-[state=checked]:border-fx-white',
          className
        )}
        {...props}
      >
        <RadixCheckbox.Indicator className="flex items-center justify-center text-fx-white dark:text-fx-black">
          <svg
            className="h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label
          htmlFor={checkboxId}
          className="font-medium font-sans text-fx-black dark:text-fx-white cursor-pointer select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
export default Checkbox;
