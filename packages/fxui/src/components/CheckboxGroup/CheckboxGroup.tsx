import React from 'react';
import { cn } from '../../utils/cn';

export interface CheckboxGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  options: CheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  orientation?: 'vertical' | 'horizontal';
  selectAll?: boolean;
  selectAllLabel?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

const CheckboxGroup = ({
  options,
  value,
  defaultValue = [],
  onChange,
  label,
  orientation = 'vertical',
  selectAll = false,
  selectAllLabel = 'Select all',
  error,
  hint,
  disabled = false,
  className,
}: CheckboxGroupProps) => {
  const isControlled = value !== undefined;
  const [inner, setInner] = React.useState<string[]>(defaultValue);
  const selected = isControlled ? value! : inner;

  const update = (next: string[]) => {
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const toggle = (v: string) => {
    if (selected.includes(v)) {
      update(selected.filter((x) => x !== v));
    } else {
      update([...selected, v]);
    }
  };

  const allChecked = options.every((o) => selected.includes(o.value));
  const someChecked = options.some((o) => selected.includes(o.value)) && !allChecked;

  const toggleAll = () => {
    if (allChecked) {
      update([]);
    } else {
      update(options.filter((o) => !o.disabled).map((o) => o.value));
    }
  };

  const groupId = React.useId();

  return (
    <fieldset className={cn('font-sans', className)} aria-describedby={error ? `${groupId}-error` : hint ? `${groupId}-hint` : undefined}>
      {label && (
        <legend className="text-sm font-bold text-fx-black dark:text-fx-white mb-3">{label}</legend>
      )}

      {selectAll && (
        <label className="flex items-center gap-2.5 cursor-pointer mb-2 pb-2 border-b-2 border-fx-black dark:border-fx-white">
          <span className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={allChecked}
              ref={(el) => { if (el) el.indeterminate = someChecked; }}
              onChange={toggleAll}
              disabled={disabled}
              className="sr-only"
            />
            <span className={cn(
              'flex items-center justify-center w-5 h-5 rounded-[4px]',
              'border-2 border-fx-black dark:border-fx-white transition-colors',
              (allChecked || someChecked) ? 'bg-fx-black dark:bg-fx-white' : 'bg-fx-white dark:bg-fx-black',
            )}>
              {someChecked && (
                <span className="w-2.5 h-0.5 bg-fx-white dark:bg-fx-black rounded-full" />
              )}
              {allChecked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-fx-white dark:text-fx-black">
                  <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          </span>
          <span className="text-sm font-bold text-fx-black dark:text-fx-white">{selectAllLabel}</span>
        </label>
      )}

      <div className={cn('flex gap-3', orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col')}>
        {options.map((opt) => {
          const checked = selected.includes(opt.value);
          const isDisabled = disabled || opt.disabled;
          return (
            <label
              key={opt.value}
              className={cn(
                'flex items-start gap-2.5',
                isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              )}
            >
              <span className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={isDisabled}
                  onChange={() => !isDisabled && toggle(opt.value)}
                  value={opt.value}
                  className="sr-only"
                />
                <span className={cn(
                  'flex items-center justify-center w-5 h-5 rounded-[4px]',
                  'border-2 border-fx-black dark:border-fx-white transition-all duration-150',
                  checked ? 'bg-fx-black dark:bg-fx-white shadow-fx-sm translate-x-[1px] translate-y-[1px]' : 'bg-fx-white dark:bg-fx-black',
                )}>
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-fx-white dark:text-fx-black">
                      <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-fx-black dark:text-fx-white">{opt.label}</span>
                {opt.description && (
                  <span className="text-xs text-gray-400 mt-0.5">{opt.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {error && (
        <p id={`${groupId}-error`} className="mt-2 text-xs text-fx-pink font-medium">{error}</p>
      )}
      {!error && hint && (
        <p id={`${groupId}-hint`} className="mt-2 text-xs text-gray-400">{hint}</p>
      )}
    </fieldset>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';
export { CheckboxGroup };
export default CheckboxGroup;
