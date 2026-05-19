import React from 'react';
import { cn } from '../../utils/cn';

export interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

const sizeClasses = {
  sm: 'text-xs py-1 px-2.5',
  md: 'text-sm py-1.5 px-4',
  lg: 'text-base py-2 px-5',
};

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      size = 'md',
      fullWidth = false,
      disabled = false,
      className,
      'aria-label': ariaLabel = 'Segmented control',
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [inner, setInner] = React.useState(defaultValue ?? options[0]?.value ?? '');
    const current = isControlled ? value! : inner;

    const select = (v: string) => {
      if (!isControlled) setInner(v);
      onChange?.(v);
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        className={cn(
          'inline-flex border-2 border-fx-black dark:border-fx-white rounded-[4px] overflow-hidden',
          'bg-fx-white dark:bg-fx-black font-sans',
          fullWidth && 'w-full',
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
      >
        {options.map((opt, i) => {
          const isActive = current === opt.value;
          const isDisabled = disabled || opt.disabled;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              disabled={isDisabled}
              onClick={() => !isDisabled && select(opt.value)}
              className={cn(
                'flex items-center justify-center gap-1.5 font-bold transition-all duration-150 select-none',
                sizeClasses[size],
                fullWidth && 'flex-1',
                i < options.length - 1 && 'border-r-2 border-fx-black dark:border-fx-white',
                isActive
                  ? 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-transparent text-fx-black dark:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800',
                isDisabled && 'cursor-not-allowed',
              )}
            >
              {opt.icon && <span aria-hidden="true" className="shrink-0">{opt.icon}</span>}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';
export { SegmentedControl };
export default SegmentedControl;
