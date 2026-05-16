import React from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import { cn } from '../../utils/cn';

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: string;
  description?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(({ className, label, description, id, ...props }, ref) => {
  const switchId = id || React.useId();

  return (
    <div className="flex items-start gap-3">
      <RadixSwitch.Root
        ref={ref}
        id={switchId}
        className={cn(
          'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full',
          'border-2 border-fx-black',
          'transition-all duration-200',
          'bg-gray-200 data-[state=checked]:bg-fx-black',
          'shadow-fx-sm hover:shadow-fx hover:translate-x-[-1px] hover:translate-y-[-1px]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fx-black focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'dark:border-fx-white dark:bg-gray-700',
          'dark:data-[state=checked]:bg-fx-white dark:shadow-fx-dark-sm dark:hover:shadow-fx-dark',
          className
        )}
        {...props}
      >
        <RadixSwitch.Thumb
          className={cn(
            'pointer-events-none block h-4 w-4 rounded-full',
            'border-2 border-fx-black bg-fx-white',
            'shadow-[1px_1px_0px_#0a0a0a]',
            'transition-transform duration-200',
            'translate-x-0.5 data-[state=checked]:translate-x-[22px]',
            'dark:border-fx-white dark:bg-fx-black dark:shadow-[1px_1px_0px_#fafafa]',
            'dark:data-[state=checked]:bg-fx-black'
          )}
        />
      </RadixSwitch.Root>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={switchId}
              className="font-medium font-sans text-fx-black dark:text-fx-white cursor-pointer select-none"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';

export { Switch };
export default Switch;
