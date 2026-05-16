import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const selectTriggerVariants = cva(
  [
    'inline-flex items-center justify-between gap-2 w-full',
    'font-sans font-medium text-base',
    'border-2 border-fx-black rounded-[4px]',
    'transition-all duration-150',
    'focus:outline-none focus:shadow-fx focus:translate-x-[-2px] focus:translate-y-[-2px]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'dark:border-fx-white dark:text-fx-white dark:bg-fx-black',
    'data-[placeholder]:text-gray-400',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export interface SelectProps extends VariantProps<typeof selectTriggerVariants> {
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const SelectRoot = ({
  label,
  placeholder,
  error,
  hint,
  disabled,
  value,
  defaultValue,
  onValueChange,
  size,
  children,
  className,
}: SelectProps) => {
  const id = React.useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="font-bold text-sm text-fx-black dark:text-fx-white">
          {label}
        </label>
      )}
      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          aria-describedby={cn(error && errorId, hint && hintId)}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            selectTriggerVariants({ size }),
            'bg-fx-white text-fx-black',
            error && '!border-red-500',
            className
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon asChild>
            <svg
              className="h-4 w-4 shrink-0 transition-transform duration-200 [[data-state=open]_&]:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={4}
            className={cn(
              'z-50 w-[var(--radix-select-trigger-width)]',
              'bg-fx-white border-2 border-fx-black rounded-[4px] shadow-fx',
              'animate-in fade-in-0 zoom-in-95',
              'dark:bg-fx-black dark:border-fx-white dark:shadow-[4px_4px_0px_#fafafa]',
            )}
          >
            <RadixSelect.Viewport className="p-1">
              {children}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
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
};
SelectRoot.displayName = 'Select';

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Item> {}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      'relative flex items-center px-3 py-2 rounded-[4px]',
      'text-sm font-medium font-sans text-fx-black dark:text-fx-white',
      'cursor-pointer select-none outline-none',
      'hover:bg-gray-100 dark:hover:bg-gray-800',
      'data-[highlighted]:bg-fx-black data-[highlighted]:text-fx-white',
      'dark:data-[highlighted]:bg-fx-white dark:data-[highlighted]:text-fx-black',
      'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
      className
    )}
    {...props}
  >
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    <RadixSelect.ItemIndicator className="absolute right-3">
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </RadixSelect.ItemIndicator>
  </RadixSelect.Item>
));
SelectItem.displayName = 'Select.Item';

export interface SelectGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Group> {
  label?: string;
}

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Group>,
  SelectGroupProps
>(({ label, children, ...props }, ref) => (
  <RadixSelect.Group ref={ref} {...props}>
    {label && (
      <RadixSelect.Label className="px-3 py-1.5 text-xs font-bold tracking-widest text-gray-400 uppercase">
        {label}
      </RadixSelect.Label>
    )}
    {children}
  </RadixSelect.Group>
));
SelectGroup.displayName = 'Select.Group';

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>
>(({ className, ...props }, ref) => (
  <RadixSelect.Separator
    ref={ref}
    className={cn('my-1 h-[2px] bg-fx-black dark:bg-fx-white mx-1', className)}
    {...props}
  />
));
SelectSeparator.displayName = 'Select.Separator';

export const Select = Object.assign(SelectRoot, {
  Item: SelectItem,
  Group: SelectGroup,
  Separator: SelectSeparator,
});

export default Select;
