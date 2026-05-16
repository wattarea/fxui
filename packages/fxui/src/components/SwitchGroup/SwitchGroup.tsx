import React from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import { cn } from '../../utils/cn';

export interface SwitchGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SwitchGroupProps {
  options: SwitchGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

const SwitchGroup = ({
  options,
  value,
  defaultValue = [],
  onChange,
  label,
  hint,
  disabled = false,
  className,
}: SwitchGroupProps) => {
  const isControlled = value !== undefined;
  const [inner, setInner] = React.useState<string[]>(defaultValue);
  const selected = isControlled ? value! : inner;
  const groupId = React.useId();

  const toggle = (v: string, checked: boolean) => {
    const next = checked
      ? [...selected, v]
      : selected.filter((x) => x !== v);
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  return (
    <div className={cn('font-sans flex flex-col gap-1', className)} aria-describedby={hint ? `${groupId}-hint` : undefined}>
      {label && (
        <p className="text-sm font-bold text-fx-black dark:text-fx-white mb-2">{label}</p>
      )}

      <div className="flex flex-col divide-y-2 divide-fx-black dark:divide-fx-white border-2 border-fx-black dark:border-fx-white rounded-[4px]">
        {options.map((opt) => {
          const checked = selected.includes(opt.value);
          const isDisabled = disabled || opt.disabled;
          return (
            <div
              key={opt.value}
              className={cn(
                'flex items-center justify-between gap-4 px-4 py-3',
                isDisabled && 'opacity-50',
              )}
            >
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-fx-black dark:text-fx-white">{opt.label}</span>
                {opt.description && (
                  <span className="text-xs text-gray-400 mt-0.5">{opt.description}</span>
                )}
              </div>

              <RadixSwitch.Root
                checked={checked}
                disabled={isDisabled}
                onCheckedChange={(c) => toggle(opt.value, c)}
                aria-label={opt.label}
                className={cn(
                  'relative shrink-0 w-10 h-6 rounded-full border-2 border-fx-black dark:border-fx-white',
                  'transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fx-black',
                  checked
                    ? 'bg-fx-black dark:bg-fx-white shadow-fx-sm translate-x-[1px] translate-y-[1px]'
                    : 'bg-fx-white dark:bg-fx-black',
                  isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
                )}
              >
                <RadixSwitch.Thumb
                  className={cn(
                    'block w-4 h-4 rounded-full border-2 border-fx-black dark:border-fx-white',
                    'transition-transform duration-150',
                    checked
                      ? 'translate-x-[18px] bg-fx-white dark:bg-fx-black'
                      : 'translate-x-[1px] bg-fx-black dark:bg-fx-white',
                  )}
                />
              </RadixSwitch.Root>
            </div>
          );
        })}
      </div>

      {hint && (
        <p id={`${groupId}-hint`} className="text-xs text-gray-400 mt-1">{hint}</p>
      )}
    </div>
  );
};

SwitchGroup.displayName = 'SwitchGroup';
export { SwitchGroup };
export default SwitchGroup;
